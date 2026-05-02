"""
Celery задачи уведомлений.
Отложенная отправка уведомлений через Telegram и Email.
"""

import asyncio
from datetime import UTC

import structlog
from celery import Task

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
    name="app.tasks.notification_tasks.send_notification_task",
    queue="notifications",
    bind=True,
    max_retries=3,
    default_retry_delay=30,
)
def send_notification_task(self: Task, notification_id: str) -> dict:
    """
    Отправляет уведомление через указанный канал (Telegram/Email).

    Args:
        notification_id: ID уведомления из коллекции notifications
    """

    async def _execute():
        from datetime import datetime

        from beanie import PydanticObjectId

        from app.models.notification import Notification, NotificationChannel
        from app.models.user import User

        notification = await Notification.get(PydanticObjectId(notification_id))
        if not notification:
            logger.warning("Уведомление не найдено", notification_id=notification_id)
            return {"status": "not_found"}

        if notification.is_sent:
            return {"status": "already_sent"}

        user = await User.get(PydanticObjectId(notification.user_id))
        if not user:
            logger.warning("Пользователь не найден для уведомления", user_id=notification.user_id)
            return {"status": "user_not_found"}

        success = False
        error_msg = None

        if notification.channel == NotificationChannel.TELEGRAM:
            if user.telegram_chat_id:
                from app.utils.telegram_bot import send_message

                text = f"<b>{notification.title}</b>\n\n{notification.message}"
                success = await send_message(user.telegram_chat_id, text)
            else:
                logger.debug(
                    "Telegram chat_id не привязан",
                    user_id=notification.user_id,
                )
                success = False
                error_msg = "Telegram не привязан"

        elif notification.channel == NotificationChannel.EMAIL:
            if user.email:
                from app.utils.email_sender import send_email

                # Формируем HTML с кнопкой действия (если есть)
                action_html = ""
                if notification.action_url and notification.action_label:
                    action_html = (
                        f'<p style="margin-top:24px">'
                        f'<a href="https://agroreserve.ru{notification.action_url}" '
                        f'style="background:#16A34A;color:#fff;padding:10px 20px;'
                        f'text-decoration:none;border-radius:6px;display:inline-block;">'
                        f"{notification.action_label}</a></p>"
                    )

                body_html = (
                    f'<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">'
                    f'<h2 style="color:#16A34A">{notification.title}</h2>'
                    f'<div style="white-space:pre-wrap;line-height:1.6;color:#374151">'
                    f"{notification.message}</div>"
                    f"{action_html}"
                    f'<hr style="margin-top:32px;border:none;border-top:1px solid #E5E7EB">'
                    f'<p style="color:#9CA3AF;font-size:12px">'
                    f"Агрорезерв — оптовая поставка овощей и фруктов<br>"
                    f"Это автоматическое уведомление, не отвечайте на него.</p>"
                    f"</div>"
                )

                success = send_email(
                    to=user.email,
                    subject=notification.title,
                    body_text=f"{notification.title}\n\n{notification.message}",
                    body_html=body_html,
                )
                if not success:
                    error_msg = "Ошибка SMTP"
            else:
                error_msg = "Email не указан"

        # Обновляем статус уведомления
        notification.is_sent = success
        notification.sent_at = datetime.now(UTC) if success else None
        notification.send_error = error_msg if not success else None
        await notification.save()

        return {"status": "ok" if success else "failed", "error": error_msg}

    try:
        return dict(_run_async(_execute()))
    except Exception as e:
        logger.error(
            "Ошибка задачи отправки уведомления",
            notification_id=notification_id,
            error=str(e),
        )
        try:
            raise self.retry(exc=e)
        except Exception:
            return {"status": "error", "error": str(e)}


@celery_app.task(
    name="app.tasks.notification_tasks.update_certificate_statuses",
    queue="default",
)
def update_certificate_statuses() -> dict:
    """
    Ежедневное обновление статусов сертификатов и уведомление об истекающих.
    Запускается в 06:00 ежедневно.
    """

    async def _execute():
        from datetime import date

        from app.models.certificate import Certificate, CertificateStatus

        today = date.today()
        all_certs = await Certificate.find_all().to_list()

        updated = 0
        expiring_soon = []
        expired_list = []

        for cert in all_certs:
            new_status = cert.recalculate_status()
            if new_status != cert.status:
                cert.status = new_status
                await cert.save()
                updated += 1

            if new_status == CertificateStatus.EXPIRING_SOON:
                days_left = (cert.expiry_date - today).days
                expiring_soon.append(
                    {
                        "number": cert.number,
                        "expiry_date": str(cert.expiry_date),
                        "days_left": days_left,
                        "product_ids": cert.product_ids,
                    }
                )
            elif new_status == CertificateStatus.EXPIRED:
                expired_list.append(cert.number)

        # Уведомляем администратора об истекающих сертификатах
        if expiring_soon or expired_list:
            message_parts = []
            if expiring_soon:
                certs_text = "\n".join(
                    f"• {c['number']}: истекает {c['expiry_date']} (осталось {c['days_left']} дн.)"
                    for c in expiring_soon
                )
                message_parts.append(f"Истекают скоро:\n{certs_text}")

            if expired_list:
                message_parts.append("Просрочены:\n" + "\n".join(f"• {n}" for n in expired_list))

            notification_message = "\n\n".join(message_parts)

            try:
                from app.models.notification import NotificationChannel, NotificationType
                from app.models.user import User, UserRole
                from app.services.notification_service import send_notification

                admins = await User.find(User.role == UserRole.ADMIN).to_list()
                for admin in admins:
                    await send_notification(
                        user_id=str(admin.id),
                        channel=NotificationChannel.SYSTEM,
                        notification_type=NotificationType.CERTIFICATE_EXPIRY,
                        title=f"⚠️ Сертификаты: {len(expiring_soon)} истекают, {len(expired_list)} просрочены",
                        message=notification_message,
                        action_url="/admin/certificates",
                        action_label="Открыть сертификаты",
                    )
            except Exception as e:
                logger.warning("Ошибка уведомления о сертификатах", error=str(e))

        logger.info(
            "Статусы сертификатов обновлены",
            updated=updated,
            expiring_soon=len(expiring_soon),
            expired=len(expired_list),
        )

        return {
            "status": "ok",
            "updated": updated,
            "expiring_soon": len(expiring_soon),
            "expired": len(expired_list),
        }

    try:
        return dict(_run_async(_execute()))
    except Exception as e:
        logger.error("Ошибка задачи обновления статусов сертификатов", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(
    name="app.tasks.notification_tasks.check_overdue_debts",
    queue="notifications",
)
def check_overdue_debts() -> dict:
    """
    Ежедневная проверка просроченной дебиторской задолженности.
    Запускается в 08:00 ежедневно.

    Если долг > 0 у клиента со статусом approved — проверяем дату последнего заказа.
    """

    async def _execute():
        from app.models.user import ClientType, User, UserStatus

        clients_with_debt = await User.find(
            User.client_type == ClientType.B2B,
            User.status == UserStatus.APPROVED,
            User.current_debt > 0,
        ).to_list()

        notified = 0
        for client in clients_with_debt:
            # Ищем давно неоплаченные заказы
            from datetime import datetime, timedelta

            from app.models.order import Order, OrderStatus, PaymentStatus

            cutoff = datetime.now(UTC) - timedelta(days=30)
            overdue_orders = await Order.find(
                {"client_id.$id": client.id},
                Order.payment_status == PaymentStatus.PENDING,
                Order.status == OrderStatus.DELIVERED,
                Order.created_at < cutoff,
            ).count()

            if overdue_orders > 0:
                logger.warning(
                    "Просроченная дебиторка",
                    client_id=str(client.id),
                    client_name=client.name,
                    debt=client.current_debt,
                    overdue_orders=overdue_orders,
                )
                notified += 1

        logger.info(
            "Проверка просроченных долгов завершена",
            checked=len(clients_with_debt),
            overdue_clients=notified,
        )

        return {"status": "ok", "checked": len(clients_with_debt), "overdue": notified}

    try:
        return dict(_run_async(_execute()))
    except Exception as e:
        logger.error("Ошибка задачи проверки долгов", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(
    name="app.tasks.notification_tasks.check_low_stock",
    queue="notifications",
)
def check_low_stock() -> dict:
    """
    Ежедневная проверка низких остатков.
    Находит все активные товары, у которых stock_qty <= min_stock_qty,
    и шлёт уведомление администратору (система + email).
    """

    async def _execute():
        from app.models.product import Product

        # Берём только активные товары с заданным min_stock_qty > 0
        products = await Product.find(
            {
                "is_active": True,
                "min_stock_qty": {"$gt": 0},
                "$expr": {"$lte": ["$stock_qty", "$min_stock_qty"]},
            }
        ).to_list()

        if not products:
            logger.info("Проверка низких остатков: всё в норме")
            return {"status": "ok", "low_count": 0}

        # Формируем список для уведомления
        products_data = [
            {
                "name": p.name,
                "stock_qty": p.stock_qty,
                "min_stock_qty": p.min_stock_qty,
                "unit": p.unit,
            }
            for p in products
        ]

        from app.services.notification_service import notify_admin_low_stock

        await notify_admin_low_stock(products_data)

        logger.info(
            "Проверка низких остатков: отправлено уведомление",
            low_count=len(products),
            products=[p["name"] for p in products_data[:5]],
        )
        return {"status": "ok", "low_count": len(products)}

    try:
        return dict(_run_async(_execute()))
    except Exception as e:
        logger.error("Ошибка проверки низких остатков", error=str(e))
        return {"status": "error", "error": str(e)}
