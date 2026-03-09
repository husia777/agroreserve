"""
Celery задачи для напоминаний.

UC-53: Ежечасная проверка напоминаний и отправка уведомлений.
"""
import asyncio
from datetime import datetime, timezone

import structlog

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


@celery_app.task(
    name="app.tasks.reminder_tasks.check_reminders",
    queue="notifications",
    bind=True,
    max_retries=3,
    default_retry_delay=30,
)
def check_reminders(self) -> dict:
    """
    UC-53: Ежечасная проверка напоминаний.

    Алгоритм:
    1. Найти напоминания где remind_at <= now и is_completed = False
    2. Отправить уведомление через Telegram (и email если настроен)
    3. Помечать как отправленные (НЕ как выполненные — пользователь сам отмечает)

    Напоминания не удаляются автоматически — остаются как невыполненные
    до явного подтверждения администратором.
    """
    async def _execute() -> dict:
        from app.database import init_db
        await init_db()

        from app.models.reminder import Reminder
        from app.config import settings
        from app.utils.telegram_bot import send_message

        now = datetime.now(timezone.utc)
        result = {
            "status": "ok",
            "checked_at": now.isoformat(),
            "reminders_found": 0,
            "notifications_sent": 0,
            "errors": [],
        }

        # Находим просроченные невыполненные напоминания
        due_reminders = await Reminder.find(
            Reminder.remind_at <= now,      # type: ignore
            Reminder.is_completed == False, # noqa: E712
        ).sort(Reminder.remind_at).to_list()

        result["reminders_found"] = len(due_reminders)

        if not due_reminders:
            return result

        # Проверяем, что есть Telegram администратора
        if not settings.TELEGRAM_ADMIN_CHAT_ID:
            logger.warning("TELEGRAM_ADMIN_CHAT_ID не настроен, уведомления не отправлены")
            return result

        for reminder in due_reminders:
            try:
                # Формируем сообщение
                overdue_minutes = int((now - reminder.remind_at).total_seconds() / 60)

                if overdue_minutes < 60:
                    overdue_text = f"{overdue_minutes} мин. назад"
                elif overdue_minutes < 1440:
                    overdue_text = f"{overdue_minutes // 60} ч. назад"
                else:
                    overdue_text = f"{overdue_minutes // 1440} дн. назад"

                lines = [
                    f"🔔 <b>Напоминание</b> ({overdue_text})",
                    "",
                    f"<b>{reminder.title}</b>",
                ]

                if reminder.description:
                    lines.append(f"\n{reminder.description}")

                if reminder.related_type:
                    type_labels = {
                        "contract": "Контракт",
                        "certificate": "Сертификат",
                        "tender": "Тендер",
                        "payment": "Оплата",
                    }
                    label = type_labels.get(reminder.related_type, reminder.related_type)
                    lines.append(f"\n📎 Связано с: {label}")

                if reminder.is_recurring and reminder.recurrence_rule:
                    rule_labels = {
                        "daily": "ежедневно",
                        "weekly": "еженедельно",
                        "monthly": "ежемесячно",
                    }
                    rule_label = rule_labels.get(reminder.recurrence_rule, reminder.recurrence_rule)
                    lines.append(f"🔁 Повтор: {rule_label}")

                message = "\n".join(lines)

                # Отправляем в Telegram администратору
                success = await send_message(settings.TELEGRAM_ADMIN_CHAT_ID, message)

                if success:
                    result["notifications_sent"] += 1
                    logger.info(
                        "Уведомление о напоминании отправлено",
                        reminder_id=str(reminder.id),
                        title=reminder.title,
                    )
                else:
                    result["errors"].append({
                        "reminder_id": str(reminder.id),
                        "error": "Telegram не отправил сообщение",
                    })

            except Exception as e:
                logger.error(
                    "Ошибка отправки уведомления о напоминании",
                    reminder_id=str(reminder.id),
                    error=str(e),
                )
                result["errors"].append({
                    "reminder_id": str(reminder.id),
                    "error": str(e),
                })

        logger.info(
            "Проверка напоминаний завершена",
            found=result["reminders_found"],
            sent=result["notifications_sent"],
            errors=len(result["errors"]),
        )

        return result

    try:
        return _run_async(_execute())
    except Exception as exc:
        logger.error("Ошибка задачи check_reminders", error=str(exc))
        raise self.retry(exc=exc)
