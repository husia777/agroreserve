"""
Роутер финансового учёта (администратор).
Эндпоинты: /api/v1/admin/finance/
"""

import math
from datetime import date as DateType
from datetime import timedelta
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator

from app.models.finance import Expense, ExpenseCategory
from app.schemas.finance import ExpenseCreate
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/finance", tags=["Админ: Финансы"])


# ── Pydantic схемы ─────────────────────────────────────────────────────────────


class ExpenseUpdate(BaseModel):
    """Запрос на обновление расхода."""

    date: Optional[DateType] = None
    category: Optional[str] = None
    description: Optional[str] = Field(None, min_length=2, max_length=500)
    amount: Optional[float] = Field(None, gt=0)
    is_recurring: Optional[bool] = None
    recurring_day: Optional[int] = Field(None, ge=1, le=31)
    receipt_photo: Optional[str] = None

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        valid = [c.value for c in ExpenseCategory]
        if v not in valid:
            raise ValueError(f"Допустимые категории: {', '.join(valid)}")
        return v


class PaymentReconcileItem(BaseModel):
    """Одна запись оплаты для автосверки."""

    amount: float = Field(..., gt=0, description="Сумма оплаты (₽)")
    order_number: Optional[str] = Field(None, description="Номер заказа (ORD-YYYY-NNNNN)")
    client_id: Optional[str] = Field(None, description="ID клиента (если номер заказа неизвестен)")
    date: Optional[str] = Field(None, description="Дата оплаты (ISO 8601)")
    description: Optional[str] = Field(None, description="Описание платежа из банка")


class ReconcilePaymentsRequest(BaseModel):
    """Запрос на автосверку списка оплат."""

    payments: list[PaymentReconcileItem] = Field(..., min_length=1, description="Список оплат для сверки")


# ── Утилиты ────────────────────────────────────────────────────────────────────


def _expense_to_response(expense: Expense) -> dict:
    """Конвертирует Expense в ответ API."""
    return {
        "id": str(expense.id),
        "date": str(expense.date),
        "category": expense.category.value if hasattr(expense.category, "value") else expense.category,
        "description": expense.description,
        "amount": expense.amount,
        "is_recurring": expense.is_recurring,
        "recurring_day": expense.recurring_day,
        "receipt_photo": expense.receipt_photo,
        "created_at": expense.created_at.isoformat(),
    }


# ── Эндпоинты ──────────────────────────────────────────────────────────────────


@router.get(
    "/pnl",
    summary="P&L за период",
)
async def get_pnl(
    period: str = Query(
        "month",
        description="Период: today, week, month, quarter, year, custom",
    ),
    date_from: Optional[DateType] = Query(None, description="Начало периода (для custom)"),
    date_to: Optional[DateType] = Query(None, description="Конец периода (для custom)"),
    admin=Depends(require_admin),
):
    """
    Расчёт P&L (прибыли и убытков) за период.

    Формула:
    - Выручка: сумма доставленных заказов за период
    - Себестоимость (COGS): cost_price × qty
    - Валовая прибыль = Выручка − COGS
    - Расходы: из коллекции expenses
    - Налог (УСН 6%): 6% от Выручки
    - Чистая прибыль = Валовая прибыль − Расходы − Налог
    """
    today = DateType.today()

    # Определяем период
    if period in ("today", "day"):
        start, end = today, today
    elif period == "week":
        start = today - timedelta(days=today.weekday())
        end = today
    elif period == "month":
        start = today.replace(day=1)
        end = today
    elif period == "quarter":
        quarter_month = ((today.month - 1) // 3) * 3 + 1
        start = today.replace(month=quarter_month, day=1)
        end = today
    elif period == "year":
        start = today.replace(month=1, day=1)
        end = today
    elif period == "custom":
        if not date_from or not date_to:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Для периода 'custom' необходимо указать date_from и date_to",
            )
        start, end = date_from, date_to
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Допустимые периоды: today, week, month, quarter, year, custom",
        )

    from app.services.finance_service import calculate_pnl

    pnl_data = await calculate_pnl(start, end)

    # Фронтенд ожидает массив PnLReport[] с полями:
    # gross_margin (не gross_margin_pct), expenses (не total_expenses), avg_order (не avg_order_value)
    return [
        {
            "period_start": str(start),
            "period_end": str(end),
            "revenue": pnl_data.get("revenue", 0),
            "cost_of_goods": pnl_data.get("cost_of_goods", 0),
            "gross_profit": pnl_data.get("gross_profit", 0),
            "gross_margin": pnl_data.get("gross_margin_pct", 0),
            "expenses": pnl_data.get("total_expenses", 0),
            "tax": pnl_data.get("tax", 0),
            "net_profit": pnl_data.get("net_profit", 0),
            "orders_count": pnl_data.get("orders_count", 0),
            "avg_order": pnl_data.get("avg_order_value", 0),
        }
    ]


@router.get(
    "/expenses",
    summary="Список расходов",
)
async def get_expenses(
    category: Optional[str] = Query(None, description="Категория расхода"),
    date_from: Optional[DateType] = Query(None, description="С даты"),
    date_to: Optional[DateType] = Query(None, description="По дату"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=200),
    admin=Depends(require_admin),
):
    """Список расходов с фильтрами."""
    query_filter: dict = {}

    if category:
        query_filter["category"] = category

    if date_from:
        query_filter.setdefault("date", {})["$gte"] = date_from

    if date_to:
        query_filter.setdefault("date", {})["$lte"] = date_to

    total = await Expense.find(query_filter).count()
    expenses = await Expense.find(query_filter).sort(-Expense.date).skip((page - 1) * limit).limit(limit).to_list()

    total_amount = sum(e.amount for e in expenses)

    return {
        "items": [_expense_to_response(e) for e in expenses],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
        "total_amount": round(total_amount, 2),
    }


@router.post(
    "/expenses",
    status_code=status.HTTP_201_CREATED,
    summary="Создать расход",
)
async def create_expense(
    data: ExpenseCreate,
    admin=Depends(require_admin),
):
    """Создаёт новую запись о расходе."""
    expense_date = data.date or DateType.today()

    expense = Expense(
        date=expense_date,
        category=ExpenseCategory(data.category),
        description=data.description,
        amount=data.amount,
        is_recurring=data.is_recurring,
        recurring_day=data.recurring_day,
        receipt_photo=data.receipt_photo,
        created_by=str(admin.id),
    )
    await expense.insert()

    logger.info(
        "Расход создан",
        category=data.category,
        amount=data.amount,
        description=data.description,
        admin_id=str(admin.id),
    )

    return _expense_to_response(expense)


@router.patch(
    "/expenses/{expense_id}",
    summary="Обновить расход",
)
async def update_expense(
    expense_id: str,
    data: ExpenseUpdate,
    admin=Depends(require_admin),
):
    """Обновляет существующую запись о расходе."""
    try:
        expense = await Expense.get(PydanticObjectId(expense_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Расход не найден")

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Расход не найден")

    update_data = data.model_dump(exclude_none=True)
    if "category" in update_data:
        update_data["category"] = ExpenseCategory(update_data["category"])

    for field, value in update_data.items():
        setattr(expense, field, value)

    await expense.save()

    logger.info(
        "Расход обновлён",
        expense_id=expense_id,
        admin_id=str(admin.id),
    )

    return _expense_to_response(expense)


@router.delete(
    "/expenses/{expense_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить расход",
)
async def delete_expense(
    expense_id: str,
    admin=Depends(require_admin),
):
    """Удаляет запись о расходе."""
    try:
        expense = await Expense.get(PydanticObjectId(expense_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Расход не найден")

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Расход не найден")

    await expense.delete()

    logger.info(
        "Расход удалён",
        expense_id=expense_id,
        admin_id=str(admin.id),
    )


@router.get(
    "/receivables",
    summary="Дебиторская задолженность",
)
async def get_receivables(
    admin=Depends(require_admin),
):
    """
    Список B2B клиентов с задолженностью.
    Сортировка: по сумме долга (от большего к меньшему).
    """
    from app.services.finance_service import get_receivables

    receivables = await get_receivables()
    total_debt = sum(r["current_debt"] for r in receivables)

    return {
        "clients": receivables,
        "total_debt": round(total_debt, 2),
        "clients_count": len(receivables),
    }


@router.get(
    "/summary",
    summary="Краткая финансовая сводка",
)
async def get_finance_summary(
    admin=Depends(require_admin),
):
    """
    Краткая финансовая сводка: сегодня, этот месяц, всего долгов.
    """
    today = DateType.today()
    month_start = today.replace(day=1)

    from app.services.finance_service import calculate_pnl, get_receivables

    # P&L за сегодня и месяц
    today_pnl = await calculate_pnl(today, today)
    month_pnl = await calculate_pnl(month_start, today)
    receivables = await get_receivables()

    return {
        "today": {
            "revenue": today_pnl["revenue"],
            "net_profit": today_pnl["net_profit"],
            "orders_count": today_pnl["orders_count"],
        },
        "this_month": {
            "revenue": month_pnl["revenue"],
            "cost_of_goods": month_pnl["cost_of_goods"],
            "gross_profit": month_pnl["gross_profit"],
            "gross_margin_pct": month_pnl["gross_margin_pct"],
            "total_expenses": month_pnl["total_expenses"],
            "tax": month_pnl["tax"],
            "net_profit": month_pnl["net_profit"],
            "net_margin_pct": month_pnl["net_margin_pct"],
            "orders_count": month_pnl["orders_count"],
        },
        "receivables": {
            "total_debt": sum(r["current_debt"] for r in receivables),
            "clients_count": len(receivables),
        },
    }


@router.post(
    "/reconcile-payments",
    summary="Автосверка оплат (UC-36)",
)
async def reconcile_payments(
    data: ReconcilePaymentsRequest,
    admin=Depends(require_admin),
):
    """
    UC-36: Автосверка оплат из банка.

    Принимает список оплат и сопоставляет с открытыми заказами.

    Алгоритм:
    1. Если указан order_number — ищем конкретный заказ
    2. Если указан client_id — ищем по клиенту и сумме
    3. Если сумма совпадает с остатком к оплате → payment_status = "paid"
    4. Если сумма частичная → payment_status = "partial"
    5. Если не найдено → попадает в unmatched

    Автоматически уменьшает current_debt клиента.

    Пример запроса:
    ```json
    {
      "payments": [
        {"order_number": "ORD-2026-00001", "amount": 15000.00, "date": "2026-03-01"},
        {"client_id": "abc123", "amount": 8500.00, "description": "Оплата по счёту"}
      ]
    }
    ```
    """
    from app.services.finance_service import auto_reconcile_payments

    payments_list = [p.model_dump() for p in data.payments]

    try:
        result = await auto_reconcile_payments(payments_list)
    except Exception as e:
        logger.error(
            "Ошибка автосверки оплат",
            error=str(e),
            admin_id=str(admin.id),
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при выполнении автосверки",
        )

    logger.info(
        "Автосверка оплат выполнена",
        total=len(data.payments),
        matched=result["stats"]["matched_count"],
        partial=result["stats"]["partial_count"],
        unmatched=result["stats"]["unmatched_count"],
        admin_id=str(admin.id),
    )

    return result
