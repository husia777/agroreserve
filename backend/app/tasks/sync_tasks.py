"""
Celery задачи синхронизации с 1С и периодические задачи.
"""
import asyncio
import structlog
from celery import Task

from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)


def _run_async(coro):
    """Вспомогательная функция для запуска корутин в синхронном контексте Celery."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                future = pool.submit(asyncio.run, coro)
                return future.result()
        else:
            return loop.run_until_complete(coro)
    except RuntimeError:
        return asyncio.run(coro)


@celery_app.task(
    name="app.tasks.sync_tasks.sync_stock_from_1c",
    queue="sync",
    bind=True,
    max_retries=3,
    default_retry_delay=120,
)
def sync_stock_from_1c(self: Task) -> dict:
    """
    Периодическая синхронизация остатков из 1С (каждые 5 минут).

    В реальной реализации:
    1. GET {ODATA_1C_URL}/AccumulationRegister_ОстаткиНоменклатуры
    2. Обновить stock_qty товаров
    3. Проверить мин. остатки → уведомление
    4. Записать в sync_log

    Пока: заглушка с логированием.
    """
    from app.config import settings

    logger.info("Синхронизация остатков из 1С запущена")

    if not settings.ODATA_1C_URL:
        logger.debug("1С OData URL не настроен, синхронизация пропущена")
        return {"status": "skipped", "reason": "1С не настроен"}

    # TODO (Phase 4): Реализовать реальный запрос к 1С OData
    # Пример запроса:
    # GET {ODATA_1C_URL}/AccumulationRegister_ОстаткиНоменклатуры/Balance?
    #     $format=json&$select=Номенклатура_Key,КоличествоОстаток

    logger.info("ЗАГЛУШКА: 1С OData синхронизация остатков")
    return {"status": "stub", "message": "Настройте ODATA_1C_URL для реальной синхронизации"}


@celery_app.task(
    name="app.tasks.sync_tasks.create_recurring_expenses",
    queue="default",
)
def create_recurring_expenses() -> dict:
    """
    Автосоздание повторяющихся расходов в начале месяца.

    Ищет расходы с is_recurring=True и создаёт новые записи
    с датой 1-го числа текущего месяца.
    """
    async def _execute():
        from datetime import date, datetime, timezone

        from app.database import get_database
        # Инициализация Beanie для работы в Celery контексте
        try:
            from app.models.finance import Expense, ExpenseCategory
        except Exception as e:
            logger.error("Ошибка импорта моделей в Celery", error=str(e))
            return {"status": "error", "error": str(e)}

        today = date.today()
        first_day = today.replace(day=1)

        # Проверяем, уже созданы ли повторяющиеся расходы за этот месяц
        existing_count = await Expense.find(
            Expense.is_recurring == True,  # noqa: E712
            {"date": {"$gte": first_day, "$lt": today}},
        ).count()

        if existing_count > 0:
            logger.debug(
                "Повторяющиеся расходы за месяц уже созданы",
                count=existing_count,
                month=str(first_day),
            )
            return {"status": "skipped", "already_exists": existing_count}

        # Ищем шаблоны повторяющихся расходов из предыдущего месяца
        from datetime import timedelta
        last_month_end = first_day - timedelta(days=1)
        last_month_start = last_month_end.replace(day=1)

        templates = await Expense.find(
            Expense.is_recurring == True,  # noqa: E712
            {"date": {"$gte": last_month_start, "$lte": last_month_end}},
        ).to_list()

        created = 0
        for template in templates:
            new_expense = Expense(
                date=first_day,
                category=template.category,
                description=template.description,
                amount=template.amount,
                is_recurring=True,
                recurring_day=template.recurring_day,
                receipt_photo=None,
                created_by="system",
            )
            await new_expense.insert()
            created += 1

        logger.info(
            "Повторяющиеся расходы созданы",
            count=created,
            month=str(first_day),
        )
        return {"status": "ok", "created": created}

    try:
        return _run_async(_execute())
    except Exception as e:
        logger.error("Ошибка создания повторяющихся расходов", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(
    name="app.tasks.sync_tasks.push_new_orders_to_1c",
    queue="sync",
    max_retries=3,
    default_retry_delay=300,
)
def push_new_orders_to_1c() -> dict:
    """
    Отправляет новые несинхронизированные заказы в 1С.
    Запускается каждые 5 минут вместе с sync_stock_from_1c.
    """
    from app.config import settings

    if not settings.ODATA_1C_URL:
        return {"status": "skipped"}

    logger.info("ЗАГЛУШКА: Передача новых заказов в 1С")
    return {"status": "stub"}
