"""
Сервис календаря событий.

UC-50: Агрегирует события из разных источников системы:
- Доставки (из заказов)
- Дедлайны тендеров
- Ожидаемые оплаты
- Напоминания
- Сроки сертификатов
- Поставки по контрактам
"""
import calendar
from datetime import date, datetime, timedelta, timezone
from typing import List, Optional

import structlog

logger = structlog.get_logger(__name__)

# Цветовая схема для типов событий
EVENT_COLORS = {
    "delivery": "#22c55e",       # Зелёный — доставки
    "tender_deadline": "#ef4444", # Красный — дедлайны тендеров
    "payment": "#3b82f6",        # Синий — оплаты
    "reminder": "#f59e0b",       # Жёлтый — напоминания
    "certificate_expiry": "#f97316", # Оранжевый — истечение сертификатов
    "contract_delivery": "#8b5cf6",  # Фиолетовый — поставки по контрактам
    "standing_order": "#06b6d4",  # Голубой — регулярные заказы
}


async def get_events(year: int, month: int) -> List[dict]:
    """
    UC-50: Собирает все события на указанный месяц из разных источников.

    Источники:
    1. Заказы — даты доставки
    2. Тендеры — дедлайны подачи заявок
    3. Заказы — ожидаемые даты оплаты (просроченные и pending)
    4. Напоминания
    5. Сертификаты — даты истечения
    6. Контракты — плановые поставки

    Args:
        year: Год (например, 2026)
        month: Месяц (1-12)

    Returns:
        Список событий [{date, type, title, description, color, link}]
    """
    # Определяем диапазон месяца
    _, last_day = calendar.monthrange(year, month)
    month_start = date(year, month, 1)
    month_end = date(year, month, last_day)

    # Немного захватываем окрестности для удобства (±3 дня)
    range_start = month_start - timedelta(days=3)
    range_end = month_end + timedelta(days=3)

    events: List[dict] = []

    # ── 1. Доставки из заказов ────────────────────────────────
    try:
        from app.models.order import Order, OrderStatus
        orders = await Order.find(
            {
                "delivery_date": {
                    "$gte": month_start,
                    "$lte": month_end,
                },
                "status": {"$nin": [OrderStatus.CANCELLED.value]},
            }
        ).to_list()

        for order in orders:
            if order.delivery_date:
                client_name = order.client_name
                status_emoji = {
                    OrderStatus.NEW: "🆕",
                    OrderStatus.CONFIRMED: "✅",
                    OrderStatus.ASSEMBLING: "📦",
                    OrderStatus.ASSEMBLED: "📫",
                    OrderStatus.DELIVERING: "🚚",
                    OrderStatus.DELIVERED: "✔️",
                }.get(order.status, "")

                events.append({
                    "date": str(order.delivery_date),
                    "type": "delivery",
                    "title": f"Доставка: {client_name}",
                    "description": (
                        f"Заказ {order.order_number}, {status_emoji} {order.status.value if hasattr(order.status, 'value') else order.status}, "
                        f"сумма: {order.total:,.0f} ₽, "
                        f"слот: {order.delivery_slot or '—'}"
                    ),
                    "color": EVENT_COLORS["delivery"],
                    "link": f"/admin/orders/{order.id}",
                    "order_number": order.order_number,
                    "total": order.total,
                })
    except Exception as e:
        logger.error("Ошибка загрузки событий доставок", error=str(e))

    # ── 2. Дедлайны тендеров ─────────────────────────────────
    try:
        from app.models.tender import Tender
        start_dt = datetime(month_start.year, month_start.month, month_start.day, 0, 0, 0, tzinfo=timezone.utc)
        end_dt = datetime(month_end.year, month_end.month, month_end.day, 23, 59, 59, tzinfo=timezone.utc)

        tenders = await Tender.find(
            {
                "deadline": {"$gte": start_dt, "$lte": end_dt},
                "status": {"$in": ["new", "analyzing", "bid_submitted"]},
                "is_relevant": True,
            }
        ).to_list()

        for tender in tenders:
            if tender.deadline:
                deadline_date = tender.deadline.date()
                days_left = (deadline_date - date.today()).days

                events.append({
                    "date": str(deadline_date),
                    "type": "tender_deadline",
                    "title": f"Дедлайн тендера: {tender.customer[:30]}",
                    "description": (
                        f"{tender.title[:80]}, "
                        f"НМЦК: {tender.max_price:,.0f} ₽, "
                        f"Статус: {tender.status}, "
                        f"Осталось: {days_left} дн."
                    ),
                    "color": EVENT_COLORS["tender_deadline"],
                    "link": f"/admin/tenders/{tender.id}",
                    "eis_number": tender.eis_number,
                    "max_price": tender.max_price,
                    "urgent": days_left <= 3,
                })
    except Exception as e:
        logger.error("Ошибка загрузки событий тендеров", error=str(e))

    # ── 3. Ожидаемые оплаты ──────────────────────────────────
    try:
        from app.models.order import Order, OrderStatus, PaymentStatus
        from app.config import settings as app_settings

        # Заказы с pending-оплатой в доставленном статусе
        unpaid_orders = await Order.find(
            Order.status == OrderStatus.DELIVERED,
            Order.payment_status.in_([PaymentStatus.PENDING, PaymentStatus.PARTIAL]),  # type: ignore
        ).to_list()

        payment_days = 14  # По умолчанию 14 дней на оплату

        for order in unpaid_orders:
            # Ожидаемая дата оплаты = дата доставки + payment_days
            expected_payment_date = None
            if order.delivery_date:
                expected_payment_date = order.delivery_date + timedelta(days=payment_days)
            else:
                expected_payment_date = order.created_at.date() + timedelta(days=payment_days)

            if month_start <= expected_payment_date <= month_end:
                remaining = round(order.total - order.paid_amount, 2)
                is_overdue = expected_payment_date < date.today()

                events.append({
                    "date": str(expected_payment_date),
                    "type": "payment",
                    "title": f"{'Просроченная оплата' if is_overdue else 'Ожидаемая оплата'}: {order.client_name}",
                    "description": (
                        f"Заказ {order.order_number}, "
                        f"к оплате: {remaining:,.0f} ₽"
                        + (" [ПРОСРОЧЕНО]" if is_overdue else "")
                    ),
                    "color": "#ef4444" if is_overdue else EVENT_COLORS["payment"],
                    "link": f"/admin/orders/{order.id}",
                    "order_number": order.order_number,
                    "amount": remaining,
                    "overdue": is_overdue,
                })
    except Exception as e:
        logger.error("Ошибка загрузки событий оплат", error=str(e))

    # ── 4. Напоминания ────────────────────────────────────────
    try:
        from app.models.reminder import Reminder
        start_dt = datetime(month_start.year, month_start.month, month_start.day, 0, 0, 0, tzinfo=timezone.utc)
        end_dt = datetime(month_end.year, month_end.month, month_end.day, 23, 59, 59, tzinfo=timezone.utc)

        reminders = await Reminder.find(
            Reminder.remind_at >= start_dt,    # type: ignore
            Reminder.remind_at <= end_dt,      # type: ignore
            Reminder.is_completed == False,    # noqa: E712
        ).to_list()

        for reminder in reminders:
            events.append({
                "date": str(reminder.remind_at.date()),
                "type": "reminder",
                "title": reminder.title,
                "description": reminder.description or "",
                "color": EVENT_COLORS["reminder"],
                "link": f"/admin/reminders/{reminder.id}",
                "remind_at": reminder.remind_at.isoformat(),
                "related_type": reminder.related_type,
            })
    except Exception as e:
        logger.error("Ошибка загрузки событий напоминаний", error=str(e))

    # ── 5. Истечение сертификатов ─────────────────────────────
    try:
        from app.models.certificate import Certificate
        certs = await Certificate.find(
            {
                "expiry_date": {
                    "$gte": month_start,
                    "$lte": month_end,
                }
            }
        ).to_list()

        for cert in certs:
            today = date.today()
            is_expired = cert.expiry_date < today
            days_left = (cert.expiry_date - today).days

            events.append({
                "date": str(cert.expiry_date),
                "type": "certificate_expiry",
                "title": f"{'Сертификат просрочен' if is_expired else 'Истечение сертификата'}: {cert.number}",
                "description": (
                    f"Тип: {cert.cert_type.value if hasattr(cert.cert_type, 'value') else cert.cert_type}, "
                    f"{'просрочен' if is_expired else f'осталось {days_left} дн.'}"
                ),
                "color": "#ef4444" if is_expired else EVENT_COLORS["certificate_expiry"],
                "link": f"/admin/certificates/{cert.id}",
                "expired": is_expired,
            })
    except Exception as e:
        logger.error("Ошибка загрузки событий сертификатов", error=str(e))

    # ── 6. Поставки по контрактам ─────────────────────────────
    try:
        from app.models.contract import Contract
        contracts = await Contract.find(
            Contract.status == "active",  # type: ignore
        ).to_list()

        for contract in contracts:
            for schedule in contract.delivery_schedule:
                if month_start <= schedule.date <= month_end and not schedule.is_completed:
                    total_items = len(schedule.items)
                    events.append({
                        "date": str(schedule.date),
                        "type": "contract_delivery",
                        "title": f"Поставка по контракту: {contract.client_name[:30]}",
                        "description": (
                            f"Контракт {contract.contract_number}, "
                            f"позиций: {total_items}, "
                            f"сумма: {contract.total_amount:,.0f} ₽"
                        ),
                        "color": EVENT_COLORS["contract_delivery"],
                        "link": f"/admin/contracts/{contract.id}",
                        "contract_number": contract.contract_number,
                    })
    except Exception as e:
        logger.error("Ошибка загрузки событий поставок", error=str(e))

    # Сортируем по дате
    events.sort(key=lambda x: x["date"])

    logger.info(
        "События календаря загружены",
        year=year,
        month=month,
        events_count=len(events),
    )

    return events
