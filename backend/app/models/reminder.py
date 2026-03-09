"""
Модель напоминания.
Коллекция: reminders
"""
from datetime import datetime, timezone
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class Reminder(Document):
    """
    Напоминание для администратора.

    Может быть однократным или регулярным (с правилом повтора).
    Привязывается к объектам системы: контрактам, сертификатам, тендерам, оплатам.
    """

    # ── Основные данные ───────────────────────────────────────
    title: str = Field(..., description="Заголовок напоминания")
    description: Optional[str] = Field(None, description="Описание / подробности")

    # ── Время ─────────────────────────────────────────────────
    remind_at: datetime = Field(..., description="Дата и время срабатывания")

    # ── Повторение ────────────────────────────────────────────
    is_recurring: bool = Field(False, description="Является ли напоминание повторяющимся")
    # Правило повтора: "daily", "weekly", "monthly"
    recurrence_rule: Optional[str] = Field(None, description="Правило повтора: daily, weekly, monthly")

    # ── Привязка к объекту ────────────────────────────────────
    # Тип объекта: "contract", "certificate", "tender", "payment"
    related_type: Optional[str] = Field(None, description="Тип связанного объекта")
    related_id: Optional[PydanticObjectId] = Field(None, description="ID связанного объекта")

    # ── Статус ────────────────────────────────────────────────
    is_completed: bool = Field(False, description="Выполнено ли напоминание")

    # ── Автор ─────────────────────────────────────────────────
    created_by: PydanticObjectId = Field(..., description="ID пользователя, создавшего напоминание")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "reminders"
        indexes = [
            [("remind_at", 1)],
            [("is_completed", 1)],
            [("created_by", 1)],
            [("related_type", 1), ("related_id", 1)],
        ]
