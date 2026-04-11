"""
Роутер аналитики (администратор).
Эндпоинты: /api/v1/admin/analytics/

UC-12: Аналитика продаж — выручка, прибыль, топ товаров/клиентов, тренды.
"""

from datetime import date as DateType
from datetime import timedelta
from typing import Optional

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/analytics", tags=["Админ: Аналитика"])


def _get_period_dates(
    period: str,
    date_from: Optional[DateType] = None,
    date_to: Optional[DateType] = None,
) -> tuple[DateType, DateType]:
    """
    Вычисляет даты начала и конца периода.

    Args:
        period: Название периода (today, week, month, quarter, year, custom)
        date_from: Начало (для custom)
        date_to: Конец (для custom)

    Returns:
        Tuple (start, end)
    """
    today = DateType.today()

    if period == "today":
        return today, today
    if period == "week":
        start = today - timedelta(days=today.weekday())
        return start, today
    if period == "month":
        return today.replace(day=1), today
    if period == "quarter":
        quarter_month = ((today.month - 1) // 3) * 3 + 1
        start = today.replace(month=quarter_month, day=1)
        return start, today
    if period == "year":
        return today.replace(month=1, day=1), today
    if period == "custom":
        if not date_from or not date_to:
            raise ValueError("Для периода 'custom' необходимо указать date_from и date_to")
        if date_from > date_to:
            raise ValueError("Дата начала периода должна быть меньше или равна дате окончания")
        return date_from, date_to
    raise ValueError("Допустимые периоды: today, week, month, quarter, year, custom")


@router.get(
    "/overview",
    summary="Общая сводная статистика (UC-12)",
)
async def get_overview(
    period: str = Query("month", description="Период: today, week, month, quarter, year, custom"),
    date_from: Optional[DateType] = Query(None),
    date_to: Optional[DateType] = Query(None),
    admin=Depends(require_admin),
):
    """
    UC-12: Общая сводная статистика за период.

    Включает:
    - Выручка, прибыль (валовая и чистая), COGS, расходы, налог
    - Количество заказов, уникальных клиентов
    - Средний чек
    - Сравнение с предыдущим аналогичным периодом
    """
    try:
        start, end = _get_period_dates(period, date_from, date_to)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    from app.services.analytics_service import get_overview

    data = await get_overview(start, end)

    # Расчёт предыдущего периода для сравнения
    period_days = (end - start).days + 1
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=period_days - 1)

    try:
        prev_data = await get_overview(prev_start, prev_end)
    except Exception:
        prev_data = None

    # Добавляем % изменений
    comparison = {}
    if prev_data:
        for key in ["revenue", "net_profit", "orders_count", "unique_clients"]:
            current = data.get(key, 0)
            previous = prev_data.get(key, 0)
            if previous > 0:
                change_pct = round((current - previous) / previous * 100, 1)
            elif current > 0:
                change_pct = 100.0
            else:
                change_pct = 0.0
            comparison[f"{key}_change_pct"] = change_pct

    logger.info(
        "Аналитика: обзор",
        period=period,
        start=str(start),
        end=str(end),
        revenue=data.get("revenue"),
        admin_id=str(admin.id),
    )

    # Маппинг полей для фронтенда (AnalyticsOverview)
    return {
        "revenue": data.get("revenue", 0),
        "profit": data.get("net_profit", 0),
        "orders_count": data.get("orders_count", 0),
        "clients_count": data.get("unique_clients", 0),
        "avg_check": data.get("avg_order_value", 0),
        "margin_percent": data.get("gross_margin_pct", 0),
        "revenue_change": comparison.get("revenue_change_pct", 0),
        "profit_change": comparison.get("net_profit_change_pct", 0),
    }


@router.get(
    "/revenue",
    summary="Выручка по дням/неделям/месяцам (для графиков) (UC-12)",
)
async def get_revenue_chart(
    period: str = Query("month", description="Период: week, month, quarter, year, custom"),
    granularity: str = Query("day", description="Гранулярность: day, week, month"),
    date_from: Optional[DateType] = Query(None),
    date_to: Optional[DateType] = Query(None),
    admin=Depends(require_admin),
):
    """
    UC-12: Данные для графика выручки.

    Возвращает временной ряд [{period, revenue, cogs, gross_profit, orders_count, margin_pct}].

    Гранулярность:
    - day: каждый день
    - week: по неделям
    - month: по месяцам
    """
    try:
        start, end = _get_period_dates(period, date_from, date_to)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    valid_granularities = ["day", "week", "month"]
    if granularity not in valid_granularities:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Допустимые значения granularity: {', '.join(valid_granularities)}",
        )

    from app.services.analytics_service import get_revenue_chart

    data = await get_revenue_chart(start, end, granularity)

    return {
        "data": data,
        "period": {"start": str(start), "end": str(end)},
        "granularity": granularity,
        "total_revenue": round(sum(d["revenue"] for d in data), 2),
        "total_orders": sum(d["orders_count"] for d in data),
    }


@router.get(
    "/products/top",
    summary="Топ товаров по выручке/количеству (UC-12)",
)
async def get_top_products(
    period: str = Query("month", description="Период: week, month, quarter, year, custom"),
    limit: int = Query(10, ge=1, le=50),
    date_from: Optional[DateType] = Query(None),
    date_to: Optional[DateType] = Query(None),
    admin=Depends(require_admin),
):
    """
    UC-12: Топ товаров по выручке за период.

    Включает: выручку, себестоимость, маржу, количество проданных.
    """
    try:
        start, end = _get_period_dates(period, date_from, date_to)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    from app.services.analytics_service import get_top_products

    data = await get_top_products(start, end, limit)

    return {
        "products": data,
        "count": len(data),
        "period": {"start": str(start), "end": str(end)},
    }


@router.get(
    "/clients/top",
    summary="Топ клиентов по выручке/заказам (UC-12)",
)
async def get_top_clients(
    period: str = Query("month", description="Период: week, month, quarter, year, custom"),
    limit: int = Query(10, ge=1, le=50),
    date_from: Optional[DateType] = Query(None),
    date_to: Optional[DateType] = Query(None),
    admin=Depends(require_admin),
):
    """
    UC-12: Топ клиентов по выручке за период.

    Включает: выручку, количество заказов, средний чек.
    """
    try:
        start, end = _get_period_dates(period, date_from, date_to)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    from app.services.analytics_service import get_top_clients

    data = await get_top_clients(start, end, limit)

    return {
        "clients": data,
        "count": len(data),
        "period": {"start": str(start), "end": str(end)},
    }


@router.get(
    "/margins",
    summary="Маржинальность по товарам (UC-12)",
)
async def get_margins(
    period: str = Query("month", description="Период: week, month, quarter, year, custom"),
    date_from: Optional[DateType] = Query(None),
    date_to: Optional[DateType] = Query(None),
    admin=Depends(require_admin),
):
    """
    UC-12: Маржинальность по всем товарам за период.

    Показывает gross profit и % маржи для каждого товара.
    Сортировка: по абсолютной марже (от большей к меньшей).
    """
    try:
        start, end = _get_period_dates(period, date_from, date_to)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    from app.services.analytics_service import get_margin_by_products

    data = await get_margin_by_products(start, end)

    total_revenue = round(sum(d["revenue"] for d in data), 2)
    total_cogs = round(sum(d["cogs"] for d in data), 2)
    total_gross_profit = round(sum(d["gross_profit"] for d in data), 2)
    avg_margin_pct = round(total_gross_profit / total_revenue * 100, 1) if total_revenue > 0 else 0.0

    return {
        "products": data,
        "count": len(data),
        "summary": {
            "total_revenue": total_revenue,
            "total_cogs": total_cogs,
            "total_gross_profit": total_gross_profit,
            "avg_margin_pct": avg_margin_pct,
        },
        "period": {"start": str(start), "end": str(end)},
    }


@router.get(
    "/trends",
    summary="Тренды (выручка, маржа, заказы) (UC-12)",
)
async def get_trends(
    months: int = Query(6, ge=1, le=24, description="Количество месяцев для анализа"),
    admin=Depends(require_admin),
):
    """
    UC-12: Тренды за последние N месяцев.

    Помесячная аналитика для дашборда:
    - Выручка
    - Маржа (валовая и чистая)
    - Количество заказов
    """
    from app.services.analytics_service import get_trends

    data = await get_trends(months)

    # Рассчитываем тренд
    if len(data) >= 2:
        first_revenue = data[0]["revenue"]
        last_revenue = data[-1]["revenue"]
        overall_trend = (
            round((last_revenue - first_revenue) / max(first_revenue, 1) * 100, 1) if first_revenue > 0 else 0.0
        )
    else:
        overall_trend = 0.0

    logger.info(
        "Аналитика: тренды",
        months=months,
        admin_id=str(admin.id),
    )

    return {
        "trends": data,
        "months": months,
        "overall_revenue_trend_pct": overall_trend,
    }
