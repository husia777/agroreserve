"""
Роутер дашборда администратора — «Сегодняшний день».
Эндпоинты: /api/v1/admin/dashboard

Виджет отображает ключевые метрики бизнеса за текущий день.
"""
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, List

import structlog
from fastapi import APIRouter, Depends

from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin/dashboard", tags=["Администрирование — Дашборд"])
logger = structlog.get_logger(__name__)


@router.get(
    "",
    summary="Виджет «Сегодняшний день»",
    description="Ключевые метрики бизнеса — финансы, заказы, доставки, склад, напоминания.",
)
async def get_dashboard(admin=Depends(require_admin)) -> Dict[str, Any]:
    """
    Возвращает данные дашборда в формате, ожидаемом фронтендом.
    Авто-обновляется каждые 30 секунд (polling на фронте).
    """
    from app.models.order import Order, OrderStatus, PaymentStatus
    from app.models.product import Product
    from app.models.user import User, UserStatus
    from app.models.certificate import Certificate, CertificateStatus

    today = date.today()
    yesterday = today - timedelta(days=1)
    now = datetime.now(timezone.utc)

    today_start = datetime(today.year, today.month, today.day, tzinfo=timezone.utc)
    today_end = today_start + timedelta(days=1)
    yesterday_start = today_start - timedelta(days=1)

    # ── Заказы ────────────────────────────────────────────────
    orders_new = await Order.find({"status": OrderStatus.NEW.value}).count()

    orders_to_ship = await Order.find({
        "status": {"$in": [
            OrderStatus.CONFIRMED.value,
            OrderStatus.ASSEMBLING.value,
            OrderStatus.ASSEMBLED.value,
        ]}
    }).count()

    orders_urgent = await Order.find({
        "delivery_priority": "urgent",
        "status": {"$nin": [
            OrderStatus.DELIVERED.value,
            OrderStatus.CANCELLED.value,
        ]}
    }).count()

    # ── Финансы ───────────────────────────────────────────────
    delivered_today = await Order.find({
        "status": OrderStatus.DELIVERED.value,
        "updated_at": {"$gte": today_start, "$lt": today_end},
    }).to_list()
    revenue_today = sum(o.total for o in delivered_today)

    delivered_yesterday = await Order.find({
        "status": OrderStatus.DELIVERED.value,
        "updated_at": {"$gte": yesterday_start, "$lt": today_start},
    }).to_list()
    revenue_yesterday = sum(o.total for o in delivered_yesterday)

    paid_today = sum(o.paid_amount for o in delivered_today if o.payment_status == PaymentStatus.PAID)

    all_clients = await User.find({"current_debt": {"$gt": 0}}).to_list()
    total_debt = sum(getattr(c, "current_debt", 0) for c in all_clients)

    # ── Доставки на сегодня ───────────────────────────────────
    orders_delivering = await Order.find({
        "delivery_date": today.isoformat(),
        "status": {"$in": [
            OrderStatus.CONFIRMED.value,
            OrderStatus.ASSEMBLING.value,
            OrderStatus.ASSEMBLED.value,
            OrderStatus.DELIVERING.value,
        ]}
    }).to_list()

    deliveries_today: List[Dict[str, Any]] = []
    for order in orders_delivering:
        deliveries_today.append({
            "order_id": str(order.id),
            "order_number": order.order_number,
            "client_name": order.client_name,
            "address": order.delivery_address,
            "slot": order.delivery_slot or "",
            "priority": order.delivery_priority.value if hasattr(order.delivery_priority, "value") else order.delivery_priority,
            "total": order.total,
        })

    # ── Напоминания ───────────────────────────────────────────
    reminders: List[Dict[str, Any]] = []

    pending_clients = await User.find({"status": UserStatus.PENDING.value}).count()
    if pending_clients > 0:
        reminders.append({
            "type": "stock",
            "message": f"Ожидают модерации: {pending_clients} клиент(ов)",
            "urgency": "medium",
        })

    try:
        expiring_certs = await Certificate.find({
            "status": {"$in": [CertificateStatus.EXPIRING_SOON.value, CertificateStatus.EXPIRED.value]}
        }).to_list()
        for cert in expiring_certs:
            days_left = (cert.expiry_date - today).days if cert.expiry_date >= today else 0
            if cert.status == CertificateStatus.EXPIRED:
                reminders.append({
                    "type": "certificate",
                    "message": f"Сертификат {cert.number} просрочен!",
                    "urgency": "high",
                })
            else:
                reminders.append({
                    "type": "certificate",
                    "message": f"Сертификат {cert.number} истекает через {days_left} дн.",
                    "urgency": "high" if days_left <= 7 else "medium",
                })
    except Exception as e:
        logger.warning("Ошибка получения сертификатов для дашборда", error=str(e))

    if total_debt > 50000:
        reminders.append({
            "type": "debt",
            "message": f"Дебиторская задолженность: {total_debt:,.0f} ₽",
            "urgency": "high" if total_debt > 200000 else "medium",
        })

    # ── Критичные остатки ─────────────────────────────────────
    critical_stock: List[Dict[str, Any]] = []
    try:
        low_stock_products = await Product.find(
            {"is_active": True, "min_stock_qty": {"$gt": 0}}
        ).to_list()

        for product in low_stock_products:
            if product.is_low_stock():
                critical_stock.append({
                    "product": {"name": product.name},
                    "quantity": product.stock_qty,
                    "is_critical": product.stock_qty <= 0,
                })
    except Exception as e:
        logger.warning("Ошибка получения остатков для дашборда", error=str(e))

    # ── Ответ в формате фронтенда ─────────────────────────────
    return {
        "today": {
            "revenue": revenue_today,
            "paid": paid_today,
            "debt": total_debt,
            "orders_new": orders_new,
            "orders_to_ship": orders_to_ship,
            "orders_urgent": orders_urgent,
        },
        "yesterday": {
            "revenue": revenue_yesterday,
        },
        "deliveries_today": deliveries_today,
        "reminders": reminders,
        "critical_stock": critical_stock,
    }
