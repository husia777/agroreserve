"""
Роутер управления заказами (администратор).
Эндпоинты: /api/v1/admin/orders/
"""

import math
from datetime import UTC, date, datetime
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.order import Order, OrderStatus, PaymentStatus
from app.schemas.order import (
    ActualQtyUpdate,
    OrderDocumentResponse,
    OrderItemResponse,
    OrderListItem,
    OrderListResponse,
    OrderResponse,
    OrderStatusUpdate,
    StatusHistoryResponse,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/orders", tags=["Админ: Заказы"])


def _order_to_response(order: Order) -> OrderResponse:
    """Конвертирует Order в ответ API."""
    client_id_str = str(order.client_id) if hasattr(order.client_id, "id") else str(order.client_id)

    return OrderResponse(
        id=str(order.id),
        order_number=order.order_number,
        client_id=client_id_str,
        client_name=order.client_name,
        client_phone=order.client_phone,
        status=order.status.value,
        items=[
            OrderItemResponse(
                product_id=item.product_id,
                product_name=item.product_name,
                ordered_qty=item.ordered_qty,
                actual_qty=item.actual_qty,
                unit=item.unit,
                price=item.price,
                total=item.total,
            )
            for item in order.items
        ],
        subtotal=order.subtotal,
        discount=order.discount,
        total=order.total,
        delivery_date=str(order.delivery_date) if order.delivery_date else None,
        delivery_slot=order.delivery_slot,
        delivery_address=order.delivery_address,
        delivery_priority=order.delivery_priority.value
        if hasattr(order.delivery_priority, "value")
        else order.delivery_priority,
        payment_method=order.payment_method.value if hasattr(order.payment_method, "value") else order.payment_method,
        payment_status=order.payment_status.value if hasattr(order.payment_status, "value") else order.payment_status,
        paid_amount=order.paid_amount,
        note=order.note,
        documents=[OrderDocumentResponse(doc_type=d.doc_type, url=d.url, doc_id=d.doc_id) for d in order.documents],
        status_history=[
            StatusHistoryResponse(
                status=h.status.value if hasattr(h.status, "value") else h.status,
                timestamp=h.timestamp.isoformat(),
                by=h.by,
                comment=h.comment,
            )
            for h in order.status_history
        ],
        created_at=order.created_at.isoformat(),
        updated_at=order.updated_at.isoformat(),
    )


@router.get(
    "/",
    response_model=OrderListResponse,
    summary="Все заказы",
)
async def get_all_orders(
    order_status: Optional[str] = Query(None, alias="status", description="Фильтр по статусу"),
    date_from: Optional[date] = Query(None, description="С даты (YYYY-MM-DD)"),
    date_to: Optional[date] = Query(None, description="По дату (YYYY-MM-DD)"),
    client_id: Optional[str] = Query(None, description="Фильтр по ID клиента"),
    priority: Optional[str] = Query(None, description="Фильтр по приоритету"),
    sort: str = Query("-created_at", description="Сортировка: created_at, -created_at, total, delivery_date"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=200),
    admin=Depends(require_admin),
):
    """
    Список всех заказов с расширенными фильтрами.
    """
    query_filter: dict = {}

    if order_status:
        query_filter["status"] = order_status

    if date_from:
        dt_from = datetime(date_from.year, date_from.month, date_from.day, tzinfo=UTC)
        query_filter.setdefault("created_at", {})["$gte"] = dt_from

    if date_to:
        dt_to = datetime(date_to.year, date_to.month, date_to.day, 23, 59, 59, tzinfo=UTC)
        query_filter.setdefault("created_at", {})["$lte"] = dt_to

    if client_id:
        query_filter["client_id.$id"] = PydanticObjectId(client_id)

    if priority:
        query_filter["delivery_priority"] = priority

    # Определяем сортировку
    sort_asc = True
    if sort.startswith("-"):
        sort_asc = False
        sort_field_name = sort[1:]
    else:
        sort_field_name = sort

    total = await Order.find(query_filter).count()
    query = Order.find(query_filter)

    if sort_field_name == "created_at":
        query = query.sort("Order.created_at" if not sort_asc else "-Order.created_at")
    elif sort_field_name == "delivery_date":
        query = query.sort("Order.delivery_date" if not sort_asc else "-Order.delivery_date")
    else:
        query = query.sort("Order.created_at")
    orders = await query.skip((page - 1) * limit).limit(limit).to_list()

    items = [
        OrderListItem(
            id=str(o.id),
            order_number=o.order_number,
            client_name=o.client_name,
            status=o.status.value,
            total=o.total,
            delivery_date=str(o.delivery_date) if o.delivery_date else None,
            delivery_slot=o.delivery_slot,
            payment_status=o.payment_status.value if hasattr(o.payment_status, "value") else o.payment_status,
            items_count=len(o.items),
            created_at=o.created_at.isoformat(),
        )
        for o in orders
    ]

    return OrderListResponse(
        items=items,
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.get(
    "/{order_id}",
    response_model=OrderResponse,
    summary="Детали заказа",
)
async def get_order(
    order_id: str,
    admin=Depends(require_admin),
):
    """Детальная информация о заказе (для администратора)."""
    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    return _order_to_response(order)


@router.patch(
    "/{order_id}/status",
    response_model=OrderResponse,
    summary="Сменить статус заказа",
)
async def update_order_status(
    order_id: str,
    data: OrderStatusUpdate,
    admin=Depends(require_admin),
):
    """
    Смена статуса заказа администратором.

    Допустимые переходы:
    new → confirmed → assembling → assembled → delivering → delivered
    Любой → cancelled

    При переходе в 'delivering': автогенерация ТОРГ-12 и счёта.
    При переходе в 'delivered': пересчёт суммы по факту.
    При 'cancelled': возврат товаров на склад.
    """
    from app.services.order_service import update_order_status as svc_update_status

    try:
        order = await svc_update_status(
            order_id=order_id,
            new_status=data.status,
            changed_by=f"admin:{admin.id!s}",
            comment=data.comment,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e

    logger.info(
        "Статус заказа изменён администратором",
        order_number=order.order_number,
        new_status=data.status,
        admin_id=str(admin.id),
    )

    return _order_to_response(order)


@router.patch(
    "/{order_id}/actual-qty",
    response_model=OrderResponse,
    summary="Обновить фактические количества",
)
async def update_actual_qty(
    order_id: str,
    data: ActualQtyUpdate,
    admin=Depends(require_admin),
):
    """
    Обновляет фактическое количество по позициям заказа.
    Вызывается при сборке заказа (весы показали другое значение).

    Ожидает список: [{"product_id": "...", "actual_qty": 48.5}]
    """
    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    # Только для заказов в статусе assembling или assembled
    if order.status not in (OrderStatus.ASSEMBLING, OrderStatus.ASSEMBLED, OrderStatus.DELIVERING):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Фактическое количество можно вводить только для заказов " "со статусом: собирается, собран, в пути"
            ),
        )

    from app.services.order_service import update_actual_quantities

    try:
        order = await update_actual_quantities(order_id, data.items)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    logger.info(
        "Фактические количества обновлены",
        order_number=order.order_number,
        admin_id=str(admin.id),
    )

    return _order_to_response(order)


@router.patch(
    "/{order_id}/confirm-payment",
    response_model=OrderResponse,
    summary="Подтвердить получение оплаты (UC-10)",
)
async def confirm_payment(
    order_id: str,
    admin=Depends(require_admin),
):
    """
    Админ подтверждает получение предоплаты.
    Переводит payment_status → PAID и добавляет запись в историю.
    """
    from app.models.order import PaymentStatus

    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    if order.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Оплата уже подтверждена",
        )

    order.payment_status = PaymentStatus.PAID
    order.paid_amount = order.total
    order.updated_at = datetime.now(UTC)
    await order.save()

    logger.info(
        "Оплата подтверждена администратором",
        order_number=order.order_number,
        admin_id=str(admin.id),
        amount=order.total,
    )

    return _order_to_response(order)


@router.patch(
    "/{order_id}/confirm-payment",
    summary="UC-71: Пометить заказ как оплаченный",
)
async def confirm_order_payment(
    order_id: str,
    admin=Depends(require_admin),
):
    from beanie import PydanticObjectId

    from app.models.order import Order

    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        raise HTTPException(status_code=404, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")

    order.payment_status = PaymentStatus.PAID
    order.paid_at = datetime.now(UTC)

    # Добавляем в историю статусов
    from app.models.order import StatusHistoryEntry

    order.status_history.append(
        StatusHistoryEntry(
            status=OrderStatus.CONFIRMED,  # payment_confirmed maps to confirmed
            by=str(admin.id),
            comment="Оплата подтверждена администратором",
            timestamp=datetime.now(UTC),
        )
    )

    # Уменьшаем задолженность B2B клиента
    if order.payment_method in ("bank_transfer", "credit"):
        from app.models.user import User

        user = await User.get(order.user_id)
        if user and user.current_debt:
            user.current_debt = max(0, user.current_debt - (order.total or 0))
            await user.save()

    await order.save()

    # Уведомляем клиента
    try:
        from app.services.notification_service import notify_client_status_change

        await notify_client_status_change(order, "payment_confirmed")
    except Exception:
        logger.error("Ошибка при отправке уведомления о подтверждении оплаты", order_id=order.id)

    return {
        "success": True,
        "message": f"Заказ {order.order_number} помечен как оплаченный",
        "order_id": str(order.id),
        "payment_status": "paid",
    }
