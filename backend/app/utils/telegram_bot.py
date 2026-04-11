"""
Утилиты Telegram Bot.

Отправка уведомлений через Telegram Bot API.
Webhook handler для приёма сообщений от пользователей.
"""

from typing import Optional

import structlog

logger = structlog.get_logger(__name__)


async def send_message(chat_id: str, text: str, parse_mode: str = "HTML") -> bool:
    """
    Отправляет сообщение в Telegram чат.

    Args:
        chat_id: ID чата Telegram
        text: Текст сообщения (поддерживает HTML/Markdown)
        parse_mode: 'HTML' или 'Markdown'

    Returns:
        True при успехе, False при ошибке
    """
    from app.config import settings

    if not settings.TELEGRAM_BOT_TOKEN:
        logger.debug("Telegram токен не настроен, пропускаем отправку")
        return False

    if not chat_id:
        logger.warning("Telegram chat_id не задан")
        return False

    import httpx

    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": parse_mode,
        "disable_web_page_preview": True,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload)
            data = response.json()

            if response.status_code == 200 and data.get("ok"):
                logger.debug(
                    "Telegram сообщение отправлено",
                    chat_id=chat_id,
                    message_id=data.get("result", {}).get("message_id"),
                )
                return True
            logger.warning(
                "Telegram API вернул ошибку",
                chat_id=chat_id,
                status=response.status_code,
                error=data.get("description"),
            )
            return False

    except Exception as e:
        logger.error("Ошибка отправки Telegram сообщения", chat_id=chat_id, error=str(e))
        return False


async def send_admin_notification(text: str) -> bool:
    """
    Отправляет уведомление в административный чат.

    Args:
        text: Текст уведомления

    Returns:
        True при успехе
    """
    from app.config import settings

    if not settings.TELEGRAM_ADMIN_CHAT_ID:
        logger.debug("Telegram admin chat ID не настроен")
        return False

    return await send_message(settings.TELEGRAM_ADMIN_CHAT_ID, text)


def format_order_message(order) -> str:
    """
    Форматирует информацию о заказе для Telegram сообщения.

    Args:
        order: Объект Order

    Returns:
        Отформатированная строка для Telegram (HTML)
    """
    priority_emoji = {
        "urgent": "🔴",
        "normal": "🟡",
        "flexible": "🟢",
    }.get(
        order.delivery_priority.value if hasattr(order.delivery_priority, "value") else str(order.delivery_priority),
        "🟡",
    )

    status_names = {
        "new": "🆕 Новый",
        "confirmed": "✅ Подтверждён",
        "assembling": "📦 Собирается",
        "assembled": "✔️ Собран",
        "delivering": "🚚 В пути",
        "delivered": "🏁 Доставлен",
        "cancelled": "❌ Отменён",
    }
    status_str = status_names.get(
        order.status.value if hasattr(order.status, "value") else str(order.status),
        str(order.status),
    )

    items_text = ""
    for item in order.items[:5]:  # Показываем первые 5 позиций
        items_text += (
            f"\n  • {item.product_name}: {item.ordered_qty:.1f} {item.unit} × {item.price:,.0f} ₽ = {item.total:,.0f} ₽"
        )

    if len(order.items) > 5:
        items_text += f"\n  ... и ещё {len(order.items) - 5} позиций"

    delivery_date_str = str(order.delivery_date) if order.delivery_date else "не указана"

    return (
        f"<b>📦 Заказ {order.order_number}</b>\n"
        f"Статус: {status_str}\n"
        f"Клиент: {order.client_name}\n"
        f"Телефон: {order.client_phone}\n"
        f"{priority_emoji} Доставка: {delivery_date_str} ({order.delivery_slot})\n"
        f"Адрес: {order.delivery_address}\n"
        f"\n<b>Состав заказа:</b>{items_text}\n"
        f"\n💰 <b>Итого: {order.total:,.0f} ₽</b>\n"
        f"Оплата: {order.payment_method.value if hasattr(order.payment_method, 'value') else order.payment_method}"
    )


async def send_notification_to_user(user, title: str, message: str) -> bool:
    """
    Отправляет уведомление конкретному пользователю.

    Args:
        user: Объект User с полем telegram_chat_id
        title: Заголовок
        message: Текст сообщения

    Returns:
        True при успехе
    """
    if not user.telegram_chat_id:
        logger.debug(
            "Пользователь не привязал Telegram",
            user_id=str(user.id),
        )
        return False

    text = f"<b>{title}</b>\n\n{message}"
    return await send_message(user.telegram_chat_id, text)


# ── Обработчик Telegram Webhook ───────────────────────────────


async def process_webhook_update(update: dict) -> Optional[str]:
    """
    Обрабатывает входящее обновление от Telegram.
    Возвращает ответное сообщение или None.

    Текущие команды:
    /start — привязка аккаунта (пока заглушка)
    /status — статус последнего заказа
    /orders — список заказов
    """
    message = update.get("message", {})
    if not message:
        return None

    chat_id = str(message.get("chat", {}).get("id", ""))
    text = message.get("text", "").strip()

    logger.debug(
        "Telegram webhook обновление",
        chat_id=chat_id,
        text=text[:50],
    )

    if text == "/start":
        return (
            "Добро пожаловать в Агрорезерв! 🌿\n\n"
            "Для привязки Telegram к вашему аккаунту перейдите в:\n"
            "👉 agroreserve.ru/account/profile\n\n"
            "После привязки вы будете получать уведомления о заказах здесь."
        )

    if text == "/help":
        return (
            "Команды бота:\n"
            "/start — начало работы\n"
            "/help — помощь\n"
            "/status — статус последнего заказа\n"
            "\nДля заказов перейдите на: agroreserve.ru"
        )

    return (
        "Для оформления заказов используйте наш сайт: agroreserve.ru\n"
        "Здесь мы отправляем уведомления о ваших заказах 📦"
    )
