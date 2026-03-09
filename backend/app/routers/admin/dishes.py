"""
Роутер управления справочником блюд (администратор).
Эндпоинты: /api/v1/admin/dishes/
"""
import math
from datetime import datetime, timezone
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.dish import Dish, DishIngredient
from app.schemas.dish import (
    DishCreate,
    DishListResponse,
    DishResponse,
    DishUpdate,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/dishes", tags=["Админ: Блюда"])


def _to_response(dish: Dish) -> DishResponse:
    """Конвертирует Dish в ответ API."""
    return DishResponse(
        **{
            "_id": str(dish.id),
            "name": dish.name,
            "category": dish.category,
            "description": dish.description,
            "ingredients": [
                {
                    "product_id": str(i.product_id) if i.product_id else None,
                    "name": i.name,
                    "qty_per_portion_g": i.qty_per_portion_g,
                    "unit": i.unit,
                }
                for i in dish.ingredients
            ],
            "portion_weight_g": dish.portion_weight_g,
            "calories": dish.calories,
            "protein": dish.protein,
            "fat": dish.fat,
            "carbs": dish.carbs,
            "sanpin_compliant": dish.sanpin_compliant,
            "age_groups": dish.age_groups,
            "is_active": dish.is_active,
            "created_at": dish.created_at.isoformat(),
        }
    )


@router.get(
    "/",
    response_model=DishListResponse,
    summary="Список блюд",
)
async def get_dishes(
    category: Optional[str] = Query(None, description="Фильтр по категории"),
    age_group: Optional[str] = Query(None, description="Возрастная группа"),
    search: Optional[str] = Query(None, description="Поиск по названию"),
    is_active: Optional[bool] = Query(None, description="Фильтр по активности"),
    sanpin_only: bool = Query(False, description="Только соответствующие СанПиН"),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    _=Depends(require_admin),
):
    """
    Список блюд справочника с возможностью фильтрации.
    """
    query: dict = {}

    if category:
        query["category"] = category
    if age_group:
        query["age_groups"] = {"$in": [age_group]}
    if is_active is not None:
        query["is_active"] = is_active
    if sanpin_only:
        query["sanpin_compliant"] = True
    if search:
        query["$text"] = {"$search": search}

    total = await Dish.find(query).count()
    dishes = (
        await Dish.find(query)
        .sort(Dish.name)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    return DishListResponse(
        items=[_to_response(d) for d in dishes],
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.post(
    "/",
    response_model=DishResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать блюдо",
)
async def create_dish(
    data: DishCreate,
    _=Depends(require_admin),
):
    """
    Добавить новое блюдо в справочник.

    Ингредиенты могут быть привязаны к товарам каталога (product_id),
    что позволяет автоматически формировать заказы из меню.
    """
    # Проверяем уникальность названия
    existing = await Dish.find_one({"name": data.name})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Блюдо с названием {data.name!r} уже существует в справочнике",
        )

    dish = Dish(
        name=data.name,
        category=data.category,
        description=data.description,
        ingredients=[
            DishIngredient(
                product_id=PydanticObjectId(i.product_id) if i.product_id else None,
                name=i.name,
                qty_per_portion_g=i.qty_per_portion_g,
                unit=i.unit,
            )
            for i in data.ingredients
        ],
        portion_weight_g=data.portion_weight_g,
        calories=data.calories,
        protein=data.protein,
        fat=data.fat,
        carbs=data.carbs,
        sanpin_compliant=data.sanpin_compliant,
        age_groups=data.age_groups,
        is_active=data.is_active,
        created_at=datetime.now(timezone.utc),
    )
    await dish.insert()

    logger.info(
        "Блюдо добавлено в справочник",
        dish_id=str(dish.id),
        name=data.name,
        category=data.category,
    )

    return _to_response(dish)


@router.get(
    "/{dish_id}",
    response_model=DishResponse,
    summary="Получить блюдо",
)
async def get_dish(
    dish_id: str,
    _=Depends(require_admin),
):
    """Детальная информация о блюде."""
    try:
        dish = await Dish.get(PydanticObjectId(dish_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    if not dish:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    return _to_response(dish)


@router.patch(
    "/{dish_id}",
    response_model=DishResponse,
    summary="Обновить блюдо",
)
async def update_dish(
    dish_id: str,
    data: DishUpdate,
    _=Depends(require_admin),
):
    """
    Обновить данные блюда в справочнике.
    """
    try:
        dish = await Dish.get(PydanticObjectId(dish_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    if not dish:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    # Проверяем уникальность нового имени
    if data.name is not None and data.name != dish.name:
        existing = await Dish.find_one({"name": data.name, "_id": {"$ne": dish.id}})
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Блюдо с названием {data.name!r} уже существует",
            )
        dish.name = data.name

    if data.category is not None:
        dish.category = data.category
    if data.description is not None:
        dish.description = data.description
    if data.ingredients is not None:
        dish.ingredients = [
            DishIngredient(
                product_id=PydanticObjectId(i.product_id) if i.product_id else None,
                name=i.name,
                qty_per_portion_g=i.qty_per_portion_g,
                unit=i.unit,
            )
            for i in data.ingredients
        ]
    if data.portion_weight_g is not None:
        dish.portion_weight_g = data.portion_weight_g
    if data.calories is not None:
        dish.calories = data.calories
    if data.protein is not None:
        dish.protein = data.protein
    if data.fat is not None:
        dish.fat = data.fat
    if data.carbs is not None:
        dish.carbs = data.carbs
    if data.sanpin_compliant is not None:
        dish.sanpin_compliant = data.sanpin_compliant
    if data.age_groups is not None:
        dish.age_groups = data.age_groups
    if data.is_active is not None:
        dish.is_active = data.is_active

    await dish.save()

    logger.info(
        "Блюдо обновлено",
        dish_id=dish_id,
        name=dish.name,
    )

    return _to_response(dish)


@router.delete(
    "/{dish_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить блюдо",
)
async def delete_dish(
    dish_id: str,
    _=Depends(require_admin),
):
    """
    Деактивировать блюдо в справочнике (мягкое удаление).
    Блюдо остаётся в базе для сохранения исторических меню.
    """
    try:
        dish = await Dish.get(PydanticObjectId(dish_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    if not dish:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Блюдо не найдено")

    dish.is_active = False
    await dish.save()

    logger.info(
        "Блюдо деактивировано",
        dish_id=dish_id,
        name=dish.name,
    )
