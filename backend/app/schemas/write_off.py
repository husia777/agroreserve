"""
Схемы для списаний товара.
"""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class WriteOffCreate(BaseModel):
    """Создание акта списания."""
    product_id: str = Field(..., description="ID товара")
    qty: float = Field(..., gt=0, description="Количество для списания")
    unit: str = Field("kg", description="Единица измерения")
    reason: str = Field(..., description="Причина: spoilage, expired, damage, other")
    description: Optional[str] = Field(None, description="Описание причины")
    photo_url: Optional[str] = Field(None, description="URL фото подтверждения")
    batch_id: Optional[str] = Field(None, description="ID конкретной партии (FIFO)")

    class Config:
        json_schema_extra = {
            "example": {
                "product_id": "64abc123def456...",
                "qty": 5.5,
                "unit": "kg",
                "reason": "spoilage",
                "description": "Обнаружена плесень при проверке",
            }
        }


class WriteOffResponse(BaseModel):
    """Ответ с данными акта списания."""
    id: str = Field(..., alias="_id")
    product_id: str
    product_name: str
    qty: float
    unit: str
    cost_price: float
    total_loss: float
    reason: str
    description: Optional[str] = None
    photo_url: Optional[str] = None
    batch_id: Optional[str] = None
    created_by: str
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class WriteOffListResponse(BaseModel):
    """Список списаний с пагинацией."""
    items: List[WriteOffResponse]
    total: int
    page: int
    limit: int
    pages: int


class WriteOffAnalytics(BaseModel):
    """Аналитика списаний."""
    total_loss: float = Field(..., description="Общий убыток (₽)")
    total_qty: float = Field(..., description="Общее количество списанного")
    by_reason: List[Dict[str, Any]] = Field(
        default_factory=list, description="Группировка по причинам"
    )
    by_product: List[Dict[str, Any]] = Field(
        default_factory=list, description="Топ товаров по убыткам"
    )
    by_month: List[Dict[str, Any]] = Field(
        default_factory=list, description="Динамика по месяцам"
    )
