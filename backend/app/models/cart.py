"""
Модель корзины покупок.
Хранится в MongoDB (коллекция carts).
Одна корзина на пользователя.
"""
from datetime import datetime, timezone
from typing import List, Optional

from beanie import Document, Indexed
from pydantic import BaseModel, Field


class CartItem(BaseModel):
    """Позиция в корзине (встроенная структура)."""
    item_id: str = Field(..., description="Уникальный ID позиции внутри корзины (UUID)")
    product_id: str = Field(..., description="ID товара (ObjectId)")
    product_name: str = Field(..., description="Название товара (кэш)")
    product_slug: str = Field(..., description="Slug товара (кэш)")
    unit: str = Field("kg", description="Единица измерения")
    qty: float = Field(..., gt=0, description="Количество")
    price: float = Field(..., ge=0, description="Цена за единицу (₽)")
    cost_price: float = Field(0.0, ge=0, description="Себестоимость за единицу (для P&L)")
    total: float = Field(..., ge=0, description="Сумма по позиции (₽)")
    # Снапшот параметров товара на момент добавления в корзину
    min_order_qty: float = Field(0.0, description="Минимальный заказ")
    order_step: float = Field(0.5, description="Шаг заказа")
    stock_qty: float = Field(0.0, description="Остаток на момент добавления")


class Cart(Document):
    """
    Корзина пользователя.

    Одна корзина на одного пользователя.
    При создании заказа корзина очищается.
    """

    # ── Владелец ──────────────────────────────────────────────
    user_id: Indexed(str, unique=True) = Field(
        ..., description="ID пользователя — владельца корзины"
    )

    # ── Позиции ───────────────────────────────────────────────
    items: List[CartItem] = Field(default_factory=list, description="Позиции корзины")

    # ── Суммы (кэш) ───────────────────────────────────────────
    total: float = Field(0.0, ge=0, description="Итоговая сумма (₽)")
    items_count: int = Field(0, ge=0, description="Количество позиций")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "carts"
        indexes = [
            [("user_id", 1)],
            [("updated_at", -1)],
        ]

    def recalculate(self) -> None:
        """Пересчитывает суммы корзины."""
        for item in self.items:
            item.total = round(item.qty * item.price, 2)
        self.total = round(sum(item.total for item in self.items), 2)
        self.items_count = len(self.items)
        self.updated_at = datetime.now(timezone.utc)
