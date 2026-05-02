"""
Роутер заказов для клиентов (личный кабинет).
Эндпоинты: /api/v1/orders/
"""

from datetime import UTC
from datetime import date as DateType
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.models.cart import Cart
from app.models.order import Order, OrderStatus
from app.schemas.order import (
    OrderCreate,
    OrderDocumentResponse,
    OrderItemResponse,
    OrderListItem,
    OrderListResponse,
    OrderResponse,
    StatusHistoryResponse,
)
from app.utils.security import get_current_user, require_approved_client


class RepeatOrderRequest(BaseModel):
    """Запрос на повтор заказа. Дата доставки опциональна — если не указана, позиции добавляются в корзину."""

    delivery_date: Optional[DateType] = Field(None, description="Новая дата доставки")
    delivery_slot: Optional[str] = Field(None, description="Слот доставки")
    delivery_address: Optional[str] = Field(None, description="Адрес доставки")
    delivery_priority: Optional[str] = Field(None, description="Приоритет")
    payment_method: Optional[str] = Field(None, description="Способ оплаты")
    note: Optional[str] = Field(None, description="Примечание")


class RetailOrderItemCreate(BaseModel):
    """Позиция розничного заказа."""

    product_id: str = Field(..., description="ID товара")
    qty: float = Field(..., gt=0, description="Количество")


class RetailOrderCreate(BaseModel):
    """Розничный заказ без регистрации (UC-10)."""

    name: str = Field(..., min_length=2, description="Имя покупателя")
    phone: str = Field(..., description="Телефон покупателя")
    items: list[RetailOrderItemCreate] = Field(..., min_length=1, description="Позиции")
    delivery_date: DateType = Field(..., description="Дата доставки")
    delivery_slot: str = Field("08:00-11:00", description="Слот доставки")
    delivery_address: str = Field(..., min_length=5, description="Адрес доставки")
    note: Optional[str] = Field(None, description="Примечание")


logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/orders", tags=["Заказы"])


def _order_to_response(order: Order) -> OrderResponse:
    """Конвертирует объект Order в ответ API."""
    # Безопасно получаем client_id строкой
    client_id_str = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)

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
        documents=[
            OrderDocumentResponse(doc_type=d.doc_type, url=d.url, doc_id=d.doc_id)  # type: ignore[list-item]
            for d in order.documents
        ],
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


@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Оформить заказ",
)
async def create_order(
    data: OrderCreate,
    current_user=Depends(require_approved_client),
):
    """
    Оформляет заказ из корзины пользователя.

    Шаги:
    1. Проверяет наличие товаров
    2. Проверяет кредитный лимит
    3. Создаёт заказ
    4. Резервирует остатки
    5. Очищает корзину
    6. Отправляет уведомление администратору
    """
    from app.services.order_service import create_order as svc_create_order

    # Пробуем серверную корзину
    cart = await Cart.find_one(Cart.user_id == str(current_user.id))
    cart_items = cart.items if cart and cart.items else []

    # Если корзина пуста, но items пришли в запросе — строим корзину из них
    if not cart_items and data.items:
        import uuid

        from app.models.cart import CartItem
        from app.models.product import Product

        for item_data in data.items:
            try:
                product = await Product.get(PydanticObjectId(item_data.product_id))
            except Exception:
                product = None

            if not product or not product.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Товар {item_data.product_id} не найден или неактивен",
                )

            is_b2b = current_user.client_type in ("ip", "ooo", "b2b")
            price = product.get_price_for_client(is_b2b)
            unit = product.unit.value if hasattr(product.unit, "value") else product.unit
            item_total = round(item_data.qty * price, 2)

            cart_items.append(
                CartItem(
                    item_id=str(uuid.uuid4()),
                    product_id=str(product.id),
                    product_name=product.name,
                    product_slug=product.slug,
                    qty=item_data.qty,
                    unit=unit,
                    price=price,
                    cost_price=product.cost_price,
                    total=item_total,
                    min_order_qty=product.min_order_qty,
                    order_step=product.order_step,
                    stock_qty=product.stock_qty,
                )
            )

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Корзина пуста. Добавьте товары перед оформлением заказа.",
        )

    delivery_info = {
        "delivery_date": data.delivery_date,
        "delivery_slot": data.delivery_slot,
        "delivery_address": data.delivery_address,
        "delivery_priority": data.delivery_priority,
        "payment_method": data.payment_method,
        "note": data.note,
    }

    try:
        order = await svc_create_order(
            user=current_user,
            cart_items=cart_items,
            delivery_info=delivery_info,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    logger.info(
        "Заказ оформлен клиентом",
        order_number=order.order_number,
        client_id=str(current_user.id),
        total=order.total,
    )

    return _order_to_response(order)


@router.get(
    "/",
    response_model=OrderListResponse,
    summary="Мои заказы",
)
async def get_my_orders(
    status_filter: Optional[str] = Query(None, alias="status", description="Фильтр по статусу"),
    page: int = Query(1, ge=1, description="Номер страницы"),
    limit: int = Query(20, ge=1, le=100, description="Записей на странице"),
    current_user=Depends(get_current_user),
):
    """
    Список заказов текущего пользователя.
    Сортировка: по дате создания (новые первые).
    """
    user_id_str = str(current_user.id)

    # Формируем запрос
    query_filter: dict[str, object] = {"client_id.$id": PydanticObjectId(user_id_str)}
    if status_filter:
        query_filter["status"] = status_filter

    total = await Order.find(query_filter).count()
    orders = await Order.find(query_filter).sort("-Order.created_at").skip((page - 1) * limit).limit(limit).to_list()

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

    import math

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
    current_user=Depends(get_current_user),
):
    """
    Детальная информация о заказе.
    Клиент может просматривать только свои заказы.
    """
    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    # Проверяем принадлежность заказа (для не-администраторов)
    if current_user.role != "admin":
        # Beanie Link может хранить client_id как Link, DBRef или ObjectId
        cid = order.client_id
        if hasattr(cid, "ref"):
            # DBRef
            client_id_str = str(cid.ref.id) if hasattr(cid.ref, "id") else str(cid.ref)
        elif hasattr(cid, "id"):
            client_id_str = str(cid.id)
        else:
            client_id_str = str(cid)
        if client_id_str != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещён",
            )

    return _order_to_response(order)


@router.post(
    "/{order_id}/repeat",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Повторить заказ (UC-04)",
)
async def repeat_order(
    order_id: str,
    data: "RepeatOrderRequest",
    current_user=Depends(require_approved_client),
):
    """
    Повтор заказа: берёт позиции из старого заказа и создаёт новый.

    Шаги:
    1. Загружает исходный заказ
    2. Проверяет наличие товаров и их актуальность
    3. Добавляет позиции в корзину пользователя (или сразу создаёт заказ)
    4. Возвращает созданный заказ
    """
    # Загружаем исходный заказ
    try:
        source_order = await Order.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    if not source_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    # Клиент может повторять только свои заказы
    client_id_str = (
        str(source_order.client_id.id) if hasattr(source_order.client_id, "id") else str(source_order.client_id)
    )
    if client_id_str != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")

    if not source_order.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="В исходном заказе нет позиций для повтора",
        )

    # Добавляем позиции в корзину
    from app.models.cart import Cart
    from app.models.product import Product

    cart = await Cart.find_one(Cart.user_id == str(current_user.id))
    if not cart:
        cart = Cart(user_id=str(current_user.id), items=[])

    added_count = 0
    skipped_products = []

    for item in source_order.items:
        try:
            product = await Product.get(PydanticObjectId(item.product_id))
        except Exception:
            product = None

        if not product or not product.is_active:
            skipped_products.append(item.product_name)
            continue

        # Обновляем или добавляем позицию в корзину
        existing = next((ci for ci in cart.items if ci.product_id == item.product_id), None)
        if existing:
            existing.qty = item.ordered_qty
        else:
            import uuid as _uuid

            from app.models.cart import CartItem

            cart.items.append(
                CartItem(
                    item_id=str(_uuid.uuid4()),
                    product_id=item.product_id,
                    product_name=product.name,
                    product_slug=product.slug or "",
                    qty=item.ordered_qty,
                    unit=item.unit,
                    price=product.get_price_for_client(current_user.client_type == "b2b"),
                    cost_price=product.cost_price,
                    total=round(item.ordered_qty * product.get_price_for_client(current_user.client_type == "b2b"), 2),
                    min_order_qty=product.min_order_qty,
                    order_step=product.order_step,
                    stock_qty=product.stock_qty,
                )
            )
        added_count += 1

    from datetime import datetime

    cart.updated_at = datetime.now(UTC)
    await cart.save()

    logger.info(
        "Повтор заказа — позиции добавлены в корзину",
        source_order=order_id,
        client_id=str(current_user.id),
        added=added_count,
        skipped=skipped_products,
    )

    # Если переданы данные доставки — сразу оформляем заказ
    if data.delivery_date and data.delivery_address:
        from app.services.order_service import create_order as svc_create_order

        delivery_info = {
            "delivery_date": data.delivery_date,
            "delivery_slot": data.delivery_slot or source_order.delivery_slot,
            "delivery_address": data.delivery_address,
            "delivery_priority": data.delivery_priority or source_order.delivery_priority.value,
            "payment_method": data.payment_method or source_order.payment_method.value,
            "note": data.note or source_order.note,
        }

        try:
            new_order = await svc_create_order(
                user=current_user,
                cart_items=cart.items,
                delivery_info=delivery_info,
            )
        except ValueError as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        logger.info(
            "Повтор заказа — новый заказ оформлен",
            new_order=new_order.order_number,
            source_order=order_id,
        )
        return _order_to_response(new_order)

    # Иначе возвращаем исходный заказ как референс (корзина обновлена)
    return _order_to_response(source_order)


@router.get(
    "/{order_id}/track",
    summary="Трекинг заказа",
)
async def track_order(
    order_id: str,
    current_user=Depends(get_current_user),
):
    """
    Трекинг статуса заказа с историей изменений.
    Возвращает текущий статус и таймлайн всех изменений.
    """
    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    # Проверяем принадлежность
    if current_user.role != "admin":
        client_id_str = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)
        if client_id_str != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещён",
            )

    # Все возможные статусы в правильном порядке
    status_order = ["new", "confirmed", "assembling", "assembled", "delivering", "delivered"]

    current_idx = status_order.index(order.status.value) if order.status.value in status_order else -1

    # Строим таймлайн
    timeline = [
        {
            "status": entry.status.value if hasattr(entry.status, "value") else entry.status,
            "timestamp": entry.timestamp.isoformat(),
            "by": entry.by,
            "comment": entry.comment,
            "is_current": (
                (entry.status.value if hasattr(entry.status, "value") else entry.status) == order.status.value
            ),
        }
        for entry in order.status_history
    ]

    return {
        "order_id": str(order.id),
        "order_number": order.order_number,
        "current_status": order.status.value,
        "is_cancelled": order.status == OrderStatus.CANCELLED,
        "delivery_date": str(order.delivery_date) if order.delivery_date else None,
        "delivery_slot": order.delivery_slot,
        "delivery_address": order.delivery_address,
        "timeline": timeline,
        "current_step": current_idx + 1 if current_idx >= 0 else 0,
        "total_steps": len(status_order),
    }


@router.post(
    "/retail",
    status_code=status.HTTP_201_CREATED,
    summary="Розничный заказ без регистрации (UC-10)",
)
async def create_retail_order(data: RetailOrderCreate):
    """
    Оформить заказ без регистрации (розница).

    Используется для телефонных заказов или быстрых покупок.
    Клиент указывает имя, телефон и список товаров.
    Заказ создаётся как «гостевой» — без привязки к учётной записи.

    Шаги:
    1. Проверяет наличие и активность товаров
    2. Рассчитывает цены по розничному прайсу
    3. Создаёт заказ с пометкой «retail»
    4. Уведомляет администратора
    """
    from datetime import datetime

    from app.models.order import (
        DeliveryPriority,
        OrderItem,
        PaymentMethod,
        PaymentStatus,
        StatusHistoryEntry,
    )
    from app.models.product import Product
    from app.services.order_service import get_next_order_number

    order_items: list[OrderItem] = []
    subtotal = 0.0

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

        if product.stock_qty < item_data.qty:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Недостаточный остаток товара «{product.name}»: "
                    f"доступно {product.stock_qty:.1f} {product.unit}"
                ),
            )

        # Розничная цена для гостевых заказов
        unit_price = product.price_retail
        item_total = round(item_data.qty * unit_price, 2)
        subtotal += item_total

        order_items.append(
            OrderItem(
                product_id=item_data.product_id,
                product_name=product.name,
                ordered_qty=item_data.qty,
                actual_qty=None,
                unit=product.unit,
                price=unit_price,
                cost_price=product.cost_price,
                total=item_total,
            )
        )

    # UC-10: минимальный заказ 1000₽ для розницы
    if subtotal < 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Минимальная сумма розничного заказа — 1 000 ₽. Текущая сумма: {subtotal:.0f} ₽",
        )

    order_number = await get_next_order_number()
    now = datetime.now(UTC)

    # Создаём гостевой заказ (без привязки к user)
    # client_id заполняем «системным» пустым объектом — указываем phone как идентификатор
    from app.models.user import User

    # Ищем или создаём временного пользователя для гостевого заказа
    guest_user = await User.find_one({"phone": data.phone})
    if not guest_user:
        from app.utils.security import get_password_hash

        guest_user = User(
            phone=data.phone,
            name=data.name,
            password_hash=get_password_hash("retail_guest_no_password"),
            role="client",
            client_type="b2c",
            status="approved",
        )
        await guest_user.insert()

    order = Order(
        order_number=order_number,
        client_id=guest_user,
        client_name=data.name,
        client_phone=data.phone,
        items=order_items,
        subtotal=round(subtotal, 2),
        discount=0.0,
        total=round(subtotal, 2),
        delivery_date=data.delivery_date,
        delivery_slot=data.delivery_slot,
        delivery_address=data.delivery_address,
        delivery_priority=DeliveryPriority.NORMAL,
        payment_method=PaymentMethod.PREPAYMENT,  # UC-10: предоплата на карту
        payment_status=PaymentStatus.PENDING,
        note=data.note,
        admin_note="Розничный заказ без регистрации (предоплата на карту)",
        status_history=[
            StatusHistoryEntry(
                status=OrderStatus.NEW,
                timestamp=now,
                by="system",
                comment="Розничный заказ",
            )
        ],
        created_at=now,
        updated_at=now,
    )
    await order.insert()

    # Резервируем остатки
    from app.services.stock_service import reserve_stock

    try:
        await reserve_stock(order_items)
    except ValueError as e:
        # Откатываем заказ при ошибке резервирования
        await order.delete()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    logger.info(
        "Розничный заказ без регистрации оформлен",
        order_number=order_number,
        phone=data.phone,
        total=order.total,
    )

    # ── UC-47: Уведомление администратору о розничном заказе ──
    try:
        from app.services.notification_service import notify_admin_new_order

        await notify_admin_new_order(order)
    except Exception as e:
        logger.warning("Не удалось отправить уведомление о розничном заказе", error=str(e))

    # Прямая отправка в Telegram как fallback (Celery может быть недоступен)
    try:
        from app.utils.telegram_bot import send_admin_notification

        tg_text = (
            f"🛒 <b>Розничный заказ {order.order_number}</b>\n"
            f"Покупатель: {order.client_name}\n"
            f"Телефон: {order.client_phone}\n"
            f"Сумма: {order.total:,.0f} ₽\n"
            f"Доставка: {order.delivery_date} ({order.delivery_slot})\n"
            f"Адрес: {order.delivery_address}"
        )
        if order.note:
            tg_text += f"\nПримечание: {order.note}"
        await send_admin_notification(tg_text)
    except Exception as e:
        logger.warning("Telegram fallback не сработал", error=str(e))

    return _order_to_response(order)
