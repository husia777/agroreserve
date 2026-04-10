"""
Celery задачи автоматической рассылки прайс-листа.

UC-17: Еженедельная отправка прайс-листа всем клиентам через Telegram.
"""

import asyncio

import structlog

from app.database import connect_to_mongo
from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)


def _run_async(coro):
    """Вспомогательная функция для запуска корутин в синхронном контексте Celery."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_closed():
            return asyncio.run(coro)
        return loop.run_until_complete(coro)
    except RuntimeError:
        return asyncio.run(coro)


def _format_price(price: float) -> str:
    """Форматирует цену для прайс-листа."""
    if price == int(price):
        return f"{int(price):,}".replace(",", " ")
    return f"{price:,.2f}".replace(",", " ")


@celery_app.task(
    name="app.tasks.autoprice_tasks.send_pricelist_telegram",
    queue="notifications",
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def send_pricelist_telegram(self) -> dict:
    """
    UC-17: Еженедельная рассылка прайс-листа клиентам через Telegram.

    Выполняется каждую пятницу (настраивается в Celery Beat).

    Алгоритм:
    1. Собрать текущие цены всех активных товаров
    2. Сгруппировать по категориям
    3. Сформировать текстовый прайс-лист
    4. Отправить всем клиентам с привязанным telegram_chat_id

    Формат прайс-листа:
    🌿 АГРОРЕЗЕРВ — Прайс-лист
    📅 [Дата]

    🥕 Овощи
    • Картофель — 35 ₽/кг
    • Морковь — 45 ₽/кг
    ...
    """

    async def _execute() -> dict:
        from app.database import connect_to_mongo

        await connect_to_mongo()

        from datetime import datetime, timezone

        from app.config import settings
        from app.models.product import Category, Product
        from app.models.user import User, UserRole
        from app.utils.telegram_bot import send_message

        now = datetime.now(timezone.utc)
        date_str = now.strftime("%d.%m.%Y")

        clients_sent = 0
        clients_failed = 0
        products_count = 0

        # ── 1. Собираем активные товары ───────────────────────
        products = (
            await Product.find(
                Product.is_active == True,  # noqa: E712
            )
            .sort(Product.name)
            .to_list()
        )

        if not products:
            logger.warning("Нет активных товаров для прайс-листа")
            return {
                "status": "ok",
                "date": date_str,
                "products_count": 0,
                "clients_sent": 0,
                "clients_failed": 0,
            }

        products_count = len(products)

        # ── 2. Группируем по категориям ───────────────────────
        # Собираем категории
        category_ids = list(
            {str(p.category_id.id) if hasattr(p.category_id, "id")
             else str(p.category_id) for p in products}
        )
        categories: dict = {}

        for cat_id in category_ids:
            try:
                from beanie import PydanticObjectId

                cat = await Category.get(PydanticObjectId(cat_id))
                if cat:
                    categories[cat_id] = cat.name
                else:
                    categories[cat_id] = "Прочее"
            except Exception:
                categories[cat_id] = "Прочее"

        # Группируем товары по категориям
        grouped: dict = {}
        for product in products:
            cat_id = str(product.category_id.id) if hasattr(
                product.category_id, "id") else str(product.category_id)
            cat_name = categories.get(cat_id, "Прочее")
            if cat_name not in grouped:
                grouped[cat_name] = []
            grouped[cat_name].append(product)

        # ── 3. Формируем прайс-лист ───────────────────────────
        lines = [
            f"🌿 <b>АГРОРЕЗЕРВ — Прайс-лист</b>",
            f"📅 {date_str}",
            "",
            "Актуальные цены на оптовую поставку:",
            "",
        ]

        # Эмодзи для категорий
        category_emojis = {
            "Овощи": "🥕",
            "Фрукты": "🍎",
            "Сухофрукты": "🍇",
            "Орехи": "🥜",
            "Специи": "🌶",
            "Мёд": "🍯",
            "Масла": "🫙",
            "Зелень": "🌿",
        }

        for cat_name, cat_products in sorted(grouped.items()):
            emoji = next((v for k, v in category_emojis.items()
                         if k.lower() in cat_name.lower()), "📦")
            lines.append(f"{emoji} <b>{cat_name}</b>")

            for product in cat_products:
                price = product.price_wholesale
                unit = product.unit.value if hasattr(
                    product.unit, "value") else product.unit
                if product.stock_qty > 0:
                    lines.append(
                        f"  • {product.name} — {_format_price(price)} ₽/{unit}")
                else:
                    lines.append(
                        f"  • {product.name} — {_format_price(price)} ₽/{unit} (нет в наличии)")

            lines.append("")

        lines.extend(
            [
                "💬 Для заказа отвечайте на это сообщение",
                "📱 или звоните: " +
                    (settings.TELEGRAM_ADMIN_CHAT_ID and "+7 (xxx) xxx-xx-xx" or "+7 (xxx) xxx-xx-xx"),
                "",
                "🚚 Бесплатная доставка по Тобольску",
                "📑 Полный пакет документов (ТОРГ-12, счёт, декларации)",
            ]
        )

        pricelist_text = "\n".join(lines)

        # ── 4. Рассылаем клиентам ─────────────────────────────
        clients = await User.find(
            User.role == UserRole.CLIENT,
            {"telegram_chat_id": {"$ne": None, "$exists": True}},
        ).to_list()

        for client in clients:
            if not client.telegram_chat_id:
                continue

            # Персонализируем приветствие для B2B
            personal_header = ""
            if client.organization:
                personal_header = f"Здравствуйте, {client.name}!\n\n"

            full_message = personal_header + pricelist_text

            try:
                success = await send_message(client.telegram_chat_id, full_message)
                if success:
                    clients_sent += 1
                    logger.debug(
                        "Прайс-лист отправлен клиенту",
                        client_id=str(client.id),
                        client_name=client.name,
                    )
                else:
                    clients_failed += 1
                    logger.warning(
                        "Не удалось отправить прайс-лист клиенту",
                        client_id=str(client.id),
                    )
            except Exception as e:
                clients_failed += 1
                logger.error(
                    "Ошибка отправки прайс-листа клиенту",
                    client_id=str(client.id),
                    error=str(e),
                )

        result = {
            "status": "ok",
            "date": date_str,
            "products_count": products_count,
            "clients_sent": clients_sent,
            "clients_failed": clients_failed,
        }

        logger.info(
            "Рассылка прайс-листа завершена",
            products_count=products_count,
            clients_sent=clients_sent,
            clients_failed=clients_failed,
        )

        return result

    try:
        return dict(_run_async(_execute()))
    except Exception as exc:
        logger.error("Ошибка задачи send_pricelist_telegram", error=str(exc))
        raise self.retry(exc=exc)
