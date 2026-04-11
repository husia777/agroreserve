"""
Сервис управления заказами.

Бизнес-логика:
- Создание заказа из корзины с проверками
- Смена статуса с валидацией переходов
- Обновление фактических количеств
- Автонумерация заказов
- Интеграция со складом и финансами
"""

from datetime import UTC, datetime
from typing import Optional

import structlog

from app.models.order import (
    Order,
    OrderItem,
    OrderStatus,
    StatusHistoryEntry,
)

logger = structlog.get_logger(__name__)

# Допустимые переходы статусов
VALID_STATUS_TRANSITIONS = {
    OrderStatus.NEW: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    OrderStatus.CONFIRMED: [OrderStatus.ASSEMBLING, OrderStatus.CANCELLED],
    OrderStatus.ASSEMBLING: [OrderStatus.ASSEMBLED, OrderStatus.CANCELLED],
    OrderStatus.ASSEMBLED: [OrderStatus.DELIVERING, OrderStatus.CANCELLED],
    OrderStatus.DELIVERING: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    OrderStatus.DELIVERED: [],
    OrderStatus.CANCELLED: [],
}


async def get_next_order_number() -> str:
    """
    Генерирует следующий номер заказа в формате ORD-YYYY-NNNNN.
    """
    year = datetime.now(UTC).year
    prefix = f"ORD-{year}-"

    last_order = await Order.find({"order_number": {"$regex": f"^{prefix}"}}).sort(-Order.order_number).first_or_none()

    if last_order:
        try:
            last_num = int(last_order.order_number.split("-")[-1])
            next_num = last_num + 1
        except (ValueError, IndexError):
            next_num = 1
    else:
        next_num = 1

    return f"{prefix}{next_num:05d}"


def calculate_order_total(items: list[OrderItem]) -> tuple[float, float]:
    """
    Рассчитывает подытог и итог заказа.

    Returns:
        Tuple (subtotal, total) — пока скидок нет, они равны
    """
    subtotal = round(sum(item.total for item in items), 2)
    return subtotal, subtotal


async def create_order(user, cart_items: list, delivery_info: dict) -> Order:
    """
    Создаёт заказ из корзины.

    Шаги:
    1. Валидируем наличие каждого товара
    2. Проверяем кредитный лимит (для B2B)
    3. Создаём заказ
    4. Резервируем остатки
    5. Увеличиваем current_debt
    6. Очищаем корзину
    7. Отправляем уведомление

    Args:
        user: Объект User
        cart_items: Список CartItem из корзины
        delivery_info: Данные о доставке (дата, слот, адрес, и т.д.)

    Returns:
        Созданный Order

    Raises:
        ValueError: При нарушении бизнес-правил
    """
    from beanie import PydanticObjectId

    from app.models.product import Product
    from app.models.user import ClientType
    from app.services import stock_service

    # ── Шаг 1: Валидация товаров ───────────────────────────────
    order_items: list[OrderItem] = []
    order_total = 0.0

    for cart_item in cart_items:
        product_id = cart_item.product_id
        qty = cart_item.qty

        try:
            product = await Product.get(PydanticObjectId(product_id))
        except Exception:
            product = None

        if not product or not product.is_active:
            raise ValueError(f"Товар с ID {product_id} не найден или недоступен")

        if product.stock_qty < qty:
            raise ValueError(
                f"Недостаточный остаток товара «{product.name}»: " f"доступно {product.stock_qty:.1f} {product.unit}"
            )

        if qty < product.min_order_qty:
            raise ValueError(f"Минимальный заказ для «{product.name}»: " f"{product.min_order_qty:.1f} {product.unit}")

        # Определяем цену: B2B — оптовая, остальные — розничная
        price = product.price_wholesale if user.client_type == ClientType.B2B else product.price_retail

        item_total = round(qty * price, 2)
        order_total += item_total

        order_items.append(
            OrderItem(
                product_id=product_id,
                product_name=product.name,
                ordered_qty=qty,
                actual_qty=None,
                unit=product.unit,
                price=price,
                cost_price=product.cost_price,
                total=item_total,
            )
        )

    # ── Шаг 2: Проверка кредитного лимита ─────────────────────
    if user.client_type == ClientType.B2B and user.credit_limit > 0:
        projected_debt = user.current_debt + order_total
        if projected_debt > user.credit_limit:
            available = user.credit_limit - user.current_debt
            raise ValueError(
                f"Превышен кредитный лимит. "
                f"Доступный кредит: {max(0.0, available):,.0f} ₽, "
                f"сумма заказа: {order_total:,.0f} ₽. "
                f"Погасите задолженность для продолжения."
            )

    # ── Шаг 3: Создаём заказ ──────────────────────────────────
    order_number = await get_next_order_number()
    subtotal, total = calculate_order_total(order_items)

    order = Order(
        order_number=order_number,
        client_id=user,  # Beanie Link
        client_name=user.name,
        client_phone=user.phone,
        status=OrderStatus.NEW,
        items=order_items,
        subtotal=subtotal,
        total=total,
        delivery_date=delivery_info.get("delivery_date"),
        delivery_slot=delivery_info.get("delivery_slot"),
        delivery_address=delivery_info.get("delivery_address", user.delivery_address or ""),
        delivery_priority=delivery_info.get("delivery_priority", "normal"),
        payment_method=delivery_info.get("payment_method", "bank_transfer"),
        note=delivery_info.get("note"),
        status_history=[
            StatusHistoryEntry(
                status=OrderStatus.NEW,
                by="client",
                comment="Заказ создан клиентом",
            )
        ],
    )
    await order.insert()

    logger.info(
        "Заказ создан",
        order_number=order_number,
        client_id=str(user.id),
        total=total,
        items_count=len(order_items),
    )

    # ── Шаг 4: Резервирование остатков ────────────────────────
    try:
        await stock_service.reserve_stock(order_items)
    except ValueError:
        # Откатываем заказ если резервирование не удалось
        await order.delete()
        raise

    # ── Шаг 5: Обновляем задолженность клиента (B2B) ──────────
    if user.client_type == ClientType.B2B:
        user.current_debt = round(user.current_debt + total, 2)
        await user.save()

        # Уведомление о достижении лимита
        if user.credit_limit > 0 and user.current_debt >= user.credit_limit * 0.9:
            from app.services.notification_service import notify_admin_credit_limit

            await notify_admin_credit_limit(user)

    # ── Шаг 6: Очищаем корзину ────────────────────────────────
    from app.models.cart import Cart

    cart = await Cart.find_one(Cart.user_id == str(user.id))
    if cart:
        cart.items = []
        cart.total = 0.0
        cart.items_count = 0
        cart.updated_at = datetime.now(UTC)
        await cart.save()

    # ── Шаг 7: Уведомление администратору ─────────────────────
    from app.services.notification_service import notify_admin_new_order

    try:
        await notify_admin_new_order(order)
    except Exception as e:
        logger.warning("Не удалось отправить уведомление о новом заказе", error=str(e))

    return order


async def update_order_status(
    order_id: str,
    new_status: str,
    changed_by: str = "admin",
    comment: Optional[str] = None,
) -> Order:
    """
    Меняет статус заказа с валидацией допустимых переходов.

    При переходе в 'delivering' — автогенерация документов (ТОРГ-12, счёт).
    При переходе в 'delivered' — пересчёт суммы по фактическому весу.
    При переходе в 'cancelled' — возврат остатков, уменьшение долга.

    Args:
        order_id: ID заказа
        new_status: Новый статус
        changed_by: Кто изменяет ('admin', 'client', 'system')
        comment: Комментарий к изменению

    Returns:
        Обновлённый Order

    Raises:
        ValueError: При недопустимом переходе статуса
    """
    from beanie import PydanticObjectId

    from app.services import stock_service

    order = await Order.get(PydanticObjectId(order_id))
    if not order:
        raise ValueError(f"Заказ {order_id} не найден")

    current_status = order.status
    target_status = OrderStatus(new_status)

    # Проверяем допустимость перехода
    allowed_transitions = VALID_STATUS_TRANSITIONS.get(current_status, [])
    if target_status not in allowed_transitions:
        raise ValueError(
            f"Переход из статуса «{current_status}» в «{new_status}» недопустим. "
            f"Доступные переходы: {[s.value for s in allowed_transitions]}"
        )

    # ── Логика при переходе в 'delivering' ────────────────────
    if target_status == OrderStatus.DELIVERING:
        # Автогенерация ТОРГ-12 и счёта
        try:
            from app.services.document_service import generate_invoice, generate_torg12

            invoice_doc = await generate_invoice(order)
            torg12_doc = await generate_torg12(order)

            # Привязываем документы к заказу
            from app.models.order import OrderDocument

            existing_types = {d.doc_type for d in order.documents}
            if "invoice" not in existing_types and invoice_doc:
                order.documents.append(
                    OrderDocument(
                        doc_type="invoice",
                        url=invoice_doc.file_url or f"/api/v1/documents/{invoice_doc.id}/download",
                        doc_id=str(invoice_doc.id),
                    )
                )
            if "torg12" not in existing_types and torg12_doc:
                order.documents.append(
                    OrderDocument(
                        doc_type="torg12",
                        url=torg12_doc.file_url or f"/api/v1/documents/{torg12_doc.id}/download",
                        doc_id=str(torg12_doc.id),
                    )
                )
        except Exception as e:
            logger.warning("Не удалось сгенерировать документы при отгрузке", error=str(e))

    # ── Логика при переходе в 'delivered' ─────────────────────
    elif target_status == OrderStatus.DELIVERED:
        # Пересчёт суммы по фактическому количеству
        has_actual = any(item.actual_qty is not None for item in order.items)
        if has_actual:
            order.recalculate_by_actual_qty()
            logger.info(
                "Сумма заказа пересчитана по факту",
                order_number=order.order_number,
                new_total=order.total,
            )

    # ── Логика при отмене ─────────────────────────────────────
    elif target_status == OrderStatus.CANCELLED:
        # Возвращаем товар на склад
        try:
            await stock_service.release_stock(order.items)
        except Exception as e:
            logger.warning("Ошибка возврата остатков при отмене заказа", error=str(e))

        # Уменьшаем задолженность клиента (B2B)
        try:
            from app.models.user import ClientType, User

            client_id = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)
            client = await User.get(PydanticObjectId(client_id))
            if client and client.client_type == ClientType.B2B:
                client.current_debt = max(0.0, round(client.current_debt - order.total, 2))
                await client.save()
        except Exception as e:
            logger.warning("Ошибка обновления долга при отмене заказа", error=str(e))

    # ── Обновляем статус ──────────────────────────────────────
    order.status = target_status
    order.status_history.append(
        StatusHistoryEntry(
            status=target_status,
            by=changed_by,
            comment=comment,
        )
    )
    order.updated_at = datetime.now(UTC)
    await order.save()

    logger.info(
        "Статус заказа обновлён",
        order_number=order.order_number,
        from_status=current_status,
        to_status=new_status,
        changed_by=changed_by,
    )

    # Уведомление клиенту
    from app.services.notification_service import notify_client_status_change

    try:
        await notify_client_status_change(order, new_status)
    except Exception as e:
        logger.warning("Не удалось отправить уведомление клиенту о смене статуса", error=str(e))

    return order


async def update_actual_quantities(order_id: str, items_update: list) -> Order:
    """
    Обновляет фактические количества по позициям заказа.
    Вызывается при сборке заказа.

    Args:
        order_id: ID заказа
        items_update: Список {product_id, actual_qty}

    Returns:
        Обновлённый заказ
    """
    from beanie import PydanticObjectId

    order = await Order.get(PydanticObjectId(order_id))
    if not order:
        raise ValueError(f"Заказ {order_id} не найден")

    # Карта обновлений
    updates_map = {u["product_id"]: float(u["actual_qty"]) for u in items_update}

    for item in order.items:
        if item.product_id in updates_map:
            item.actual_qty = updates_map[item.product_id]

    # Пересчитываем итоги по фактическим весам
    order.recalculate_by_actual_qty()
    order.updated_at = datetime.now(UTC)
    await order.save()

    logger.info(
        "Фактические количества обновлены",
        order_number=order.order_number,
        updated_count=len(updates_map),
    )

    return order
