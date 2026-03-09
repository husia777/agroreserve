"""
Модель подписки на уведомление о поступлении товара (UC-01).
Коллекция: stock_waitlist

Когда товар отсутствует, клиент может подписаться по email.
При обновлении stock_quantity > 0 — отправляем уведомление
и помечаем запись как notified.
"""
from datetime import datetime, timezone
from typing import Optional

from beanie import Document, Indexed
from pydantic import EmailStr, Field


class StockWaitlist(Document):
    """
    Подписка клиента на уведомление о поступлении товара.

    Один клиент может подписаться на один товар только один раз
    (уникальная пара product_id + email).
    """

    # ── Товар ─────────────────────────────────────────────────
    product_id: Indexed(str) = Field(
        ..., description="ID товара (Product)"
    )
    product_name: str = Field(
        ..., max_length=200, description="Название товара (для удобства в уведомлении)"
    )

    # ── Подписчик ─────────────────────────────────────────────
    email: EmailStr = Field(
        ..., description="Email для уведомления"
    )
    user_id: Optional[str] = Field(
        None, description="ID пользователя (если авторизован)"
    )
    user_name: Optional[str] = Field(
        None, max_length=200, description="Имя пользователя (если авторизован)"
    )

    # ── Статус ────────────────────────────────────────────────
    is_notified: bool = Field(
        False, description="Уведомление уже отправлено"
    )
    notified_at: Optional[datetime] = Field(
        None, description="Дата отправки уведомления"
    )

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "stock_waitlist"
        indexes = [
            # Уникальная подписка: один email на один товар
            [("product_id", 1), ("email", 1)],
            # Быстрый поиск неуведомлённых подписок при поступлении товара
            [("product_id", 1), ("is_notified", 1)],
            # Для хронологии
            [("created_at", -1)],
        ]
