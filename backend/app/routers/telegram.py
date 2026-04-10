"""
Роутер Telegram Webhook.
Эндпоинт: /api/v1/telegram/webhook

Принимает обновления от Telegram и обрабатывает команды бота.
"""

import structlog
from fastapi import APIRouter, HTTPException, Request, status

from app.config import settings

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/telegram", tags=["Telegram"])


@router.post(
    "/webhook",
    summary="Telegram Webhook",
)
async def telegram_webhook(request: Request):
    """
    Принимает обновления от Telegram Bot API.
    Регистрируется через setWebhook: https://api.telegram.org/bot{TOKEN}/setWebhook?url=...
    """
    if not settings.TELEGRAM_BOT_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Telegram бот не настроен",
        )

    try:
        update = await request.json()
    except Exception as e:
        logger.warning("Ошибка парсинга Telegram webhook", error=str(e))
        return {"ok": True}

    logger.debug("Telegram webhook получен", update_id=update.get("update_id"))

    from app.utils.telegram_bot import process_webhook_update, send_message

    reply_text = await process_webhook_update(update)

    # Отвечаем на сообщение если нужно
    if reply_text:
        message = update.get("message", {})
        chat_id = str(message.get("chat", {}).get("id", ""))
        if chat_id:
            await send_message(chat_id, reply_text)

    # Telegram ожидает 200 OK
    return {"ok": True}


@router.get(
    "/webhook/info",
    summary="Информация о webhook",
    include_in_schema=False,
)
async def webhook_info():
    """Возвращает информацию о текущем webhook (только для отладки)."""
    if not settings.DEBUG:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if not settings.TELEGRAM_BOT_TOKEN:
        return {"configured": False}

    import httpx

    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/getWebhookInfo"
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url)
            return response.json()
    except Exception as e:
        return {"error": str(e)}
