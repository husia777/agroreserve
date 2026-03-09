"""
Модель тендера (госзакупки с ЕИС).
Коллекция: tenders
"""
from datetime import date as DateType, datetime, timezone
from typing import List, Optional

from beanie import Document
from pydantic import BaseModel, Field


class TenderItem(BaseModel):
    """Позиция тендера — товар с объёмом и максимальной ценой."""
    name: str = Field(..., description="Наименование позиции")
    qty: float = Field(..., ge=0, description="Количество")
    unit: str = Field(..., description="Единица измерения")
    max_price: Optional[float] = Field(None, description="НМЦК по позиции (₽)")


class Tender(Document):
    """
    Тендер (госзакупка) из единой информационной системы (ЕИС).

    Жизненный цикл:
    new → analyzing → bid_submitted → won/lost
    new → skipped (если не интересен)
    """

    # ── Идентификация ─────────────────────────────────────────
    eis_number: str = Field(..., description="Номер на ЕИС (zakupki.gov.ru)")
    title: str = Field(..., description="Название тендера")

    # ── Заказчик ──────────────────────────────────────────────
    customer: str = Field(..., description="Организация-заказчик")
    region: str = Field(..., description="Регион тендера")

    # ── Финансы ───────────────────────────────────────────────
    max_price: float = Field(..., ge=0, description="НМЦК — начальная максимальная цена (₽)")
    our_price: Optional[float] = Field(None, description="Наша цена в заявке (₽)")
    margin_estimate: Optional[float] = Field(None, description="Расчётная маржа (₽)")

    # ── Позиции ───────────────────────────────────────────────
    items: List[TenderItem] = Field(default_factory=list, description="Позиции тендера")

    # ── Сроки ─────────────────────────────────────────────────
    deadline: datetime = Field(..., description="Срок подачи заявки")
    delivery_deadline: Optional[DateType] = Field(None, description="Срок поставки")

    # ── Источник ──────────────────────────────────────────────
    source_url: str = Field(..., description="URL на ЕИС")

    # ── Статус ────────────────────────────────────────────────
    # "new" — новый, "analyzing" — анализируется, "bid_submitted" — заявка подана,
    # "won" — выиграли, "lost" — проиграли, "skipped" — пропущен
    status: str = Field("new", description="Статус: new, analyzing, bid_submitted, won, lost, skipped")

    # ── Заметки ───────────────────────────────────────────────
    notes: Optional[str] = Field(None, description="Комментарии и заметки по тендеру")

    # ── Релевантность ─────────────────────────────────────────
    is_relevant: bool = Field(True, description="Релевантен ли тендер нашему ассортименту")

    # ── Метаданные ────────────────────────────────────────────
    found_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Когда тендер был найден/добавлен",
    )
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "tenders"
        indexes = [
            [("eis_number", 1)],
            [("status", 1)],
            [("deadline", 1)],
            [("is_relevant", 1)],
            [("region", 1)],
        ]
