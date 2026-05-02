"""
Роутер регулярных заказов для клиентов.
Эндпоинты: /api/v1/standing-orders/
"""

from datetime import UTC, datetime
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.standing_order import StandingOrder, StandingOrderItem
from app.schemas.standing_order import (
    StandingOrderCreate,
    StandingOrderItemSchema,
    StandingOrderListResponse,
    StandingOrderResponse,
    StandingOrderUpdate,
)
from app.utils.security import require_approved_client

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/standing-orders", tags=["Регулярные заказы"])

# Допустимые расписания
VALID_SCHEDULES = {
    "weekly_mon",
    "weekly_tue",
    "weekly_wed",
    "weekly_thu",
    "weekly_fri",
    "weekly_sat",
    "weekly_sun",
    "biweekly",
    "monthly_1",
    "monthly_15",
}

# Допустимые слоты доставки
VALID_SLOTS = {"08:00-11:00", "11:00-14:00", "14:00-17:00"}


def _to_response(so: StandingOrder) -> StandingOrderResponse:
    """Конвертирует StandingOrder в ответ API."""
    return StandingOrderResponse(
        id=str(so.id),
        client_id=str(so.client_id),
        client_name=so.client_name,
        items=[
            StandingOrderItemSchema(
                product_id=str(item.product_id),
                product_name=item.product_name,
                qty=item.qty,
                unit=item.unit,
            )
            for item in so.items
        ],
        schedule=so.schedule,
        delivery_slot=so.delivery_slot,
        delivery_address=so.delivery_address,
        is_active=so.is_active,
        last_generated_at=so.last_generated_at.isoformat() if so.last_generated_at else None,
        next_generation_at=so.next_generation_at.isoformat() if so.next_generation_at else None,
        note=so.note,
        created_at=so.created_at.isoformat(),
    )


def _calculate_next_generation(schedule: str, from_now: Optional[datetime] = None) -> datetime:
    """
    Вычисляет дату следующей генерации заказа по расписанию.

    Args:
        schedule: Расписание (weekly_mon, biweekly и т.д.)
        from_now: Точка отсчёта (по умолчанию — текущее время UTC)

    Returns:
        Дата следующей генерации
    """
    from datetime import timedelta

    now = from_now or datetime.now(UTC)

    if schedule.startswith("weekly_"):
        day_map = {
            "weekly_mon": 0,
            "weekly_tue": 1,
            "weekly_wed": 2,
            "weekly_thu": 3,
            "weekly_fri": 4,
            "weekly_sat": 5,
            "weekly_sun": 6,
        }
        target_weekday = day_map.get(schedule, 0)
        current_weekday = now.weekday()
        days_ahead = target_weekday - current_weekday
        if days_ahead <= 0:
            days_ahead += 7
        return now + timedelta(days=days_ahead)

    elif schedule == "biweekly":
        return now + timedelta(weeks=2)

    elif schedule.startswith("monthly_"):
        day_num = int(schedule.split("_")[1])
        # Следующий месяц, указанное число
        next_month = now.month + 1 if now.month < 12 else 1
        next_year = now.year if now.month < 12 else now.year + 1
        try:
            return now.replace(year=next_year, month=next_month, day=day_num)
        except ValueError:
            # Если число не существует в месяце — последний день
            import calendar

            last_day = calendar.monthrange(next_year, next_month)[1]
            return now.replace(year=next_year, month=next_month, day=last_day)

    return now + timedelta(days=7)  # По умолчанию — неделя


@router.get(
    "/",
    response_model=StandingOrderListResponse,
    summary="Мои регулярные заказы",
)
async def get_my_standing_orders(
    only_active: bool = Query(True, description="Показывать только активные"),
    current_user=Depends(require_approved_client),
):
    """
    Список регулярных заказов текущего клиента.
    По умолчанию возвращает только активные подписки.
    """
    query: dict[str, object] = {"client_id": PydanticObjectId(str(current_user.id))}
    if only_active:
        query["is_active"] = True

    orders = await StandingOrder.find(query).sort(-StandingOrder.created_at).to_list()
    total = len(orders)

    logger.info(
        "Список регулярных заказов клиента",
        client_id=str(current_user.id),
        count=total,
    )

    return StandingOrderListResponse(
        items=[_to_response(o) for o in orders],
        total=total,
    )


@router.post(
    "/",
    response_model=StandingOrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать регулярный заказ",
)
async def create_standing_order(
    data: StandingOrderCreate,
    current_user=Depends(require_approved_client),
):
    """
    Создать подписку на регулярную доставку.

    Система будет автоматически генерировать заказы по указанному расписанию.
    Клиент получает уведомление и может подтвердить или отменить каждую генерацию.
    """
    # Валидация расписания
    if data.schedule not in VALID_SCHEDULES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Недопустимое расписание. Допустимые значения: {', '.join(sorted(VALID_SCHEDULES))}",
        )

    # Валидация слота
    if data.delivery_slot not in VALID_SLOTS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Недопустимый слот доставки. Допустимые значения: {', '.join(VALID_SLOTS)}",
        )

    # Проверяем товары
    from app.models.product import Product

    validated_items = []
    for item_data in data.items:
        try:
            product = await Product.get(PydanticObjectId(item_data.product_id))
        except Exception:
            product = None

        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Товар с ID {item_data.product_id} не найден или недоступен",
            )

        validated_items.append(
            StandingOrderItem(
                product_id=PydanticObjectId(item_data.product_id),
                product_name=product.name,
                qty=item_data.qty,
                unit=item_data.unit,
            )
        )

    next_gen = _calculate_next_generation(data.schedule)

    standing_order = StandingOrder(
        client_id=PydanticObjectId(str(current_user.id)),
        client_name=current_user.name,
        items=validated_items,
        schedule=data.schedule,
        delivery_slot=data.delivery_slot,
        delivery_address=data.delivery_address,
        is_active=True,
        next_generation_at=next_gen,
        note=data.note,
        created_at=datetime.now(UTC),
    )
    await standing_order.insert()

    logger.info(
        "Регулярный заказ создан",
        client_id=str(current_user.id),
        schedule=data.schedule,
        next_generation=next_gen.isoformat(),
    )

    return _to_response(standing_order)


@router.patch(
    "/{order_id}",
    response_model=StandingOrderResponse,
    summary="Обновить регулярный заказ",
)
async def update_standing_order(
    order_id: str,
    data: StandingOrderUpdate,
    current_user=Depends(require_approved_client),
):
    """
    Изменить состав или расписание регулярного заказа.
    Клиент может изменять только свои подписки.
    """
    try:
        so = await StandingOrder.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    if not so:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    # Проверяем владельца
    if str(so.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    # Обновляем поля
    if data.items is not None:
        from app.models.product import Product

        validated_items = []
        for item_data in data.items:
            try:
                product = await Product.get(PydanticObjectId(item_data.product_id))
            except Exception:
                product = None

            if not product or not product.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Товар с ID {item_data.product_id} не найден или недоступен",
                )
            validated_items.append(
                StandingOrderItem(
                    product_id=PydanticObjectId(item_data.product_id),
                    product_name=product.name,
                    qty=item_data.qty,
                    unit=item_data.unit,
                )
            )
        so.items = validated_items

    if data.schedule is not None:
        if data.schedule not in VALID_SCHEDULES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Недопустимое расписание: {data.schedule}",
            )
        so.schedule = data.schedule
        so.next_generation_at = _calculate_next_generation(data.schedule)

    if data.delivery_slot is not None:
        if data.delivery_slot not in VALID_SLOTS:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Недопустимый слот доставки: {data.delivery_slot}",
            )
        so.delivery_slot = data.delivery_slot

    if data.delivery_address is not None:
        so.delivery_address = data.delivery_address

    if data.is_active is not None:
        so.is_active = data.is_active

    if data.note is not None:
        so.note = data.note

    await so.save()

    logger.info(
        "Регулярный заказ обновлён",
        order_id=order_id,
        client_id=str(current_user.id),
    )

    return _to_response(so)


@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Отключить регулярный заказ",
)
async def delete_standing_order(
    order_id: str,
    current_user=Depends(require_approved_client),
):
    """
    Деактивировать регулярный заказ.
    Заказ не удаляется из базы — помечается как неактивный.
    """
    try:
        so = await StandingOrder.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    if not so:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    # Проверяем владельца
    if str(so.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    so.is_active = False
    await so.save()

    logger.info(
        "Регулярный заказ деактивирован",
        order_id=order_id,
        client_id=str(current_user.id),
    )


@router.post(
    "/{order_id}/confirm",
    response_model=dict,
    summary="Подтвердить автосгенерированный заказ",
)
async def confirm_generated_order(
    order_id: str,
    current_user=Depends(require_approved_client),
):
    """
    Подтвердить автоматически сгенерированный заказ из регулярной подписки.

    Система генерирует черновой заказ перед датой доставки.
    Клиент должен подтвердить его — после чего заказ становится активным.
    """
    try:
        so = await StandingOrder.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    if not so:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Регулярный заказ не найден")

    # Проверяем владельца
    if str(so.client_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    if not so.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Регулярный заказ неактивен. Сначала активируйте его.",
        )

    # Генерируем заказ из подписки
    from app.models.cart import CartItem
    from app.models.product import Product
    from app.services.order_service import create_order as svc_create_order

    # Проверяем товары и формируем «корзину»
    cart_items = []
    for item in so.items:
        try:
            product = await Product.get(item.product_id)
        except Exception:
            product = None

        if not product or not product.is_active:
            logger.warning(
                "Товар из регулярного заказа недоступен",
                product_id=str(item.product_id),
                product_name=item.product_name,
            )
            continue

        import uuid as _so_uuid

        cart_items.append(
            CartItem(
                item_id=str(_so_uuid.uuid4()),
                product_id=str(item.product_id),
                product_name=product.name,
                product_slug=product.slug or "",
                qty=item.qty,
                unit=item.unit,
                price=product.get_price_for_client(current_user.client_type == "b2b"),
                cost_price=product.cost_price,
                total=round(item.qty * product.get_price_for_client(current_user.client_type == "b2b"), 2),
                min_order_qty=product.min_order_qty,
                order_step=product.order_step,
                stock_qty=product.stock_qty,
            )
        )

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Все товары из регулярного заказа недоступны. Обновите состав подписки.",
        )

    # Ближайшая дата доставки — дата следующей генерации
    from datetime import timedelta

    next_delivery = (
        so.next_generation_at.date() if so.next_generation_at else (datetime.now(UTC).date() + timedelta(days=1))
    )

    delivery_info = {
        "delivery_date": next_delivery,
        "delivery_slot": so.delivery_slot,
        "delivery_address": so.delivery_address,
        "delivery_priority": "normal",
        "payment_method": "bank_transfer",
        "note": f"Автозаказ по подписке. {so.note or ''}".strip(),
    }

    try:
        new_order = await svc_create_order(
            user=current_user,
            cart_items=cart_items,
            delivery_info=delivery_info,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    # Обновляем дату последней генерации и следующей
    so.last_generated_at = datetime.now(UTC)
    so.next_generation_at = _calculate_next_generation(so.schedule)
    await so.save()

    logger.info(
        "Регулярный заказ подтверждён — новый заказ создан",
        standing_order_id=order_id,
        order_number=new_order.order_number,
        client_id=str(current_user.id),
    )

    return {
        "success": True,
        "message": f"Заказ {new_order.order_number} успешно оформлен",
        "order_id": str(new_order.id),
        "order_number": new_order.order_number,
        "next_generation_at": so.next_generation_at.isoformat(),
    }
