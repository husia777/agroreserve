"""
Сервис синхронизации с 1С:Предприятие 8.3.

Протокол: OData REST API 1С 8.3
Аутентификация: Basic Auth + API Key

Текущий статус: заглушки с логированием.
Реальные вызовы 1С OData добавить при развёртывании на VPS.
"""

from datetime import UTC, datetime
from typing import Optional

import structlog

logger = structlog.get_logger(__name__)


async def sync_stock_from_1c(data: list[dict]) -> dict:
    """
    Обновление остатков товаров из 1С.

    Получает массив {product_id, qty} и обновляет stock_qty товаров.

    Args:
        data: Список {'product_id': str, 'qty': float}

    Returns:
        Результат синхронизации {'updated': int, 'errors': list}
    """
    from beanie import PydanticObjectId

    from app.models.product import Product

    updated = 0
    errors = []

    for item in data:
        product_id = item.get("product_id")
        qty = item.get("qty")

        if not product_id or qty is None:
            errors.append(f"Неполные данные: {item}")
            continue

        try:
            product = await Product.get(PydanticObjectId(product_id))
            if not product:
                errors.append(f"Товар не найден: {product_id}")
                continue

            product.stock_qty = max(0.0, float(qty))
            product.updated_at = datetime.now(UTC)
            await product.save()
            updated += 1

            logger.debug(
                "Остаток обновлён из 1С",
                product_id=product_id,
                product_name=product.name,
                new_qty=qty,
            )

        except Exception as e:
            errors.append(f"Ошибка обновления {product_id}: {e!s}")
            logger.error("Ошибка синхронизации остатка из 1С", product_id=product_id, error=str(e))

    # Логируем синхронизацию
    await _log_sync_event("stock_update", {"updated": updated, "errors": len(errors)})

    logger.info(
        "Синхронизация остатков из 1С завершена",
        updated=updated,
        errors_count=len(errors),
    )

    return {"updated": updated, "errors": errors}


async def sync_payments_from_1c(data: list[dict]) -> dict:
    """
    Обновление оплат из 1С.

    При получении оплаты:
    1. Обновляет payment_status заказа
    2. Обновляет paid_amount
    3. Уменьшает current_debt клиента

    Args:
        data: Список {'order_id': str, 'amount': float, 'date': str}

    Returns:
        Результат {'processed': int, 'errors': list}
    """
    from beanie import PydanticObjectId

    from app.models.order import Order, PaymentStatus
    from app.models.user import ClientType, User

    processed = 0
    errors = []

    for payment in data:
        order_id = payment.get("order_id")
        amount = float(payment.get("amount", 0))
        payment_date_str = payment.get("date")

        if not order_id or amount <= 0:
            errors.append(f"Неполные данные об оплате: {payment}")
            continue

        try:
            order = await Order.get(PydanticObjectId(order_id))
            if not order:
                errors.append(f"Заказ не найден: {order_id}")
                continue

            old_paid = order.paid_amount
            order.paid_amount = round(order.paid_amount + amount, 2)

            # Определяем статус оплаты
            if order.paid_amount >= order.total:
                order.payment_status = PaymentStatus.PAID
                order.paid_at = datetime.now(UTC)
            elif order.paid_amount > 0:
                order.payment_status = PaymentStatus.PARTIAL

            order.updated_at = datetime.now(UTC)
            await order.save()

            # Уменьшаем долг клиента
            client_id = str(order.client_id.id) if hasattr(order.client_id, "id") else str(order.client_id)
            client = await User.get(PydanticObjectId(client_id))
            if client and client.client_type == ClientType.B2B:
                debt_reduction = amount  # Уменьшаем долг на оплаченную сумму
                client.current_debt = max(0.0, round(client.current_debt - debt_reduction, 2))
                await client.save()

                logger.info(
                    "Долг клиента уменьшен при оплате из 1С",
                    client_id=client_id,
                    client_name=client.name,
                    paid_amount=amount,
                    new_debt=client.current_debt,
                )

            # Уведомление клиенту об оплате
            try:
                from app.models.notification import NotificationChannel, NotificationType
                from app.services.notification_service import send_notification

                await send_notification(
                    user_id=client_id,
                    channel=NotificationChannel.SYSTEM,
                    notification_type=NotificationType.PAYMENT_RECEIVED,
                    title=f"Оплата {amount:,.0f} ₽ по заказу {order.order_number}",
                    message=f"Получена оплата {amount:,.0f} ₽. Итого оплачено: {order.paid_amount:,.0f} ₽ из {order.total:,.0f} ₽",
                    related_id=str(order.id),
                    related_type="order",
                )
            except Exception as notif_err:
                logger.warning("Не удалось создать уведомление об оплате", error=str(notif_err))

            processed += 1

        except Exception as e:
            errors.append(f"Ошибка обработки оплаты {order_id}: {e!s}")
            logger.error("Ошибка синхронизации оплаты из 1С", order_id=order_id, error=str(e))

    await _log_sync_event("payments_update", {"processed": processed, "errors": len(errors)})

    logger.info(
        "Синхронизация оплат из 1С завершена",
        processed=processed,
        errors_count=len(errors),
    )

    return {"processed": processed, "errors": errors}


async def get_orders_for_1c() -> list[dict]:
    """
    Возвращает новые заказы для передачи в 1С.
    Фильтр: status = new|confirmed, synced_to_1c = False.

    Returns:
        Список заказов в формате для 1С OData
    """
    from app.models.order import Order, OrderStatus

    orders = await Order.find(
        Order.synced_to_1c == False,  # noqa: E712
        {"status": {"$in": [OrderStatus.NEW.value, OrderStatus.CONFIRMED.value]}},
    ).to_list()

    result = []
    for order in orders:
        order_data = {
            "id": str(order.id),
            "order_number": order.order_number,
            "client_name": order.client_name,
            "client_phone": order.client_phone,
            "status": order.status.value,
            "total": order.total,
            "delivery_date": str(order.delivery_date) if order.delivery_date else None,
            "delivery_address": order.delivery_address,
            "items": [
                {
                    "product_id": item.product_id,
                    "product_name": item.product_name,
                    "qty": item.ordered_qty,
                    "unit": item.unit,
                    "price": item.price,
                    "total": item.total,
                }
                for item in order.items
            ],
            "created_at": order.created_at.isoformat(),
        }
        result.append(order_data)

    logger.info("Заказы для 1С подготовлены", count=len(result))
    return result


async def mark_order_synced(order_id: str, sync_1c_id: Optional[str] = None) -> bool:
    """
    Отмечает заказ как синхронизированный с 1С.

    Args:
        order_id: ID заказа
        sync_1c_id: ID документа в 1С (опционально)

    Returns:
        True при успехе
    """
    from beanie import PydanticObjectId

    from app.models.order import Order

    order = await Order.get(PydanticObjectId(order_id))
    if not order:
        logger.warning("Заказ для отметки синхронизации не найден", order_id=order_id)
        return False

    order.synced_to_1c = True
    if sync_1c_id:
        order.sync_1c_id = sync_1c_id
    order.updated_at = datetime.now(UTC)
    await order.save()

    logger.info(
        "Заказ отмечен как синхронизированный",
        order_number=order.order_number,
        sync_1c_id=sync_1c_id,
    )
    return True


async def _log_sync_event(event_type: str, data: dict) -> None:
    """
    Логирует событие синхронизации в MongoDB.
    Коллекция sync_log (прямые запросы Motor, без Beanie).
    """
    try:
        from app.database import get_database

        db = get_database()
        await db.sync_log.insert_one(
            {
                "event_type": event_type,
                "data": data,
                "timestamp": datetime.now(UTC),
            }
        )
    except Exception as e:
        logger.warning("Не удалось записать лог синхронизации", error=str(e))


# ── Заглушки для реальных вызовов 1С OData API ────────────────


async def push_order_to_1c(order) -> Optional[str]:
    """
    ЗАГЛУШКА: Отправляет заказ в 1С как Реализацию товаров.

    В реальной реализации нужно:
    POST {ODATA_1C_URL}/Catalog_Контрагенты (или найти существующего)
    POST {ODATA_1C_URL}/Document_РеализацияТоваровУслуг

    Returns:
        ID документа в 1С или None
    """
    from app.config import settings

    if not settings.ODATA_1C_URL:
        logger.debug("1С OData URL не настроен, пропускаем", order_number=order.order_number)
        return None

    logger.info(
        "ЗАГЛУШКА: Передача заказа в 1С",
        order_number=order.order_number,
        odata_url=settings.ODATA_1C_URL,
    )
    # TODO (Phase 4): Реализовать реальный вызов 1С OData
    return None


async def push_receipt_to_1c(receipt) -> Optional[str]:
    """
    ЗАГЛУШКА: Отправляет приход товара в 1С как Поступление.
    """
    from app.config import settings

    if not settings.ODATA_1C_URL:
        return None

    logger.info(
        "ЗАГЛУШКА: Передача прихода в 1С",
        receipt_number=receipt.receipt_number,
    )
    return None
