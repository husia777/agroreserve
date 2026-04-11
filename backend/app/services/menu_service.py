"""
Сервис школьного меню (v2).

UC-109: Меню-генератор СанПиН compliant
UC-136: Еженедельный план питания — авто-генерация
UC-141: Расчёт стоимости меню ("100 детей × 7 дней")
UC-145: Ежедневный отчёт повара — фактические расходы
UC-146: Бюджетный контроль 44-ФЗ лимит на питание

+ Все существующие функции из menu_service.py
"""

import contextlib
import uuid
from datetime import UTC, date, datetime, timedelta
from typing import Any, Optional

import structlog
from beanie import PydanticObjectId

from app.models.dish import Dish
from app.models.menu import Menu
from app.models.product import Product
from app.services.sanpin_norms import (
    MEAL_DISTRIBUTION,
    MEAL_LABELS,
    get_norm,
)

logger = structlog.get_logger(__name__)


# ══════════════════════════════════════════════════════════════
# Существующие функции (без изменений)
# ══════════════════════════════════════════════════════════════


async def calculate_ingredients(menu: Menu) -> dict[str, Any]:
    """Рассчитывает суммарные ингредиенты для всего меню."""
    ingredient_totals: dict[str, dict[str, Any]] = {}

    for day in menu.days:
        for menu_item in day.items:
            try:
                dish = await Dish.get(menu_item.dish_id)
            except Exception:
                dish = None

            if not dish:
                continue

            for ingredient in dish.ingredients:
                agg_key = str(ingredient.product_id) if ingredient.product_id else ingredient.name
                qty_kg = round(ingredient.qty_per_portion_g * menu_item.portions / 1000.0, 3)

                if agg_key in ingredient_totals:
                    ingredient_totals[agg_key]["qty_kg"] = round(ingredient_totals[agg_key]["qty_kg"] + qty_kg, 3)
                else:
                    ingredient_totals[agg_key] = {
                        "name": ingredient.name,
                        "qty_kg": qty_kg,
                        "unit": "kg",
                        "product_id": str(ingredient.product_id) if ingredient.product_id else None,
                    }

    return ingredient_totals


async def calculate_kbzhu(menu: Menu) -> list[dict[str, Any]]:
    """Рассчитывает КБЖУ по дням меню."""
    daily_kbzhu = []

    for day in menu.days:
        day_calories = 0.0
        day_protein = 0.0
        day_fat = 0.0
        day_carbs = 0.0
        day_portions = 0
        meals_info = []

        meals_by_type: dict[str, list] = {}
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

                meal_dishes.append(
                    {
                        "dish_name": dish.name,
                        "portions": menu_item.portions,
                        "calories_per_portion": dish.calories,
                        "total_calories": round(item_calories, 1),
                    }
                )

            meals_info.append(
                {
                    "meal_type": meal_type,
                    "meal_label": MEAL_LABELS.get(meal_type, meal_type),
                    "calories": round(meal_calories, 1),
                    "dishes": meal_dishes,
                }
            )

        daily_kbzhu.append(
            {
                "date": str(day.date),
                "calories": round(day_calories, 1),
                "protein": round(day_protein, 1),
                "fat": round(day_fat, 1),
                "carbs": round(day_carbs, 1),
                "portions": day_portions,
                "meals": meals_info,
            }
        )

    return daily_kbzhu


async def generate_order_from_menu(menu: Menu, user: Any) -> Any:
    """Формирует заказ на продукты из меню."""
    from app.models.cart import CartItem
    from app.services.order_service import create_order as svc_create_order

    ingredients = await calculate_ingredients(menu)
    cart_items = []
    skipped = []

    for _key, ingredient in ingredients.items():
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

        price = product.get_price_for_client(user.client_type == "b2b")
        qty = ingredient["qty_kg"]
        cart_items.append(
            CartItem(
                item_id=str(uuid.uuid4()),
                product_id=ingredient["product_id"],
                product_name=product.name,
                product_slug=product.slug if hasattr(product, "slug") else ingredient["product_id"],
                qty=qty,
                unit="kg",
                price=price,
                cost_price=product.cost_price if hasattr(product, "cost_price") else 0.0,
                total=round(qty * price, 2),
                min_order_qty=0.0,
                order_step=0.5,
                stock_qty=product.stock_qty if hasattr(product, "stock_qty") else 0.0,
            )
        )

    if not cart_items:
        raise ValueError(
            "Ни один ингредиент меню не привязан к товарам каталога. "
            "Обновите состав блюд, добавив привязки к product_id."
        )

    delivery_info = {
        "delivery_date": menu.week_start,
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

    menu.generated_order_id = order.id
    menu.status = "ordered"
    await menu.save()

    return order


async def recalculate_menu_totals(menu: Menu) -> Menu:
    """Пересчитывает суммарные КБЖУ и порции по всему меню."""
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


# ══════════════════════════════════════════════════════════════
# UC-109: Меню-генератор СанПиН compliant (обновлён)
# ══════════════════════════════════════════════════════════════


async def generate_kbzhu_pdf(menu: Menu, age_group: str = "school_7_11") -> dict[str, Any]:
    """
    Формирует данные для КБЖУ-отчёта с проверкой по СанПиН.

    Args:
        menu: Объект меню
        age_group: Код возрастной группы (school_7_11, school_12_18, и т.д.)

    Returns:
        Словарь с КБЖУ данными + проверка соответствия нормам
    """
    daily_kbzhu = await calculate_kbzhu(menu)
    norm = get_norm(age_group)

    days_count = len(daily_kbzhu)
    if days_count > 0:
        avg_calories = round(sum(d["calories"] for d in daily_kbzhu) / days_count, 1)
        avg_protein = round(sum(d["protein"] for d in daily_kbzhu) / days_count, 1)
        avg_fat = round(sum(d["fat"] for d in daily_kbzhu) / days_count, 1)
        avg_carbs = round(sum(d["carbs"] for d in daily_kbzhu) / days_count, 1)
    else:
        avg_calories = avg_protein = avg_fat = avg_carbs = 0.0

    # UC-109: Проверка по СанПиН нормам
    compliance = None
    if norm:
        compliance = norm.check_compliance(avg_calories, avg_protein, avg_fat, avg_carbs)

    report_data = {
        "menu_id": str(menu.id),
        "week_start": str(menu.week_start),
        "week_end": str(menu.week_end),
        "age_group": age_group,
        "age_group_description": norm.description if norm else "Не указана",
        "days": daily_kbzhu,
        "avg_daily": {
            "calories": avg_calories,
            "protein": avg_protein,
            "fat": avg_fat,
            "carbs": avg_carbs,
        },
        "norms": {
            "calories": norm.calories if norm else None,
            "protein": norm.protein if norm else None,
            "fat": norm.fat if norm else None,
            "carbs": norm.carbs if norm else None,
        },
        "compliance": compliance,
        "sanpin_compliant": compliance.get("compliant", False) if compliance else False,
        "total_portions": menu.total_portions,
        "generated_at": datetime.now(UTC).isoformat(),
    }

    logger.info(
        "КБЖУ отчёт с проверкой СанПиН",
        menu_id=str(menu.id),
        age_group=age_group,
        avg_calories=avg_calories,
        compliant=report_data["sanpin_compliant"],
    )

    return report_data


# ══════════════════════════════════════════════════════════════
# UC-136: Еженедельный план питания — авто-генерация
# ══════════════════════════════════════════════════════════════


async def auto_generate_weekly_menu(
    age_group: str,
    children_count: int,
    week_start: date,
    meals_config: Optional[list[str]] = None,
) -> dict[str, Any]:
    """
    Автоматически генерирует меню на неделю из имеющихся блюд в БД.

    Алгоритм:
    1. Получает норму КБЖУ для возрастной группы
    2. Загружает все блюда из БД
    3. Для каждого дня подбирает блюда по приёмам пищи
    4. Проверяет соответствие СанПиН

    Args:
        age_group: Код возрастной группы
        children_count: Количество детей
        week_start: Дата начала недели (понедельник)
        meals_config: Типы приёмов пищи (если None — берётся из нормы)

    Returns:
        Структура меню для создания через API
    """
    norm = get_norm(age_group)
    if not norm:
        raise ValueError(f"Неизвестная возрастная группа: {age_group}")

    # Получаем все активные блюда из БД
    all_dishes = await Dish.find({"is_active": {"$ne": False}}).to_list()
    if not all_dishes:
        raise ValueError("В базе нет блюд. Добавьте блюда в справочник.")

    # Группируем блюда по категориям
    dishes_by_category: dict[str, list[Dish]] = {}
    for dish in all_dishes:
        cat = dish.category or "other"
        if cat not in dishes_by_category:
            dishes_by_category[cat] = []
        dishes_by_category[cat].append(dish)

    # Определяем приёмы пищи
    distribution = MEAL_DISTRIBUTION.get(norm.meals_per_day, MEAL_DISTRIBUTION[2])
    meal_types = meals_config or list(distribution.keys())

    # Целевые калории по приёмам пищи
    target_by_meal = {}
    for meal, pct in distribution.items():
        if meal in meal_types:
            target_by_meal[meal] = norm.calories * pct / 100

    # Генерируем 5 дней (пн-пт)
    days = []
    used_dishes: set = set()  # Избегаем повторений подряд

    for day_offset in range(5):
        current_date = week_start + timedelta(days=day_offset)
        day_items = []

        for meal_type in meal_types:
            target_cal = target_by_meal.get(meal_type, 500)

            # Подбираем блюда для приёма пищи
            # Приоритет: СанПиН-совместимые, подходящие по возрасту, не использованные вчера
            candidates: list[Any] = []
            for dish in all_dishes:
                if dish.id in used_dishes and len(all_dishes) > 10:
                    continue  # Пропускаем если были вчера (и есть выбор)
                if dish.sanpin_compliant:
                    candidates.insert(0, dish)  # СанПиН-совместимые в начало
                else:
                    candidates.append(dish)

            # Подбор: набираем калории ближе к целевым
            selected_dish = None
            min_diff = float("inf")

            for dish in candidates[:20]:  # Лимит проверки
                diff = abs(dish.calories - target_cal / children_count)
                if diff < min_diff:
                    min_diff = diff
                    selected_dish = dish

            if selected_dish:
                day_items.append(
                    {
                        "dish_id": str(selected_dish.id),
                        "dish_name": selected_dish.name,
                        "portions": children_count,
                        "meal_type": meal_type,
                    }
                )

        # Обновляем использованные
        used_dishes = {item["dish_id"] for item in day_items}

        days.append(
            {
                "date": current_date.isoformat(),
                "items": day_items,
            }
        )

    logger.info(
        "Меню автосгенерировано",
        age_group=age_group,
        children=children_count,
        days=len(days),
        meals=len(meal_types),
    )

    return {
        "week_start": week_start.isoformat(),
        "week_end": (week_start + timedelta(days=4)).isoformat(),
        "age_group": age_group,
        "children_count": children_count,
        "days": days,
        "norms": {
            "calories": norm.calories,
            "protein": norm.protein,
            "fat": norm.fat,
            "carbs": norm.carbs,
            "description": norm.description,
        },
    }


# ══════════════════════════════════════════════════════════════
# UC-141: Расчёт стоимости меню ("100 детей × 7 дней")
# ══════════════════════════════════════════════════════════════


async def calculate_menu_cost(
    menu: Menu,
    children_count: int = 1,
    is_b2b: bool = True,
) -> dict[str, Any]:
    """
    Рассчитывает полную стоимость меню с разбивкой по дням и продуктам.

    Args:
        menu: Объект меню
        children_count: Количество детей
        is_b2b: Использовать оптовую цену

    Returns:
        Словарь со стоимостью по дням, продуктам, итого
    """
    ingredients = await calculate_ingredients(menu)

    product_costs = []
    total_cost = 0.0
    products_not_found = []

    for _key, ingredient in ingredients.items():
        product = None
        if ingredient["product_id"]:
            with contextlib.suppress(Exception):
                product = await Product.get(PydanticObjectId(ingredient["product_id"]))

        qty_kg = ingredient["qty_kg"]
        if product:
            price = product.price_wholesale if is_b2b else product.price_retail
            cost = round(qty_kg * price, 2)
        else:
            price = 0
            cost = 0
            products_not_found.append(ingredient["name"])

        total_cost += cost
        product_costs.append(
            {
                "name": ingredient["name"],
                "qty_kg": qty_kg,
                "price_per_kg": price,
                "cost": cost,
                "product_id": ingredient["product_id"],
                "in_catalog": product is not None,
            }
        )

    # Сортируем по стоимости (дорогие сверху)
    product_costs.sort(key=lambda x: x["cost"], reverse=True)

    days_count = len(menu.days) if menu.days else 1
    cost_per_day = round(total_cost / days_count, 2) if days_count > 0 else 0
    cost_per_child = round(total_cost / children_count, 2) if children_count > 0 else 0
    cost_per_child_per_day = round(cost_per_day / children_count, 2) if children_count > 0 else 0

    result = {
        "menu_id": str(menu.id),
        "children_count": children_count,
        "days": days_count,
        "products": product_costs,
        "products_not_in_catalog": products_not_found,
        "totals": {
            "total_cost": round(total_cost, 2),
            "cost_per_day": cost_per_day,
            "cost_per_child": cost_per_child,
            "cost_per_child_per_day": cost_per_child_per_day,
        },
        "calculated_at": datetime.now(UTC).isoformat(),
    }

    logger.info(
        "Стоимость меню рассчитана",
        menu_id=str(menu.id),
        total=total_cost,
        children=children_count,
        cost_per_child_day=cost_per_child_per_day,
    )

    return result


# ══════════════════════════════════════════════════════════════
# UC-145: Ежедневный отчёт повара — фактические расходы
# ══════════════════════════════════════════════════════════════


async def generate_daily_cook_report(
    menu: Menu,
    report_date: date,
    actual_portions: Optional[dict[str, int]] = None,
) -> dict[str, Any]:
    """
    Формирует ежедневный отчёт повара: плановые vs фактические порции и расход продуктов.

    Args:
        menu: Объект меню
        report_date: Дата отчёта
        actual_portions: Фактические порции по блюдам {dish_id: кол-во}, если None — план = факт

    Returns:
        Отчёт с плановыми/фактическими порциями, расходом продуктов, отклонениями
    """
    # Находим день в меню
    day_data = None
    for day in menu.days:
        if str(day.date) == str(report_date):
            day_data = day
            break

    if not day_data:
        raise ValueError(f"День {report_date} не найден в меню")

    meals_report = []
    total_plan_portions = 0
    total_actual_portions = 0
    ingredient_plan: dict[str, float] = {}
    ingredient_actual: dict[str, float] = {}

    for menu_item in day_data.items:
        try:
            dish = await Dish.get(menu_item.dish_id)
        except Exception:
            dish = None

        if not dish:
            continue

        plan_qty = menu_item.portions
        actual_qty = (actual_portions or {}).get(str(dish.id), plan_qty)

        total_plan_portions += plan_qty
        total_actual_portions += actual_qty

        deviation = actual_qty - plan_qty
        deviation_pct = round((deviation / plan_qty) * 100, 1) if plan_qty > 0 else 0

        meals_report.append(
            {
                "dish_id": str(dish.id),
                "dish_name": dish.name,
                "meal_type": menu_item.meal_type,
                "meal_label": MEAL_LABELS.get(menu_item.meal_type, menu_item.meal_type),
                "plan_portions": plan_qty,
                "actual_portions": actual_qty,
                "deviation": deviation,
                "deviation_percent": deviation_pct,
                "calories_per_portion": dish.calories,
            }
        )

        # Расчёт расхода продуктов
        for ingredient in dish.ingredients:
            name = ingredient.name
            plan_kg = round(ingredient.qty_per_portion_g * plan_qty / 1000, 3)
            actual_kg = round(ingredient.qty_per_portion_g * actual_qty / 1000, 3)

            ingredient_plan[name] = round(ingredient_plan.get(name, 0) + plan_kg, 3)
            ingredient_actual[name] = round(ingredient_actual.get(name, 0) + actual_kg, 3)

    # Сводка по продуктам
    products_report = []
    for name in sorted(ingredient_plan.keys()):
        plan = ingredient_plan[name]
        actual = ingredient_actual.get(name, 0)
        diff = round(actual - plan, 3)
        products_report.append(
            {
                "product": name,
                "plan_kg": plan,
                "actual_kg": actual,
                "difference_kg": diff,
                "status": "ok" if abs(diff) < 0.01 else ("over" if diff > 0 else "under"),
            }
        )

    return {
        "menu_id": str(menu.id),
        "date": str(report_date),
        "meals": meals_report,
        "products": products_report,
        "summary": {
            "plan_portions": total_plan_portions,
            "actual_portions": total_actual_portions,
            "deviation_portions": total_actual_portions - total_plan_portions,
        },
        "generated_at": datetime.now(UTC).isoformat(),
    }


# ══════════════════════════════════════════════════════════════
# UC-146: Бюджетный контроль 44-ФЗ — лимит на питание
# ══════════════════════════════════════════════════════════════


async def check_budget_compliance(
    contract_id: str,
    menu: Menu,
    children_count: int = 1,
) -> dict[str, Any]:
    """
    Проверяет укладывается ли стоимость меню в бюджет контракта 44-ФЗ.

    Args:
        contract_id: ID контракта
        menu: Объект меню
        children_count: Количество детей

    Returns:
        Словарь с бюджетным анализом: лимит, потрачено, осталось, прогноз
    """
    from app.models.contract import Contract
    from app.models.order import Order

    # Получаем контракт
    contract = await Contract.get(contract_id)
    if not contract:
        raise ValueError(f"Контракт {contract_id} не найден")

    contract_amount = contract.amount or 0

    # Считаем уже потраченное (заказы по контракту)
    orders = await Order.find({"contract_id": str(contract.id)}).to_list()
    spent = sum(o.total or 0 for o in orders if o.status not in ("cancelled",))

    # Считаем стоимость текущего меню
    menu_cost_data = await calculate_menu_cost(menu, children_count, is_b2b=True)
    menu_cost = menu_cost_data["totals"]["total_cost"]

    # Остаток бюджета
    remaining = round(contract_amount - spent, 2)
    remaining_after = round(remaining - menu_cost, 2)

    # Прогноз: на сколько недель хватит
    weeks_remaining = 0
    if menu_cost > 0:
        weeks_remaining = max(0, int(remaining / menu_cost))

    # Лимит на питание на 1 ребёнка/день (СанПиН рекомендация)
    days_in_menu = len(menu.days) if menu.days else 1
    cost_per_child_day = (
        round(menu_cost / (children_count * days_in_menu), 2) if children_count > 0 and days_in_menu > 0 else 0
    )

    # Процент исполнения
    execution_pct = round((spent / contract_amount) * 100, 1) if contract_amount > 0 else 0

    result = {
        "contract_id": str(contract.id),
        "contract_number": contract.number,
        "budget": {
            "contract_amount": contract_amount,
            "spent": round(spent, 2),
            "remaining": remaining,
            "execution_percent": execution_pct,
        },
        "current_menu": {
            "menu_id": str(menu.id),
            "cost": menu_cost,
            "children_count": children_count,
            "cost_per_child_day": cost_per_child_day,
        },
        "forecast": {
            "remaining_after_menu": remaining_after,
            "fits_budget": remaining_after >= 0,
            "weeks_remaining": weeks_remaining,
        },
        "alerts": [],
    }

    # Алерты
    if remaining_after < 0:
        result["alerts"].append(
            {
                "level": "error",
                "message": f"Меню выходит за бюджет на {abs(remaining_after):,.0f} ₽",
            }
        )
    elif execution_pct >= 90:
        result["alerts"].append(
            {
                "level": "warning",
                "message": f"Исполнено {execution_pct}% бюджета. Осталось {remaining:,.0f} ₽",
            }
        )
    elif weeks_remaining <= 2 and weeks_remaining > 0:
        result["alerts"].append(
            {
                "level": "warning",
                "message": f"Бюджета хватит ещё на ~{weeks_remaining} нед.",
            }
        )

    logger.info(
        "Бюджетный контроль",
        contract_id=contract_id,
        budget=contract_amount,
        spent=spent,
        menu_cost=menu_cost,
        fits=result["forecast"]["fits_budget"],
    )

    return result
