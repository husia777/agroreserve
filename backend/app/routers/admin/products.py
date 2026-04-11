"""
Роутер управления каталогом (для администратора).
Эндпоинты: /api/v1/admin/catalog/products, /api/v1/admin/catalog/categories
"""

import math
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Optional, cast

import structlog
from beanie import Link
from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from slugify import slugify

from app.models.product import Category, Product
from app.schemas.product import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
    ProductCreate,
    ProductListResponse,
    ProductResponse,
    ProductUpdate,
)
from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin", tags=["Администрирование — Каталог"])
logger = structlog.get_logger(__name__)

# Директория для хранения фото товаров
PRODUCT_IMAGES_DIR = "/app/media/products"
Path(PRODUCT_IMAGES_DIR).mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 МБ


def _product_to_response(product, category_name: str = "") -> dict:
    """Конвертирует Product модель в словарь для ProductResponse."""
    cat_id = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
    return {
        "id": str(product.id),
        "name": product.name,
        "slug": product.slug,
        "category_id": cat_id,
        "category_name": category_name,
        "category": {"id": cat_id, "name": category_name, "slug": ""} if category_name else None,
        "description": product.description,
        "country_of_origin": product.origin_country,
        "unit": product.unit.value if hasattr(product.unit, "value") else product.unit,
        "unit_weight": product.avg_item_weight_kg,
        "price_retail": product.price_retail,
        "price_wholesale": product.price_wholesale,
        "price_purchase": getattr(product, "cost_price", 0) or 0,
        "min_order_qty": product.min_order_qty,
        "order_step": product.order_step,
        "stock_quantity": product.stock_qty,
        "min_stock_quantity": product.min_stock_qty,
        "images": product.images,
        "storage_conditions": product.storage_conditions,
        "shelf_life_days": product.shelf_life_days,
        "is_active": product.is_active,
        "is_available": product.is_in_stock(),
        "is_low_stock": product.is_low_stock(),
        "popularity": 0,
        "certificate_ids": [],
        "created_at": product.created_at.isoformat(),
        "updated_at": product.updated_at.isoformat(),
    }


# ── Загрузка фото товара ─────────────────────────────────────


@router.post(
    "/catalog/products/upload-image",
    summary="Загрузить фото товара",
    status_code=201,
)
async def upload_product_image(
    file: UploadFile = File(..., description="Фото товара (JPG/PNG/WebP, до 5 МБ)"),
    admin=Depends(require_admin),
):
    """Загружает фото товара, возвращает URL."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Файл не выбран")

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Допустимые форматы: {', '.join(ALLOWED_EXTENSIONS)}")

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Файл слишком большой (макс. 5 МБ)")

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = Path(PRODUCT_IMAGES_DIR) / filename

    with Path(filepath).open("wb") as f:
        f.write(contents)

    url = f"/media/products/{filename}"
    logger.info("Фото товара загружено", filename=filename, size=len(contents), admin_id=str(admin.id))
    return {"url": url, "filename": filename, "size": len(contents)}


# ── Категории ─────────────────────────────────────────────────


@router.get(
    "/catalog/categories",
    response_model=list[CategoryResponse],
    summary="Список всех категорий (для админа)",
)
async def get_admin_categories(admin=Depends(require_admin)):
    """Возвращает все категории (включая неактивные) для админ-панели."""
    categories = await Category.find(sort="+sort_order").to_list()

    result = []
    for cat in categories:
        product_count = await Product.find({"category_id.$id": cat.id}).count()
        result.append(
            CategoryResponse(
                id=str(cat.id),
                name=cat.name,
                slug=cat.slug,
                icon_url=cat.icon_url,
                description=cat.description,
                parent_id=str(cat.parent_id.ref.id) if cat.parent_id else None,
                sort_order=cat.sort_order,
                is_active=cat.is_active,
                product_count=product_count,
            )
        )

    return result


@router.post(
    "/catalog/categories",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать категорию",
)
async def create_category(data: CategoryCreate, admin=Depends(require_admin)):
    """Создание новой категории товаров."""
    slug = data.slug or slugify(data.name, allow_unicode=False)

    existing = await Category.find_one({"slug": slug})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Категория со slug '{slug}' уже существует",
        )

    category = Category(
        name=data.name,
        slug=slug,
        icon_url=data.icon_url,
        description=data.description,
        parent_id=cast(Link["Category"] | None, data.parent_id),
        sort_order=data.sort_order,
        is_active=data.is_active,
    )
    await category.insert()

    logger.info("Категория создана", category_id=str(category.id), name=data.name)

    return CategoryResponse(
        id=str(category.id),
        name=category.name,
        slug=category.slug,
        icon_url=category.icon_url,
        description=category.description,
        parent_id=str(category.parent_id) if category.parent_id else None,
        sort_order=category.sort_order,
        is_active=category.is_active,
        product_count=0,
    )


@router.patch(
    "/catalog/categories/{category_id}",
    response_model=CategoryResponse,
    summary="Обновить категорию",
)
async def update_category(
    category_id: str,
    data: CategoryUpdate,
    admin=Depends(require_admin),
):
    """Частичное обновление категории."""
    from beanie import PydanticObjectId

    category = await Category.get(PydanticObjectId(category_id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Категория не найдена",
        )

    if data.name is not None:
        category.name = data.name
    if data.icon_url is not None:
        category.icon_url = data.icon_url
    if data.description is not None:
        category.description = data.description
    if data.sort_order is not None:
        category.sort_order = data.sort_order
    if data.is_active is not None:
        category.is_active = data.is_active

    await category.save()
    logger.info("Категория обновлена", category_id=category_id)

    product_count = await Product.find({"category_id.$id": category.id, "is_active": True}).count()

    return CategoryResponse(
        id=str(category.id),
        name=category.name,
        slug=category.slug,
        icon_url=category.icon_url,
        description=category.description,
        parent_id=str(category.parent_id) if category.parent_id else None,
        sort_order=category.sort_order,
        is_active=category.is_active,
        product_count=product_count,
    )


# ── Товары ────────────────────────────────────────────────────


@router.get(
    "/catalog/products",
    response_model=ProductListResponse,
    summary="Список товаров (admin)",
)
async def admin_get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin=Depends(require_admin),
):
    """Список товаров для администратора."""
    query_conditions: dict = {}

    if is_active is not None:
        query_conditions["is_active"] = is_active

    if search:
        query_conditions["name"] = {"$regex": search.strip(), "$options": "i"}

    total = await Product.find(query_conditions).count()
    skip = (page - 1) * limit
    products = await Product.find(query_conditions).sort("+name").skip(skip).limit(limit).to_list()

    items = []
    for product in products:
        items.append(ProductResponse(**_product_to_response(product)))

    pages = math.ceil(total / limit) if total > 0 else 0
    return ProductListResponse(items=items, total=total, page=page, limit=limit, pages=pages)


@router.post(
    "/catalog/products",
    status_code=status.HTTP_201_CREATED,
    summary="Создать товар",
)
async def create_product(data: ProductCreate, admin=Depends(require_admin)):
    """Создание нового товара каталога."""
    from beanie import PydanticObjectId

    from app.models.product import ProductUnit

    category = await Category.get(PydanticObjectId(data.category_id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Категория не найдена",
        )

    slug = data.slug or slugify(data.name, allow_unicode=False)
    existing = await Product.find_one({"slug": slug})
    if existing:
        import time

        slug = f"{slug}-{int(time.time()) % 10000}"

    product = Product(
        name=data.name,
        slug=slug,
        category_id=cast(Link["Category"], category.id),
        description=data.description,
        origin_country=data.country_of_origin or data.origin_country or "Узбекистан",
        unit=ProductUnit(data.unit),
        avg_item_weight_kg=data.unit_weight if data.unit_weight is not None else data.avg_item_weight_kg,
        price_wholesale=data.price_wholesale,
        price_retail=data.price_retail,
        cost_price=data.price_purchase if data.price_purchase is not None else data.cost_price,
        min_order_qty=data.min_order_qty,
        order_step=data.order_step,
        stock_qty=data.stock_quantity if data.stock_quantity is not None else data.stock_qty,
        min_stock_qty=data.min_stock_quantity if data.min_stock_quantity is not None else data.min_stock_qty,
        images=data.images,
        storage_conditions=data.storage_conditions,
        shelf_life_days=data.shelf_life_days,
        is_active=data.is_active,
    )
    await product.insert()

    logger.info("Товар создан", product_id=str(product.id), name=data.name)

    return ProductResponse(**_product_to_response(product, category.name))


@router.patch(
    "/catalog/products/{product_id}",
    summary="Обновить товар",
)
async def update_product(
    product_id: str,
    data: ProductUpdate,
    admin=Depends(require_admin),
):
    """Частичное обновление товара."""
    from beanie import PydanticObjectId

    from app.models.product import ProductUnit

    product = await Product.get(PydanticObjectId(product_id))
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Товар не найден",
        )

    if data.name is not None:
        product.name = data.name
    if data.description is not None:
        product.description = data.description
    if data.origin_country is not None:
        product.origin_country = data.origin_country
    if data.unit is not None:
        product.unit = ProductUnit(data.unit)
    if data.avg_item_weight_kg is not None:
        product.avg_item_weight_kg = data.avg_item_weight_kg
    if data.price_wholesale is not None:
        product.price_wholesale = data.price_wholesale
    if data.price_retail is not None:
        product.price_retail = data.price_retail
    if data.cost_price is not None:
        product.cost_price = data.cost_price
    if data.min_order_qty is not None:
        product.min_order_qty = data.min_order_qty
    if data.order_step is not None:
        product.order_step = data.order_step
    if data.min_stock_qty is not None:
        product.min_stock_qty = data.min_stock_qty
    if data.images is not None:
        product.images = data.images
    if data.storage_conditions is not None:
        product.storage_conditions = data.storage_conditions
    if data.shelf_life_days is not None:
        product.shelf_life_days = data.shelf_life_days
    if data.is_active is not None:
        product.is_active = data.is_active

    product.updated_at = datetime.now(UTC)
    await product.save()

    logger.info("Товар обновлён", product_id=product_id)

    return ProductResponse(**_product_to_response(product))


@router.delete(
    "/catalog/products/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Деактивировать товар",
)
async def deactivate_product(product_id: str, admin=Depends(require_admin)):
    """Деактивация товара (soft delete)."""
    from beanie import PydanticObjectId

    product = await Product.get(PydanticObjectId(product_id))
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Товар не найден",
        )

    product.is_active = False
    product.updated_at = datetime.now(UTC)
    await product.save()

    logger.info("Товар деактивирован", product_id=product_id)


@router.patch(
    "/catalog/products/bulk-prices",
    summary="Массовое обновление цен",
)
async def bulk_update_prices(
    data: dict,
    admin=Depends(require_admin),
):
    """
    Массовое обновление цен на товары.
    Ожидает: {"updates": [{"product_id": "...", "price_retail": 100, "price_wholesale": 80}, ...]}
    """
    updates = data.get("updates", [])
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Список обновлений пуст")

    updated_count = 0
    errors = []

    for item in updates:
        product_id = item.get("product_id")
        if not product_id:
            continue
        try:
            from beanie import PydanticObjectId

            product = await Product.get(PydanticObjectId(product_id))
            if not product:
                errors.append(f"Товар {product_id} не найден")
                continue

            if "price_retail" in item:
                product.price_retail = float(item["price_retail"])
            if "price_wholesale" in item:
                product.price_wholesale = float(item["price_wholesale"])

            product.updated_at = datetime.now(UTC)
            await product.save()
            updated_count += 1
        except Exception as e:
            errors.append(f"Ошибка для {product_id}: {e!s}")

    return {"updated": updated_count, "errors": errors}
