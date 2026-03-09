"""
Роутер управления закупками (администратор).
Эндпоинты: /api/v1/admin/procurement/
"""
import math
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from pydantic import BaseModel, Field

from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/procurement", tags=["Админ: Закупки"])


class PurchaseOrderItem(BaseModel):
    """Позиция заявки поставщику."""
    product_id: str = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара")
    qty: float = Field(..., gt=0, description="Количество")
    unit: str = Field("kg", description="Единица измерения")
    price: float = Field(0.0, ge=0, description="Цена за единицу (₽)")


class PurchaseOrderRequest(BaseModel):
    """Запрос на формирование заявки поставщику."""
    supplier_id: str = Field(..., description="ID поставщика")
    items: List[PurchaseOrderItem] = Field(..., min_length=1, description="Позиции заявки")
    note: Optional[str] = Field(None, description="Примечание к заявке")


@router.get(
    "/recommendations",
    summary="Рекомендации по закупкам (UC-27)",
)
async def get_purchase_recommendations(
    urgency: Optional[str] = Query(None, description="Фильтр по срочности: critical, high, medium, ok"),
    _=Depends(require_admin),
):
    """
    Рекомендации по закупке товаров на основе:
    - Текущих остатков
    - Минимальных остатков
    - Среднего расхода за 7 и 30 дней
    - Открытых (зарезервированных) заказов

    Формула рекомендации:
    max(0, min_stock + avg_weekly × 2 - current_stock + reserved)

    Уровни срочности:
    - critical: остаток < 3 дней расхода
    - high: остаток ниже минимума
    - medium: рекомендуется дозакупить
    - ok: запасов достаточно
    """
    from app.services.procurement_service import get_purchase_recommendations

    recommendations = await get_purchase_recommendations()

    # Фильтруем по срочности
    if urgency:
        valid_urgencies = {"critical", "high", "medium", "ok"}
        if urgency not in valid_urgencies:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Недопустимая срочность. Допустимые значения: {', '.join(valid_urgencies)}",
            )
        recommendations = [r for r in recommendations if r["urgency"] == urgency]

    # Суммарная стоимость рекомендованных закупок
    total_estimated_cost = sum(r["estimated_purchase_cost"] for r in recommendations)

    return recommendations


@router.post(
    "/order",
    summary="Сформировать заявку поставщику (PDF)",
)
async def create_purchase_order(
    data: PurchaseOrderRequest,
    _=Depends(require_admin),
):
    """
    Генерирует PDF заявки поставщику.

    Возвращает PDF-файл для отправки/печати.
    Если WeasyPrint недоступен — возвращает HTML.
    """
    from app.services.procurement_service import generate_purchase_order_pdf

    items = [
        {
            "product_id": item.product_id,
            "product_name": item.product_name,
            "qty": item.qty,
            "unit": item.unit,
            "price": item.price,
        }
        for item in data.items
    ]

    try:
        content = await generate_purchase_order_pdf(data.supplier_id, items)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    # Определяем тип контента
    content_type = "application/pdf" if content[:4] == b"%PDF" else "text/html; charset=utf-8"
    filename = f"purchase_order_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}"
    filename += ".pdf" if content[:4] == b"%PDF" else ".html"

    logger.info(
        "Заявка поставщику сформирована",
        supplier_id=data.supplier_id,
        items_count=len(data.items),
    )

    return Response(
        content=content,
        media_type=content_type,
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@router.get(
    "/price-logs",
    summary="История закупочных цен (UC-61)",
)
async def get_price_logs(
    product_id: Optional[str] = Query(None, description="Фильтр по товару"),
    supplier_id: Optional[str] = Query(None, description="Фильтр по поставщику"),
    days: int = Query(90, ge=7, le=365, description="Период (дней)"),
    _=Depends(require_admin),
):
    """
    История закупочных цен от поставщиков.

    Используется для:
    - Анализа тренда цен по товарам
    - Сравнения цен разных поставщиков
    - Принятия решений о выборе поставщика

    Возвращает записи с группировкой по товарам и поставщикам.
    """
    from datetime import timedelta

    from app.models.price_log import PriceLog

    since = datetime.now(timezone.utc) - timedelta(days=days)
    query: dict = {"logged_at": {"$gte": since}}

    if product_id:
        try:
            query["product_id"] = PydanticObjectId(product_id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат product_id",
            )

    if supplier_id:
        try:
            query["supplier_id"] = PydanticObjectId(supplier_id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат supplier_id",
            )

    logs = await PriceLog.find(query).sort(-PriceLog.logged_at).to_list()

    # Группируем по товарам для анализа трендов
    by_product: Dict[str, Any] = {}
    for log in logs:
        pid = str(log.product_id)
        if pid not in by_product:
            by_product[pid] = {
                "product_id": pid,
                "product_name": log.product_name,
                "unit": log.unit,
                "price_points": [],
                "suppliers": set(),
                "min_price": float("inf"),
                "max_price": 0.0,
                "avg_price": 0.0,
            }

        entry = by_product[pid]
        entry["price_points"].append({
            "price": log.price,
            "supplier_id": str(log.supplier_id),
            "supplier_name": log.supplier_name,
            "logged_at": log.logged_at.isoformat(),
        })
        entry["suppliers"].add(log.supplier_name)
        entry["min_price"] = min(entry["min_price"], log.price)
        entry["max_price"] = max(entry["max_price"], log.price)

    # Финализируем агрегацию
    result_by_product = []
    for pid, data in by_product.items():
        prices = [p["price"] for p in data["price_points"]]
        data["avg_price"] = round(sum(prices) / len(prices), 2) if prices else 0.0
        data["suppliers"] = list(data["suppliers"])
        if data["min_price"] == float("inf"):
            data["min_price"] = 0.0
        result_by_product.append(data)

    return {
        "total_records": len(logs),
        "period_days": days,
        "by_product": result_by_product,
        "raw_logs": [
            {
                "id": str(log.id),
                "product_id": str(log.product_id),
                "product_name": log.product_name,
                "supplier_id": str(log.supplier_id),
                "supplier_name": log.supplier_name,
                "price": log.price,
                "unit": log.unit,
                "receipt_id": str(log.receipt_id) if log.receipt_id else None,
                "logged_at": log.logged_at.isoformat(),
            }
            for log in logs[:500]  # Ограничиваем вывод сырых данных
        ],
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
