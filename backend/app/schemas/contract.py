"""
Схемы для госконтрактов.
"""
from datetime import date as DateType, datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class ContractItemSchema(BaseModel):
    """Позиция контракта."""
    product_id: str = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара")
    qty: float = Field(..., ge=0, description="Количество по контракту")
    delivered_qty: float = Field(0.0, ge=0, description="Поставлено")
    unit: str = Field("kg", description="Единица измерения")
    price: float = Field(..., ge=0, description="Цена по контракту (₽)")


class DeliveryScheduleSchema(BaseModel):
    """Запись графика поставки."""
    date: DateType = Field(..., description="Плановая дата поставки")
    items: List[ContractItemSchema] = Field(default_factory=list)
    is_completed: bool = Field(False)
    order_id: Optional[str] = Field(None, description="ID связанного заказа")


class ContractCreate(BaseModel):
    """Создание контракта."""
    contract_number: str = Field(..., description="Номер контракта")
    client_id: str = Field(..., description="ID клиента")
    client_name: str = Field(..., description="Название клиента")
    contract_type: str = Field("direct", description="Тип: 44fz, direct")
    start_date: DateType = Field(..., description="Дата начала")
    end_date: DateType = Field(..., description="Дата окончания")
    total_amount: float = Field(..., ge=0, description="Общая сумма (₽)")
    items: List[ContractItemSchema] = Field(default_factory=list)
    delivery_schedule: List[DeliveryScheduleSchema] = Field(default_factory=list)
    notes: Optional[str] = None


class ContractUpdate(BaseModel):
    """Обновление контракта."""
    contract_number: Optional[str] = None
    contract_type: Optional[str] = None
    start_date: Optional[DateType] = None
    end_date: Optional[DateType] = None
    total_amount: Optional[float] = None
    items: Optional[List[ContractItemSchema]] = None
    delivery_schedule: Optional[List[DeliveryScheduleSchema]] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class DeliveryMarkRequest(BaseModel):
    """Запрос отметки выполнения поставки по графику."""
    schedule_index: int = Field(..., ge=0, description="Индекс записи в графике")
    order_id: Optional[str] = Field(None, description="ID связанного заказа")


class ContractResponse(BaseModel):
    """Ответ с данными контракта."""
    id: str = Field(..., alias="_id")
    contract_number: str
    client_id: str
    client_name: str
    contract_type: str
    start_date: str
    end_date: str
    total_amount: float
    items: List[ContractItemSchema]
    delivery_schedule: List[DeliveryScheduleSchema]
    completion_percent: float
    status: str
    documents: List[dict]
    notes: Optional[str] = None
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class ContractListResponse(BaseModel):
    """Список контрактов с пагинацией."""
    items: List[ContractResponse]
    total: int
    page: int
    limit: int
    pages: int
