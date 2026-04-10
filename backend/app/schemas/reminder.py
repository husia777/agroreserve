"""
Схемы для напоминаний.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReminderCreate(BaseModel):
    """Создание напоминания."""

    title: str = Field(..., min_length=2, max_length=200,
                       description="Заголовок")
    description: Optional[str] = Field(None, description="Описание")
    remind_at: datetime = Field(..., description="Дата и время срабатывания")
    is_recurring: bool = Field(False, description="Повторяющееся")
    recurrence_rule: Optional[str] = Field(
        None, description="Правило: daily, weekly, monthly")
    related_type: Optional[str] = Field(
        None, description="Тип связанного объекта")
    related_id: Optional[str] = Field(
        None, description="ID связанного объекта")


class ReminderUpdate(BaseModel):
    """Обновление напоминания."""

    title: Optional[str] = Field(None, min_length=2, max_length=200)
    description: Optional[str] = None
    remind_at: Optional[datetime] = None
    is_recurring: Optional[bool] = None
    recurrence_rule: Optional[str] = None
    is_completed: Optional[bool] = None


class ReminderResponse(BaseModel):
    """Ответ с данными напоминания."""

    id: str = Field(...)
    title: str
    description: Optional[str] = None
    remind_at: str
    is_recurring: bool
    recurrence_rule: Optional[str] = None
    related_type: Optional[str] = None
    related_id: Optional[str] = None
    is_completed: bool
    created_by: str
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class ReminderListResponse(BaseModel):
    """Список напоминаний с пагинацией."""

    items: list[ReminderResponse]
    total: int
    page: int
    limit: int
    pages: int
