"""
Модель регулярного (автоматического) заказа.
Коллекция: standing_orders
"""
from datetime import datetime, timezone
from typing import List, Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field


class StandingOrderItem(BaseModel):
    """Позиция регулярного заказа."""
    product_id: PydanticObjectId = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара (кэш)")
    qty: float = Field(..., ge=0, description="Количество в регулярном заказе")
    unit: str = Field("kg", description="Единица измерения")


class StandingOrder(Document):
    """
    Регулярный заказ клиента (подписка на автодоставку).

    Система автоматически генерирует заказы по расписанию.
    Клиент подтверждает или отменяет каждую генерацию.

    Расписание (schedule):
    - "weekly_mon" ... "weekly_sun" — еженедельно по дню недели
    - "biweekly" — раз в две недели
    - "monthly_1", "monthly_15" — ежемесячно 1-го или 15-го числа
    """

    # ── Клиент ────────────────────────────────────────────────
    client_id: PydanticObjectId = Field(..., description="ID клиента")
    client_name: str = Field(..., description="Название клиента (кэш)")

    # ── Состав ────────────────────────────────────────────────
    items: List[StandingOrderItem] = Field(
        default_factory=list, description="Позиции регулярного заказа"
    )

    # ── Расписание ────────────────────────────────────────────
    schedule: str = Field(
        ...,
        description="Расписание: weekly_mon, weekly_tue, ..., biweekly, monthly_1, monthly_15",
    )

    # ── Доставка ──────────────────────────────────────────────
    delivery_slot: str = Field(..., description="Временной слот доставки (08:00-11:00)")
    delivery_address: str = Field(..., description="Адрес доставки")

    # ── Статус ────────────────────────────────────────────────
    is_active: bool = Field(True, description="Активен ли регулярный заказ")

    # ── Генерация ─────────────────────────────────────────────
    last_generated_at: Optional[datetime] = Field(None, description="Дата последней генерации")
    next_generation_at: Optional[datetime] = Field(None, description="Дата следующей генерации")

    # ── Заметка ───────────────────────────────────────────────
    note: Optional[str] = Field(None, description="Примечание к регулярному заказу")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "standing_orders"
        indexes = [
            [("client_id", 1)],
            [("is_active", 1)],
            [("next_generation_at", 1)],
        ]
