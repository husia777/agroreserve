"""
Модели финансового учёта: расходы.
Коллекция: expenses
"""
from datetime import date as DateType
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from beanie import Document, Indexed
from pydantic import Field


class ExpenseCategory(str, Enum):
    """Категории расходов для P&L отчёта."""
    RENT = "rent"               # Аренда склада/офиса
    TRANSPORT = "transport"     # Транспорт (газ, обслуживание газели)
    PACKAGING = "packaging"     # Упаковочные материалы, тара
    COMMUNICATION = "communication"  # Связь, интернет
    SALARY = "salary"           # Зарплата (если есть сотрудники)
    TAX = "tax"                 # Налоги (УСН 6%)
    BANK = "bank"               # Банковские комиссии
    INSURANCE = "insurance"     # Страхование
    UTILITIES = "utilities"     # Коммунальные услуги
    MARKETING = "marketing"     # Маркетинг, реклама
    OTHER = "other"             # Прочее


class Expense(Document):
    """
    Расход (статья затрат) для P&L учёта.

    Расходы делятся на:
    - Постоянные (is_recurring=True) — аренда, связь — автоповтор каждый месяц
    - Переменные (is_recurring=False) — топливо, упаковка

    УСН 6% рассчитывается автоматически от выручки в P&L отчёте.
    """

    # ── Основные данные ───────────────────────────────────────
    date: DateType = Field(
        default_factory=lambda: datetime.now(timezone.utc).date(),
        description="Дата расхода",
    )
    category: ExpenseCategory = Field(..., description="Категория расхода")
    description: str = Field(..., max_length=500, description="Описание расхода")
    amount: float = Field(..., ge=0, description="Сумма расхода (₽)")

    # ── Повторяющиеся расходы ─────────────────────────────────
    is_recurring: bool = Field(False, description="Является ли расход повторяющимся")
    recurring_day: Optional[int] = Field(
        None, ge=1, le=31, description="День месяца для автоповтора (1-31)"
    )

    # ── Документ ──────────────────────────────────────────────
    receipt_photo: Optional[str] = Field(None, description="URL фото чека/квитанции")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    created_by: Optional[str] = Field(None, description="ID пользователя (администратора)")

    class Settings:
        name = "expenses"
        indexes = [
            [("date", -1)],
            [("category", 1), ("date", -1)],
            [("is_recurring", 1)],
        ]
