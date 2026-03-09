"""
Сервис школьного меню.

Отвечает за:
- Расчёт ингредиентов из меню (для формирования заказа)
- Расчёт КБЖУ по дням и за неделю
- Генерацию заказа на продукты из меню
- Подготовку данных для PDF-отчётов
"""
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import structlog
from beanie import PydanticObjectId

from app.models.dish import Dish
from app.models.menu import Menu

logger = structlog.get_logger(__name__)


async def calculate_ingredients(menu: Menu) -> Dict[str, Any]:
    """
    Рассчитывает суммарные ингредиенты для всего меню.

    Группирует ингредиенты по product_id (или по названию, если нет привязки к каталогу).
    Используется для автоматического формирования заказа.

    Args:
        menu: Объект меню

    Returns:
        Словарь {product_id/name: {name, qty_kg, unit, product_id}}
    """
    # Агрегируем ингредиенты по всем блюдам всех дней
    ingredient_totals: Dict[str, Dict[str, Any]] = {}

    for day in menu.days:
        for menu_item in day.items:
            # Загружаем блюдо
            try:
                dish = await Dish.get(menu_item.dish_id)
            except Exception:
                dish = None

            if not dish:
                logger.warning(
                    "Блюдо не найдено при расчёте ингредиентов",
                    dish_id=str(menu_item.dish_id),
                    dish_name=menu_item.dish_name,
                )
                continue

            # Для каждого ингредиента умножаем на количество порций
            for ingredient in dish.ingredients:
                # Ключ агрегации: product_id или имя ингредиента
                agg_key = str(ingredient.product_id) if ingredient.product_id else ingredient.name

                # Переводим граммы в кг
                qty_kg = round(ingredient.qty_per_portion_g * menu_item.portions / 1000.0, 3)

                if agg_key in ingredient_totals:
                    ingredient_totals[agg_key]["qty_kg"] = round(
                        ingredient_totals[agg_key]["qty_kg"] + qty_kg, 3
                    )
                else:
                    ingredient_totals[agg_key] = {
                        "name": ingredient.name,
                        "qty_kg": qty_kg,
                        "unit": "kg",
                        "product_id": str(ingredient.product_id) if ingredient.product_id else None,
                    }

    logger.info(
        "Ингредиенты меню рассчитаны",
        menu_id=str(menu.id),
        unique_ingredients=len(ingredient_totals),
    )

    return ingredient_totals


async def calculate_kbzhu(menu: Menu) -> List[Dict[str, Any]]:
    """
    Рассчитывает КБЖУ по дням меню.

    Returns:
        Список словарей с КБЖУ для каждого дня
    """
    daily_kbzhu = []

    for day in menu.days:
        day_calories = 0.0
        day_protein = 0.0
        day_fat = 0.0
        day_carbs = 0.0
        day_portions = 0
        meals_info = []

        # Группируем по типу приёма пищи
        meals_by_type: Dict[str, List] = {}
        for menu_item in day.items:
            meal_type = menu_item.meal_type
            if meal_type not in meals_by_type:
                meals_by_type[meal_type] = []
            meals_by_type[meal_type].append(menu_item)

        for meal_type, items in meals_by_type.items():
            meal_calories = 0.0
            meal_dishes = []

            for menu_item in items:
                try:
                    dish = await Dish.get(menu_item.dish_id)
                except Exception:
                    dish = None

                if not dish:
                    continue

                item_calories = dish.calories * menu_item.portions
                item_protein = dish.protein * menu_item.portions
                item_fat = dish.fat * menu_item.portions
                item_carbs = dish.carbs * menu_item.portions

                day_calories += item_calories
                day_protein += item_protein
                day_fat += item_fat
                day_carbs += item_carbs
                day_portions += menu_item.portions
                meal_calories += item_calories

                meal_dishes.append({
                    "dish_name": dish.name,
                    "portions": menu_item.portions,
                    "calories_per_portion": dish.calories,
                    "total_calories": round(item_calories, 1),
                })

            meals_info.append({
                "meal_type": meal_type,
                "calories": round(meal_calories, 1),
                "dishes": meal_dishes,
            })

        daily_kbzhu.append({
            "date": str(day.date),
            "calories": round(day_calories, 1),
            "protein": round(day_protein, 1),
            "fat": round(day_fat, 1),
            "carbs": round(day_carbs, 1),
            "portions": day_portions,
            "meals": meals_info,
        })

    return daily_kbzhu


async def generate_order_from_menu(menu: Menu, user: Any) -> Any:
    """
    Формирует заказ на продукты из меню.

    Шаги:
    1. Рассчитывает суммарные ингредиенты
    2. Проверяет наличие товаров в каталоге
    3. Создаёт заказ через order_service
    4. Привязывает заказ к меню

    Args:
        menu: Объект меню
        user: Пользователь (школа)

    Returns:
        Созданный объект Order

    Raises:
        ValueError: Если нет ингредиентов с привязкой к каталогу
    """
    from datetime import timedelta

    from app.models.cart import CartItem
    from app.models.product import Product
    from app.services.order_service import create_order as svc_create_order

    # Рассчитываем ингредиенты
    ingredients = await calculate_ingredients(menu)

    # Оставляем только те, что привязаны к каталогу
    cart_items = []
    skipped = []

    for key, ingredient in ingredients.items():
        if not ingredient["product_id"]:
            skipped.append(ingredient["name"])
            continue

        try:
            product = await Product.get(PydanticObjectId(ingredient["product_id"]))
        except Exception:
            product = None

        if not product or not product.is_active:
            skipped.append(ingredient["name"])
            continue

        cart_items.append(
            CartItem(
                product_id=ingredient["product_id"],
                product_name=product.name,
                qty=ingredient["qty_kg"],
                unit="kg",
                price=product.get_price_for_client(user.client_type == "b2b"),
            )
        )

    if not cart_items:
        raise ValueError(
            "Ни один ингредиент меню не привязан к товарам каталога. "
            "Обновите состав блюд, добавив привязки к product_id."
        )

    if skipped:
        logger.warning(
            "Часть ингредиентов пропущена (нет привязки к каталогу)",
            menu_id=str(menu.id),
            skipped=skipped,
        )

    # Дата доставки — начало недели меню + 1 день (заказ заранее)
    delivery_date = menu.week_start

    delivery_info = {
        "delivery_date": delivery_date,
        "delivery_slot": "08:00-11:00",
        "delivery_address": user.delivery_address or "Адрес не указан",
        "delivery_priority": "normal",
        "payment_method": "bank_transfer",
        "note": f"Автозаказ по меню {menu.week_start} — {menu.week_end}",
    }

    order = await svc_create_order(
        user=user,
        cart_items=cart_items,
        delivery_info=delivery_info,
    )

    # Обновляем меню — привязываем заказ и меняем статус
    menu.generated_order_id = order.id
    menu.status = "ordered"
    await menu.save()

    logger.info(
        "Заказ из меню сформирован",
        menu_id=str(menu.id),
        order_number=order.order_number,
        items_count=len(cart_items),
        skipped_count=len(skipped),
    )

    return order


async def recalculate_menu_totals(menu: Menu) -> Menu:
    """
    Пересчитывает суммарные КБЖУ и порции по всему меню.

    Вызывается при изменении состава меню.
    Обновляет поля total_portions, total_calories, total_protein, total_fat, total_carbs.

    Args:
        menu: Объект меню (обновляется in-place)

    Returns:
        Обновлённый объект меню
    """
    total_portions = 0
    total_calories = 0.0
    total_protein = 0.0
    total_fat = 0.0
    total_carbs = 0.0

    for day in menu.days:
        for menu_item in day.items:
            try:
                dish = await Dish.get(menu_item.dish_id)
            except Exception:
                dish = None

            if not dish:
                continue

            total_portions += menu_item.portions
            total_calories += dish.calories * menu_item.portions
            total_protein += dish.protein * menu_item.portions
            total_fat += dish.fat * menu_item.portions
            total_carbs += dish.carbs * menu_item.portions

    menu.total_portions = total_portions
    menu.total_calories = round(total_calories, 1)
    menu.total_protein = round(total_protein, 1)
    menu.total_fat = round(total_fat, 1)
    menu.total_carbs = round(total_carbs, 1)

    return menu


async def generate_kbzhu_pdf(menu: Menu) -> Dict[str, Any]:
    """
    Формирует структуру данных для PDF-отчёта по КБЖУ.

    Returns:
        Словарь с полными данными для генерации PDF (ReportLab / WeasyPrint)
    """
    daily_kbzhu = await calculate_kbzhu(menu)

    # Средние показатели за неделю
    days_count = len(daily_kbzhu)
    if days_count > 0:
        avg_calories = round(sum(d["calories"] for d in daily_kbzhu) / days_count, 1)
        avg_protein = round(sum(d["protein"] for d in daily_kbzhu) / days_count, 1)
        avg_fat = round(sum(d["fat"] for d in daily_kbzhu) / days_count, 1)
        avg_carbs = round(sum(d["carbs"] for d in daily_kbzhu) / days_count, 1)
    else:
        avg_calories = avg_protein = avg_fat = avg_carbs = 0.0

    # Проверка соответствия СанПиН (упрощённая)
    # Норма для школ: 1800-2100 ккал/день для 7-11 лет, 2100-2500 для 12-18
    sanpin_compliant = 1600 <= avg_calories <= 2700

    report_data = {
        "menu_id": str(menu.id),
        "week_start": str(menu.week_start),
        "week_end": str(menu.week_end),
        "days": daily_kbzhu,
        "avg_daily_calories": avg_calories,
        "avg_daily_protein": avg_protein,
        "avg_daily_fat": avg_fat,
        "avg_daily_carbs": avg_carbs,
        "total_portions": menu.total_portions,
        "sanpin_compliant": sanpin_compliant,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    logger.info(
        "Данные для КБЖУ отчёта сформированы",
        menu_id=str(menu.id),
        avg_calories=avg_calories,
        sanpin_compliant=sanpin_compliant,
    )

    return report_data
