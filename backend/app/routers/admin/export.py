"""
Роутер экспорта данных (UC-83).
Эндпоинты: /api/v1/admin/export/
"""

from datetime import UTC, datetime

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse

from app.services.export_service import export_products_csv, export_products_excel
from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin/export", tags=["Администрирование — Экспорт"])
logger = structlog.get_logger(__name__)


@router.get(
    "/products/excel",
    summary="Экспорт товаров в Excel (UC-83)",
)
async def export_products_to_excel(
    include_purchase_price: bool = Query(True, description="Включить закупочную цену"),
    only_active: bool = Query(False, description="Только активные товары"),
    category_id: str = Query(None, description="Фильтр по категории"),
    admin=Depends(require_admin),
):
    """Выгрузка каталога товаров с остатками и ценами в Excel."""
    buffer = await export_products_excel(
        include_purchase_price=include_purchase_price,
        only_active=only_active,
        category_id=category_id,
    )

    filename = f"agroreserve_products_{datetime.now(UTC).strftime('%Y%m%d')}.xlsx"

    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get(
    "/products/csv",
    summary="Экспорт товаров в CSV (UC-83)",
)
async def export_products_to_csv(
    include_purchase_price: bool = Query(True, description="Включить закупочную цену"),
    only_active: bool = Query(False, description="Только активные товары"),
    admin=Depends(require_admin),
):
    """Выгрузка каталога товаров в CSV (UTF-8, разделитель — точка с запятой)."""
    buffer = await export_products_csv(
        include_purchase_price=include_purchase_price,
        only_active=only_active,
    )

    filename = f"agroreserve_products_{datetime.now(UTC).strftime('%Y%m%d')}.csv"

    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# ───────────────────────────────────────────────────────────────
# UC-83: Экспорт заказов за период
# ───────────────────────────────────────────────────────────────


@router.get(
    "/orders/excel",
    summary="UC-83: Экспорт заказов за период в Excel (3 листа: заказы, позиции, итоги)",
)
async def export_orders_to_excel(
    date_from: str = Query(..., description="Дата начала (YYYY-MM-DD)"),
    date_to: str = Query(..., description="Дата окончания (YYYY-MM-DD)"),
    statuses: str = Query(
        None,
        description="Статусы через запятую: new,confirmed,delivered,completed",
    ),
    client_id: str = Query(None, description="ID клиента (если нужен фильтр)"),
    only_paid: bool = Query(False, description="Только оплаченные заказы"),
    admin=Depends(require_admin),
):
    """
    Выгрузка заказов за период. Три листа:
    - Заказы: строка на заказ с маржой и статусом оплаты
    - Позиции: детализация по товарам
    - Итоги: сводка (выручка, маржа, средний чек, разбивка по статусам)
    """
    from datetime import date as _date

    from app.services.export_service import export_orders_excel

    try:
        df = _date.fromisoformat(date_from)
        dt = _date.fromisoformat(date_to)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Неверный формат даты. Используйте YYYY-MM-DD",
        )

    status_list = [s.strip() for s in statuses.split(",")] if statuses else None

    buffer = await export_orders_excel(
        date_from=df,
        date_to=dt,
        statuses=status_list,
        client_id=client_id,
        only_paid=only_paid,
    )

    filename = f"agroreserve_orders_{df.strftime('%Y%m%d')}_{dt.strftime('%Y%m%d')}.xlsx"

    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
