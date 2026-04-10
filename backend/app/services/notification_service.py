"""
Сервис уведомлений — создание и отправка уведомлений через все каналы.

Уведомления сохраняются в MongoDB коллекцию notifications.
Реальная отправка (Telegram, Email) происходит через Celery задачи.
"""

from typing import Optional

import structlog

from app.models.notification import Notification, NotificationChannel, NotificationType

logger = structlog.get_logger(__name__)


async def send_notification(
    user_id: str,
    channel: NotificationChannel,
    notification_type: NotificationType,
    title: str,
    message: str,
    related_id: Optional[str] = None,
    related_type: Optional[str] = None,
    action_url: Optional[str] = None,
    action_label: Optional[str] = None,
) -> Notification:
    """
    Создаёт уведомление в базе данных и инициирует отправку через канал.

    Args:
        user_id: ID получателя
        channel: Канал доставки (telegram, email, system)
        notification_type: Тип уведомления
        title: Заголовок
        message: Текст уведомления
        related_id: ID связанного объекта (заказ, товар)
        related_type: Тип связанного объекта
        action_url: URL для перехода
        action_label: Текст кнопки действия

    Returns:
        Созданный объект Notification
    """
    notification = Notification(
        user_id=user_id,
        notification_type=notification_type,
        channel=channel,
        title=title,
        message=message,
        related_id=related_id,
        related_type=related_type,
        action_url=action_url,
        action_label=action_label,
    )
    await notification.insert()

    logger.info(
        "Уведомление создано",
        user_id=user_id,
        type=notification_type,
        channel=channel,
        title=title,
    )

    # Асинхронная отправка через Celery (если канал — Telegram или Email)
    if channel in (NotificationChannel.TELEGRAM, NotificationChannel.EMAIL):
        try:
            from app.tasks.notification_tasks import send_notification_task

            send_notification_task.delay(str(notification.id))
        except Exception as e:
            logger.warning(
                "Не удалось поставить задачу отправки уведомления в очередь",
                error=str(e),
                notification_id=str(notification.id),
            )

    return notification


async def notify_admin_new_order(order) -> None:
    """
    Уведомление администратору о новом заказе.
    Отправляется через Telegram и сохраняется в системе.
    """
    from app.models.user import User, UserRole

    # Находим всех администраторов
    admins = await User.find(User.role == UserRole.ADMIN).to_list()

    title = f"Новый заказ {order.order_number}"
    message = (
        f"📦 Новый заказ от {order.client_name}\n"
        f"Сумма: {order.total:,.0f} ₽\n"
        f"Дата доставки: {order.delivery_date}\n"
        f"Слот: {order.delivery_slot}\n"
        f"Адрес: {order.delivery_address}"
    )

    for admin in admins:
        # Системное уведомление (в интерфейсе)
        await send_notification(
            user_id=str(admin.id),
            channel=NotificationChannel.SYSTEM,
            notification_type=NotificationType.ORDER_NEW,
            title=title,
            message=message,
            related_id=str(order.id),
            related_type="order",
            action_url=f"/admin/orders/{order.id}",
            action_label="Открыть заказ",
        )

        # Telegram уведомление (если настроено)
        if admin.telegram_chat_id and admin.notification_channels.telegram:
            await send_notification(
                user_id=str(admin.id),
                channel=NotificationChannel.TELEGRAM,
                notification_type=NotificationType.ORDER_NEW,
                title=title,
                message=message,
                related_id=str(order.id),
                related_type="order",
            )

    logger.info(
        "Уведомление о новом заказе отправлено администраторам",
        order_number=order.order_number,
        admins_count=len(admins),
    )


async def notify_client_status_change(order, new_status: str) -> None:
    """
    Уведомление клиенту об изменении статуса заказа.
    """
    # Получаем ID клиента (может быть Link или строка)
    if hasattr(order.client_id, "id"):
        client_id = str(order.client_id.id)
    else:
        client_id = str(order.client_id)

    # Человекочитаемые статусы
    status_names = {
        "new": "Новый",
        "confirmed": "Подтверждён",
        "assembling": "Собирается",
        "assembled": "Собран, готов к отгрузке",
        "delivering": "В пути",
        "delivered": "Доставлен",
        "cancelled": "Отменён",
    }
    status_display = status_names.get(new_status, new_status)

    title = f"Заказ {order.order_number}: {status_display}"
    message = f"Статус вашего заказа {order.order_number} изменён: {status_display}\n" f"Сумма: {order.total:,.0f} ₽"

    if new_status == "delivering":
        message += f"\nОжидаемое время доставки: {order.delivery_slot}"
    elif new_status == "delivered":
        message += "\nСпасибо за покупку! Документы доступны в личном кабинете."
    elif new_status == "cancelled":
        message += "\nЕсли у вас есть вопросы — свяжитесь с нами."

    await send_notification(
        user_id=client_id,
        channel=NotificationChannel.SYSTEM,
        notification_type=NotificationType.ORDER_STATUS,
        title=title,
        message=message,
        related_id=str(order.id),
        related_type="order",
        action_url=f"/account/orders/{order.id}",
        action_label="Открыть заказ",
    )

    # Telegram клиенту (если привязан)
    try:
        from app.models.user import User

        client = await User.get(client_id)
        if client and client.telegram_chat_id and client.notification_channels.telegram:
            await send_notification(
                user_id=client_id,
                channel=NotificationChannel.TELEGRAM,
                notification_type=NotificationType.ORDER_STATUS,
                title=title,
                message=message,
                related_id=str(order.id),
                related_type="order",
            )
    except Exception as e:
        logger.warning("Не удалось отправить Telegram уведомление клиенту", error=str(e))


async def notify_admin_low_stock(products: list) -> None:
    """
    Уведомление администратору о низких остатках товаров.
    """
    from app.models.user import User, UserRole

    if not products:
        return

    admins = await User.find(User.role == UserRole.ADMIN).to_list()

    products_text = "\n".join(
        f"• {p['name']}: {p['stock_qty']:.1f} {p['unit']} (мин: {p['min_stock_qty']:.1f})" for p in products[:10]
    )

    title = f"⚠️ Низкие остатки: {len(products)} товаров"
    message = f"Следующие товары ниже минимального остатка:\n\n{products_text}"

    for admin in admins:
        await send_notification(
            user_id=str(admin.id),
            channel=NotificationChannel.SYSTEM,
            notification_type=NotificationType.STOCK_LOW,
            title=title,
            message=message,
            action_url="/admin/stock",
            action_label="Открыть склад",
        )


async def notify_admin_credit_limit(client) -> None:
    """
    Уведомление администратору о достижении клиентом кредитного лимита.
    """
    from app.models.user import User, UserRole

    admins = await User.find(User.role == UserRole.ADMIN).to_list()

    title = f"Кредитный лимит: {client.name}"
    message = (
        f"Клиент {client.name} достиг кредитного лимита.\n"
        f"Задолженность: {client.current_debt:,.0f} ₽\n"
        f"Лимит: {client.credit_limit:,.0f} ₽\n"
        f"Новые заказы заблокированы до погашения задолженности."
    )

    for admin in admins:
        await send_notification(
            user_id=str(admin.id),
            channel=NotificationChannel.SYSTEM,
            notification_type=NotificationType.CREDIT_LIMIT,
            title=title,
            message=message,
            related_id=str(client.id),
            related_type="user",
            action_url=f"/admin/clients/{client.id}",
            action_label="Открыть клиента",
        )
