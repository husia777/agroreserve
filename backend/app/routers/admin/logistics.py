"""
Роутер логистики (администратор).
Эндпоинты: /api/v1/admin/logistics/
"""

from datetime import UTC, date, datetime

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, Response, status

from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/logistics", tags=["Админ: Логистика"])


@router.get(
    "/route-sheet",
    summary="Маршрутный лист на день (UC-63)",
)
async def get_route_sheet(
    delivery_date: date = Query(..., description="Дата доставки (YYYY-MM-DD)"),
    _=Depends(require_admin),
):
    """
    Маршрутный лист на указанную дату.

    Включает все заказы на эту дату со статусами:
    confirmed, assembling, assembled, delivering.

    Структура ответа:
    - Заказы сгруппированы по временным слотам
    - Для каждого заказа: адрес, товары, суммы, способ оплаты, вес
    - Итоговые показатели: кол-во заказов, общий вес, сумма
    """
    from app.services.logistics_service import get_route_sheet as svc_get_route_sheet

    route_data = await svc_get_route_sheet(delivery_date)

    logger.info(
        "Маршрутный лист запрошен через API",
        date=str(delivery_date),
        total_orders=route_data["total_orders"],
    )

    return route_data


@router.post(
    "/route-sheet/pdf",
    summary="Генерация PDF маршрутного листа",
)
async def generate_route_sheet_pdf(
    delivery_date: date = Query(..., description="Дата доставки (YYYY-MM-DD)"),
    _=Depends(require_admin),
):
    """
    Генерирует PDF маршрутного листа для водителя на указанную дату.

    Формат A4 горизонтальный.
    Если WeasyPrint не установлен — возвращает HTML для вывода в браузере.
    """
    from app.services.logistics_service import generate_route_sheet_pdf as svc_generate_pdf

    content = await svc_generate_pdf(delivery_date)

    # Определяем тип контента: PDF или HTML fallback
    is_pdf = content[:4] == b"%PDF"
    content_type = "application/pdf" if is_pdf else "text/html; charset=utf-8"
    filename = f"route_sheet_{delivery_date.strftime('%Y%m%d')}"
    filename += ".pdf" if is_pdf else ".html"

    logger.info(
        "PDF маршрутного листа сгенерирован",
        date=str(delivery_date),
        content_type=content_type,
    )

    return Response(
        content=content,
        media_type=content_type,
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@router.get(
    "/summary",
    summary="Сводка по доставкам за период",
)
async def get_delivery_summary(
    date_from: date = Query(..., description="С даты (YYYY-MM-DD)"),
    date_to: date = Query(..., description="По дату (YYYY-MM-DD)"),
    _=Depends(require_admin),
):
    """
    Сводная статистика по доставкам за указанный период.

    Показывает количество заказов и суммы по дням.
    Полезно для планирования логистики.
    """
    from datetime import timedelta

    from app.models.order import Order

    if date_from > date_to:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Дата начала не может быть позже даты окончания",
        )

    max_period_days = 60
    if (date_to - date_from).days > max_period_days:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Максимальный период запроса — {max_period_days} дней",
        )

    # Агрегируем заказы по датам
    orders = await Order.find(
        {
            "delivery_date": {
                "$gte": str(date_from),
                "$lte": str(date_to),
            },
            "status": {"$nin": ["cancelled"]},
        }
    ).to_list()

    # Группируем по дате
    by_date: dict = {}
    current = date_from
    while current <= date_to:
        by_date[str(current)] = {
            "date": str(current),
            "orders_count": 0,
            "total_amount": 0.0,
            "statuses": {},
        }
        current += timedelta(days=1)

    for order in orders:
        if not order.delivery_date:
            continue

        key = str(order.delivery_date)
        if key not in by_date:
            continue

        by_date[key]["orders_count"] += 1
        by_date[key]["total_amount"] = round(by_date[key]["total_amount"] + order.total, 2)

        order_status = order.status.value if hasattr(order.status, "value") else order.status
        by_date[key]["statuses"][order_status] = by_date[key]["statuses"].get(order_status, 0) + 1

    return {
        "date_from": str(date_from),
        "date_to": str(date_to),
        "total_orders": len(orders),
        "total_amount": round(sum(o.total for o in orders), 2),
        "by_date": list(by_date.values()),
        "generated_at": datetime.now(UTC).isoformat(),
    }
