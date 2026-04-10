"""
Схемы для поставщиков.
"""

from typing import Optional

from pydantic import BaseModel, Field


class SupplierCreate(BaseModel):
    """Создание нового поставщика."""

    name: str = Field(..., min_length=2, max_length=200,
                      description="Название поставщика")
    contact_person: str = Field(..., min_length=2,
                                description="Контактное лицо")
    phone: str = Field(..., description="Телефон")
    email: Optional[str] = Field(None, description="Email")
    address: Optional[str] = Field(None, description="Адрес")
    inn: Optional[str] = Field(None, description="ИНН")
    product_ids: list[str] = Field(
        default_factory=list, description="ID товаров поставщика")
    rating: float = Field(5.0, ge=1.0, le=5.0, description="Рейтинг (1-5)")
    notes: Optional[str] = Field(None, description="Заметки")
    is_active: bool = Field(True, description="Активен")


class SupplierUpdate(BaseModel):
    """Обновление поставщика (все поля опциональны)."""

    name: Optional[str] = Field(None, min_length=2, max_length=200)
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    inn: Optional[str] = None
    product_ids: Optional[list[str]] = None
    rating: Optional[float] = Field(None, ge=1.0, le=5.0)
    notes: Optional[str] = None
    is_active: Optional[bool] = None


class SupplierResponse(BaseModel):
    """Ответ с данными поставщика."""

    id: str = Field(...)
    name: str
    contact_person: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    inn: Optional[str] = None
    product_ids: list[str] = Field(default_factory=list)
    rating: float
    notes: Optional[str] = None
    is_active: bool
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class SupplierListResponse(BaseModel):
    """Список поставщиков с пагинацией."""

    items: list[SupplierResponse]
    total: int
    page: int
    limit: int
    pages: int
