"""
Роутер экспорта данных (UC-83).
Эндпоинты: /api/v1/admin/export/
"""
from datetime import datetime, timezone

import structlog
from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

from app.services.export_service import export_products_excel, export_products_csv
from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin/export",
                   tags=["Администрирование — Экспорт"])
logger = structlog.get_logger(__name__)


@router.get(
    "/products/excel",
    summary="Экспорт товаров в Excel (UC-83)",
)
async def export_products_to_excel(
    include_purchase_price: bool = Query(
        True, description="Включить закупочную цену"),
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

    filename = f"agroreserve_products_{datetime.now(timezone.utc).strftime('%Y%m%d')}.xlsx"

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
    include_purchase_price: bool = Query(
        True, description="Включить закупочную цену"),
    only_active: bool = Query(False, description="Только активные товары"),
    admin=Depends(require_admin),
):
    """Выгрузка каталога товаров в CSV (UTF-8, разделитель — точка с запятой)."""
    buffer = await export_products_csv(
        include_purchase_price=include_purchase_price,
        only_active=only_active,
    )

    filename = f"agroreserve_products_{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"

    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
