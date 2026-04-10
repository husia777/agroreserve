"""
Сервис финансового учёта.

Реализует:
- Расчёт P&L за период
- Выручка из доставленных заказов
- Себестоимость (cost_price * actual_qty)
- Расходы по категориям
- Налог УСН 6% от выручки
- Дебиторская задолженность
- UC-36: Автосверка оплат
"""

from datetime import date, datetime, timezone
from typing import List, Optional

import structlog

from app.models.finance import Expense, ExpenseCategory
from app.models.order import Order, OrderStatus, PaymentStatus

logger = structlog.get_logger(__name__)

# Ставка УСН
USN_RATE = 0.06


async def get_revenue(start: date, end: date) -> float:
    """
    Выручка за период = сумма доставленных заказов.

    Args:
        start: Начало периода
        end: Конец периода

    Returns:
        Выручка в рублях
    """
    start_dt = datetime(start.year, start.month, start.day, 0, 0, 0, tzinfo=timezone.utc)
    end_dt = datetime(end.year, end.month, end.day, 23, 59, 59, tzinfo=timezone.utc)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,
        Order.created_at <= end_dt,
    ).to_list()

    return float(round(sum(o.total for o in orders), 2))


async def get_cogs(start: date, end: date) -> float:
    """
    Себестоимость проданных товаров (COGS) за период.

    Считается как sum(cost_price * actual_qty) или (cost_price * ordered_qty) если факт не указан.

    Args:
        start: Начало периода
        end: Конец периода

    Returns:
        Себестоимость в рублях
    """
    start_dt = datetime(start.year, start.month, start.day, 0, 0, 0, tzinfo=timezone.utc)
    end_dt = datetime(end.year, end.month, end.day, 23, 59, 59, tzinfo=timezone.utc)

    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,
        Order.created_at <= end_dt,
    ).to_list()

    cogs = 0.0
    for order in orders:
        for item in order.items:
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            cogs += qty * item.cost_price

    return round(cogs, 2)


async def get_expenses(start: date, end: date) -> tuple[float, dict]:
    """
    Расходы за период (из коллекции expenses).

    Returns:
        Tuple (total_expenses, expenses_by_category)
    """
    expenses = await Expense.find(
        Expense.date >= start,
        Expense.date <= end,
    ).to_list()

    by_category: dict = {}
    total = 0.0

    for exp in expenses:
        cat = exp.category.value if hasattr(exp.category, "value") else str(exp.category)
        by_category[cat] = by_category.get(cat, 0.0) + exp.amount
        total += exp.amount

    return round(total, 2), by_category


def calculate_tax(revenue: float) -> float:
    """
    Рассчитывает налог по УСН 6% от выручки.

    Args:
        revenue: Выручка в рублях

    Returns:
        Налог в рублях
    """
    return round(revenue * USN_RATE, 2)


async def calculate_pnl(period_start: date, period_end: date) -> dict:
    """
    Рассчитывает полный P&L за период.

    Структура P&L:
    - Выручка (revenue): сумма доставленных заказов
    - Себестоимость (COGS): cost_price × qty
    - Валовая прибыль = Выручка − Себестоимость
    - Расходы (expenses): из коллекции expenses
    - Налог (tax): 6% от выручки (УСН)
    - Чистая прибыль = Валовая прибыль − Расходы − Налог

    Args:
        period_start: Начало периода
        period_end: Конец периода

    Returns:
        Словарь с показателями P&L
    """
    start_dt = datetime(period_start.year, period_start.month, period_start.day, 0, 0, 0, tzinfo=timezone.utc)
    end_dt = datetime(period_end.year, period_end.month, period_end.day, 23, 59, 59, tzinfo=timezone.utc)

    # Получаем все доставленные заказы
    orders = await Order.find(
        Order.status == OrderStatus.DELIVERED,
        Order.created_at >= start_dt,
        Order.created_at <= end_dt,
    ).to_list()

    # Выручка и себестоимость
    revenue = round(sum(o.total for o in orders), 2)
    cogs = 0.0
    for order in orders:
        for item in order.items:
            qty = item.actual_qty if item.actual_qty is not None else item.ordered_qty
            cogs += qty * item.cost_price
    cogs = round(cogs, 2)

    # Расходы
    total_expenses, expenses_by_category = await get_expenses(period_start, period_end)

    # Расчёты
    gross_profit = round(revenue - cogs, 2)
    gross_margin_pct = round((gross_profit / revenue * 100) if revenue > 0 else 0.0, 1)
    tax = calculate_tax(revenue)
    net_profit = round(gross_profit - total_expenses - tax, 2)
    net_margin_pct = round((net_profit / revenue * 100) if revenue > 0 else 0.0, 1)

    orders_count = len(orders)
    avg_order_value = round(revenue / orders_count, 2) if orders_count > 0 else 0.0

    logger.info(
        "P&L рассчитан",
        period_start=str(period_start),
        period_end=str(period_end),
        revenue=revenue,
        net_profit=net_profit,
        orders_count=orders_count,
    )

    return {
        "period_start": str(period_start),
        "period_end": str(period_end),
        "revenue": revenue,
        "cost_of_goods": cogs,
        "gross_profit": gross_profit,
        "gross_margin_pct": gross_margin_pct,
        "expenses_by_category": expenses_by_category,
        "total_expenses": total_expenses,
        "tax": tax,
        "net_profit": net_profit,
        "net_margin_pct": net_margin_pct,
        "orders_count": orders_count,
        "avg_order_value": avg_order_value,
    }


async def get_receivables() -> list:
    """
    Дебиторская задолженность — список B2B клиентов с долгами.

    Returns:
        Список словарей с данными о задолженности
    """
    from app.models.user import ClientType, User, UserStatus

    clients = (
        await User.find(
            User.client_type == ClientType.B2B,
            User.status == UserStatus.APPROVED,
            User.current_debt > 0,
        )
        .sort(-User.current_debt)
        .to_list()
    )

    result = []
    for client in clients:
        # Находим неоплаченные заказы
        unpaid_orders = await Order.find(
            {"client_id.$id": client.id},
            Order.payment_status == PaymentStatus.PENDING,
            Order.status == OrderStatus.DELIVERED,
        ).to_list()

        result.append(
            {
                "client_id": str(client.id),
                "client_name": client.name,
                "client_phone": client.phone,
                "inn": client.organization.inn if client.organization else None,
                "current_debt": client.current_debt,
                "credit_limit": client.credit_limit,
                "debt_ratio": round(
                    client.current_debt / client.credit_limit * 100 if client.credit_limit > 0 else 100.0,
                    1,
                ),
                "unpaid_orders_count": len(unpaid_orders),
            }
        )

    return result


# ── UC-36: Автосверка оплат ────────────────────────────────────────────────────


class PaymentInput:
    """Входные данные для автосверки одного платежа."""

    def __init__(
        self,
        amount: float,
        order_number: Optional[str] = None,
        client_id: Optional[str] = None,
        date: Optional[str] = None,
        description: Optional[str] = None,
    ):
        self.amount = amount
        self.order_number = order_number
        self.client_id = client_id
        self.date = date
        self.description = description


async def auto_reconcile_payments(payments: List[dict]) -> dict:
    """
    UC-36: Автосверка оплат.

    Получает список оплат (order_number или client_id, amount, date).
    Сопоставляет с открытыми счетами (payment_status = "pending").

    Логика:
    - Если сумма совпадает с заказом → payment_status = "paid", уменьшить current_debt
    - Если сумма частичная (>0 но < total) → payment_status = "partial"
    - Если не найдено — попадает в unmatched

    Args:
        payments: Список словарей [{order_number?, client_id?, amount, date?, description?}]

    Returns:
        Словарь {matched: [...], partial: [...], unmatched: [...]}
    """
    from beanie import PydanticObjectId
    from app.models.user import User

    matched = []
    partial = []
    unmatched = []

    for payment in payments:
        amount = float(payment.get("amount", 0))
        order_number = payment.get("order_number")
        client_id = payment.get("client_id")
        payment_date = payment.get("date")
        description = payment.get("description", "")

        if amount <= 0:
            unmatched.append(
                {
                    **payment,
                    "reason": "Некорректная сумма платежа",
                }
            )
            continue

        matched_order = None

        # ── Поиск по номеру заказа ────────────────────────────
        if order_number:
            order = await Order.find_one(
                Order.order_number == order_number,
                Order.payment_status != PaymentStatus.PAID,
            )
            if order:
                matched_order = order

        # ── Поиск по client_id и сумме ────────────────────────
        if not matched_order and client_id:
            try:
                pending_orders = (
                    await Order.find(
                        {"client_id.$id": PydanticObjectId(client_id)},
                        Order.payment_status.in_([PaymentStatus.PENDING, PaymentStatus.PARTIAL]),
                    )
                    .sort(Order.created_at)
                    .to_list()
                )

                for order in pending_orders:
                    remaining = round(order.total - order.paid_amount, 2)
                    # Точное совпадение суммы с остатком к оплате
                    if abs(remaining - amount) < 0.01:
                        matched_order = order
                        break

                # Если точного совпадения нет — берём первый подходящий заказ
                if not matched_order and pending_orders:
                    matched_order = pending_orders[0]

            except Exception as e:
                logger.warning(
                    "Ошибка поиска заказов для client_id",
                    client_id=client_id,
                    error=str(e),
                )

        # ── Применяем оплату ──────────────────────────────────
        if matched_order:
            remaining = round(matched_order.total - matched_order.paid_amount, 2)
            new_paid = round(matched_order.paid_amount + amount, 2)

            if new_paid >= matched_order.total - 0.01:
                # Полная оплата
                matched_order.payment_status = PaymentStatus.PAID
                matched_order.paid_amount = matched_order.total
                if payment_date:
                    try:
                        from datetime import datetime

                        matched_order.paid_at = datetime.fromisoformat(payment_date).replace(tzinfo=timezone.utc)
                    except Exception:
                        matched_order.paid_at = datetime.now(timezone.utc)
                else:
                    matched_order.paid_at = datetime.now(timezone.utc)

                matched_order.updated_at = datetime.now(timezone.utc)
                await matched_order.save()

                # Уменьшаем текущий долг клиента
                await _decrease_client_debt(matched_order, amount)

                matched.append(
                    {
                        "order_number": matched_order.order_number,
                        "client_name": matched_order.client_name,
                        "amount_applied": amount,
                        "order_total": matched_order.total,
                        "new_status": "paid",
                        "input_payment": payment,
                    }
                )

                logger.info(
                    "Оплата сопоставлена (полная)",
                    order_number=matched_order.order_number,
                    amount=amount,
                )

            else:
                # Частичная оплата
                matched_order.payment_status = PaymentStatus.PARTIAL
                matched_order.paid_amount = new_paid
                matched_order.updated_at = datetime.now(timezone.utc)
                await matched_order.save()

                # Уменьшаем текущий долг клиента
                await _decrease_client_debt(matched_order, amount)

                partial.append(
                    {
                        "order_number": matched_order.order_number,
                        "client_name": matched_order.client_name,
                        "amount_applied": amount,
                        "order_total": matched_order.total,
                        "paid_amount": new_paid,
                        "remaining": round(matched_order.total - new_paid, 2),
                        "new_status": "partial",
                        "input_payment": payment,
                    }
                )

                logger.info(
                    "Оплата сопоставлена (частичная)",
                    order_number=matched_order.order_number,
                    amount=amount,
                    remaining=round(matched_order.total - new_paid, 2),
                )

        else:
            # Не найдено совпадение
            unmatched.append(
                {
                    **payment,
                    "reason": "Не найден соответствующий заказ",
                }
            )

            logger.warning(
                "Оплата не сопоставлена",
                amount=amount,
                order_number=order_number,
                client_id=client_id,
            )

    summary = {
        "matched": matched,
        "partial": partial,
        "unmatched": unmatched,
        "stats": {
            "total_payments": len(payments),
            "matched_count": len(matched),
            "partial_count": len(partial),
            "unmatched_count": len(unmatched),
            "total_applied": round(
                sum(m["amount_applied"] for m in matched) + sum(p["amount_applied"] for p in partial),
                2,
            ),
        },
    }

    logger.info(
        "Автосверка оплат завершена",
        total=len(payments),
        matched=len(matched),
        partial=len(partial),
        unmatched=len(unmatched),
    )

    return summary


async def _decrease_client_debt(order: Order, amount: float) -> None:
    """
    Уменьшает текущий долг клиента при получении оплаты.

    Args:
        order: Заказ, по которому поступила оплата
        amount: Сумма оплаты
    """
    try:
        from beanie import PydanticObjectId
        from app.models.user import User

        client_id = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)
        client = await User.get(PydanticObjectId(client_id))

        if client:
            client.current_debt = max(0.0, round(client.current_debt - amount, 2))
            client.updated_at = datetime.now(timezone.utc)
            await client.save()

            logger.info(
                "Долг клиента уменьшен",
                client_id=client_id,
                amount=amount,
                new_debt=client.current_debt,
            )
    except Exception as e:
        logger.error(
            "Ошибка уменьшения долга клиента",
            error=str(e),
            order_number=order.order_number,
        )
