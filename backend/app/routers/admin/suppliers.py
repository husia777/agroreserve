"""
Роутер управления поставщиками (администратор).
Эндпоинты: /api/v1/admin/suppliers/
"""
import math
from datetime import datetime, timezone
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.price_log import PriceLog
from app.models.supplier import Supplier
from app.schemas.supplier import (
    SupplierCreate,
    SupplierListResponse,
    SupplierResponse,
    SupplierUpdate,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/suppliers", tags=["Админ: Поставщики"])


def _to_response(supplier: Supplier) -> SupplierResponse:
    """Конвертирует Supplier в ответ API."""
    return SupplierResponse(
        **{
            "_id": str(supplier.id),
            "name": supplier.name,
            "contact_person": supplier.contact_person,
            "phone": supplier.phone,
            "email": supplier.email,
            "address": supplier.address,
            "inn": supplier.inn,
            "product_ids": [str(pid) for pid in supplier.product_ids],
            "rating": supplier.rating,
            "notes": supplier.notes,
            "is_active": supplier.is_active,
            "created_at": supplier.created_at.isoformat(),
            "updated_at": supplier.updated_at.isoformat(),
        }
    )


@router.get(
    "/",

    summary="Список поставщиков",
)
async def get_suppliers(
    is_active: Optional[bool] = Query(None, description="Фильтр по активности"),
    search: Optional[str] = Query(None, description="Поиск по названию"),
    min_rating: Optional[float] = Query(None, description="Минимальный рейтинг"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    _=Depends(require_admin),
):
    """
    Список поставщиков с фильтрацией и пагинацией.
    Сортировка: по рейтингу (лучшие первые).
    """
    query: dict = {}

    if is_active is not None:
        query["is_active"] = is_active
    if min_rating is not None:
        query["rating"] = {"$gte": min_rating}
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"contact_person": {"$regex": search, "$options": "i"}},
        ]

    total = await Supplier.find(query).count()
    suppliers = (
        await Supplier.find(query)
        .sort(-Supplier.rating)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    return [_to_response(s) for s in suppliers]


@router.post(
    "/",
    response_model=SupplierResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать поставщика",
)
async def create_supplier(
    data: SupplierCreate,
    _=Depends(require_admin),
):
    """
    Добавить нового поставщика в справочник.
    """
    now = datetime.now(timezone.utc)

    supplier = Supplier(
        name=data.name,
        contact_person=data.contact_person,
        phone=data.phone,
        email=data.email,
        address=data.address,
        inn=data.inn,
        product_ids=[PydanticObjectId(pid) for pid in data.product_ids],
        rating=data.rating,
        notes=data.notes,
        is_active=data.is_active,
        created_at=now,
        updated_at=now,
    )
    await supplier.insert()

    logger.info(
        "Поставщик создан",
        supplier_id=str(supplier.id),
        name=data.name,
    )

    return _to_response(supplier)


@router.get(
    "/{supplier_id}",
    response_model=SupplierResponse,
    summary="Получить поставщика",
)
async def get_supplier(
    supplier_id: str,
    _=Depends(require_admin),
):
    """Детальная информация о поставщике."""
    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    return _to_response(supplier)


@router.patch(
    "/{supplier_id}",
    response_model=SupplierResponse,
    summary="Обновить поставщика",
)
async def update_supplier(
    supplier_id: str,
    data: SupplierUpdate,
    _=Depends(require_admin),
):
    """
    Обновить данные поставщика.
    """
    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if data.name is not None:
        supplier.name = data.name
    if data.contact_person is not None:
        supplier.contact_person = data.contact_person
    if data.phone is not None:
        supplier.phone = data.phone
    if data.email is not None:
        supplier.email = data.email
    if data.address is not None:
        supplier.address = data.address
    if data.inn is not None:
        supplier.inn = data.inn
    if data.product_ids is not None:
        supplier.product_ids = [PydanticObjectId(pid) for pid in data.product_ids]
    if data.rating is not None:
        supplier.rating = data.rating
    if data.notes is not None:
        supplier.notes = data.notes
    if data.is_active is not None:
        supplier.is_active = data.is_active

    supplier.updated_at = datetime.now(timezone.utc)
    await supplier.save()

    logger.info(
        "Поставщик обновлён",
        supplier_id=supplier_id,
        name=supplier.name,
    )

    return _to_response(supplier)


@router.delete(
    "/{supplier_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Деактивировать поставщика",
)
async def delete_supplier(
    supplier_id: str,
    _=Depends(require_admin),
):
    """
    Деактивировать поставщика (мягкое удаление).
    """
    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    supplier.is_active = False
    supplier.updated_at = datetime.now(timezone.utc)
    await supplier.save()

    logger.info(
        "Поставщик деактивирован",
        supplier_id=supplier_id,
        name=supplier.name,
    )


@router.get(
    "/{supplier_id}/prices",
    summary="История цен поставщика",
)
async def get_supplier_price_history(
    supplier_id: str,
    product_id: Optional[str] = Query(None, description="Фильтр по товару"),
    limit: int = Query(50, ge=1, le=500, description="Количество записей"),
    _=Depends(require_admin),
):
    """
    История закупочных цен от данного поставщика.
    Используется для анализа динамики цен и выбора лучшего поставщика.
    """
    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    query: dict = {"supplier_id": PydanticObjectId(supplier_id)}
    if product_id:
        try:
            query["product_id"] = PydanticObjectId(product_id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат product_id",
            )

    price_logs = (
        await PriceLog.find(query)
        .sort(-PriceLog.logged_at)
        .limit(limit)
        .to_list()
    )

    return {
        "supplier_id": supplier_id,
        "supplier_name": supplier.name,
        "price_logs": [
            {
                "id": str(log.id),
                "product_id": str(log.product_id),
                "product_name": log.product_name,
                "price": log.price,
                "unit": log.unit,
                "receipt_id": str(log.receipt_id) if log.receipt_id else None,
                "logged_at": log.logged_at.isoformat(),
            }
            for log in price_logs
        ],
        "total": len(price_logs),
    }


@router.get(
    "/{supplier_id}/products",
    summary="Товары поставщика",
)
async def get_supplier_products(
    supplier_id: str,
    _=Depends(require_admin),
):
    """
    Список товаров, которые поставляет данный поставщик.
    Возвращает актуальные данные из каталога по привязанным product_ids.
    """
    try:
        supplier = await Supplier.get(PydanticObjectId(supplier_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Поставщик не найден")

    if not supplier.product_ids:
        return {"supplier_id": supplier_id, "supplier_name": supplier.name, "products": []}

    from app.models.product import Product

    products = await Product.find(
        {"_id": {"$in": supplier.product_ids}, "is_active": True}
    ).to_list()

    return {
        "supplier_id": supplier_id,
        "supplier_name": supplier.name,
        "products": [
            {
                "id": str(p.id),
                "name": p.name,
                "unit": p.unit,
                "stock_qty": p.stock_qty,
                "cost_price": p.cost_price,
                "min_stock_qty": p.min_stock_qty,
            }
            for p in products
        ],
    }
