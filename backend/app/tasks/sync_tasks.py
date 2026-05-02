"""
Celery задачи синхронизации с 1С и периодические задачи.
"""

import asyncio
from datetime import UTC, date, timedelta

import structlog
from celery import Task
from slugify import slugify

from app.config import settings
from app.models.finance import Expense
from app.models.order import Order
from app.models.product import Product
from app.models.user import User
from app.services.odata_client import odata_client
from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)


def _run_async(coro):
    """Вспомогательная функция для запуска корутин в синхронном контексте Celery."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import concurrent.futures

            with concurrent.futures.ThreadPoolExecutor() as pool:
                future = pool.submit(asyncio.run, coro)
                return future.result()
        else:
            return loop.run_until_complete(coro)
    except RuntimeError:
        return asyncio.run(coro)


# -------------------------------------------------------------------
# Синхронизация остатков (замена заглушки)
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.sync_stock_from_1c",
    queue="sync",
    bind=True,
    max_retries=3,
    default_retry_delay=120,
)
def sync_stock_from_1c(self: Task) -> dict:
    """
    Получение остатков из 1С через OData и обновление stock_qty в MongoDB.
    """
    if not settings.ODATA_1C_URL:
        logger.debug("1С OData URL не настроен, синхронизация пропущена")
        return {"status": "skipped", "reason": "1С не настроен"}

    async def _fetch_and_update():
        try:
            balances = await odata_client.get_stock_balances()
        except Exception as e:
            logger.error("Ошибка получения остатков из 1С", error=str(e))
            raise

        updated = 0
        for bal in balances:
            # В JSON ответе ключи могут быть: "Номенклатура_Key", "КоличествоОстаток"
            # (или "Номенклатура_Key", "КоличествоОстаток" – как в документации)
            product_ref = bal.get("Номенклатура_Key")
            qty = bal.get("КоличествоОстаток")
            if not product_ref or qty is None:
                continue
            product = await Product.find_one({"external_id_1c": product_ref})
            if product and product.stock_qty != qty:
                product.stock_qty = float(qty)
                product.updated_at = date.today()
                await product.save()
                updated += 1

        logger.info("Синхронизация остатков завершена", updated=updated)
        return {"status": "ok", "updated": updated}

    try:
        return _run_async(_fetch_and_update())
    except Exception as e:
        logger.error("Ошибка синхронизации остатков", error=str(e))
        raise self.retry(exc=e)


# -------------------------------------------------------------------
# Импорт номенклатуры (товаров) из 1С
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.sync_nomenclature_from_1c",
    queue="sync",
    bind=True,
    max_retries=3,
    default_retry_delay=300,
)
def sync_nomenclature_from_1c(self: Task) -> dict:
    """
    Импорт номенклатуры (активные товары) из 1С в MongoDB.
    Создаёт записи товаров, если их ещё нет, обновляет названия.
    """
    if not settings.ODATA_1C_URL:
        return {"status": "skipped", "reason": "1С не настроен"}

    async def _import():
        items = await odata_client.get_nomenclature()
        created = 0
        updated = 0
        for item in items:
            ext_id = item["Ref_Key"]
            name = item.get("Description") or "Без названия"
            # Ищем товар по external_id_1c
            product = await Product.find_one({"external_id_1c": ext_id})
            if not product:
                # Создаём новый товар с минимальными полями
                product = Product(
                    name=name,
                    slug=slugify(name)[:100],
                    external_id_1c=ext_id,
                    is_active=True,
                    unit="kg",  # по умолчанию
                    price_wholesale=0,
                    price_retail=0,
                    cost_price=0,
                    min_order_qty=1,
                    order_step=1,
                    stock_qty=0,
                    min_stock_qty=0,
                )
                await product.insert()
                created += 1
            else:
                if product.name != name:
                    product.name = name
                    await product.save()
                    updated += 1
        logger.info("Импорт номенклатуры завершён",
                    created=created, updated=updated)
        return {"status": "ok", "created": created, "updated": updated}

    try:
        return _run_async(_import())
    except Exception as e:
        logger.error("Ошибка импорта номенклатуры", error=str(e))
        raise self.retry(exc=e)


# -------------------------------------------------------------------
# Синхронизация контрагента (B2B клиента) в 1С
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.sync_contractor_to_1c",
    queue="sync",
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def sync_contractor_to_1c(self: Task, user_id: str) -> dict:
    """
    Создаёт или находит контрагента в 1С по ИНН и сохраняет external_id_1c в User.
    """

    async def _sync():
        user = await User.get(user_id)
        if not user:
            return {"status": "error", "error": "User not found"}
        if not user.organization:
            return {"status": "skipped", "reason": "Нет реквизитов организации"}

        if user.external_id_1c:
            return {"status": "ok", "already_exists": user.external_id_1c}

        # Ищем по ИНН
        ext_id = await odata_client.find_contractor_by_inn(user.organization.inn)
        if ext_id:
            user.external_id_1c = ext_id
            await user.save()
            return {"status": "ok", "found": ext_id}

        # Создаём нового
        new_id = await odata_client.create_contractor(
            name=user.organization.name, inn=user.organization.inn, legal_address=user.organization.legal_address
        )
        user.external_id_1c = new_id
        await user.save()
        return {"status": "ok", "created": new_id}

    try:
        return _run_async(_sync())
    except Exception as e:
        logger.error("Ошибка синхронизации контрагента", error=str(e))
        raise self.retry(exc=e)


# -------------------------------------------------------------------
# Отправка заказа в 1С как документа "Реализация товаров и услуг"
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.push_order_to_1c",
    queue="sync",
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def push_order_to_1c(self: Task, order_id: str) -> dict:
    """
    Отправляет заказ (реализацию) в 1С.
    """

    async def _push():
        order = await Order.get(order_id)
        if not order:
            return {"status": "error", "error": "Order not found"}

        if order.external_id_1c:
            return {"status": "ok", "already_synced": order.external_id_1c}

        # Получаем клиента и его external_id
        client_id = str(order.client_id.id) if hasattr(
            order.client_id, "id") else str(order.client_id)
        user = await User.get(client_id)
        if not user or not user.external_id_1c:
            # Пытаемся синхронизировать контрагента
            await sync_contractor_to_1c(client_id)
            user = await User.get(client_id)
            if not user or not user.external_id_1c:
                raise Exception(
                    f"Не удалось получить external_id для клиента {client_id}")

        # Собираем позиции, у которых есть external_id_1c у товара
        items = []
        for item in order.items:
            # Предполагаем, что item.product_id – это строковый ObjectId
            product = await Product.get(item.product_id)
            if not product or not product.external_id_1c:
                logger.warning("Товар без external_id_1c пропущен",
                               order_id=order_id, product_id=item.product_id)
                continue
            items.append(
                {
                    "product_ref": product.external_id_1c,
                    "quantity": item.ordered_qty,
                    "price": item.price,
                }
            )

        if not items:
            raise Exception(
                "Нет позиций для отправки в 1С (у всех товаров отсутствует external_id_1c)")

        order_data = {
            "number": order.order_number,
            "date": order.created_at.isoformat(),
            "contractor_ref": user.external_id_1c,
            "items": items,
        }

        doc_ref = await odata_client.create_sales_order(order_data)
        order.external_id_1c = doc_ref
        order.synced_to_1c = True
        await order.save()
        logger.info("Заказ успешно отправлен в 1С",
                    order_id=order_id, doc_ref=doc_ref)
        return {"status": "ok", "doc_ref": doc_ref}

    try:
        return _run_async(_push())
    except Exception as e:
        logger.error("Ошибка отправки заказа в 1С",
                     order_id=order_id, error=str(e))
        raise self.retry(exc=e)


# -------------------------------------------------------------------
# Повторяющиеся расходы (уже была, оставляем)
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.create_recurring_expenses",
    queue="default",
)
def create_recurring_expenses() -> dict:
    async def _execute():
        today = date.today()
        first_day = today.replace(day=1)

        existing_count = await Expense.find(
            Expense.is_recurring == True,
            {"date": {"$gte": first_day, "$lt": today}},
        ).count()

        if existing_count > 0:
            logger.debug(
                "Повторяющиеся расходы за месяц уже созданы", count=existing_count)
            return {"status": "skipped", "already_exists": existing_count}

        last_month_end = first_day - timedelta(days=1)
        last_month_start = last_month_end.replace(day=1)

        templates = await Expense.find(
            Expense.is_recurring == True,
            {"date": {"$gte": last_month_start, "$lte": last_month_end}},
        ).to_list()

        created = 0
        for template in templates:
            new_expense = Expense(
                date=first_day,
                category=template.category,
                description=template.description,
                amount=template.amount,
                is_recurring=True,
                recurring_day=template.recurring_day,
                receipt_photo=None,
                created_by="system",
            )
            await new_expense.insert()
            created += 1

        logger.info("Повторяющиеся расходы созданы",
                    count=created, month=str(first_day))
        return {"status": "ok", "created": created}

    try:
        return _run_async(_execute())
    except Exception as e:
        logger.error("Ошибка создания повторяющихся расходов", error=str(e))
        return {"status": "error", "error": str(e)}


# -------------------------------------------------------------------
# Задача для отправки новых заказов в 1С (если нужно вызывать отдельно)
# (можно оставить, но она дублирует push_order_to_1c, поэтому не обязательна)
# -------------------------------------------------------------------
@celery_app.task(
    name="app.tasks.sync_tasks.push_new_orders_to_1c",
    queue="sync",
    max_retries=3,
    default_retry_delay=300,
)
def push_new_orders_to_1c() -> dict:
    """
    Отправляет все несинхронизированные заказы (synced_to_1c=False) в 1С.
    Запускается по расписанию, но можно и не использовать,
    если заказы отправляются сразу после создания.
    """

    async def _send_all():
        orders = await Order.find({"synced_to_1c": False, "external_id_1c": None}).to_list()
        logger.info("Найдено заказов для отправки", count=len(orders))
        results = []
        for order in orders:
            try:
                res = await push_order_to_1c(str(order.id))
                results.append(res)
            except Exception as e:
                logger.error("Ошибка отправки заказа",
                             order_id=str(order.id), error=str(e))
        return {"status": "ok", "processed": len(results)}

    try:
        return _run_async(_send_all())
    except Exception as e:
        logger.error("Ошибка в push_new_orders_to_1c", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(name="app.tasks.sync_tasks.sync_payments_from_1c", bind=True, max_retries=3)
def sync_payments_from_1c(self):
    """Синхронизация оплат из 1С (UC-268)"""
    if not settings.ODATA_1C_URL:
        return {"status": "skipped", "reason": "1С не настроен"}

    async def _sync():
        from datetime import datetime as dt
        from app.models.order import PaymentStatus
        from app.models.user import User

        # За последние 7 дней (можно хранить last_sync в настройках)
        date_to = date.today().isoformat()
        date_from = (date.today() - timedelta(days=7)).isoformat()

        payments = await odata_client.get_payments(date_from, date_to)
        processed = 0
        matched = 0

        for payment in payments:
            order = None
            # 1) По номеру заказа, если передан
            if payment["НомерЗаказа"]:
                order = await Order.find_one({"order_number": payment["НомерЗаказа"]})
            # 2) По сумме и контрагенту (приблизительно)
            if not order and payment["Контрагент_Key"]:
                # Ищем пользователя по external_id_1c
                user = await User.find_one({"external_id_1c": payment["Контрагент_Key"]})
                if user:
                    # Находим последний неоплаченный заказ этого клиента с такой же суммой
                    pending_orders = await Order.find({
                        "client_id": user.id,
                        "payment_status": PaymentStatus.PENDING,
                        "total": payment["Сумма"]
                    }).sort("-created_at").to_list()
                    if pending_orders:
                        order = pending_orders[0]

            if order:
                order.payment_status = PaymentStatus.PAID
                order.paid_amount = payment["Сумма"]
                order.paid_at = dt.fromisoformat(
                    payment["Дата"].replace('Z', '+00:00'))
                order.updated_at = dt.now(UTC)
                await order.save()

                # Уменьшаем долг клиента
                client = await User.get(order.client_id)
                if client:
                    client.current_debt = max(
                        0.0, client.current_debt - payment["Сумма"])
                    await client.save()
                matched += 1
            processed += 1

        return {"status": "ok", "processed": processed, "matched": matched}

    try:
        return _run_async(_sync())
    except Exception as e:
        logger.error("Ошибка синхронизации оплат", error=str(e))
        raise self.retry(exc=e)


@celery_app.task(name="app.tasks.sync_tasks.push_receipt_to_1c", bind=True, max_retries=3)
def push_receipt_to_1c(self, receipt_id: str):
    """Отправляет приходную накладную в 1С (UC-264)"""
    async def _push():
        from app.models.stock import StockReceipt
        receipt = await StockReceipt.get(receipt_id)
        if not receipt:
            return {"error": "Receipt not found"}
        if receipt.synced_to_1c:
            return {"already_synced": True}

        items = []
        for item in receipt.items:
            # нужно поле external_id_1c у товара
            product = await Product.get(item.product_id)
            if product and product.external_id_1c:
                items.append({
                    "product_ref": product.external_id_1c,
                    "quantity": item.qty,
                    "price": item.cost_price
                })
        if not items:
            raise Exception("Нет товаров с external_id_1c")

        receipt_data = {
            "receipt_number": receipt.receipt_number,
            "date": receipt.date.isoformat(),
            "invoice_number": receipt.invoice_number,
            "items": items,
        }
        ref = await odata_client.create_receipt_document(receipt_data)
        receipt.synced_to_1c = True
        receipt.sync_1c_id = ref
        await receipt.save()
        return {"success": ref}

    try:
        return _run_async(_push())
    except Exception as e:
        logger.error(f"Ошибка отправки прихода {receipt_id}", error=str(e))
        raise self.retry(exc=e)
