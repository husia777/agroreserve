"""
Роутер управления складом (администратор).
Эндпоинты: /api/v1/admin/stock/
"""
import math
from datetime import date, datetime, timezone
from typing import List, Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.product import Product
from app.models.stock import StockReceipt
from app.schemas.stock import (
    StockItemResponse,
    StockReceiptCreate,
    StockReceiptResponse,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/stock", tags=["Админ: Склад"])


def _receipt_to_response(receipt: StockReceipt) -> StockReceiptResponse:
    """Конвертирует StockReceipt в ответ API."""
    return StockReceiptResponse(
        **{
            "_id": str(receipt.id),
            "receipt_number": receipt.receipt_number,
            "supplier_id": receipt.supplier_id,
            "supplier_name": receipt.supplier_name,
            "invoice_number": receipt.invoice_number,
            "date": str(receipt.date),
            "items": [
                {
                    "product_id": item.product_id,
                    "product_name": item.product_name,
                    "qty": item.qty,
                    "unit": item.unit,
                    "cost_price": item.cost_price,
                    "total": item.total,
                }
                for item in receipt.items
            ],
            "total": receipt.total,
            "synced_to_1c": receipt.synced_to_1c,
            "notes": receipt.notes,
            "created_at": receipt.created_at.isoformat(),
        }
    )


@router.get(
    "/",
    summary="Текущие остатки товаров",
)
async def get_stock(
    category_id: Optional[str] = Query(None, description="Фильтр по категории"),
    low_stock_only: bool = Query(False, description="Только товары с низким остатком"),
    admin=Depends(require_admin),
):
    """
    Список текущих остатков всех товаров.
    Возвращает массив StockItem[] (как ожидает фронтенд).
    """
    query_filter: dict = {"is_active": True}

    if category_id:
        try:
            query_filter["category_id.$id"] = PydanticObjectId(category_id)
        except Exception:
            pass

    if low_stock_only:
        query_filter["$expr"] = {"$lt": ["$stock_qty", "$min_stock_qty"]}

    products = (
        await Product.find(query_filter)
        .sort(Product.name)
        .to_list()
    )

    # Получаем категории для отображения
    from app.models.product import Category
    category_map: dict = {}
    all_cats = await Category.find_all().to_list()
    for cat in all_cats:
        category_map[str(cat.id)] = cat.name

    # Возвращаем массив в формате, ожидаемом фронтендом:
    # { product_id, quantity, min_quantity, is_critical, product: { name, unit, category: { name } }, updated_at }
    items = []
    for p in products:
        cat_id = (
            str(p.category_id.ref.id)
            if hasattr(p.category_id, "ref")
            else str(p.category_id)
        )
        cat_name = category_map.get(cat_id, "")

        is_critical = p.stock_qty < p.min_stock_qty

        items.append(
            {
                "product_id": str(p.id),
                "quantity": p.stock_qty,
                "min_quantity": p.min_stock_qty,
                "is_critical": is_critical,
                "updated_at": p.updated_at.isoformat() if p.updated_at else "",
                "product": {
                    "name": p.name,
                    "unit": p.unit.value if hasattr(p.unit, "value") else p.unit,
                    "category": {
                        "name": cat_name,
                    },
                },
            }
        )

    # Фронтенд ожидает массив, не объект с пагинацией
    return items


@router.get(
    "/receipts",
    summary="Список приходных документов",
)
async def get_receipts(
    date_from: Optional[date] = Query(None, description="С даты"),
    date_to: Optional[date] = Query(None, description="По дату"),
    supplier: Optional[str] = Query(None, description="Фильтр по поставщику"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=200),
    admin=Depends(require_admin),
):
    """Список приходных документов с фильтрами."""
    query_filter: dict = {}

    if date_from:
        query_filter.setdefault("date", {})["$gte"] = date_from

    if date_to:
        query_filter.setdefault("date", {})["$lte"] = date_to

    if supplier:
        query_filter["supplier_name"] = {"$regex": supplier, "$options": "i"}

    total = await StockReceipt.find(query_filter).count()
    receipts = (
        await StockReceipt.find(query_filter)
        .sort(-StockReceipt.date)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    items = [
        {
            "id": str(r.id),
            "receipt_number": r.receipt_number,
            "supplier_name": r.supplier_name,
            "invoice_number": r.invoice_number,
            "date": str(r.date),
            "items_count": len(r.items),
            "total": r.total,
            "synced_to_1c": r.synced_to_1c,
            "created_at": r.created_at.isoformat(),
        }
        for r in receipts
    ]

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.post(
    "/receipts",
    status_code=status.HTTP_201_CREATED,
    summary="Создать приход товара",
)
async def create_receipt(
    data: StockReceiptCreate,
    admin=Depends(require_admin),
):
    """
    Создаёт приходной документ.

    При проведении:
    1. Создаёт документ REC-YYYY-NNNNN
    2. Увеличивает остатки товаров
    3. Пересчитывает средневзвешенную себестоимость
    4. Логирует для синхронизации с 1С
    """
    from app.services.stock_service import create_stock_receipt

    try:
        receipt = await create_stock_receipt(
            data=data.model_dump(),
            created_by=str(admin.id),
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    logger.info(
        "Приход создан",
        receipt_number=receipt.receipt_number,
        supplier=receipt.supplier_name,
        admin_id=str(admin.id),
    )

    # Проверяем низкие остатки после прихода
    from app.services.stock_service import get_low_stock_products
    low_products = await get_low_stock_products()
    if low_products:
        from app.services.notification_service import notify_admin_low_stock
        try:
            await notify_admin_low_stock(low_products)
        except Exception as e:
            logger.warning("Ошибка отправки уведомления о низких остатках", error=str(e))

    return _receipt_to_response(receipt)


@router.get(
    "/receipts/{receipt_id}",
    summary="Детали приходного документа",
)
async def get_receipt(
    receipt_id: str,
    admin=Depends(require_admin),
):
    """Детали конкретного приходного документа."""
    try:
        receipt = await StockReceipt.get(PydanticObjectId(receipt_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден")

    if not receipt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден")

    return _receipt_to_response(receipt)


@router.get(
    "/low-stock",
    summary="Товары с низким остатком",
)
async def get_low_stock(
    admin=Depends(require_admin),
):
    """Список товаров, у которых остаток ниже минимального."""
    from app.services.stock_service import get_low_stock_products
    products = await get_low_stock_products()

    return {
        "count": len(products),
        "products": products,
    }
