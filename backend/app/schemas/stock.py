"""
Схемы для складского учёта.
"""
from datetime import date as DateType
from typing import List, Optional

from pydantic import BaseModel, Field


class StockReceiptItemCreate(BaseModel):
    """Позиция при создании приходного документа."""
    product_id: str = Field(..., description="ID товара")
    quantity: float = Field(..., gt=0, description="Количество")
    unit: str = Field("kg", description="Единица измерения")
    purchase_price: float = Field(..., ge=0, description="Закупочная цена за единицу (₽)")


class StockReceiptCreate(BaseModel):
    """Запрос на создание приходного документа."""
    supplier_name: str = Field(..., min_length=2, max_length=200, description="Название поставщика")
    supplier_id: Optional[str] = Field(None, description="ID поставщика из справочника")
    supplier_contact: Optional[str] = Field(None, max_length=200, description="Контакты поставщика")
    invoice_number: Optional[str] = Field(None, max_length=50, description="Номер накладной поставщика")
    invoice_date: Optional[DateType] = Field(None, description="Дата накладной")
    date: Optional[str] = Field(None, description="Дата прихода (по умолчанию — сегодня)")
    items: List[StockReceiptItemCreate] = Field(..., min_length=1, description="Позиции прихода")
    note: Optional[str] = Field(None, max_length=1000, description="Заметки к приходу")


class StockReceiptItemResponse(BaseModel):
    """Позиция прихода в ответе API."""
    product_id: str
    product_name: str
    qty: float
    unit: str
    cost_price: float
    total: float

    model_config = {"from_attributes": True}


class StockReceiptResponse(BaseModel):
    """Приходный документ в ответе API."""
    id: str = Field(..., alias="_id")
    receipt_number: str
    supplier_id: Optional[str] = None
    supplier_name: str
    invoice_number: Optional[str] = None
    date: str
    items: List[StockReceiptItemResponse]
    total: float
    synced_to_1c: bool
    notes: Optional[str] = None
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class StockItemResponse(BaseModel):
    """Остаток товара на складе."""
    product_id: str
    product_name: str
    slug: str
    unit: str
    stock_qty: float
    min_stock_qty: float
    is_low_stock: bool
    cost_price: float
    category_name: Optional[str] = None
