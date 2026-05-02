"""
Модель уведомления.
Коллекция: notifications
"""

from datetime import UTC, datetime
from enum import Enum
from typing import Annotated, Optional

from beanie import Document, Indexed
from pydantic import Field


class NotificationChannel(str, Enum):
    """Каналы доставки уведомлений."""

    TELEGRAM = "telegram"
    EMAIL = "email"
    PUSH = "push"
    SMS = "sms"
    SYSTEM = "system"  # Внутреннее уведомление (в интерфейсе)


class NotificationType(str, Enum):
    """Типы уведомлений."""

    ORDER_NEW = "order_new"  # Новый заказ (для администратора)
    ORDER_CONFIRMED = "order_confirmed"  # Заказ подтверждён (для клиента)
    ORDER_STATUS = "order_status"  # Изменение статуса заказа
    ORDER_DELIVERED = "order_delivered"  # Заказ доставлен
    ORDER_CANCELLED = "order_cancelled"  # Заказ отменён
    CLIENT_REGISTERED = "client_registered"  # Новый клиент на модерации
    CLIENT_APPROVED = "client_approved"  # Клиент одобрен
    CLIENT_REJECTED = "client_rejected"  # Клиент отклонён
    CREDIT_LIMIT = "credit_limit"  # Достижение кредитного лимита
    PAYMENT_RECEIVED = "payment_received"  # Оплата получена
    STOCK_LOW = "stock_low"  # Низкий остаток товара
    CERTIFICATE_EXPIRY = "certificate_expiry"  # Сертификат истекает
    DOCUMENT_READY = "document_ready"  # Документ сформирован
    SYSTEM = "system"  # Системное уведомление


class Notification(Document):
    """
    Уведомление пользователю (клиенту или администратору).

    Уведомления создаются сервисом NotificationService
    и доставляются через Celery задачи в нужные каналы.
    """

    # ── Получатель ────────────────────────────────────────────
    user_id: Annotated[str, Indexed()] = Field(..., description="ID получателя (пользователь)")

    # ── Тип и канал ───────────────────────────────────────────
    notification_type: NotificationType = Field(..., description="Тип уведомления")
    channel: NotificationChannel = Field(..., description="Канал доставки")

    # ── Содержание ────────────────────────────────────────────
    title: str = Field(..., max_length=200, description="Заголовок уведомления")
    message: str = Field(..., max_length=2000, description="Текст уведомления")

    # ── Ссылка (если нужно перейти к объекту) ────────────────
    action_url: Optional[str] = Field(None, description="URL для перехода (например, /orders/123)")
    action_label: Optional[str] = Field(None, description="Текст кнопки действия")

    # ── Связанный объект ──────────────────────────────────────
    related_id: Optional[str] = Field(None, description="ID связанного объекта (заказ, товар и т.д.)")
    related_type: Optional[str] = Field(None, description="Тип связанного объекта: order, product")

    # ── Статус прочтения ──────────────────────────────────────
    is_read: bool = Field(False, description="Прочитано ли уведомление")
    read_at: Optional[datetime] = Field(None, description="Дата прочтения")

    # ── Статус доставки ───────────────────────────────────────
    is_sent: bool = Field(False, description="Отправлено ли в канал доставки")
    sent_at: Optional[datetime] = Field(None, description="Дата отправки")
    send_error: Optional[str] = Field(None, description="Ошибка отправки (если есть)")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "notifications"
        indexes = [
            [("user_id", 1), ("is_read", 1), ("created_at", -1)],
            [("is_sent", 1)],
            [("created_at", -1)],
        ]
