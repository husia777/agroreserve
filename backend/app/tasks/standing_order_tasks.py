"""
Celery задачи регулярных заказов.

UC-29: Ежедневная генерация заказов по расписанию регулярных заказов.
"""

import asyncio
from datetime import UTC, datetime

import structlog

from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)


def _run_async(coro):
    """Вспомогательная функция для запуска корутин в синхронном контексте Celery."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_closed():
            return asyncio.run(coro)
        return loop.run_until_complete(coro)
    except RuntimeError:
        return asyncio.run(coro)


def _should_generate_today(schedule: str, today) -> bool:
    """
    Проверяет, нужно ли сегодня генерировать заказ по расписанию.

    Args:
        schedule: Расписание (weekly_mon, biweekly, monthly_1, monthly_15, ...)
        today: Сегодняшняя дата (date объект)

    Returns:
        True если сегодня нужно генерировать заказ
    """
    weekday = today.weekday()  # 0=Monday, 6=Sunday
    day_of_month = today.day

    schedule_map = {
        "weekly_mon": weekday == 0,
        "weekly_tue": weekday == 1,
        "weekly_wed": weekday == 2,
        "weekly_thu": weekday == 3,
        "weekly_fri": weekday == 4,
        "weekly_sat": weekday == 5,
        "weekly_sun": weekday == 6,
        "monthly_1": day_of_month == 1,
        "monthly_15": day_of_month == 15,
    }

    if schedule in schedule_map:
        return bool(schedule_map[schedule])

    # biweekly — каждые 2 недели (упрощённая логика: чётные недели)
    if schedule == "biweekly":
        week_number = today.isocalendar()[1]
        return bool(weekday == 0 and week_number % 2 == 0)

    return False


@celery_app.task(
    name="app.tasks.standing_order_tasks.generate_standing_orders",
    queue="default",
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def generate_standing_orders(self) -> dict:
    """
    UC-29: Ежедневная генерация регулярных заказов в 06:00.

    Алгоритм:
    1. Найти все активные StandingOrders
    2. Проверить, должен ли сегодня быть сгенерирован заказ (по расписанию)
    3. Создать Order в статусе "pending_confirmation"
    4. Уведомить клиента в Telegram

    Статус нового заказа: OrderStatus.NEW (в ожидании подтверждения)
    """

    async def _execute() -> dict:
        from app.database import connect_to_mongo

        await connect_to_mongo()

        from datetime import date

        today = date.today()

        from app.config import settings
        from app.models.order import Order, OrderItem, OrderStatus, PaymentMethod
        from app.models.product import Product
        from app.models.standing_order import StandingOrder
        from app.models.user import User
        from app.utils.telegram_bot import send_message

        result: dict[str, object] = {
            "status": "ok",
            "date": str(today),
            "generated_orders": [],
            "skipped": [],
            "errors": [],
        }
        generated_orders: list[dict] = []
        skipped: list[dict] = []
        errors: list[dict] = []

        # Получаем все активные регулярные заказы
        standing_orders = await StandingOrder.find(
            StandingOrder.is_active == True,  # noqa: E712
        ).to_list()

        for so in standing_orders:
            # Проверяем, нужно ли генерировать сегодня
            if not _should_generate_today(so.schedule, today):
                skipped.append(
                    {
                        "standing_order_id": str(so.id),
                        "client_name": so.client_name,
                        "schedule": so.schedule,
                        "reason": "не день генерации по расписанию",
                    }
                )
                continue

            # Проверяем: не генерировали ли сегодня
            last_gen = so.last_generated_at
            if last_gen and last_gen.date() == today:
                skipped.append(
                    {
                        "standing_order_id": str(so.id),
                        "client_name": so.client_name,
                        "reason": "уже сгенерирован сегодня",
                    }
                )
                continue

            try:
                # Получаем клиента
                client = await User.get(so.client_id)
                if not client:
                    errors.append(
                        {
                            "standing_order_id": str(so.id),
                            "error": "Клиент не найден",
                        }
                    )
                    continue

                # Формируем позиции заказа
                order_items = []
                order_total = 0.0
                is_b2b = (
                    client.client_type.value == "b2b"
                    if hasattr(client.client_type, "value")
                    else client.client_type == "b2b"
                )

                for so_item in so.items:
                    try:
                        product = await Product.get(so_item.product_id)
                        if not product:
                            logger.warning(
                                "Товар не найден в регулярном заказе",
                                product_id=str(so_item.product_id),
                                standing_order_id=str(so.id),
                            )
                            continue

                        price = product.price_wholesale if is_b2b else product.price_retail
                        total = round(price * so_item.qty, 2)
                        order_total += total

                        order_items.append(
                            OrderItem(
                                product_id=str(so_item.product_id),
                                product_name=product.name,
                                ordered_qty=so_item.qty,
                                actual_qty=None,
                                unit=so_item.unit,
                                price=price,
                                cost_price=product.cost_price,
                                total=total,
                            )
                        )
                    except Exception as e:
                        logger.error(
                            "Ошибка обработки позиции регулярного заказа",
                            error=str(e),
                            product_id=str(so_item.product_id),
                        )

                if not order_items:
                    errors.append(
                        {
                            "standing_order_id": str(so.id),
                            "client_name": so.client_name,
                            "error": "Нет доступных позиций для генерации заказа",
                        }
                    )
                    continue

                # Генерируем номер заказа
                from app.models.settings import SystemSettings

                sys_settings = await SystemSettings.find_one(SystemSettings.singleton_key == "main")

                year = today.year
                if sys_settings:
                    sys_settings.order_counter += 1
                    await sys_settings.save()
                    order_num = sys_settings.order_counter
                else:
                    # Fallback: считаем по количеству заказов
                    order_num = await Order.find().count() + 1

                order_number = f"ORD-{year}-{order_num:05d}"

                # Определяем дату доставки (следующий рабочий день)
                from datetime import timedelta

                delivery_date = today + timedelta(days=1)
                if delivery_date.weekday() >= 5:  # Суббота или воскресенье
                    delivery_date = today + timedelta(days=(7 - today.weekday()))

                # Создаём заказ
                new_order = Order(
                    order_number=order_number,
                    client_id=client,
                    client_name=client.name,
                    client_phone=client.phone,
                    status=OrderStatus.NEW,
                    items=order_items,
                    subtotal=round(order_total, 2),
                    discount=0.0,
                    total=round(order_total, 2),
                    delivery_date=delivery_date,
                    delivery_slot=so.delivery_slot,
                    delivery_address=so.delivery_address,
                    payment_method=PaymentMethod.BANK_TRANSFER,
                    note=f"Регулярный заказ (автогенерация). {so.note or ''}".strip(),
                )
                await new_order.insert()

                # Обновляем дату последней генерации в регулярном заказе
                so.last_generated_at = datetime.now(UTC)
                await so.save()

                generated_orders.append(
                    {
                        "standing_order_id": str(so.id),
                        "order_id": str(new_order.id),
                        "order_number": order_number,
                        "client_name": so.client_name,
                        "total": round(order_total, 2),
                        "items_count": len(order_items),
                        "delivery_date": str(delivery_date),
                    }
                )

                logger.info(
                    "Регулярный заказ сгенерирован",
                    standing_order_id=str(so.id),
                    order_number=order_number,
                    client_name=so.client_name,
                    total=round(order_total, 2),
                )

                # ── Уведомляем клиента ────────────────────────────────────
                if client.telegram_chat_id:
                    message = (
                        f"📦 <b>Ваш регулярный заказ сформирован</b>\n\n"
                        f"Номер: <b>{order_number}</b>\n"
                        f"Дата доставки: <b>{delivery_date.strftime('%d.%m.%Y')}</b>\n"
                        f"Позиций: {len(order_items)}\n"
                        f"Сумма: <b>{round(order_total, 2):,.0f} ₽</b>\n\n"
                        f"Для подтверждения или изменения заказа войдите в личный кабинет\n"
                        f"или ответьте на это сообщение."
                    )
                    try:
                        await send_message(client.telegram_chat_id, message)
                    except Exception as e:
                        logger.warning(
                            "Не удалось уведомить клиента о регулярном заказе",
                            client_id=str(client.id),
                            error=str(e),
                        )

                # Уведомляем администратора
                if settings.TELEGRAM_ADMIN_CHAT_ID:
                    admin_msg = (
                        f"📋 <b>Регулярный заказ сгенерирован</b>\n"
                        f"Клиент: {so.client_name}\n"
                        f"Заказ: {order_number}\n"
                        f"Сумма: {round(order_total, 2):,.0f} ₽\n"
                        f"Доставка: {delivery_date.strftime('%d.%m.%Y')}"
                    )
                    try:
                        await send_message(settings.TELEGRAM_ADMIN_CHAT_ID, admin_msg)
                    except Exception as e:
                        logger.warning("Не удалось уведомить администратора", error=str(e))

            except Exception as e:
                logger.error(
                    "Ошибка генерации регулярного заказа",
                    standing_order_id=str(so.id),
                    client_name=so.client_name,
                    error=str(e),
                )
                errors.append(
                    {
                        "standing_order_id": str(so.id),
                        "client_name": so.client_name,
                        "error": str(e),
                    }
                )

        result["generated_orders"] = generated_orders
        result["skipped"] = skipped
        result["errors"] = errors

        logger.info(
            "Генерация регулярных заказов завершена",
            date=str(today),
            generated=len(generated_orders),
            skipped=len(skipped),
            errors=len(errors),
        )

        return dict(result)

    try:
        return dict(_run_async(_execute()))
    except Exception as exc:
        logger.error("Ошибка задачи generate_standing_orders", error=str(exc))
        return {"status": "error", "error": str(exc)}
