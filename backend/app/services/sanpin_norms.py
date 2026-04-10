"""
UC-105 / UC-131 / UC-136: Справочник норм питания по СанПиН 2.3/2.4.3590-20.
Нормы суточного рациона для образовательных учреждений.

Источник: СанПиН 2.3/2.4.3590-20
«Санитарно-эпидемиологические требования к организации общественного питания населения»
Приложения 7, 8, 10.
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class NutritionNorm:
    """Суточная норма питания на 1 человека."""

    age_group: str  # Возрастная группа
    age_range: str  # Диапазон возраста
    calories: float  # Энергетическая ценность, ккал
    protein: float  # Белки, г
    fat: float  # Жиры, г
    carbs: float  # Углеводы, г
    meals_per_day: int  # Количество приёмов пищи
    description: str  # Описание

    @property
    def calories_per_meal(self) -> float:
        """Калорий на 1 приём пищи (среднее)."""
        return self.calories / self.meals_per_day if self.meals_per_day else 0

    def check_compliance(
        self,
        actual_calories: float,
        actual_protein: float,
        actual_fat: float,
        actual_carbs: float,
        tolerance: float = 0.1,  # ±10% допуск
    ) -> dict:
        """
        Проверяет соответствие фактического рациона нормам СанПиН.
        Возвращает словарь с результатами по каждому показателю.
        """
        results: dict = {}

        for name, norm, actual in [
            ("calories", self.calories, actual_calories),
            ("protein", self.protein, actual_protein),
            ("fat", self.fat, actual_fat),
            ("carbs", self.carbs, actual_carbs),
        ]:
            low = norm * (1 - tolerance)
            high = norm * (1 + tolerance)
            deviation = ((actual - norm) / norm * 100) if norm > 0 else 0

            results[name] = {
                "norm": norm,
                "actual": actual,
                "min": round(low, 1),
                "max": round(high, 1),
                "deviation_percent": round(deviation, 1),
                "status": "ok" if low <= actual <= high else ("high" if actual > high else "low"),
            }

        # Общий статус
        results["compliant"] = all(r["status"] == "ok" for r in results.values() if isinstance(r, dict))

        return results


# ── Нормы по возрастным группам (СанПиН 2.3/2.4.3590-20) ────

SANPIN_NORMS: dict[str, NutritionNorm] = {
    # Дошкольные учреждения (детские сады)
    "kindergarten_1_3": NutritionNorm(
        age_group="kindergarten_1_3",
        age_range="1-3 года",
        calories=1400,
        protein=42,
        fat=47,
        carbs=203,
        meals_per_day=4,
        description="Детский сад (ясельная группа)",
    ),
    "kindergarten_3_7": NutritionNorm(
        age_group="kindergarten_3_7",
        age_range="3-7 лет",
        calories=1800,
        protein=54,
        fat=60,
        carbs=261,
        meals_per_day=4,
        description="Детский сад (дошкольная группа)",
    ),
    # Школы
    "school_7_11": NutritionNorm(
        age_group="school_7_11",
        age_range="7-11 лет",
        calories=2100,
        protein=63,
        fat=70,
        carbs=305,
        meals_per_day=2,  # Завтрак + обед в школе
        description="Начальная школа (1-4 класс)",
    ),
    "school_12_18": NutritionNorm(
        age_group="school_12_18",
        age_range="12-18 лет",
        calories=2550,
        protein=77,
        fat=85,
        carbs=370,
        meals_per_day=2,  # Завтрак + обед в школе
        description="Средняя и старшая школа (5-11 класс)",
    ),
    # Школы-интернаты и продлёнка (5-разовое питание)
    "boarding_7_11": NutritionNorm(
        age_group="boarding_7_11",
        age_range="7-11 лет",
        calories=2350,
        protein=70,
        fat=78,
        carbs=341,
        meals_per_day=5,
        description="Школа-интернат / продлёнка (1-4 класс)",
    ),
    "boarding_12_18": NutritionNorm(
        age_group="boarding_12_18",
        age_range="12-18 лет",
        calories=2720,
        protein=82,
        fat=91,
        carbs=395,
        meals_per_day=5,
        description="Школа-интернат / продлёнка (5-11 класс)",
    ),
    # Оздоровительные лагеря
    "camp_7_11": NutritionNorm(
        age_group="camp_7_11",
        age_range="7-11 лет",
        calories=2400,
        protein=72,
        fat=80,
        carbs=348,
        meals_per_day=5,
        description="Оздоровительный лагерь (7-11 лет)",
    ),
    "camp_12_18": NutritionNorm(
        age_group="camp_12_18",
        age_range="12-18 лет",
        calories=2800,
        protein=84,
        fat=93,
        carbs=406,
        meals_per_day=5,
        description="Оздоровительный лагерь (12-18 лет)",
    ),
}


# ── Распределение калорий по приёмам пищи (%) ────────────────

MEAL_DISTRIBUTION = {
    2: {  # 2-разовое (школа: завтрак + обед)
        "breakfast": 25,
        "lunch": 35,
    },
    3: {  # 3-разовое
        "breakfast": 25,
        "lunch": 35,
        "dinner": 25,
    },
    4: {  # 4-разовое (детский сад)
        "breakfast": 20,
        "second_breakfast": 5,
        "lunch": 35,
        "afternoon_snack": 15,
    },
    5: {  # 5-разовое (интернат, лагерь)
        "breakfast": 20,
        "second_breakfast": 5,
        "lunch": 35,
        "afternoon_snack": 15,
        "dinner": 20,
    },
}

MEAL_LABELS = {
    "breakfast": "Завтрак",
    "second_breakfast": "Второй завтрак",
    "lunch": "Обед",
    "afternoon_snack": "Полдник",
    "dinner": "Ужин",
}


# ── Нормы по продуктам (г/день на 1 ребёнка, СанПиН прил.7) ──

PRODUCT_NORMS_PER_DAY = {
    "school_7_11": {
        "Хлеб пшеничный": 150,
        "Хлеб ржаной": 70,
        "Крупы, бобовые": 45,
        "Макаронные изделия": 15,
        "Картофель": 250,
        "Овощи свежие": 220,
        "Фрукты свежие": 185,
        "Соки": 200,
        "Мясо": 77,
        "Рыба": 77,
        "Молоко": 300,
        "Творог": 50,
        "Сметана": 10,
        "Сыр": 10,
        "Масло сливочное": 30,
        "Масло растительное": 12,
        "Яйцо (шт)": 1,
        "Сахар": 36,
    },
    "school_12_18": {
        "Хлеб пшеничный": 200,
        "Хлеб ржаной": 100,
        "Крупы, бобовые": 50,
        "Макаронные изделия": 20,
        "Картофель": 250,
        "Овощи свежие": 280,
        "Фрукты свежие": 185,
        "Соки": 200,
        "Мясо": 92,
        "Рыба": 92,
        "Молоко": 300,
        "Творог": 60,
        "Сметана": 10,
        "Сыр": 12,
        "Масло сливочное": 35,
        "Масло растительное": 15,
        "Яйцо (шт)": 1,
        "Сахар": 45,
    },
}


def get_norm(age_group: str) -> Optional[NutritionNorm]:
    """Получает норму по коду возрастной группы."""
    return SANPIN_NORMS.get(age_group)


def get_all_norms() -> list[dict]:
    """Возвращает все нормы в формате для API."""
    return [
        {
            "age_group": n.age_group,
            "age_range": n.age_range,
            "description": n.description,
            "calories": n.calories,
            "protein": n.protein,
            "fat": n.fat,
            "carbs": n.carbs,
            "meals_per_day": n.meals_per_day,
            "calories_per_meal": round(n.calories_per_meal, 0),
        }
        for n in SANPIN_NORMS.values()
    ]


def calculate_products_for_children(
    age_group: str,
    children_count: int,
    days: int = 5,
) -> dict:
    """
    UC-121: Расчёт продуктов на N детей на N дней.
    Возвращает словарь: продукт → кг.
    """
    norms = PRODUCT_NORMS_PER_DAY.get(age_group)
    if not norms:
        return {}

    result: dict[str, float] = {}
    for product, grams_per_day in norms.items():
        total_grams = grams_per_day * children_count * days
        if "шт" in product:
            result[product] = float(total_grams)  # Штуки
        else:
            result[product] = round(total_grams / 1000, 2)  # В кг

    return result
