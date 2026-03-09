"""
Сервис аналитики и отчётности.

UC-12: Аналитика продаж — выручка, маржа, топ товаров/клиентов, тренды.
"""
from datetime import date, datetime, timedelta, timezone
from typing import List, Optional

import structlog

from app.models.order import Order, OrderStatus

logger = structlog.get_logger(__name__)


def _to_start_dt(d: date) -> datetime:
    """Конвертирует date в datetime (начало дня, UTC)."""
    return datetime(d.year, d.month, d.day, 0, 0, 0, tzinfo=timezone.utc)


def _to_end_dt(d: date) -> datetime:
    """Конвертирует date в datetime (конец дня, UTC)."""
    return datetime(d.year, d.month, d.day, 23, 59, 59, tzinfo=timezone.utc)


async def get_overview(start: date, end: date) -> dict:
    """
    UC-12: Сводная аналитика за период.

    Включает:
    - Выручка (все доставленные заказы)
    - Прибыль (выручка − COGS − расходы − налог)
    - Количество заказов
    - Количество уникальных клиентов
    - Маржа %
    - Средний чек

    Args:
        start: Начало периода
        end: Конец периода

    Returns:
        Словарь с ключевыми показателями
    """
    start_dt = _to_start_dt(start)
    end_dt = _to_end_dt(end)

    # Доставленные заказы за период
    delivered_orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).to_list()

    # Все заказы за период (для общей статистики)
    all_orders = await Order.find(
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).to_list()

    revenue = round(sum(o.total for o in delivered_orders), 2)

    # COGS
    cogs = 0.0
    for order in delivered_orders:
        for item in order.items:
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            cogs += qty * item.cost_price
    cogs = round(cogs, 2)

    gross_profit = round(revenue - cogs, 2)
    gross_margin_pct = round(gross_profit / revenue * 100, 1) if revenue > 0 else 0.0
    tax = round(revenue * 0.06, 2)

    # Расходы за период
    from app.models.finance import Expense
    expenses = await Expense.find(
        Expense.date >= start,  # type: ignore
        Expense.date <= end,    # type: ignore
    ).to_list()
    total_expenses = round(sum(e.amount for e in expenses), 2)

    net_profit = round(gross_profit - total_expenses - tax, 2)
    net_margin_pct = round(net_profit / revenue * 100, 1) if revenue > 0 else 0.0

    # Уникальные клиенты
    client_ids = set()
    for order in all_orders:
        cid = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)
        client_ids.add(cid)

    orders_count = len(delivered_orders)
    avg_order_value = round(revenue / orders_count, 2) if orders_count > 0 else 0.0

    # Новые клиенты за период
    from app.models.user import User
    new_clients = await User.find(
        User.created_at >= start_dt,  # type: ignore
        User.created_at <= end_dt,    # type: ignore
    ).count()

    # Оплаченные заказы
    from app.models.order import PaymentStatus
    paid_orders = [o for o in delivered_orders if o.payment_status == PaymentStatus.PAID]
    paid_revenue = round(sum(o.paid_amount for o in all_orders), 2)

    logger.info(
        "Обзорная аналитика рассчитана",
        start=str(start),
        end=str(end),
        revenue=revenue,
        net_profit=net_profit,
        orders_count=orders_count,
    )

    return {
        "period": {"start": str(start), "end": str(end)},
        "revenue": revenue,
        "cogs": cogs,
        "gross_profit": gross_profit,
        "gross_margin_pct": gross_margin_pct,
        "total_expenses": total_expenses,
        "tax": tax,
        "net_profit": net_profit,
        "net_margin_pct": net_margin_pct,
        "orders_count": orders_count,
        "all_orders_count": len(all_orders),
        "unique_clients": len(client_ids),
        "new_clients": new_clients,
        "avg_order_value": avg_order_value,
        "paid_revenue": paid_revenue,
        "paid_orders_count": len(paid_orders),
    }


async def get_revenue_chart(start: date, end: date, granularity: str = "day") -> list:
    """
    UC-12: Данные для графика выручки.

    Args:
        start: Начало периода
        end: Конец периода
        granularity: Гранулярность: "day", "week", "month"

    Returns:
        Список [{date/period, revenue, orders_count, gross_profit}]
    """
    start_dt = _to_start_dt(start)
    end_dt = _to_end_dt(end)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).sort(Order.created_at).to_list()

    # Группируем по периоду
    buckets: dict = {}

    for order in orders:
        order_date = order.created_at.date()

        if granularity == "day":
            key = str(order_date)
        elif granularity == "week":
            # Начало недели (понедельник)
            week_start = order_date - timedelta(days=order_date.weekday())
            key = str(week_start)
        elif granularity == "month":
            key = f"{order_date.year}-{order_date.month:02d}"
        else:
            key = str(order_date)

        if key not in buckets:
            buckets[key] = {"revenue": 0.0, "orders_count": 0, "cogs": 0.0}

        buckets[key]["revenue"] += order.total
        buckets[key]["orders_count"] += 1

        for item in order.items:
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            buckets[key]["cogs"] += qty * item.cost_price

    # Формируем итоговый список
    result = []
    for period_key, data in sorted(buckets.items()):
        revenue = round(data["revenue"], 2)
        cogs = round(data["cogs"], 2)
        gross_profit = round(revenue - cogs, 2)
        result.append({
            "period": period_key,
            "revenue": revenue,
            "cogs": cogs,
            "gross_profit": gross_profit,
            "orders_count": data["orders_count"],
            "margin_pct": round(gross_profit / revenue * 100, 1) if revenue > 0 else 0.0,
        })

    return result


async def get_top_products(start: date, end: date, limit: int = 10) -> list:
    """
    UC-12: Топ товаров по выручке и количеству.

    Args:
        start: Начало периода
        end: Конец периода
        limit: Количество позиций в топе

    Returns:
        Список товаров, отсортированных по выручке
    """
    start_dt = _to_start_dt(start)
    end_dt = _to_end_dt(end)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).to_list()

    # Агрегируем по товарам
    products: dict = {}

    for order in orders:
        for item in order.items:
            pid = item.product_id
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty

            if pid not in products:
                products[pid] = {
                    "product_id": pid,
                    "product_name": item.product_name,
                    "revenue": 0.0,
                    "qty_sold": 0.0,
                    "orders_count": 0,
                    "cogs": 0.0,
                }

            products[pid]["revenue"] += item.total
            products[pid]["qty_sold"] += qty
            products[pid]["orders_count"] += 1
            products[pid]["cogs"] += qty * item.cost_price

    # Рассчитываем маржу и сортируем
    result = []
    for data in products.values():
        revenue = round(data["revenue"], 2)
        cogs = round(data["cogs"], 2)
        gross_profit = round(revenue - cogs, 2)
        result.append({
            **data,
            "revenue": revenue,
            "qty_sold": round(data["qty_sold"], 2),
            "cogs": cogs,
            "gross_profit": gross_profit,
            "margin_pct": round(gross_profit / revenue * 100, 1) if revenue > 0 else 0.0,
        })

    # Сортируем по выручке
    result.sort(key=lambda x: x["revenue"], reverse=True)
    return result[:limit]


async def get_top_clients(start: date, end: date, limit: int = 10) -> list:
    """
    UC-12: Топ клиентов по выручке и количеству заказов.

    Args:
        start: Начало периода
        end: Конец периода
        limit: Количество клиентов в топе

    Returns:
        Список клиентов, отсортированных по выручке
    """
    start_dt = _to_start_dt(start)
    end_dt = _to_end_dt(end)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).to_list()

    # Агрегируем по клиентам
    clients: dict = {}

    for order in orders:
        cid = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)

        if cid not in clients:
            clients[cid] = {
                "client_id": cid,
                "client_name": order.client_name,
                "client_phone": order.client_phone,
                "revenue": 0.0,
                "orders_count": 0,
            }

        clients[cid]["revenue"] += order.total
        clients[cid]["orders_count"] += 1

    result = []
    for data in clients.values():
        revenue = round(data["revenue"], 2)
        result.append({
            **data,
            "revenue": revenue,
            "avg_order_value": round(revenue / data["orders_count"], 2) if data["orders_count"] > 0 else 0.0,
        })

    result.sort(key=lambda x: x["revenue"], reverse=True)
    return result[:limit]


async def get_margin_by_products(start: date, end: date) -> list:
    """
    UC-12: Маржинальность по товарам за период.

    Возвращает все товары, отсортированные по абсолютной марже.

    Args:
        start: Начало периода
        end: Конец периода

    Returns:
        Список товаров с маржинальностью
    """
    start_dt = _to_start_dt(start)
    end_dt = _to_end_dt(end)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,  # type: ignore
        Order.created_at <= end_dt,    # type: ignore
    ).to_list()

    products: dict = {}

    for order in orders:
        for item in order.items:
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            pid = item.product_id

            if pid not in products:
                products[pid] = {
                    "product_id": pid,
                    "product_name": item.product_name,
                    "revenue": 0.0,
                    "cogs": 0.0,
                    "qty_sold": 0.0,
                    "avg_price": item.price,
                    "avg_cost_price": item.cost_price,
                }

            products[pid]["revenue"] += item.total
            products[pid]["cogs"] += qty * item.cost_price
            products[pid]["qty_sold"] += qty

    result = []
    for data in products.values():
        revenue = round(data["revenue"], 2)
        cogs = round(data["cogs"], 2)
        gross_profit = round(revenue - cogs, 2)
        qty = round(data["qty_sold"], 2)
        margin_per_unit = round(gross_profit / qty, 2) if qty > 0 else 0.0

        result.append({
            "product_id": data["product_id"],
            "product_name": data["product_name"],
            "revenue": revenue,
            "cogs": cogs,
            "gross_profit": gross_profit,
            "margin_pct": round(gross_profit / revenue * 100, 1) if revenue > 0 else 0.0,
            "margin_per_unit": margin_per_unit,
            "qty_sold": qty,
            "avg_price": data["avg_price"],
            "avg_cost_price": data["avg_cost_price"],
        })

    result.sort(key=lambda x: x["gross_profit"], reverse=True)
    return result


async def get_trends(months: int = 6) -> list:
    """
    UC-12: Тренды за последние N месяцев.

    Возвращает помесячную аналитику для отображения на дашборде.

    Args:
        months: Количество месяцев для анализа

    Returns:
        Список [{month, revenue, gross_profit, orders_count, margin_pct}]
    """
    today = date.today()
    result = []

    for i in range(months - 1, -1, -1):
        # Определяем начало и конец месяца
        month_date = today.replace(day=1) - timedelta(days=i * 30)
        month_start = month_date.replace(day=1)

        # Конец месяца
        if month_start.month == 12:
            month_end_candidate = month_start.replace(year=month_start.year + 1, month=1, day=1)
        else:
            month_end_candidate = month_start.replace(month=month_start.month + 1, day=1)
        month_end = month_end_candidate - timedelta(days=1)

        # Не выходим за текущий день
        if month_end > today:
            month_end = today

        start_dt = _to_start_dt(month_start)
        end_dt = _to_end_dt(month_end)

        orders = await Order.find(
            Order.status == OrderStatus.DELIVERED,
            Order.created_at >= start_dt,  # type: ignore
            Order.created_at <= end_dt,    # type: ignore
        ).to_list()

        revenue = round(sum(o.total for o in orders), 2)
        cogs = 0.0
        for order in orders:
            for item in order.items:
                qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
                cogs += qty * item.cost_price
        cogs = round(cogs, 2)
        gross_profit = round(revenue - cogs, 2)

        # Расходы за месяц
        from app.models.finance import Expense
        expenses = await Expense.find(
            Expense.date >= month_start,  # type: ignore
            Expense.date <= month_end,    # type: ignore
        ).to_list()
        total_expenses = round(sum(e.amount for e in expenses), 2)
        tax = round(revenue * 0.06, 2)
        net_profit = round(gross_profit - total_expenses - tax, 2)

        result.append({
            "month": f"{month_start.year}-{month_start.month:02d}",
            "month_label": month_start.strftime("%b %Y"),
            "revenue": revenue,
            "cogs": cogs,
            "gross_profit": gross_profit,
            "gross_margin_pct": round(gross_profit / revenue * 100, 1) if revenue > 0 else 0.0,
            "net_profit": net_profit,
            "net_margin_pct": round(net_profit / revenue * 100, 1) if revenue > 0 else 0.0,
            "orders_count": len(orders),
        })

    return result


async def get_client_analytics(client_id: str) -> dict:
    """
    UC-57: Аналитика клиента (для личного кабинета).

    Args:
        client_id: ID клиента

    Returns:
        Словарь с аналитикой клиента
    """
    from beanie import PydanticObjectId

    # Все заказы клиента (только доставленные)
    delivered_orders = await Order.find(
        {"client_id.$id": PydanticObjectId(client_id)},
        Order.status == OrderStatus.DELIVERED,
    ).sort(Order.created_at).to_list()

    total_orders = len(delivered_orders)
    total_spent = round(sum(o.total for o in delivered_orders), 2)
    avg_check = round(total_spent / total_orders, 2) if total_orders > 0 else 0.0

    # Топ товары
    products: dict = {}
    for order in delivered_orders:
        for item in order.items:
            pid = item.product_id
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            if pid not in products:
                products[pid] = {
                    "product_id": pid,
                    "product_name": item.product_name,
                    "total_spent": 0.0,
                    "total_qty": 0.0,
                    "orders_count": 0,
                }
            products[pid]["total_spent"] += item.total
            products[pid]["total_qty"] += qty
            products[pid]["orders_count"] += 1

    top_products = sorted(
        products.values(),
        key=lambda x: x["total_spent"],
        reverse=True,
    )[:10]

    for p in top_products:
        p["total_spent"] = round(p["total_spent"], 2)
        p["total_qty"] = round(p["total_qty"], 2)

    # Расходы по месяцам
    monthly: dict = {}
    for order in delivered_orders:
        key = f"{order.created_at.year}-{order.created_at.month:02d}"
        monthly[key] = monthly.get(key, 0.0) + order.total

    monthly_chart = [
        {"month": k, "spent": round(v, 2)}
        for k, v in sorted(monthly.items())
    ]

    # Последний заказ
    last_order = delivered_orders[-1] if delivered_orders else None
    last_order_date = last_order.created_at.date() if last_order else None

    return {
        "client_id": client_id,
        "total_orders": total_orders,
        "total_spent": total_spent,
        "avg_check": avg_check,
        "top_products": top_products,
        "monthly_spending": monthly_chart,
        "last_order_date": str(last_order_date) if last_order_date else None,
    }
