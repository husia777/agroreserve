"""
Схемы для заказов.
"""
from datetime import date as DateType
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class OrderItemCreate(BaseModel):
    """Позиция при создании заказа."""
    product_id: str = Field(..., description="ID товара")
    qty: float = Field(..., gt=0, description="Количество (должно соответствовать шагу товара)")


class OrderCreate(BaseModel):
    """Запрос на создание заказа клиентом."""
    items: Optional[List[OrderItemCreate]] = Field(None, description="Позиции заказа (опционально, если используется корзина)")
    delivery_date: DateType = Field(..., description="Желаемая дата доставки")
    delivery_slot: str = Field(..., description="Временной слот: '08:00-11:00'")
    delivery_address: str = Field(..., min_length=5, max_length=500, description="Адрес доставки")
    payment_method: str = Field("bank_transfer", description="Способ оплаты")
    note: Optional[str] = Field(None, max_length=1000, description="Примечание к заказу")
    delivery_priority: str = Field("normal", description="Приоритет: urgent, normal, flexible")

    @field_validator("delivery_date")
    @classmethod
    def validate_delivery_date(cls, v: DateType) -> DateType:
        from datetime import date as date_type, timedelta
        today = date_type.today()
        if v < today:
            raise ValueError("Дата доставки не может быть в прошлом")
        if v > today + timedelta(days=14):
            raise ValueError("Дата доставки не может быть позже чем через 14 дней")
        return v

    @field_validator("delivery_slot")
    @classmethod
    def validate_delivery_slot(cls, v: str) -> str:
        valid_slots = ["08:00-11:00", "11:00-14:00", "14:00-17:00"]
        if v not in valid_slots:
            raise ValueError(f"Доступные слоты доставки: {', '.join(valid_slots)}")
        return v

    @field_validator("payment_method")
    @classmethod
    def validate_payment_method(cls, v: str) -> str:
        valid = ["bank_transfer", "cash", "card_on_delivery", "prepayment"]
        if v not in valid:
            raise ValueError("Недопустимый способ оплаты")
        return v


class OrderItemResponse(BaseModel):
    """Позиция заказа в ответе API."""
    product_id: str
    product_name: str
    ordered_qty: float
    actual_qty: Optional[float] = None
    unit: str
    price: float
    total: float

    model_config = {"from_attributes": True}


class OrderDocumentResponse(BaseModel):
    """Документ заказа в ответе API."""
    doc_type: str
    url: str
    doc_id: Optional[str] = None

    model_config = {"from_attributes": True}


class StatusHistoryResponse(BaseModel):
    """Запись истории статуса заказа."""
    status: str
    timestamp: str
    by: str
    comment: Optional[str] = None

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    """Детальный ответ по заказу."""
    id: str = Field(..., alias="_id", serialization_alias="id")
    order_number: str
    client_id: str
    client_name: str
    client_phone: str
    status: str
    items: List[OrderItemResponse]
    subtotal: float
    discount: float = 0.0
    total: float
    delivery_date: Optional[str] = None
    delivery_slot: Optional[str] = None
    delivery_address: str
    delivery_priority: str
    payment_method: str
    payment_status: str
    paid_amount: float = 0.0
    note: Optional[str] = None
    documents: List[OrderDocumentResponse] = Field(default_factory=list)
    status_history: List[StatusHistoryResponse] = Field(default_factory=list)
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class OrderListItem(BaseModel):
    """Краткая информация о заказе для списка."""
    id: str = Field(..., alias="_id", serialization_alias="id")
    order_number: str
    client_name: str
    status: str
    total: float
    delivery_date: Optional[str] = None
    delivery_slot: Optional[str] = None
    payment_status: str
    items_count: int = Field(0, description="Количество позиций в заказе")
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class OrderListResponse(BaseModel):
    """Список заказов с пагинацией."""
    items: List[OrderListItem]
    total: int
    page: int
    limit: int
    pages: int


class OrderStatusUpdate(BaseModel):
    """Запрос на смену статуса заказа (от администратора)."""
    status: str = Field(..., description="Новый статус")
    comment: Optional[str] = Field(None, max_length=500, description="Комментарий к смене статуса")

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        valid = ["new", "confirmed", "assembling", "assembled", "delivering", "delivered", "cancelled"]
        if v not in valid:
            raise ValueError(f"Допустимые статусы: {', '.join(valid)}")
        return v


class ActualQtyUpdate(BaseModel):
    """Запрос на обновление фактического веса позиций (при отгрузке)."""
    items: List[dict] = Field(
        ...,
        description="Список: [{'product_id': '...', 'actual_qty': 48.5}]"
    )
