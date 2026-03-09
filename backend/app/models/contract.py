"""
Модель государственного контракта (44-ФЗ и прямые договоры).
Коллекция: contracts
"""
from datetime import date as DateType, datetime, timezone
from typing import List, Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field


class ContractItem(BaseModel):
    """Позиция контракта — товар с объёмом и ценой."""
    product_id: PydanticObjectId = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара (кэш)")
    qty: float = Field(..., ge=0, description="Общее количество по контракту")
    delivered_qty: float = Field(0.0, ge=0, description="Уже поставленное количество")
    unit: str = Field("kg", description="Единица измерения")
    price: float = Field(..., ge=0, description="Цена по контракту (₽ за единицу)")


class DeliverySchedule(BaseModel):
    """График поставки — одна дата с перечнем позиций."""
    date: DateType = Field(..., description="Плановая дата поставки")
    items: List[ContractItem] = Field(default_factory=list, description="Позиции поставки")
    is_completed: bool = Field(False, description="Выполнена ли поставка")
    # Привязка к реальному заказу после выполнения
    order_id: Optional[PydanticObjectId] = Field(None, description="ID связанного заказа")


class Contract(Document):
    """
    Государственный контракт или прямой договор с клиентом.

    Отслеживает исполнение: сколько поставлено, процент выполнения,
    просрочки. Поддерживает графики поставок.
    """

    # ── Идентификация ─────────────────────────────────────────
    contract_number: str = Field(..., description="Номер контракта (ГК-2026-00001)")
    client_id: PydanticObjectId = Field(..., description="ID клиента")
    client_name: str = Field(..., description="Название клиента (кэш)")

    # ── Тип контракта ─────────────────────────────────────────
    # "44fz" — по 44-ФЗ (госзакупки), "direct" — прямой договор
    contract_type: str = Field("direct", description="Тип: 44fz, direct")

    # ── Сроки ─────────────────────────────────────────────────
    start_date: DateType = Field(..., description="Дата начала контракта")
    end_date: DateType = Field(..., description="Дата окончания контракта")

    # ── Финансы ───────────────────────────────────────────────
    total_amount: float = Field(..., ge=0, description="Общая сумма контракта (₽)")

    # ── Позиции ───────────────────────────────────────────────
    items: List[ContractItem] = Field(default_factory=list, description="Товары по контракту")

    # ── График поставок ───────────────────────────────────────
    delivery_schedule: List[DeliverySchedule] = Field(
        default_factory=list, description="График плановых поставок"
    )

    # ── Исполнение ────────────────────────────────────────────
    # Процент фактически исполненного контракта (0-100)
    completion_percent: float = Field(0.0, ge=0.0, le=100.0, description="Процент исполнения")

    # ── Статус ────────────────────────────────────────────────
    # "active" — в работе, "completed" — исполнен, "cancelled" — расторгнут, "overdue" — просрочен
    status: str = Field("active", description="Статус: active, completed, cancelled, overdue")

    # ── Документы ─────────────────────────────────────────────
    # Формат: [{"type": "contract", "url": "..."}, {"type": "act", "url": "..."}]
    documents: List[dict] = Field(default_factory=list, description="Прикреплённые документы")

    # ── Заметки ───────────────────────────────────────────────
    notes: Optional[str] = Field(None, description="Внутренние заметки")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "contracts"
        indexes = [
            [("contract_number", 1)],
            [("client_id", 1)],
            [("status", 1)],
            [("end_date", 1)],
        ]
