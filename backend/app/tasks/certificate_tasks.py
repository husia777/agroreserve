"""
Celery задачи для управления сертификатами.

UC-26: Ежедневная проверка сроков сертификатов:
- Уведомление администратора об истекающих (< 30 дней)
- Автоблокировка товаров с просроченными сертификатами (is_active = False)
"""
import asyncio
from datetime import date, timedelta

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
    name="app.tasks.certificate_tasks.check_expiring_certificates",
    queue="default",
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def check_expiring_certificates(self) -> dict:
    """
    UC-26: Ежедневная проверка сроков сертификатов.

    Логика:
    1. Найти сертификаты с expiry_date < now + 30 дней → отправить уведомление администратору
    2. Найти просроченные сертификаты (expiry_date < today) → заблокировать товары (is_active = False)

    Возвращает статистику выполнения.
    """
    async def _execute() -> dict:
        from app.database import init_db
        await init_db()

        from app.models.certificate import Certificate, CertificateStatus
        from app.models.product import Product

        today = date.today()
        warning_threshold = today + timedelta(days=30)

        result = {
            "status": "ok",
            "expiring_soon": [],
            "expired": [],
            "blocked_products": [],
            "notifications_sent": 0,
        }

        # ── 1. Находим истекающие и просроченные сертификаты ──────────────────
        # Все сертификаты с датой истечения <= threshold (включая просроченные)
        certs = await Certificate.find(
            Certificate.expiry_date <= warning_threshold,  # type: ignore
        ).to_list()

        expired_certs = []
        expiring_certs = []

        for cert in certs:
            if cert.expiry_date < today:
                expired_certs.append(cert)
                # Обновляем статус на EXPIRED
                if cert.status != CertificateStatus.EXPIRED:
                    cert.status = CertificateStatus.EXPIRED
                    from datetime import datetime, timezone
                    cert.updated_at = datetime.now(timezone.utc)
                    await cert.save()
                    logger.info(
                        "Статус сертификата обновлён на EXPIRED",
                        cert_id=str(cert.id),
                        number=cert.number,
                        expiry_date=str(cert.expiry_date),
                    )
            else:
                expiring_certs.append(cert)
                # Обновляем статус на EXPIRING_SOON
                if cert.status != CertificateStatus.EXPIRING_SOON:
                    cert.status = CertificateStatus.EXPIRING_SOON
                    from datetime import datetime, timezone
                    cert.updated_at = datetime.now(timezone.utc)
                    await cert.save()

        result["expiring_soon"] = [
            {
                "id": str(c.id),
                "number": c.number,
                "expiry_date": str(c.expiry_date),
                "days_left": (c.expiry_date - today).days,
                "product_ids": c.product_ids,
            }
            for c in expiring_certs
        ]

        result["expired"] = [
            {
                "id": str(c.id),
                "number": c.number,
                "expiry_date": str(c.expiry_date),
                "days_overdue": (today - c.expiry_date).days,
                "product_ids": c.product_ids,
            }
            for c in expired_certs
        ]

        # ── 2. Блокируем товары с просроченными сертификатами ─────────────────
        blocked_product_ids = set()
        for cert in expired_certs:
            for pid in cert.product_ids:
                blocked_product_ids.add(pid)

        blocked_count = 0
        for pid in blocked_product_ids:
            try:
                from beanie import PydanticObjectId
                product = await Product.get(PydanticObjectId(pid))
                if product and product.is_active:
                    product.is_active = False
                    from datetime import datetime, timezone
                    product.updated_at = datetime.now(timezone.utc)
                    await product.save()
                    blocked_count += 1
                    result["blocked_products"].append({
                        "product_id": pid,
                        "product_name": product.name,
                    })
                    logger.warning(
                        "Товар заблокирован из-за просроченного сертификата",
                        product_id=pid,
                        product_name=product.name,
                    )
            except Exception as e:
                logger.error(
                    "Ошибка блокировки товара",
                    product_id=pid,
                    error=str(e),
                )

        # ── 3. Уведомляем администратора ──────────────────────────────────────
        if expiring_certs or expired_certs:
            await _send_admin_certificate_notification(
                expiring_certs=expiring_certs,
                expired_certs=expired_certs,
                blocked_count=blocked_count,
            )
            result["notifications_sent"] = 1

        logger.info(
            "Проверка сертификатов завершена",
            expiring_count=len(expiring_certs),
            expired_count=len(expired_certs),
            blocked_products=blocked_count,
        )

        return result

    try:
        return _run_async(_execute())
    except Exception as exc:
        logger.error("Ошибка задачи check_expiring_certificates", error=str(exc))
        raise self.retry(exc=exc)


async def _send_admin_certificate_notification(
    expiring_certs: list,
    expired_certs: list,
    blocked_count: int,
) -> None:
    """
    Отправляет уведомление администратору о состоянии сертификатов.

    Args:
        expiring_certs: Список истекающих сертификатов
        expired_certs: Список просроченных сертификатов
        blocked_count: Количество заблокированных товаров
    """
    from app.config import settings
    from app.utils.telegram_bot import send_message

    if not settings.TELEGRAM_ADMIN_CHAT_ID:
        logger.warning("TELEGRAM_ADMIN_CHAT_ID не настроен, уведомление не отправлено")
        return

    today = date.today()

    lines = ["<b>🔔 Ежедневный отчёт по сертификатам</b>\n"]

    if expiring_certs:
        lines.append(f"<b>⚠️ Истекают в ближайшие 30 дней ({len(expiring_certs)} шт.):</b>")
        for cert in expiring_certs[:5]:  # Максимум 5 в сообщении
            days_left = (cert.expiry_date - today).days
            lines.append(f"  • {cert.number} — через {days_left} дн. ({cert.expiry_date})")
        if len(expiring_certs) > 5:
            lines.append(f"  ... и ещё {len(expiring_certs) - 5} сертификатов")
        lines.append("")

    if expired_certs:
        lines.append(f"<b>❌ Просрочены ({len(expired_certs)} шт.):</b>")
        for cert in expired_certs[:5]:
            days_overdue = (today - cert.expiry_date).days
            lines.append(f"  • {cert.number} — просрочен {days_overdue} дн. назад")
        if len(expired_certs) > 5:
            lines.append(f"  ... и ещё {len(expired_certs) - 5} сертификатов")
        lines.append("")

    if blocked_count > 0:
        lines.append(f"<b>🚫 Заблокировано товаров: {blocked_count}</b>")
        lines.append("(продажа остановлена до обновления сертификатов)")

    message = "\n".join(lines)

    try:
        await send_message(settings.TELEGRAM_ADMIN_CHAT_ID, message)
        logger.info(
            "Уведомление администратору о сертификатах отправлено",
            expiring_count=len(expiring_certs),
            expired_count=len(expired_certs),
        )
    except Exception as e:
        logger.error("Ошибка отправки уведомления о сертификатах", error=str(e))
