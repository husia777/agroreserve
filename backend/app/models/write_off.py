"""
Модель списания товара со склада.
Коллекция: write_offs
"""
from datetime import datetime, timezone
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class WriteOff(Document):
    """
    Акт списания товара.

    При создании:
    1. Уменьшается остаток товара в каталоге
    2. Автоматически создаётся расход в P&L с категорией "other"
    3. Если включён партионный учёт — списание идёт из конкретной партии
    """

    # ── Товар ─────────────────────────────────────────────────
    product_id: PydanticObjectId = Field(..., description="ID товара")
    product_name: str = Field(..., description="Название товара (кэш)")
    qty: float = Field(..., ge=0, description="Списанное количество")
    unit: str = Field("kg", description="Единица измерения")

    # ── Финансы ───────────────────────────────────────────────
    cost_price: float = Field(..., ge=0, description="Себестоимость единицы (₽)")
    total_loss: float = Field(..., ge=0, description="Общий убыток: qty * cost_price (₽)")

    # ── Причина списания ──────────────────────────────────────
    # "spoilage" — порча, "expired" — истёк срок годности,
    # "damage" — механическое повреждение, "other" — иное
    reason: str = Field(..., description="Причина: spoilage, expired, damage, other")
    description: Optional[str] = Field(None, description="Подробное описание причины")

    # ── Фото ─────────────────────────────────────────────────
    photo_url: Optional[str] = Field(None, description="URL фотоподтверждения")

    # ── Привязка к партии ─────────────────────────────────────
    # При партионном учёте (FIFO) — из какой партии списывается
    batch_id: Optional[PydanticObjectId] = Field(None, description="ID партии (FIFO)")

    # ── Кто списал ────────────────────────────────────────────
    created_by: PydanticObjectId = Field(..., description="ID пользователя, создавшего списание")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "write_offs"
        indexes = [
            [("product_id", 1), ("created_at", -1)],
            [("reason", 1)],
            [("created_at", -1)],
            [("batch_id", 1)],
        ]
