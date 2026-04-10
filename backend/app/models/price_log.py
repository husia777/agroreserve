"""
Модель истории закупочных цен поставщиков.
Коллекция: price_logs
"""

from datetime import UTC, datetime
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class PriceLog(Document):
    """
    Запись истории закупочной цены товара от поставщика.

    Создаётся автоматически при каждом приходе товара.
    Используется для:
    - Анализа динамики цен (тренды)
    - Сравнения поставщиков по цене
    - Рекомендаций при формировании заявок
    """

    # ── Товар ─────────────────────────────────────────────────
    product_id: PydanticObjectId = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара (кэш)")

    # ── Поставщик ─────────────────────────────────────────────
    supplier_id: PydanticObjectId = Field(..., description="ID поставщика")
    supplier_name: str = Field(..., description="Название поставщика (кэш)")

    # ── Цена ──────────────────────────────────────────────────
    price: float = Field(..., ge=0, description="Закупочная цена за единицу (₽)")
    unit: str = Field("kg", description="Единица измерения")

    # ── Привязка к приходу ────────────────────────────────────
    receipt_id: Optional[PydanticObjectId] = Field(None, description="ID приходного документа")

    # ── Время записи ──────────────────────────────────────────
    logged_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        description="Дата и время записи цены",
    )

    class Settings:
        name = "price_logs"
        indexes = [
            [("product_id", 1), ("logged_at", -1)],
            [("supplier_id", 1), ("logged_at", -1)],
            [("logged_at", -1)],
        ]
