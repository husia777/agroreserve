"""
Модель блюда для конструктора школьного меню.
Коллекция: dishes
"""
from datetime import datetime, timezone
from typing import List, Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field


class DishIngredient(BaseModel):
    """Ингредиент блюда с привязкой к каталогу товаров."""
    # Необязательная привязка к товару в каталоге (для автоматического заказа)
    product_id: Optional[PydanticObjectId] = Field(None, description="ID товара в каталоге")
    name: str = Field(..., description="Название ингредиента (например, Картофель)")
    qty_per_portion_g: float = Field(..., ge=0, description="Количество граммов на одну порцию")
    unit: str = Field("g", description="Единица измерения (g — граммы)")


class Dish(Document):
    """
    Блюдо для конструктора школьного меню.

    Содержит состав (ингредиенты), пищевую ценность и признак соответствия СанПиН.
    Используется для автоматического расчёта заказа продуктов по меню.
    """

    # ── Основные данные ───────────────────────────────────────
    name: str = Field(..., description="Название блюда (например, Пюре картофельное)")
    # Категории: гарнир, суп, салат, второе, напиток, выпечка
    category: str = Field(..., description="Категория блюда")
    description: Optional[str] = Field(None, description="Описание блюда")

    # ── Состав ────────────────────────────────────────────────
    ingredients: List[DishIngredient] = Field(
        default_factory=list, description="Ингредиенты блюда"
    )

    # ── Выход и пищевая ценность ──────────────────────────────
    portion_weight_g: float = Field(..., ge=0, description="Вес одной порции в граммах")
    calories: float = Field(..., ge=0, description="Калорийность на порцию (ккал)")
    protein: float = Field(..., ge=0, description="Белки на порцию (г)")
    fat: float = Field(..., ge=0, description="Жиры на порцию (г)")
    carbs: float = Field(..., ge=0, description="Углеводы на порцию (г)")

    # ── Соответствие СанПиН ───────────────────────────────────
    sanpin_compliant: bool = Field(True, description="Соответствует ли нормам СанПиН")

    # ── Возрастные группы ─────────────────────────────────────
    # Форматы: "7-11" (начальная школа), "12-18" (средняя/старшая)
    age_groups: List[str] = Field(
        default_factory=lambda: ["7-11", "12-18"],
        description="Возрастные группы учеников",
    )

    # ── Статус ────────────────────────────────────────────────
    is_active: bool = Field(True, description="Активно ли блюдо в справочнике")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "dishes"
        indexes = [
            [("category", 1)],
            [("is_active", 1)],
            [("sanpin_compliant", 1)],
            [("name", "text")],
        ]
