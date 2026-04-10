"""
Модель школьного меню.
Коллекция: menus
"""

from datetime import UTC, datetime
from datetime import date as DateType
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field


class MenuItem(BaseModel):
    """Позиция меню — блюдо с количеством порций."""

    dish_id: PydanticObjectId = Field(..., description="ID блюда")
    dish_name: str = Field(..., description="Название блюда (кэш)")
    portions: int = Field(..., ge=1, description="Количество порций")
    # Тип приёма пищи: breakfast, lunch, snack
    meal_type: str = Field(..., description="Приём пищи: breakfast, lunch, snack")


class MenuDay(BaseModel):
    """Один день меню с перечнем блюд по приёмам пищи."""

    date: DateType = Field(..., description="Дата")
    items: list[MenuItem] = Field(default_factory=list, description="Блюда на этот день")


class Menu(Document):
    """
    Школьное меню на неделю.

    Создаётся для конкретной школы (client_id).
    После подтверждения автоматически генерирует заказ на продукты.
    Включает расчёт КБЖУ для контроля норм питания.
    """

    # ── Привязка к школе ──────────────────────────────────────
    client_id: PydanticObjectId = Field(..., description="ID клиента (школы)")

    # ── Период ────────────────────────────────────────────────
    week_start: DateType = Field(..., description="Начало недели меню")
    week_end: DateType = Field(..., description="Конец недели меню")

    # ── Дни меню ──────────────────────────────────────────────
    days: list[MenuDay] = Field(default_factory=list, description="Меню по дням")

    # ── Агрегированные показатели ─────────────────────────────
    total_portions: int = Field(0, description="Всего порций за неделю")
    total_calories: float = Field(0.0, description="Суммарные калории за неделю")
    total_protein: float = Field(0.0, description="Суммарные белки за неделю (г)")
    total_fat: float = Field(0.0, description="Суммарные жиры за неделю (г)")
    total_carbs: float = Field(0.0, description="Суммарные углеводы за неделю (г)")

    # ── Связанный заказ ───────────────────────────────────────
    # Заполняется после генерации заказа из меню
    generated_order_id: Optional[PydanticObjectId] = Field(None, description="ID сгенерированного заказа")

    # ── Статус ────────────────────────────────────────────────
    # "draft" — черновик, "confirmed" — подтверждено, "ordered" — заказ сформирован
    status: str = Field("draft", description="Статус: draft, confirmed, ordered")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "menus"
        indexes = [
            [("client_id", 1), ("week_start", -1)],
            [("status", 1)],
        ]
