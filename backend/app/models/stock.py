"""
Модели складского учёта: приходные документы.
Коллекция: stock_receipts
"""

from datetime import UTC, datetime
from datetime import date as DateType
from typing import Optional

from beanie import Document
from pydantic import BaseModel, Field


class StockReceiptItem(BaseModel):
    """Позиция в приходном документе (встроенная структура)."""

    product_id: str = Field(..., description="ID товара (ObjectId в виде строки)")
    product_name: str = Field(..., description="Название товара (кэш)")
    qty: float = Field(..., ge=0, description="Количество")
    unit: str = Field("kg", description="Единица измерения")
    cost_price: float = Field(..., ge=0, description="Закупочная цена за единицу (₽)")
    total: float = Field(..., ge=0, description="Сумма по позиции (₽)")


class StockReceipt(Document):
    """
    Приходный документ (поступление товара на склад).

    При проведении:
    1. Увеличиваются остатки товаров
    2. Обновляется средневзвешенная себестоимость
    3. Данные передаются в 1С (если включена интеграция)

    Номер документа генерируется автоматически: REC-YYYY-NNNNN
    """

    # ── Номер документа ───────────────────────────────────────
    receipt_number: str = Field(..., description="Номер прихода (REC-2026-00001)")

    # ── Поставщик ─────────────────────────────────────────────
    supplier_id: Optional[str] = Field(None, description="ID поставщика (если из справочника)")
    supplier_name: str = Field(..., description="Название поставщика")
    supplier_contact: Optional[str] = Field(None, description="Контактные данные поставщика")

    # ── Документы поставщика ──────────────────────────────────
    invoice_number: Optional[str] = Field(None, description="Номер накладной поставщика")
    invoice_date: Optional[DateType] = Field(None, description="Дата накладной поставщика")
    date: DateType = Field(
        default_factory=lambda: datetime.now(UTC).date(),
        description="Дата прихода на склад",
    )

    # ── Позиции ───────────────────────────────────────────────
    items: list[StockReceiptItem] = Field(default_factory=list, description="Позиции прихода")

    # ── Суммы ─────────────────────────────────────────────────
    total: float = Field(0.0, ge=0, description="Итоговая сумма прихода (₽)")

    # ── Синхронизация с 1С ────────────────────────────────────
    synced_to_1c: bool = Field(False, description="Передан ли в 1С")
    sync_1c_id: Optional[str] = Field(None, description="ID документа Поступление в 1С")

    # ── Заметки ───────────────────────────────────────────────
    notes: Optional[str] = Field(None, description="Заметки к приходу")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    created_by: Optional[str] = Field(None, description="ID пользователя, создавшего документ")

    class Settings:
        name = "stock_receipts"
        indexes = [
            [("receipt_number", 1)],
            [("date", -1)],
            [("supplier_name", 1)],
            [("synced_to_1c", 1)],
        ]

    def calculate_total(self) -> float:
        """Рассчитывает итоговую сумму по позициям."""
        return sum(item.total for item in self.items)
