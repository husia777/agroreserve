"""
Утилита отправки email через SMTP (Yandex).
Используется для критических уведомлений: низкие остатки, просроченная дебиторка.
"""

import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from typing import Optional

import structlog

from app.config import settings

logger = structlog.get_logger(__name__)


def send_email(
    to: str,
    subject: str,
    body_text: str,
    body_html: Optional[str] = None,
) -> bool:
    """
    Синхронная отправка email через SMTP.

    Args:
        to: Адрес получателя
        subject: Тема письма
        body_text: Текст (fallback)
        body_html: HTML-версия (необязательно)

    Returns:
        True, если письмо отправилось; False при ошибке.
    """
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning("SMTP не сконфигурирован — письмо не отправлено", to=to)
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = formataddr((settings.SMTP_FROM_NAME, settings.SMTP_FROM_EMAIL or settings.SMTP_USER))
    msg["To"] = to

    msg.attach(MIMEText(body_text, "plain", "utf-8"))
    if body_html:
        msg.attach(MIMEText(body_html, "html", "utf-8"))

    try:
        # Yandex использует SMTPS на порту 465 — сразу SSL
        if settings.SMTP_PORT == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(
                settings.SMTP_HOST,
                settings.SMTP_PORT,
                context=context,
                timeout=15,
            ) as server:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
        else:
            # STARTTLS на 587
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
                if settings.SMTP_USE_TLS:
                    server.starttls(context=ssl.create_default_context())
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)

        logger.info("Email отправлен", to=to, subject=subject)
        return True

    except Exception as e:
        logger.error(
            "Ошибка отправки email",
            to=to,
            subject=subject,
            error=str(e),
        )
        return False
