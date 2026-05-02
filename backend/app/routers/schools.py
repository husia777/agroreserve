"""
Роутер школьного блока — меню, блюда, КБЖУ.
UC-109/136/141/145/146: Школьное питание
Эндпоинты: /api/v1/schools/
"""

import math
from datetime import UTC, datetime
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.dish import Dish
from app.models.menu import Menu, MenuDay, MenuItem
from app.schemas.dish import DishIngredientSchema, DishListResponse, DishResponse
from app.schemas.menu import KbzhuReport, MenuCreate, MenuDaySchema, MenuItemSchema, MenuListResponse, MenuResponse
from app.utils.security import require_approved_client

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/schools", tags=["Школы: Меню"])


def _dish_to_response(dish: Dish) -> DishResponse:
    """Конвертирует объект Dish в ответ API."""
    return DishResponse(
        id=str(dish.id),
        name=dish.name,
        category=dish.category,
        description=dish.description,
        ingredients=[
            DishIngredientSchema(
                product_id=str(i.product_id) if i.product_id else None,
                name=i.name,
                qty_per_portion_g=i.qty_per_portion_g,
                unit=i.unit,
            )
            for i in dish.ingredients
        ],
        portion_weight_g=dish.portion_weight_g,
        calories=dish.calories,
        protein=dish.protein,
        fat=dish.fat,
        carbs=dish.carbs,
        sanpin_compliant=dish.sanpin_compliant,
        age_groups=dish.age_groups,
        is_active=dish.is_active,
        created_at=dish.created_at.isoformat(),
    )


def _menu_to_response(menu: Menu) -> MenuResponse:
    """Конвертирует объект Menu в ответ API."""
    return MenuResponse(
        id=str(menu.id),
        client_id=str(menu.client_id),
        week_start=str(menu.week_start),
        week_end=str(menu.week_end),
        days=[
            MenuDaySchema(
                date=day.date,
                items=[
                    MenuItemSchema(
                        dish_id=str(item.dish_id),
                        dish_name=item.dish_name,
                        portions=item.portions,
                        meal_type=item.meal_type,
                    )
                    for item in day.items
                ],
            )
            for day in menu.days
        ],
        total_portions=menu.total_portions,
        total_calories=menu.total_calories,
        total_protein=menu.total_protein,
        total_fat=menu.total_fat,
        total_carbs=menu.total_carbs,
        generated_order_id=str(menu.generated_order_id) if menu.generated_order_id else None,
        status=menu.status,
        created_at=menu.created_at.isoformat(),
    )


@router.get(
    "/dishes",
    response_model=DishListResponse,
    summary="Справочник блюд",
)
async def get_dishes(
    category: Optional[str] = Query(None, description="Фильтр по категории"),
    age_group: Optional[str] = Query(None, description="Возрастная группа: 7-11, 12-18"),
    search: Optional[str] = Query(None, description="Поиск по названию"),
    sanpin_only: bool = Query(False, description="Только блюда, соответствующие СанПиН"),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    current_user=Depends(require_approved_client),
):
    """
    Справочник блюд для конструктора меню.
    Доступен всем авторизованным клиентам.
    """
    query: dict = {"is_active": True}

    if category:
        query["category"] = category

    if age_group:
        # age_groups — список, ищем элемент в нём
        query["age_groups"] = {"$in": [age_group]}

    if sanpin_only:
        query["sanpin_compliant"] = True

    if search:
        query["$text"] = {"$search": search}

    total = await Dish.find(query).count()
    dishes = await Dish.find(query).sort(Dish.name).skip((page - 1) * limit).limit(limit).to_list()

    return DishListResponse(
        items=[_dish_to_response(d) for d in dishes],
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.post(
    "/menu",
    response_model=MenuResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать меню на неделю",
)
async def create_menu(
    data: MenuCreate,
    current_user=Depends(require_approved_client),
):
    """
    Создать школьное меню на указанную неделю.

    Шаги:
    1. Валидирует блюда (проверяет наличие в справочнике)
    2. Рассчитывает суммарное КБЖУ
    3. Сохраняет меню со статусом "draft"
    """
    from app.services.menu_service import recalculate_menu_totals

    # Проверяем что week_start <= week_end
    if data.week_start > data.week_end:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Дата начала недели не может быть позже даты окончания",
        )

    # Проверяем уникальность периода для клиента
    existing = await Menu.find_one(
        {
            "client_id": PydanticObjectId(str(current_user.id)),
            "week_start": data.week_start,
        }
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Меню на неделю с {data.week_start} уже существует. Обновите или удалите существующее.",
        )

    # Валидируем блюда и строим MenuDay объекты
    menu_days = []
    for day_data in data.days:
        day_items = []
        for item_data in day_data.items:
            try:
                dish = await Dish.get(PydanticObjectId(item_data.dish_id))
            except Exception:
                dish = None

            if not dish or not dish.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Блюдо с ID {item_data.dish_id} не найдено в справочнике",
                )

            if dish.id is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Блюдо с ID {item_data.dish_id} не имеет идентификатора",
                )
            day_items.append(
                MenuItem(
                    dish_id=dish.id,
                    dish_name=dish.name,
                    portions=item_data.portions,
                    meal_type=item_data.meal_type,
                )
            )

        menu_days.append(MenuDay(date=day_data.date, items=day_items))

    menu = Menu(
        client_id=PydanticObjectId(str(current_user.id)),
        week_start=data.week_start,
        week_end=data.week_end,
        days=menu_days,
        status="draft",
        created_at=datetime.now(UTC),
    )

    # Рассчитываем КБЖУ
    menu = await recalculate_menu_totals(menu)
    await menu.insert()

    logger.info(
        "Школьное меню создано",
        menu_id=str(menu.id),
        client_id=str(current_user.id),
        week_start=str(data.week_start),
        total_portions=menu.total_portions,
    )

    return _menu_to_response(menu)


@router.get(
    "/menu",
    response_model=MenuListResponse,
    summary="Мои меню",
)
async def get_my_menus(
    status_filter: Optional[str] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user=Depends(require_approved_client),
):
    """
    Список школьных меню текущего клиента.
    Сортировка: по дате начала недели (новые первые).
    """
    query: dict = {"client_id": PydanticObjectId(str(current_user.id))}
    if status_filter:
        query["status"] = status_filter

    total = await Menu.find(query).count()
    menus = await Menu.find(query).sort(-Menu.week_start).skip((page - 1) * limit).limit(limit).to_list()

    return MenuListResponse(
        items=[_menu_to_response(m) for m in menus],
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.get(
    "/menu/{menu_id}",
    response_model=MenuResponse,
    summary="Детали меню с расчётом ингредиентов",
)
async def get_menu_detail(
    menu_id: str,
    current_user=Depends(require_approved_client),
):
    """
    Детальное меню с рассчитанными ингредиентами для заказа.
    """
    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    # Проверяем принадлежность
    if current_user.role != "admin" and str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    from app.services.menu_service import calculate_ingredients

    response = _menu_to_response(menu)

    # Добавляем ингредиенты как дополнительное поле
    ingredients = await calculate_ingredients(menu)

    return {
        **response.model_dump(by_alias=True),
        "ingredients": list(ingredients.values()),
    }


@router.post(
    "/menu/{menu_id}/repeat",
    response_model=MenuResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Повторить меню прошлой недели (UC-06)",
)
async def repeat_menu(
    menu_id: str,
    week_start: str = Query(..., description="Начало новой недели (YYYY-MM-DD)"),
    week_end: str = Query(..., description="Конец новой недели (YYYY-MM-DD)"),
    current_user=Depends(require_approved_client),
):
    """
    Создать новое меню на основе существующего (копирование блюд на другую неделю).

    Используется для быстрого планирования: берёт состав прошлого меню
    и создаёт новое на указанную неделю.
    """
    from datetime import date

    from app.services.menu_service import recalculate_menu_totals

    try:
        source_menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    if not source_menu:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    # Проверяем принадлежность
    if str(source_menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    # Парсим новые даты
    try:
        new_week_start = date.fromisoformat(week_start)
        new_week_end = date.fromisoformat(week_end)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Неверный формат даты. Используйте YYYY-MM-DD",
        )

    # Проверяем уникальность периода
    existing = await Menu.find_one(
        {
            "client_id": PydanticObjectId(str(current_user.id)),
            "week_start": new_week_start,
        }
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Меню на неделю с {new_week_start} уже существует",
        )

    # Сдвиг дат: разница между новой и старой неделей

    date_delta = new_week_start - source_menu.week_start

    # Копируем дни со сдвигом дат
    new_days = []
    for day in source_menu.days:
        new_date = day.date + date_delta
        new_days.append(
            MenuDay(
                date=new_date,
                items=[
                    MenuItem(
                        dish_id=item.dish_id,
                        dish_name=item.dish_name,
                        portions=item.portions,
                        meal_type=item.meal_type,
                    )
                    for item in day.items
                ],
            )
        )

    new_menu = Menu(
        client_id=source_menu.client_id,
        week_start=new_week_start,
        week_end=new_week_end,
        days=new_days,
        status="draft",
        created_at=datetime.now(UTC),
    )

    new_menu = await recalculate_menu_totals(new_menu)
    await new_menu.insert()

    logger.info(
        "Меню скопировано на новую неделю",
        source_menu_id=menu_id,
        new_menu_id=str(new_menu.id),
        new_week_start=str(new_week_start),
    )

    return _menu_to_response(new_menu)


@router.post(
    "/menu/{menu_id}/order",
    summary="Сформировать заказ из меню",
)
async def create_order_from_menu(
    menu_id: str,
    current_user=Depends(require_approved_client),
):
    """
    Автоматически формирует заказ продуктов из меню.

    Рассчитывает необходимые ингредиенты, находит соответствующие товары в каталоге
    и создаёт заказ. Привязывает заказ к меню.
    """
    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    # Проверяем принадлежность
    if str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    if menu.status == "ordered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Заказ по этому меню уже сформирован (заказ ID: {menu.generated_order_id})",
        )

    from app.services.menu_service import generate_order_from_menu

    try:
        order = await generate_order_from_menu(menu, current_user)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    logger.info(
        "Заказ из меню сформирован через API",
        menu_id=menu_id,
        order_id=str(order.id),
        order_number=order.order_number,
    )

    return {
        "success": True,
        "message": f"Заказ {order.order_number} успешно сформирован",
        "order_id": str(order.id),
        "order_number": order.order_number,
        "total": order.total,
    }


@router.get(
    "/menu/{menu_id}/kbzhu-report",
    response_model=KbzhuReport,
    summary="Отчёт КБЖУ по меню",
)
async def get_kbzhu_report(
    menu_id: str,
    age_group: str = Query("school_7_11", description="Возрастная группа для проверки СанПиН"),
    current_user=Depends(require_approved_client),
):
    """
    Детальный отчёт по КБЖУ (калории, белки, жиры, углеводы) для меню.

    Возвращает данные по каждому дню и средние показатели за неделю.
    Используется для генерации PDF-отчёта в соответствии с требованиями СанПиН.
    """
    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Меню не найдено")

    # Проверяем принадлежность
    if current_user.role != "admin" and str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    from app.services.menu_service import generate_kbzhu_pdf

    report_data = await generate_kbzhu_pdf(menu, age_group=age_group)

    return KbzhuReport(**report_data)


# ══════════════════════════════════════════════════════════════
# UC-105: Нормы СанПиН
# ══════════════════════════════════════════════════════════════


@router.get(
    "/sanpin-norms",
    summary="UC-105: Справочник норм питания СанПиН",
)
async def get_sanpin_norms(
    current_user=Depends(require_approved_client),
):
    """
    Возвращает все нормы питания по возрастным группам (СанПиН 2.3/2.4.3590-20).
    """
    from app.services.sanpin_norms import get_all_norms

    return {"norms": get_all_norms()}


# ══════════════════════════════════════════════════════════════
# UC-136: Авто-генерация меню на неделю
# ══════════════════════════════════════════════════════════════


@router.post(
    "/menu/auto-generate",
    summary="UC-136: Автоматическая генерация меню на неделю",
)
async def auto_generate_menu(
    age_group: str = Query("school_7_11", description="Возрастная группа"),
    children_count: int = Query(100, ge=1, description="Количество детей"),
    week_start: str = Query(..., description="Начало недели (YYYY-MM-DD)"),
    current_user=Depends(require_approved_client),
):
    """
    Автоматически генерирует меню на неделю из имеющихся блюд в БД.
    Подбирает блюда по нормам СанПиН для указанной возрастной группы.
    """
    from datetime import date as date_type

    from app.services.menu_service import auto_generate_weekly_menu

    try:
        parsed_date = date_type.fromisoformat(week_start)
    except ValueError:
        raise HTTPException(status_code=422, detail="Неверный формат даты. Используйте YYYY-MM-DD")

    try:
        result = await auto_generate_weekly_menu(
            age_group=age_group,
            children_count=children_count,
            week_start=parsed_date,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return result


# ══════════════════════════════════════════════════════════════
# UC-141: Расчёт стоимости меню
# ══════════════════════════════════════════════════════════════


@router.get(
    "/menu/{menu_id}/cost",
    summary="UC-141: Расчёт стоимости меню",
)
async def get_menu_cost(
    menu_id: str,
    children_count: int = Query(100, ge=1, description="Количество детей"),
    current_user=Depends(require_approved_client),
):
    """
    Рассчитывает полную стоимость меню:
    итого, за день, на ребёнка, на ребёнка в день.
    """
    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if current_user.role != "admin" and str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Доступ запрещён")

    from app.services.menu_service import calculate_menu_cost

    is_b2b = getattr(current_user, "client_type", "b2b") == "b2b"
    return await calculate_menu_cost(menu, children_count, is_b2b)


# ══════════════════════════════════════════════════════════════
# UC-145: Ежедневный отчёт повара
# ══════════════════════════════════════════════════════════════


@router.post(
    "/menu/{menu_id}/daily-report",
    summary="UC-145: Ежедневный отчёт повара",
)
async def create_daily_report(
    menu_id: str,
    report_date: str = Query(..., description="Дата отчёта (YYYY-MM-DD)"),
    current_user=Depends(require_approved_client),
):
    """
    Формирует ежедневный отчёт повара: плановые vs фактические порции,
    расход продуктов, отклонения.
    """
    from datetime import date as date_type

    from app.services.menu_service import generate_daily_cook_report

    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if current_user.role != "admin" and str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Доступ запрещён")

    try:
        parsed_date = date_type.fromisoformat(report_date)
    except ValueError:
        raise HTTPException(status_code=422, detail="Неверный формат даты")

    try:
        return await generate_daily_cook_report(menu, parsed_date)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ══════════════════════════════════════════════════════════════
# UC-146: Бюджетный контроль 44-ФЗ
# ══════════════════════════════════════════════════════════════


@router.get(
    "/menu/{menu_id}/budget-check",
    summary="UC-146: Бюджетный контроль 44-ФЗ",
)
async def check_menu_budget(
    menu_id: str,
    contract_id: str = Query(..., description="ID контракта 44-ФЗ"),
    children_count: int = Query(100, ge=1, description="Количество детей"),
    current_user=Depends(require_approved_client),
):
    """
    Проверяет укладывается ли стоимость меню в бюджет контракта 44-ФЗ.
    Возвращает: лимит, потрачено, осталось, прогноз, алерты.
    """
    try:
        menu = await Menu.get(PydanticObjectId(menu_id))
    except Exception:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if not menu:
        raise HTTPException(status_code=404, detail="Меню не найдено")

    if current_user.role != "admin" and str(menu.client_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Доступ запрещён")

    from app.services.menu_service import check_budget_compliance

    try:
        return await check_budget_compliance(contract_id, menu, children_count)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
