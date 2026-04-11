"""
Схемы для финансового учёта (расходы, P&L).
"""

from datetime import date as DateType
from typing import Optional

from pydantic import BaseModel, Field, field_validator


class ExpenseCreate(BaseModel):
    """Запрос на создание расхода."""

    date: Optional[DateType] = Field(None, description="Дата расхода (по умолчанию — сегодня)")
    category: str = Field(..., description="Категория расхода")
    description: str = Field(..., min_length=2, max_length=500, description="Описание расхода")
    amount: float = Field(..., gt=0, description="Сумма расхода (₽)")
    is_recurring: bool = Field(False, description="Повторяющийся расход")
    recurring_day: Optional[int] = Field(None, ge=1, le=31, description="День месяца для повтора (1-31)")
    receipt_photo: Optional[str] = Field(None, description="URL фото чека")

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        valid = [
            "rent",
            "transport",
            "packaging",
            "communication",
            "salary",
            "tax",
            "bank",
            "insurance",
            "utilities",
            "marketing",
            "other",
        ]
        if v not in valid:
            raise ValueError(f"Допустимые категории: {', '.join(valid)}")
        return v


class ExpenseResponse(BaseModel):
    """Расход в ответе API."""

    id: str = Field(...)
    date: str
    category: str
    description: str
    amount: float
    is_recurring: bool
    recurring_day: Optional[int] = None
    receipt_photo: Optional[str] = None
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class PnLPeriod(BaseModel):
    """P&L за период."""

    period_start: str = Field(..., description="Начало периода (ISO date)")
    period_end: str = Field(..., description="Конец периода (ISO date)")
    revenue: float = Field(0.0, description="Выручка (сумма оплаченных заказов)")
    cost_of_goods: float = Field(0.0, description="Себестоимость проданных товаров")
    gross_profit: float = Field(0.0, description="Валовая прибыль (выручка - себестоимость)")
    gross_margin_pct: float = Field(0.0, description="Валовая маржа (%)")
    expenses_by_category: dict = Field(
        default_factory=dict, description="Расходы по категориям {'rent': 20000, 'transport': 15000, ...}"
    )
    total_expenses: float = Field(0.0, description="Итого расходов")
    tax: float = Field(0.0, description="УСН 6% от выручки")
    net_profit: float = Field(0.0, description="Чистая прибыль")
    net_margin_pct: float = Field(0.0, description="Чистая маржа (%)")
    orders_count: int = Field(0, description="Количество заказов за период")
    avg_order_value: float = Field(0.0, description="Средний чек")


class DashboardTodayResponse(BaseModel):
    """Виджет 'Сегодняшний день' для стартовой страницы администратора."""

    # ── Финансы ───────────────────────────────────────────────
    revenue_today: float = Field(0.0, description="Выручка за сегодня (₽)")
    revenue_yesterday: float = Field(0.0, description="Выручка за вчера (₽)")
    total_receivables: float = Field(0.0, description="Общая дебиторская задолженность (₽)")
    overdue_receivables: float = Field(0.0, description="Просроченная дебиторка (₽)")
    profit_this_month: float = Field(0.0, description="Прибыль за текущий месяц (₽)")

    # ── Заказы ────────────────────────────────────────────────
    orders_new: int = Field(0, description="Новых заказов (требуют подтверждения)")
    orders_to_deliver_today: int = Field(0, description="Заказов к доставке сегодня")
    orders_urgent: int = Field(0, description="Срочных заказов (красный приоритет)")
    orders_total_active: int = Field(0, description="Всего активных заказов")

    # ── Доставки сегодня ──────────────────────────────────────
    deliveries_today: list[dict] = Field(
        default_factory=list,
        description="Список доставок: [{order_number, client_name, address, slot, priority, total}]",
    )

    # ── Критичные остатки ─────────────────────────────────────
    low_stock_products: list[dict] = Field(
        default_factory=list,
        description="Товары с низким остатком: [{name, stock_qty, min_stock_qty}]",
    )

    # ── Напоминания ───────────────────────────────────────────
    expiring_certificates: list[dict] = Field(
        default_factory=list,
        description="Истекающие сертификаты: [{number, product_names, expiry_date, days_left}]",
    )
    pending_clients: int = Field(0, description="Клиентов на модерации")

    # ── Мета ──────────────────────────────────────────────────
    generated_at: str = Field(..., description="Время генерации виджета")
