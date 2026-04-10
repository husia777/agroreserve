"""
Схемы для регулярных заказов.
"""

from typing import Optional

from pydantic import BaseModel, Field


class StandingOrderItemSchema(BaseModel):
    """Позиция регулярного заказа."""

    product_id: str = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара")
    qty: float = Field(..., gt=0, description="Количество")
    unit: str = Field("kg", description="Единица измерения")


class StandingOrderCreate(BaseModel):
    """Создание регулярного заказа."""

    items: list[StandingOrderItemSchema] = Field(
        ..., min_length=1, description="Позиции заказа")
    schedule: str = Field(
        ...,
        description="Расписание: weekly_mon..weekly_sun, biweekly, monthly_1, monthly_15",
    )
    delivery_slot: str = Field(..., description="Временной слот: 08:00-11:00")
    delivery_address: str = Field(..., min_length=5,
                                  description="Адрес доставки")
    note: Optional[str] = Field(None, description="Примечание")


class StandingOrderUpdate(BaseModel):
    """Обновление регулярного заказа."""

    items: Optional[list[StandingOrderItemSchema]] = None
    schedule: Optional[str] = None
    delivery_slot: Optional[str] = None
    delivery_address: Optional[str] = None
    is_active: Optional[bool] = None
    note: Optional[str] = None


class StandingOrderResponse(BaseModel):
    """Ответ с данными регулярного заказа."""

    id: str = Field(...)
    client_id: str
    client_name: str
    items: list[StandingOrderItemSchema]
    schedule: str
    delivery_slot: str
    delivery_address: str
    is_active: bool
    last_generated_at: Optional[str] = None
    next_generation_at: Optional[str] = None
    note: Optional[str] = None
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class StandingOrderListResponse(BaseModel):
    """Список регулярных заказов."""

    items: list[StandingOrderResponse]
    total: int
