"""
Главный файл приложения Агрорезерв — FastAPI.

Инициализация:
- Lifespan: подключение MongoDB, Beanie ODM
- CORS middleware
- Rate limiting middleware
- Все роутеры
- Structlog настройка
"""

import time
from collections import defaultdict
from collections.abc import Callable
from contextlib import asynccontextmanager
from datetime import UTC
from pathlib import Path

import structlog
from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import close_mongo_connection, connect_to_mongo
from app.routers.admin.export import router as admin_export_router

# ── Настройка структурированного логирования ──────────────────
structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        # В production — JSON, в dev — красивый формат
        structlog.processors.JSONRenderer(
            # type: ignore[list-item]
        )
        if not settings.DEBUG
        else structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger(__name__)

# Простое хранилище для rate limiting (в production → Redis)
# Формат: {"ip": [timestamp1, timestamp2, ...]}
_rate_limit_store: dict = defaultdict(list)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan handler — выполняется при старте и остановке приложения.
    Инициализирует подключение к MongoDB и Beanie ODM.
    """
    # ── Старт приложения ─────────────────────────────────────
    logger.info(
        "Запуск приложения",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
    )

    # Подключаемся к MongoDB и инициализируем Beanie
    await connect_to_mongo()

    # Создаём директории для хранения файлов

    for directory in ["/app/media/documents", "/app/media/certificates", "/app/backups"]:
        Path(directory).mkdir(parents=True, exist_ok=True)

    # Создаём индексы (Beanie делает это автоматически при init)
    logger.info("Индексы MongoDB проверены/созданы")

    logger.info(
        "Приложение успешно запущено",
        docs_url="/docs",
        health_url="/health",
    )

    yield  # Приложение работает

    # ── Остановка приложения ─────────────────────────────────
    logger.info("Завершение работы приложения")
    await close_mongo_connection()
    logger.info("Приложение остановлено")


# ── Создание FastAPI приложения ────────────────────────────────
app = FastAPI(
    title=f"{settings.APP_NAME} API",
    description="""
# Агрорезерв API

Backend API платформы оптовой торговли овощами и фруктами.

## Аутентификация
Используйте Bearer токен в заголовке `Authorization: Bearer <access_token>`.

## Версионирование
Все эндпоинты находятся в `/api/v1/`.
    """,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    # Документация только в debug режиме или явно
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
)

# ── CORS Middleware ────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept", "X-Request-ID", "X-API-Key"],
    expose_headers=["X-Total-Count", "X-Page", "X-Limit"],
    max_age=3600,
)

# ── GZip Middleware (сжатие ответов) ──────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)


# ── Rate Limiting Middleware (простой, на основе памяти) ───────
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next: Callable) -> Response:
    """
    Простой rate limiting по IP адресу.
    В production рекомендуется использовать Redis и slowapi.

    Лимиты:
    - /api/v1/auth/* — 10 запросов/мин
    - /api/v1/admin/* — 1000 запросов/мин
    - Остальные — 100 запросов/мин
    """
    client_ip = request.client.host if request.client else "unknown"
    path = request.url.path
    now = time.time()
    window = 60.0  # 1 минута

    # Определяем лимит
    if path.startswith("/api/v1/auth"):
        limit = 10
    elif path.startswith("/api/v1/admin"):
        limit = settings.RATE_LIMIT_ADMIN_PER_MINUTE
    else:
        limit = settings.RATE_LIMIT_PER_MINUTE

    # Очищаем старые записи
    key = f"{client_ip}:{path.split('/')[3] if len(path.split('/')) > 3 else 'root'}"
    _rate_limit_store[key] = [t for t in _rate_limit_store[key] if now - t < window]

    # Проверяем лимит
    if len(_rate_limit_store[key]) >= limit:
        logger.warning(
            "Rate limit exceeded",
            ip=client_ip,
            path=path,
            count=len(_rate_limit_store[key]),
            limit=limit,
        )
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "detail": "Превышен лимит запросов. Попробуйте позже.",
                "retry_after": 60,
            },
            headers={"Retry-After": "60"},
        )

    # Записываем запрос
    _rate_limit_store[key].append(now)

    # Обрабатываем запрос
    response: Response = await call_next(request)

    # Добавляем заголовки с информацией о лимите
    response.headers["X-RateLimit-Limit"] = str(limit)
    response.headers["X-RateLimit-Remaining"] = str(limit - len(_rate_limit_store[key]))

    return response


# ── Middleware для логирования запросов ────────────────────────
@app.middleware("http")
async def logging_middleware(request: Request, call_next: Callable) -> Response:
    """Логирование всех входящих запросов и ответов."""
    request_id = request.headers.get("X-Request-ID", f"req_{int(time.time() * 1000)}")
    start_time = time.time()

    # Добавляем контекст к логам
    structlog.contextvars.clear_contextvars()
    structlog.contextvars.bind_contextvars(
        request_id=request_id,
        method=request.method,
        path=request.url.path,
        client_ip=request.client.host if request.client else "unknown",
    )

    response: Response = await call_next(request)

    # Вычисляем время обработки
    process_time = round((time.time() - start_time) * 1000, 2)

    # Логируем только не-health запросы
    if request.url.path not in ("/health", "/nginx-health"):
        log_level = "info" if response.status_code < 400 else "warning"
        getattr(logger, log_level)(
            "HTTP запрос",
            status_code=response.status_code,
            process_time_ms=process_time,
        )

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = str(process_time)

    return response


# ── Обработчики ошибок ────────────────────────────────────────
@app.exception_handler(404)
async def not_found_handler(request: Request, exc) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={"detail": f"Эндпоинт {request.url.path} не найден"},
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error("Внутренняя ошибка сервера", error=str(exc), exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Внутренняя ошибка сервера. Мы уже работаем над устранением."},
    )


# ── Health Check ──────────────────────────────────────────────
@app.get("/health", tags=["Система"])
async def health_check():
    """
    Проверка работоспособности сервиса.
    Используется Nginx и Docker для healthcheck.
    """
    from datetime import datetime

    from app.database import get_database

    # Проверяем соединение с MongoDB
    try:
        db = get_database()
        await db.command("ping")
        db_status = "healthy"
    except Exception as e:
        logger.error("MongoDB недоступен", error=str(e))
        db_status = "unhealthy"

    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "database": db_status,
        "timestamp": datetime.now(UTC).isoformat(),
    }


@app.get("/", tags=["Система"])
async def root():
    """Корневой эндпоинт — информация об API."""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs" if settings.DEBUG else "Документация отключена в production",
        "health": "/health",
    }


# ── Отдача загруженных медиафайлов ────────────────────────────
Path("/app/media/products").mkdir(parents=True, exist_ok=True)
app.mount("/media", StaticFiles(directory="/app/media"), name="media")

# ── Подключение роутеров ──────────────────────────────────────

# Авторизация
from app.routers.auth import router as auth_router  # noqa: E402

app.include_router(auth_router)


# Публичный каталог
from app.routers.catalog import router as catalog_router  # noqa: E402

app.include_router(catalog_router)

# Публичные сертификаты товаров (UC-23)
from app.routers.catalog_certificates import router as catalog_certificates_router  # noqa: E402

app.include_router(catalog_certificates_router)

# Профиль пользователя
from app.routers.profile import router as profile_router  # noqa: E402

app.include_router(profile_router)

app.include_router(admin_export_router)

# Корзина — РЕАЛИЗОВАНА в Phase 2
from app.routers.cart import router as cart_router  # noqa: E402

app.include_router(cart_router)

# Заказы (клиент) — РЕАЛИЗОВАНЫ в Phase 2
from app.routers.orders import router as orders_router  # noqa: E402

app.include_router(orders_router)

# Документы (клиент) — РЕАЛИЗОВАНЫ в Phase 2
from app.routers.documents import router as documents_router  # noqa: E402

app.include_router(documents_router)

# Telegram webhook — РЕАЛИЗОВАН в Phase 4
from app.routers.telegram import router as telegram_router  # noqa: E402

app.include_router(telegram_router)

# Синхронизация с 1С — РЕАЛИЗОВАНА в Phase 4
from app.routers.sync import router as sync_router  # noqa: E402

app.include_router(sync_router)

# Админ: дашборд
from app.routers.admin.dashboard import router as admin_dashboard_router  # noqa: E402

app.include_router(admin_dashboard_router)

# Админ: товары и категории
from app.routers.admin.products import router as admin_products_router  # noqa: E402

app.include_router(admin_products_router)

# Админ: заказы — РЕАЛИЗОВАНЫ в Phase 2
from app.routers.admin.orders import router as admin_orders_router  # noqa: E402

app.include_router(admin_orders_router)

# Админ: клиенты
from app.routers.admin.clients import router as admin_clients_router  # noqa: E402

app.include_router(admin_clients_router)

# Админ: склад — РЕАЛИЗОВАН в Phase 3
from app.routers.admin.stock import router as admin_stock_router  # noqa: E402

app.include_router(admin_stock_router)

# Админ: финансы — РЕАЛИЗОВАНЫ в Phase 3
from app.routers.admin.finance import router as admin_finance_router  # noqa: E402

app.include_router(admin_finance_router)

# Админ: сертификаты — РЕАЛИЗОВАНЫ в Phase 3
from app.routers.admin.certificates import router as admin_certificates_router  # noqa: E402

app.include_router(admin_certificates_router)

# Админ: документы — РЕАЛИЗОВАНЫ в Phase 2-3
from app.routers.admin.documents import router as admin_documents_router  # noqa: E402

app.include_router(admin_documents_router)

# Админ: уведомления — РЕАЛИЗОВАНЫ в Phase 4
from app.routers.admin.notifications import router as admin_notifications_router  # noqa: E402

app.include_router(admin_notifications_router)

# Админ: настройки
from app.routers.admin.settings import router as admin_settings_router  # noqa: E402

app.include_router(admin_settings_router)

# ── v2 роутеры ────────────────────────────────────────────────

# Регулярные заказы (клиент)
from app.routers.standing_orders import router as standing_orders_router  # noqa: E402

app.include_router(standing_orders_router)

# Школьный блок (конструктор меню, КБЖУ)
from app.routers.schools import router as schools_router  # noqa: E402

app.include_router(schools_router)

# ЛК клиента: аналитика
from app.routers.account.analytics import router as account_analytics_router  # noqa: E402

app.include_router(account_analytics_router)

# Админ: поставщики
from app.routers.admin.suppliers import router as admin_suppliers_router  # noqa: E402

app.include_router(admin_suppliers_router)

# Админ: закупки и рекомендации
from app.routers.admin.procurement import router as admin_procurement_router  # noqa: E402

app.include_router(admin_procurement_router)

# Админ: госконтракты
from app.routers.admin.contracts import router as admin_contracts_router  # noqa: E402

app.include_router(admin_contracts_router)

# Админ: справочник блюд
from app.routers.admin.dishes import router as admin_dishes_router  # noqa: E402

app.include_router(admin_dishes_router)

# Админ: списания
from app.routers.admin.write_offs import router as admin_write_offs_router  # noqa: E402

app.include_router(admin_write_offs_router)

# Админ: логистика (маршрутные листы)
from app.routers.admin.logistics import router as admin_logistics_router  # noqa: E402

app.include_router(admin_logistics_router)

# Админ: тендеры
from app.routers.admin.tenders import router as admin_tenders_router  # noqa: E402

app.include_router(admin_tenders_router)

# Админ: аналитика
from app.routers.admin.analytics import router as admin_analytics_router  # noqa: E402

app.include_router(admin_analytics_router)

# Админ: CRM
from app.routers.admin.crm import router as admin_crm_router  # noqa: E402

app.include_router(admin_crm_router)

# Админ: напоминания
from app.routers.admin.reminders import router as admin_reminders_router  # noqa: E402

app.include_router(admin_reminders_router)

# UC-01: Подписка на уведомление о поступлении
from app.routers.catalog_waitlist import router as catalog_waitlist_router  # noqa: E402

app.include_router(catalog_waitlist_router)

# Админ: календарь
from app.routers.admin.calendar import router as admin_calendar_router  # noqa: E402

app.include_router(admin_calendar_router)

# Админ: ярлыки/этикетки (UC-22)
from app.routers.admin.labels import router as admin_labels_router  # noqa: E402

app.include_router(admin_labels_router)

logger.info(
    "Все роутеры подключены",
    router_count=34,
)

# UC-51: Бэкапы MongoDB
from app.routers.admin.backups import router as admin_backups_router  # noqa: E402

app.include_router(admin_backups_router)

# UC-46: SEO (sitemap.xml, robots.txt)
from app.routers.seo import router as seo_router  # noqa: E402

app.include_router(seo_router)


from app.routers.admin.export import router as admin_export_router  # noqa: E402

app.include_router(admin_export_router)
