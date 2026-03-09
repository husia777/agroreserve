"""
Сервис отправки email через SMTP (Яндекс.Почта).
UC-01: уведомление о поступлении товара.
"""
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

import structlog

logger = structlog.get_logger(__name__)


async def send_email(
    to_email: str,
    subject: str,
    body_html: str,
    body_text: Optional[str] = None,
) -> bool:
    """Отправляет email через Яндекс SMTP."""
    from app.config import settings

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.debug("SMTP не настроен, пропускаем")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = settings.SMTP_FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject

        if body_text:
            msg.attach(MIMEText(body_text, "plain", "utf-8"))
        msg.attach(MIMEText(body_html, "html", "utf-8"))

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(
            settings.SMTP_HOST,
            settings.SMTP_PORT,
            context=context,
            timeout=15,
        ) as server:
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL,
                            to_email, msg.as_string())

        logger.info("Email отправлен", to=to_email, subject=subject)
        return True

    except Exception as e:
        logger.error("Ошибка отправки email", to=to_email, error=str(e))
        return False


async def send_stock_restock_notification(
    to_email: str,
    product_name: str,
    product_slug: str,
) -> bool:
    """UC-01: Уведомление о поступлении товара."""
    subject = f"Товар {product_name} снова в наличии"

    body_html = (
        '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">'
        '<div style="background:#16a34a;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0;">'
        '<h1 style="margin:0;font-size:22px;">Агрорезерв</h1></div>'
        '<div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">'
        '<h2 style="color:#111;margin-top:0;">Товар снова в наличии!</h2>'
        f'<p style="color:#374151;font-size:16px;line-height:1.6;">'
        f'Товар <strong>{product_name}</strong> снова доступен для заказа.</p>'
        '<div style="text-align:center;margin:24px 0;">'
        f'<a href="https://agrorezerv.ru/quick-order" '
        'style="display:inline-block;background:#16a34a;color:white;padding:12px 32px;'
        'text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">'
        'Перейти к заказу</a></div>'
        '<p style="color:#6b7280;font-size:13px;">'
        'Вы получили это письмо, потому что подписались на уведомление о поступлении товара.</p>'
        '</div></div>'
    )

    body_text = f"Товар {product_name} снова в наличии! Заказать: https://agrorezerv.ru/quick-order"

    return await send_email(to_email, subject, body_html, body_text)
