"""
Модель заказа.
Коллекция: orders
"""

from __future__ import annotations

from datetime import UTC, datetime
from datetime import date as DateType
from enum import Enum
from typing import Optional

from beanie import Document, Link
from pydantic import BaseModel, Field

from app.models.user import User


class OrderStatus(str, Enum):
    """Статусы заказа (жизненный цикл)."""

    NEW = "new"  # Новый — только создан клиентом
    CONFIRMED = "confirmed"  # Подтверждён администратором
    ASSEMBLING = "assembling"  # Собирается на складе
    ASSEMBLED = "assembled"  # Собран, готов к отгрузке
    DELIVERING = "delivering"  # В пути к клиенту
    DELIVERED = "delivered"  # Доставлен клиенту
    CANCELLED = "cancelled"  # Отменён


class DeliveryPriority(str, Enum):
    """Приоритет доставки."""

    URGENT = "urgent"  # 🔴 Срочно (госконтракт)
    NORMAL = "normal"  # 🟡 Обычный
    FLEXIBLE = "flexible"  # 🟢 Гибкий


class PaymentMethod(str, Enum):
    """Способ оплаты."""

    BANK_TRANSFER = "bank_transfer"  # Безнал (для B2B)
    CASH = "cash"  # Наличные при доставке
    CARD_ON_DELIVERY = "card_on_delivery"  # Картой при доставке
    PREPAYMENT = "prepayment"  # Предоплата на карту


class PaymentStatus(str, Enum):
    """Статус оплаты."""

    PENDING = "pending"  # Ожидает оплаты
    PARTIAL = "partial"  # Частично оплачен
    PAID = "paid"  # Полностью оплачен
    OVERDUE = "overdue"  # Просрочен


class OrderItem(BaseModel):
    """Позиция в заказе (встроенная структура)."""

    product_id: str = Field(..., description="ID товара (ObjectId в виде строки)")
    product_name: str = Field(..., description="Название товара на момент заказа")
    ordered_qty: float = Field(..., ge=0, description="Заказанное количество")
    # Фактическое количество при отгрузке (может отличаться от заказанного)
    actual_qty: Optional[float] = Field(None, ge=0, description="Фактически отгруженное количество")
    unit: str = Field("kg", description="Единица измерения")
    price: float = Field(..., ge=0, description="Цена за единицу на момент заказа (₽)")
    cost_price: float = Field(0.0, ge=0, description="Себестоимость единицы (для P&L)")
    total: float = Field(..., ge=0, description="Сумма по позиции (₽)")


class OrderDocument(BaseModel):
    """Прикреплённый документ к заказу."""

    doc_type: str = Field(..., description="Тип документа: invoice, torg12, upd, label")
    url: str = Field(..., description="URL документа")
    doc_id: Optional[str] = Field(None, description="ID документа в коллекции documents")


class StatusHistoryEntry(BaseModel):
    """Запись в истории смены статуса заказа."""

    status: OrderStatus = Field(..., description="Новый статус")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        description="Дата и время смены статуса",
    )
    by: str = Field(..., description="Кто изменил: 'client', 'admin', 'system'")
    comment: Optional[str] = Field(None, description="Комментарий к смене статуса")


class Order(Document):
    """
    Заказ клиента.

    Номер заказа генерируется автоматически в формате ORD-YYYY-NNNNN.
    Цены фиксируются на момент создания заказа.
    При отгрузке фактическое количество может отличаться от заказанного.
    """

    # ── Номер и клиент ────────────────────────────────────────
    order_number: str = Field(..., description="Номер заказа (ORD-2026-00001)")
    client_id: Link[User] = Field(..., description="Ссылка на клиента")
    client_name: str = Field(..., description="Имя клиента (кэш для отображения)")
    client_phone: str = Field(..., description="Телефон клиента (кэш)")

    # ── Статус ────────────────────────────────────────────────
    status: OrderStatus = Field(OrderStatus.NEW, description="Текущий статус заказа")

    # ── Позиции заказа ────────────────────────────────────────
    items: list[OrderItem] = Field(default_factory=list, description="Позиции заказа")

    # ── Суммы ─────────────────────────────────────────────────
    subtotal: float = Field(0.0, ge=0, description="Сумма до скидки (₽)")
    discount: float = Field(0.0, ge=0, description="Скидка (₽)")
    total: float = Field(0.0, ge=0, description="Итоговая сумма (₽)")

    # ── Доставка ──────────────────────────────────────────────
    delivery_date: Optional[DateType] = Field(None, description="Дата доставки")
    delivery_slot: Optional[str] = Field(
        None, description="Временной слот: '08:00-11:00', '11:00-14:00', '14:00-17:00'"
    )
    delivery_address: str = Field(..., description="Адрес доставки")
    delivery_priority: DeliveryPriority = Field(DeliveryPriority.NORMAL, description="Приоритет доставки")

    # ── Оплата ────────────────────────────────────────────────
    payment_method: PaymentMethod = Field(PaymentMethod.BANK_TRANSFER, description="Способ оплаты")
    payment_status: PaymentStatus = Field(PaymentStatus.PENDING, description="Статус оплаты")
    paid_amount: float = Field(0.0, ge=0, description="Оплачено (₽)")
    paid_at: Optional[datetime] = Field(None, description="Дата оплаты")

    # ── Дополнительно ─────────────────────────────────────────
    note: Optional[str] = Field(None, max_length=1000, description="Примечание клиента к заказу")
    admin_note: Optional[str] = Field(None, description="Внутренняя заметка администратора")
    contract_id: Optional[str] = Field(None, description="ID госконтракта (если по контракту)")

    # ── Документы ─────────────────────────────────────────────
    documents: list[OrderDocument] = Field(default_factory=list, description="Прикреплённые документы")

    # ── История статусов ──────────────────────────────────────
    status_history: list[StatusHistoryEntry] = Field(default_factory=list, description="История изменений статуса")

    # ── Синхронизация с 1С ────────────────────────────────────
    synced_to_1c: bool = Field(False, description="Передан ли в 1С")
    sync_1c_id: Optional[str] = Field(None, description="ID документа в 1С")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "orders"
        indexes = [
            [("order_number", 1)],
            [("client_id", 1), ("created_at", -1)],
            [("status", 1), ("delivery_date", 1)],
            [("created_at", -1)],
            [("payment_status", 1)],
        ]

    def calculate_total(self) -> float:
        """Пересчитывает итоговую сумму по позициям."""
        subtotal = sum(item.total for item in self.items)
        return max(0.0, subtotal - self.discount)

    def recalculate_by_actual_qty(self) -> None:
        """
        Пересчитывает суммы по фактическому количеству.
        Вызывается при отгрузке, когда факт отличается от заказа.
        """
        for item in self.items:
            if item.actual_qty is not None:
                item.total = round(item.actual_qty * item.price, 2)
        self.subtotal = sum(item.total for item in self.items)
        self.total = max(0.0, self.subtotal - self.discount)


# Импорт для форвард-ссылки (в конце файла, чтобы избежать циклических зависимостей)
# Order.model_rebuild() вызывается из database.py после регистрации всех моделей в Beanie
