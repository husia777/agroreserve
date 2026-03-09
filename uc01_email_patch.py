#!/usr/bin/env python3
"""
UC-01: Создаёт email_service.py и добавляет триггер уведомления waitlist при поступлении товара.
"""
import pathlib

BASE = pathlib.Path("/home/husein/Downloads/agrorezerv/backend/app")

# ── 1. Создаём email_service.py ──────────────────────────────
email_service = BASE / "utils" / "email_service.py"
email_service.write_text('''\
"""
Сервис отправки email через SMTP (Яндекс.Почта).
Используется для уведомлений о поступлении товара (UC-01) и других рассылок.
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
    """
    Отправляет email через Яндекс SMTP.

    Args:
        to_email: Адрес получателя
        subject: Тема письма
        body_html: HTML-тело письма
        body_text: Текстовая версия (опционально)

    Returns:
        True при успехе, False при ошибке
    """
    from app.config import settings

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.debug("SMTP не настроен, пропускаем отправку email")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
        msg["To"] = to_email
        msg["Subject"] = subject

        # Текстовая версия
        if body_text:
            msg.attach(MIMEText(body_text, "plain", "utf-8"))

        # HTML версия
        msg.attach(MIMEText(body_html, "html", "utf-8"))

        # Подключение через SSL (порт 465)
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(
            settings.SMTP_HOST,
            settings.SMTP_PORT,
            context=context,
            timeout=15,
        ) as server:
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL, to_email, msg.as_string())

        logger.info(
            "Email отправлен",
            to=to_email,
            subject=subject,
        )
        return True

    except Exception as e:
        logger.error(
            "Ошибка отправки email",
            to=to_email,
            subject=subject,
            error=str(e),
        )
        return False


async def send_stock_restock_notification(
    to_email: str,
    product_name: str,
    product_slug: str,
) -> bool:
    """
    UC-01: Уведомление клиенту о поступлении товара на склад.
    """
    subject = f"Товар «{product_name}» снова в наличии — Агрорезерв"

    body_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 22px;">🌿 Агрорезерв</h1>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #111; margin-top: 0;">Товар снова в наличии!</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Рады сообщить, что товар <strong>«{product_name}»</strong>, на который вы подписались, 
                снова доступен для заказа.
            </p>
            <div style="text-align: center; margin: 24px 0;">
                <a href="https://agrorezerv.ru/catalog/all/{product_slug}" 
                   style="display: inline-block; background: #16a34a; color: white; padding: 12px 32px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Перейти к товару
                </a>
            </div>
            <p style="color: #6b7280; font-size: 13px;">
                Вы получили это письмо, потому что подписались на уведомление о поступлении товара на сайте Агрорезерв.
            </p>
        </div>
    </div>
    """

    body_text = (
        f"Товар «{product_name}» снова в наличии!\n\n"
        f"Перейти к товару: https://agrorezerv.ru/catalog/all/{product_slug}\n\n"
        f"— Агрорезерв"
    )

    return await send_email(to_email, subject, body_html, body_text)
''', encoding="utf-8")
print(f"✅ {email_service} — создан")


# ── 2. Добавляем триггер в stock_service.py ──────────────────
stock_svc = BASE / "services" / "stock_service.py"
content = stock_svc.read_text(encoding="utf-8")

# Ищем место после создания прихода и обновления остатков
# Добавляем вызов notify_waitlist после receipt.insert()
trigger_marker = "    await receipt.insert()"
if trigger_marker not in content:
    print("❌ Не найден маркер 'await receipt.insert()' в stock_service.py")
else:
    if "notify_stock_waitlist" in content:
        print("⚠️  notify_stock_waitlist уже есть в stock_service.py")
    else:
        waitlist_code = '''

    # ── UC-01: Уведомляем подписчиков о поступлении товара ────
    try:
        await notify_stock_waitlist(receipt_items)
    except Exception as e:
        logger.warning("Ошибка уведомления waitlist", error=str(e))
'''
        content = content.replace(
            trigger_marker,
            trigger_marker + waitlist_code,
        )
        print("✅ Триггер notify_stock_waitlist добавлен после receipt.insert()")

# ── 3. Добавляем функцию notify_stock_waitlist в конец файла ──
if "async def notify_stock_waitlist" not in content:
    content += '''

async def notify_stock_waitlist(receipt_items: list) -> None:
    """
    UC-01: При поступлении товара на склад — уведомляем подписчиков из stock_waitlist.
    Отправляем email и помечаем подписку как уведомлённую.
    """
    from app.models.stock_waitlist import StockWaitlist
    from app.utils.email_service import send_stock_restock_notification
    from app.utils.telegram_bot import send_admin_notification

    product_ids = []
    product_map: dict = {}

    for item in receipt_items:
        pid = str(item.product_id) if hasattr(item, "product_id") else str(item.get("product_id", ""))
        pname = item.product_name if hasattr(item, "product_name") else item.get("product_name", "")
        if pid:
            product_ids.append(pid)
            product_map[pid] = pname

    if not product_ids:
        return

    # Находим все неуведомлённые подписки на эти товары
    waitlist_entries = await StockWaitlist.find(
        {"product_id": {"$in": product_ids}, "is_notified": False}
    ).to_list()

    if not waitlist_entries:
        return

    notified_count = 0
    for entry in waitlist_entries:
        product_name = product_map.get(entry.product_id, entry.product_name)

        # Получаем slug товара для ссылки
        try:
            from app.models.product import Product
            from beanie import PydanticObjectId
            product = await Product.get(PydanticObjectId(entry.product_id))
            product_slug = product.slug if product else "unknown"
        except Exception:
            product_slug = "unknown"

        # Отправляем email
        ok = await send_stock_restock_notification(
            to_email=entry.email,
            product_name=product_name,
            product_slug=product_slug,
        )

        if ok:
            from datetime import datetime, timezone
            entry.is_notified = True
            entry.notified_at = datetime.now(timezone.utc)
            await entry.save()
            notified_count += 1
            logger.info(
                "Подписчик уведомлён о поступлении",
                email=entry.email,
                product=product_name,
            )

    # Telegram уведомление админу о рассылке
    if notified_count > 0:
        await send_admin_notification(
            f"📬 UC-01: Отправлено {notified_count} уведомлений о поступлении товара"
        )
'''
    print("✅ Функция notify_stock_waitlist добавлена в stock_service.py")
else:
    print("⚠️  notify_stock_waitlist уже есть")

stock_svc.write_text(content, encoding="utf-8")
print("\n=== Готово ===")
