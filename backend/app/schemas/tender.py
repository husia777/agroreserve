"""
Схемы для тендеров (госзакупок).
"""
from datetime import date as DateType, datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class TenderItemSchema(BaseModel):
    """Позиция тендера."""
    name: str = Field(..., description="Наименование")
    qty: float = Field(..., ge=0, description="Количество")
    unit: str = Field(..., description="Единица измерения")
    max_price: Optional[float] = Field(None, description="НМЦК по позиции (₽)")


class TenderCreate(BaseModel):
    """Создание тендера."""
    eis_number: str = Field(..., description="Номер на ЕИС")
    title: str = Field(..., description="Название тендера")
    customer: str = Field(..., description="Заказчик")
    region: str = Field(..., description="Регион")
    max_price: float = Field(..., ge=0, description="НМЦК (₽)")
    items: List[TenderItemSchema] = Field(default_factory=list)
    deadline: datetime = Field(..., description="Срок подачи заявки")
    delivery_deadline: Optional[DateType] = Field(None, description="Срок поставки")
    source_url: str = Field(..., description="URL на ЕИС")
    notes: Optional[str] = None
    is_relevant: bool = Field(True)


class TenderUpdate(BaseModel):
    """Обновление тендера."""
    status: Optional[str] = Field(None, description="Статус: new, analyzing, bid_submitted, won, lost, skipped")
    our_price: Optional[float] = Field(None, ge=0)
    margin_estimate: Optional[float] = None
    notes: Optional[str] = None
    is_relevant: Optional[bool] = None
    delivery_deadline: Optional[DateType] = None


class TenderResponse(BaseModel):
    """Ответ с данными тендера."""
    id: str = Field(..., alias="_id")
    eis_number: str
    title: str
    customer: str
    region: str
    max_price: float
    items: List[TenderItemSchema]
    deadline: str
    delivery_deadline: Optional[str] = None
    source_url: str
    status: str
    our_price: Optional[float] = None
    margin_estimate: Optional[float] = None
    notes: Optional[str] = None
    is_relevant: bool
    found_at: str
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class TenderListResponse(BaseModel):
    """Список тендеров с пагинацией."""
    items: List[TenderResponse]
    total: int
    page: int
    limit: int
    pages: int
