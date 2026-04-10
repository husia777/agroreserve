"""
Модель партии товара (для партионного учёта FIFO).
Коллекция: batches
"""

from datetime import UTC, datetime
from datetime import date as DateType
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class Batch(Document):
    """
    Партия товара.

    Создаётся при каждом приходе товара на склад.
    Списание идёт по принципу FIFO (первой вошла — первой вышла).
    Используется для:
    - Отслеживания сроков годности
    - Расчёта себестоимости по партиям
    - Списаний (привязка к конкретной партии)
    """

    # ── Товар ─────────────────────────────────────────────────
    product_id: PydanticObjectId = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара (кэш)")

    # ── Приход ────────────────────────────────────────────────
    receipt_id: PydanticObjectId = Field(..., description="ID приходного документа")

    # ── Поставщик ─────────────────────────────────────────────
    supplier_id: Optional[PydanticObjectId] = Field(None, description="ID поставщика")
    supplier_name: Optional[str] = Field(None, description="Название поставщика (кэш)")

    # ── Количество ────────────────────────────────────────────
    qty_initial: float = Field(..., ge=0, description="Начальное количество в партии")
    qty_remaining: float = Field(..., ge=0, description="Текущий остаток в партии")
    unit: str = Field("kg", description="Единица измерения")

    # ── Цена ──────────────────────────────────────────────────
    cost_price: float = Field(..., ge=0, description="Закупочная цена за единицу (₽)")

    # ── Даты ──────────────────────────────────────────────────
    production_date: Optional[DateType] = Field(None, description="Дата производства")
    expiry_date: Optional[DateType] = Field(None, description="Срок годности")
    received_date: DateType = Field(..., description="Дата прихода на склад")

    # ── Статус ────────────────────────────────────────────────
    # Устанавливается автоматически когда qty_remaining <= 0
    is_exhausted: bool = Field(False, description="Партия исчерпана (qty_remaining = 0)")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "batches"
        indexes = [
            [("product_id", 1), ("received_date", 1)],  # FIFO: старые партии первыми
            [("expiry_date", 1)],  # для алертов по истечению
            [("is_exhausted", 1)],
            [("receipt_id", 1)],
        ]
