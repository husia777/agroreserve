"""
Модель поставщика.
Коллекция: suppliers
"""
from datetime import datetime, timezone
from typing import List, Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class Supplier(Document):
    """
    Поставщик продукции.

    Хранит контактные данные, список поставляемых товаров и рейтинг.
    Рейтинг рассчитывается вручную на основе качества и своевременности поставок.
    """

    # ── Основные данные ───────────────────────────────────────
    name: str = Field(..., description="Название поставщика (например, ООО АгроБаза)")
    contact_person: str = Field(..., description="Контактное лицо")
    phone: str = Field(..., description="Телефон поставщика")
    email: Optional[str] = Field(None, description="Email поставщика")
    address: Optional[str] = Field(None, description="Адрес поставщика")
    inn: Optional[str] = Field(None, description="ИНН поставщика")

    # ── Ассортимент ───────────────────────────────────────────
    # Список ID товаров, которые поставляет данный поставщик
    product_ids: List[PydanticObjectId] = Field(
        default_factory=list,
        description="Список ID товаров из каталога",
    )

    # ── Рейтинг ───────────────────────────────────────────────
    # Рейтинг 1-5 (качество, своевременность)
    rating: float = Field(5.0, ge=1.0, le=5.0, description="Рейтинг поставщика (1-5)")

    # ── Заметки ───────────────────────────────────────────────
    notes: Optional[str] = Field(None, description="Внутренние заметки о поставщике")

    # ── Статус ────────────────────────────────────────────────
    is_active: bool = Field(True, description="Активен ли поставщик")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "suppliers"
        indexes = [
            [("name", 1)],
            [("is_active", 1)],
            [("rating", -1)],
        ]
