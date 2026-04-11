"""
Схемы для школьного меню.
"""

from datetime import date as DateType
from typing import Any, Optional

from pydantic import BaseModel, Field


class MenuItemSchema(BaseModel):
    """Позиция меню — блюдо с порциями."""

    dish_id: str = Field(..., description="ID блюда")
    dish_name: str = Field(..., description="Название блюда")
    portions: int = Field(..., ge=1, description="Количество порций")
    meal_type: str = Field(..., description="Тип приёма пищи: breakfast, lunch, snack")


class MenuDaySchema(BaseModel):
    """День меню."""

    date: DateType = Field(..., description="Дата")
    items: list[MenuItemSchema] = Field(default_factory=list)


class MenuCreate(BaseModel):
    """Создание меню на неделю."""

    week_start: DateType = Field(..., description="Начало недели")
    week_end: DateType = Field(..., description="Конец недели")
    days: list[MenuDaySchema] = Field(..., description="Меню по дням")


class MenuResponse(BaseModel):
    """Ответ с данными меню."""

    id: str = Field(...)
    client_id: str
    week_start: str
    week_end: str
    days: list[MenuDaySchema]
    total_portions: int
    total_calories: float
    total_protein: float
    total_fat: float
    total_carbs: float
    generated_order_id: Optional[str] = None
    status: str
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class MenuListResponse(BaseModel):
    """Список меню с пагинацией."""

    items: list[MenuResponse]
    total: int
    page: int
    limit: int
    pages: int


class KbzhuReportDay(BaseModel):
    """КБЖУ за один день."""

    date: str
    calories: float
    protein: float
    fat: float
    carbs: float
    portions: int
    meals: list[dict[str, Any]] = Field(default_factory=list)


class KbzhuReport(BaseModel):
    """Отчёт КБЖУ по меню."""

    menu_id: str
    week_start: str
    week_end: str
    days: list[KbzhuReportDay]
    avg_daily_calories: float
    avg_daily_protein: float
    avg_daily_fat: float
    avg_daily_carbs: float
    total_portions: int
    sanpin_compliant: bool
