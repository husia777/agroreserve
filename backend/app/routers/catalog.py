"""
Роутер публичного каталога товаров.
Эндпоинты: /api/v1/catalog/

Авторизация не обязательна, но влияет на отображаемые цены:
- Авторизованный B2B → оптовые цены
- Остальные → розничные цены
"""

import math
from typing import Optional

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.product import Category, Product
from app.schemas.product import (
    CategoryResponse,
    ProductListResponse,
    ProductResponse,
)
from app.utils.security import get_current_user_optional


def _product_to_response(product, category_name: str = "", is_b2b: bool = False, category_slug: str = "") -> dict:
    """Конвертирует Product в словарь для ProductResponse."""
    cat_id = str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
    return {
        "id": str(product.id),
        "name": product.name,
        "slug": product.slug,
        "category_id": cat_id,
        "category_name": category_name,
        "category": {"id": cat_id, "name": category_name, "slug": category_slug} if category_name else None,
        "description": product.description,
        "country_of_origin": product.origin_country,
        "unit": product.unit.value if hasattr(product.unit, "value") else product.unit,
        "unit_weight": product.avg_item_weight_kg,
        "price_retail": product.price_retail,
        "price_wholesale": product.price_wholesale if is_b2b else 0,
        "price_purchase": 0,
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
        "certificate_ids": [
            str(ref.ref.id) if hasattr(ref, "ref") else str(ref.id) if hasattr(ref, "id") else str(ref)
            for ref in (product.certificate_ids or [])
        ],
        "created_at": product.created_at.isoformat(),
        "updated_at": product.updated_at.isoformat(),
    }


router = APIRouter(prefix="/api/v1/catalog", tags=["Каталог"])
logger = structlog.get_logger(__name__)


@router.get(
    "/categories",
    response_model=list[CategoryResponse],
    summary="Список категорий",
    description="Возвращает активные категории, отсортированные по sort_order.",
)
async def get_categories(
    parent_id: Optional[str] = Query(None, description="ID родителя (None = корневые категории)"),
):
    """Список категорий каталога."""
    query_filter: dict[str, object] = {"is_active": True}

    if parent_id is None:
        query_filter["parent_id"] = None
    else:
        query_filter["parent_id"] = parent_id

    categories = await Category.find(
        query_filter,
        sort="+sort_order",
    ).to_list()

    result = []
    for cat in categories:
        product_count = await Product.find({"category_id.$id": cat.id, "is_active": True}).count()

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


@router.get(
    "/products",
    response_model=ProductListResponse,
    summary="Список товаров",
    description="Каталог товаров с фильтрами, поиском и пагинацией.",
)
async def get_products(
    category: Optional[str] = Query(None, description="Slug или ID категории"),
    search: Optional[str] = Query(None, description="Поисковый запрос"),
    sort: str = Query("name", description="Сортировка: name, price_asc, price_desc, stock"),
    page: int = Query(1, ge=1, description="Номер страницы"),
    limit: int = Query(20, ge=1, le=100, description="Товаров на странице"),
    in_stock_only: bool = Query(False, description="Только товары в наличии"),
    current_user=Depends(get_current_user_optional),
):
    """Список товаров каталога с фильтрами, поиском и пагинацией."""
    is_b2b = current_user is not None and current_user.is_b2b_approved()

    query_conditions: dict = {"is_active": True}

    if category:
        cat = None
        cat = await Category.find_one({"slug": category})
        if not cat:
            try:
                from beanie import PydanticObjectId

                cat = await Category.get(PydanticObjectId(category))
            except Exception:
                pass

        if cat:
            query_conditions["category_id.$id"] = cat.id
        else:
            return ProductListResponse(items=[], total=0, page=page, limit=limit, pages=0)

    if in_stock_only:
        query_conditions["stock_qty"] = {"$gt": 0}

    search_query = Product.find(query_conditions)
    if search and len(search.strip()) >= 2:
        search_query = Product.find({**query_conditions, "name": {"$regex": search.strip(), "$options": "i"}})

    sort_map = {
        "name": "+name",
        "price_asc": "+price_retail",
        "price_desc": "-price_retail",
        "stock": "-stock_qty",
    }
    sort_field = sort_map.get(sort, "+name")

    total = await search_query.count()

    skip = (page - 1) * limit
    products = await search_query.sort(sort_field).skip(skip).limit(limit).to_list()

    category_info: dict = {}
    for product in products:
        if product.category_id:
            cat_id = (
                str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
            )
            if cat_id not in category_info:
                try:
                    fetched_cat = await product.category_id.fetch()
                    if fetched_cat:
                        category_info[cat_id] = {"name": fetched_cat.name, "slug": fetched_cat.slug or ""}
                    else:
                        category_info[cat_id] = {"name": "", "slug": ""}
                except Exception:
                    category_info[cat_id] = {"name": "", "slug": ""}

    items = []
    for product in products:
        cat_id_str = (
            str(product.category_id.ref.id) if hasattr(product.category_id, "ref") else str(product.category_id)
        )
        cat_data = category_info.get(cat_id_str, {"name": "", "slug": ""})
        cat_name = cat_data["name"]

        items.append(ProductResponse(**_product_to_response(product, cat_name, is_b2b, category_slug=cat_data["slug"])))

    pages = math.ceil(total / limit) if total > 0 else 0

    return ProductListResponse(
        items=items,
        total=total,
        page=page,
        limit=limit,
        pages=pages,
    )


@router.get(
    "/products/{slug}",
    summary="Карточка товара",
    description="Детальная информация о товаре по slug.",
)
async def get_product_by_slug(
    slug: str,
    current_user=Depends(get_current_user_optional),
):
    """Карточка товара по URL slug."""
    product = await Product.find_one({"slug": slug, "is_active": True})

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Товар '{slug}' не найден",
        )

    is_b2b = current_user is not None and current_user.is_b2b_approved()

    cat_name = ""
    cat_slug = ""
    cat = None
    if product.category_id:
        try:
            cat = await product.category_id.fetch()
            if cat:
                cat_name = cat.name
                cat_slug = cat.slug or ""
        except Exception:
            pass

    return ProductResponse(**_product_to_response(product, cat_name, is_b2b, category_slug=cat_slug))
