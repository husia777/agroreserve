"""
Модели CRM — заметки и история взаимодействий с клиентами.
Коллекции: client_notes, client_interactions
"""

from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field


class InteractionType(str, Enum):
    """Типы взаимодействий с клиентом."""

    CALL = "call"  # Телефонный звонок
    EMAIL = "email"  # Электронная почта
    MEETING = "meeting"  # Личная встреча
    WHATSAPP = "whatsapp"  # WhatsApp/Telegram переписка
    ORDER = "order"  # Заказ
    PAYMENT = "payment"  # Оплата
    COMPLAINT = "complaint"  # Жалоба / рекламация
    NOTE = "note"  # Произвольная заметка


class ClientNote(Document):
    """
    Заметка администратора к клиенту.
    Хранятся отдельно для быстрого доступа в карточке клиента.
    """

    # ── Привязка ──────────────────────────────────────────────
    client_id: str = Field(..., description="ID клиента")

    # ── Содержание ────────────────────────────────────────────
    text: str = Field(..., max_length=2000, description="Текст заметки")

    # ── Автор ─────────────────────────────────────────────────
    created_by: str = Field(...,
                            description="ID администратора, создавшего заметку")
    created_by_name: str = Field(..., description="Имя администратора (кэш)")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "client_notes"
        indexes = [
            [("client_id", 1), ("created_at", -1)],
        ]


class ClientInteraction(Document):
    """
    Запись о взаимодействии с клиентом.

    Фиксирует все контакты: звонки, письма, встречи, жалобы.
    Формирует хронологию отношений с клиентом.
    """

    # ── Привязка ──────────────────────────────────────────────
    client_id: str = Field(..., description="ID клиента")

    # ── Тип и описание ────────────────────────────────────────
    interaction_type: InteractionType = Field(
        ..., description="Тип взаимодействия")
    title: str = Field(..., max_length=200, description="Краткое описание")
    description: Optional[str] = Field(
        None, max_length=2000, description="Подробности")

    # ── Результат ─────────────────────────────────────────────
    outcome: Optional[str] = Field(
        None, max_length=500, description="Результат / итог взаимодействия")

    # ── Связь с заказом ───────────────────────────────────────
    related_order_id: Optional[str] = Field(
        None, description="ID связанного заказа")
    related_order_number: Optional[str] = Field(
        None, description="Номер связанного заказа")

    # ── Автор ─────────────────────────────────────────────────
    created_by: str = Field(..., description="ID администратора")
    created_by_name: str = Field(..., description="Имя администратора (кэш)")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "client_interactions"
        indexes = [
            [("client_id", 1), ("created_at", -1)],
            [("interaction_type", 1)],
            [("created_at", -1)],
        ]
