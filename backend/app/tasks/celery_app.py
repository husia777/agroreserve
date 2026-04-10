"""
Инициализация Celery приложения.
Брокер: Redis
Backend: Redis (для хранения результатов задач)
"""

from celery import Celery
from celery.schedules import crontab

from app.config import settings

# ── Создание Celery приложения ─────────────────────────────────
celery_app = Celery(
    "agroreserve",
    broker=settings.REDIS_URI,
    backend=settings.REDIS_URI,
    include=[
        "app.tasks.sync_tasks",
        "app.tasks.notification_tasks",
        "app.tasks.backup_tasks",
        # v2 задачи
        "app.tasks.certificate_tasks",
        "app.tasks.autoprice_tasks",
        "app.tasks.standing_order_tasks",
        "app.tasks.reminder_tasks",
    ],
)

# ── Конфигурация Celery ────────────────────────────────────────
celery_app.conf.update(
    # Сериализация
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    # Часовой пояс
    timezone="Europe/Moscow",
    enable_utc=True,
    # Очереди
    task_default_queue="default",
    task_queues={
        "default": {"exchange": "default", "routing_key": "default"},
        "notifications": {"exchange": "notifications", "routing_key": "notifications"},
        "sync": {"exchange": "sync", "routing_key": "sync"},
    },
    # Повторные попытки
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_max_retries=3,
    task_default_retry_delay=60,  # 1 минута
    # Время жизни результата задачи — 1 день
    result_expires=86400,
)

# ── Расписание периодических задач (Celery Beat) ──────────────
celery_app.conf.beat_schedule = {
    # Синхронизация остатков с 1С каждые 5 минут
    "sync-stock-from-1c": {
        "task": "app.tasks.sync_tasks.sync_stock_from_1c",
        "schedule": crontab(minute=f"*/{settings.SYNC_1C_INTERVAL_MINUTES}"),
        "options": {"queue": "sync"},
    },
    # Обновление статусов сертификатов ежедневно в 06:00
    "update-certificate-statuses": {
        "task": "app.tasks.notification_tasks.update_certificate_statuses",
        "schedule": crontab(hour=6, minute=0),
        "options": {"queue": "default"},
    },
    # Проверка просроченной дебиторки ежедневно в 08:00
    "check-overdue-debts": {
        "task": "app.tasks.notification_tasks.check_overdue_debts",
        "schedule": crontab(hour=8, minute=0),
        "options": {"queue": "notifications"},
    },
    # Создание повторяющихся расходов в начале месяца
    "create-recurring-expenses": {
        "task": "app.tasks.sync_tasks.create_recurring_expenses",
        "schedule": crontab(day_of_month=1, hour=0, minute=5),
        "options": {"queue": "default"},
    },
    # Бэкап MongoDB ежедневно в 03:00
    "daily-mongodb-backup": {
        "task": "app.tasks.backup_tasks.create_mongodb_backup",
        "schedule": crontab(hour=3, minute=0),
        "options": {"queue": "default"},
    },
    # ── v2: Новые задачи ──────────────────────────────────────
    # UC-26: Проверка сроков сертификатов ежедневно в 07:00
    # (при просрочке — автоблокировка товаров + уведомление администратора)
    "check-expiring-certificates": {
        "task": "app.tasks.certificate_tasks.check_expiring_certificates",
        "schedule": crontab(hour=7, minute=0),
        "options": {"queue": "default"},
    },
    # UC-17: Рассылка прайс-листа каждую пятницу в 10:00
    "send-pricelist-telegram": {
        "task": "app.tasks.autoprice_tasks.send_pricelist_telegram",
        "schedule": crontab(day_of_week=5, hour=10, minute=0),  # 5 = пятница
        "options": {"queue": "notifications"},
    },
    # UC-29: Генерация регулярных заказов ежедневно в 06:00
    "generate-standing-orders": {
        "task": "app.tasks.standing_order_tasks.generate_standing_orders",
        "schedule": crontab(hour=6, minute=0),
        "options": {"queue": "default"},
    },
    # UC-53: Проверка напоминаний каждый час (в 0 минут)
    "check-reminders": {
        "task": "app.tasks.reminder_tasks.check_reminders",
        "schedule": crontab(minute=0),  # Каждый час
        "options": {"queue": "notifications"},
    },
}
