"""
Сервис складского учёта.

Отвечает за:
- Создание приходных документов
- Обновление остатков товаров
- Средневзвешенная себестоимость (WAC)
- Резервирование / возврат остатков при заказах
- Автонумерация приходов
"""

from datetime import datetime, timezone
from typing import List, Optional

import structlog

from app.models.batch import Batch
from app.models.product import Product
from app.models.stock import StockReceipt, StockReceiptItem

logger = structlog.get_logger(__name__)


async def get_next_receipt_number() -> str:
    """
    Генерирует следующий номер приходного документа в формате REC-YYYY-NNNNN.

    Атомарно: ищет максимальный номер за текущий год.
    """
    year = datetime.now(timezone.utc).year
    prefix = f"REC-{year}-"

    # Ищем последний приход этого года
    last_receipt = (
        await StockReceipt.find({"receipt_number": {"$regex": f"^{prefix}"}})
        .sort(-StockReceipt.receipt_number)
        .first_or_none()
    )

    if last_receipt:
        try:
            last_num = int(last_receipt.receipt_number.split("-")[-1])
            next_num = last_num + 1
        except (ValueError, IndexError):
            next_num = 1
    else:
        next_num = 1

    return f"{prefix}{next_num:05d}"


async def update_weighted_average_cost(
    product: Product,
    new_qty: float,
    new_cost: float,
) -> float:
    """
    Пересчитывает средневзвешенную себестоимость товара.

    Формула: new_wac = (old_cost * old_qty + new_cost * new_qty) / (old_qty + new_qty)

    Args:
        product: Товар (объект Product)
        new_qty: Количество нового прихода
        new_cost: Закупочная цена нового прихода

    Returns:
        Новая средневзвешенная себестоимость
    """
    old_qty = product.stock_qty
    old_cost = product.cost_price

    if old_qty <= 0:
        # Если товара нет — берём цену нового прихода
        return new_cost

    total_qty = old_qty + new_qty
    if total_qty <= 0:
        return new_cost

    new_wac = (old_cost * old_qty + new_cost * new_qty) / total_qty
    return round(new_wac, 4)


async def create_stock_receipt(data: dict, created_by: Optional[str] = None) -> StockReceipt:
    """
    Создаёт приходный документ и обновляет остатки товаров.

    Args:
        data: Словарь с данными прихода (поля StockReceiptCreate)
        created_by: ID администратора, создавшего документ

    Returns:
        Созданный StockReceipt

    Raises:
        ValueError: Если товар не найден
    """
    from beanie import PydanticObjectId

    receipt_number = await get_next_receipt_number()
    receipt_date = data.get("date") or datetime.now(timezone.utc).date()

    # Строим позиции прихода
    receipt_items: List[StockReceiptItem] = []
    total_amount = 0.0

    for item_data in data["items"]:
        product_id = item_data["product_id"]
        qty = float(item_data.get("quantity", item_data.get("qty", 0)))
        cost_price = float(item_data.get("purchase_price", item_data.get("cost_price", 0)))
        unit = item_data.get("unit", "kg")

        # Загружаем товар
        try:
            product = await Product.get(PydanticObjectId(product_id))
        except Exception:
            product = None

        if not product:
            raise ValueError(f"Товар с ID {product_id} не найден")

        item_total = round(qty * cost_price, 2)
        total_amount += item_total

        receipt_items.append(
            StockReceiptItem(
                product_id=product_id,
                product_name=product.name,
                qty=qty,
                unit=unit,
                cost_price=cost_price,
                total=item_total,
            )
        )

        # Обновляем средневзвешенную себестоимость
        new_wac = await update_weighted_average_cost(product, qty, cost_price)
        product.cost_price = new_wac
        product.stock_qty = round(product.stock_qty + qty, 3)
        product.updated_at = datetime.now(timezone.utc)
        await product.save()

        logger.info(
            "Остаток товара обновлён",
            product_id=product_id,
            product_name=product.name,
            added_qty=qty,
            new_stock=product.stock_qty,
            new_cost=new_wac,
        )

    # Создаём документ прихода
    receipt = StockReceipt(
        receipt_number=receipt_number,
        supplier_name=data["supplier_name"],
        supplier_id=data.get("supplier_id"),
        supplier_contact=data.get("supplier_contact"),
        invoice_number=data.get("invoice_number"),
        invoice_date=data.get("invoice_date"),
        date=receipt_date,
        items=receipt_items,
        total=round(total_amount, 2),
        notes=data.get("note", data.get("notes")),
        created_by=created_by,
    )
    await receipt.insert()

    # ── UC-01: Уведомляем подписчиков о поступлении товара ────
    try:
        await notify_stock_waitlist(receipt_items)
    except Exception as e:
        logger.warning("Ошибка уведомления waitlist", error=str(e))

    logger.info(
        "Приходной документ создан",
        receipt_number=receipt_number,
        supplier=data["supplier_name"],
        total=total_amount,
        items_count=len(receipt_items),
    )

    # Проверяем низкие остатки и отправляем уведомления
    await _check_low_stock_after_receipt(receipt_items)

    return receipt


async def _check_low_stock_after_receipt(receipt_items: List[StockReceiptItem]) -> None:
    """
    После прихода проверяет, не опустились ли товары ниже минимума.
    Используется только как инфо-проверка (обычно после прихода остатки растут).
    """
    pass


async def reserve_stock(items: list) -> None:
    """
    Резервирует остатки товаров при создании заказа.
    Уменьшает stock_qty для каждого товара.

    Args:
        items: Список OrderItem (с product_id и ordered_qty)

    Raises:
        ValueError: Если остатков недостаточно
    """
    from beanie import PydanticObjectId

    for item in items:
        product_id = item.product_id if hasattr(item, "product_id") else item["product_id"]
        qty = item.ordered_qty if hasattr(item, "ordered_qty") else item["ordered_qty"]

        try:
            product = await Product.get(PydanticObjectId(product_id))
        except Exception:
            product = None

        if not product:
            raise ValueError(f"Товар с ID {product_id} не найден при резервировании")

        if product.stock_qty < qty:
            raise ValueError(
                f"Недостаточный остаток товара «{product.name}»: "
                f"доступно {product.stock_qty:.1f} {product.unit}, "
                f"запрошено {qty:.1f} {product.unit}"
            )

        product.stock_qty = round(product.stock_qty - qty, 3)
        product.updated_at = datetime.now(timezone.utc)
        await product.save()

        logger.info(
            "Остаток зарезервирован",
            product_id=product_id,
            product_name=product.name,
            reserved_qty=qty,
            remaining_stock=product.stock_qty,
        )


async def release_stock(items: list) -> None:
    """
    Возвращает зарезервированные остатки при отмене заказа.

    Args:
        items: Список OrderItem
    """
    from beanie import PydanticObjectId

    for item in items:
        product_id = item.product_id if hasattr(item, "product_id") else item["product_id"]
        # При отмене возвращаем фактическое количество (или заказанное если факт не установлен)
        if hasattr(item, "actual_qty") and item.actual_qty is not None:
            qty = item.actual_qty
        elif hasattr(item, "ordered_qty"):
            qty = item.ordered_qty
        else:
            qty = item.get("actual_qty") or item.get("ordered_qty", 0)

        try:
            product = await Product.get(PydanticObjectId(product_id))
        except Exception:
            product = None

        if not product:
            logger.warning(
                "Товар не найден при возврате остатка",
                product_id=product_id,
            )
            continue

        product.stock_qty = round(product.stock_qty + qty, 3)
        product.updated_at = datetime.now(timezone.utc)
        await product.save()

        logger.info(
            "Остаток возвращён",
            product_id=product_id,
            product_name=product.name,
            returned_qty=qty,
            new_stock=product.stock_qty,
        )


async def get_low_stock_products() -> list:
    """
    Возвращает товары, у которых остаток ниже минимального.

    Returns:
        Список словарей с данными о товарах с низкими остатками
    """
    products = await Product.find(
        Product.is_active == True,  # noqa: E712
        Product.stock_qty < Product.min_stock_qty,
    ).to_list()

    return [
        {
            "product_id": str(p.id),
            "name": p.name,
            "stock_qty": p.stock_qty,
            "min_stock_qty": p.min_stock_qty,
            "unit": p.unit,
            "deficit": round(p.min_stock_qty - p.stock_qty, 3),
        }
        for p in products
    ]


# ────────────────────────────────────────────────────────────────────────────
# v2: Партионный учёт (FIFO) — методы добавлены в рамках Группы 3
# ────────────────────────────────────────────────────────────────────────────


async def create_batch(receipt_item: StockReceiptItem, receipt: StockReceipt) -> Batch:
    """
    Создаёт партию товара при поступлении на склад.

    Вызывается автоматически при создании приходного документа.
    Партия привязывается к приходу и поставщику.

    Args:
        receipt_item: Позиция прихода
        receipt: Приходной документ

    Returns:
        Созданная партия
    """
    from datetime import date as date_type

    from beanie import PydanticObjectId as PO_ID

    from app.models.batch import Batch

    batch = Batch(
        product_id=PO_ID(receipt_item.product_id),
        product_name=receipt_item.product_name,
        receipt_id=receipt.id,
        supplier_id=PO_ID(receipt.supplier_id) if receipt.supplier_id else None,
        supplier_name=receipt.supplier_name,
        qty_initial=receipt_item.qty,
        qty_remaining=receipt_item.qty,
        unit=receipt_item.unit,
        cost_price=receipt_item.cost_price,
        received_date=receipt.date,
        is_exhausted=False,
        created_at=datetime.now(timezone.utc),
    )
    await batch.insert()

    logger.info(
        "Партия товара создана",
        batch_id=str(batch.id),
        product=receipt_item.product_name,
        qty=receipt_item.qty,
        receipt_id=str(receipt.id),
    )

    return batch


async def consume_batches_fifo(product_id: str, qty: float) -> list:
    """
    Списывает товар из партий по принципу FIFO (первая вошла — первая вышла).

    Сначала расходуются самые старые партии (по received_date).
    Обновляет qty_remaining в партиях.

    Args:
        product_id: ID товара
        qty: Количество для списания

    Returns:
        Список задействованных партий [{batch_id, consumed_qty}]

    Raises:
        ValueError: Если суммарного остатка в партиях недостаточно
    """
    from beanie import PydanticObjectId as PO_ID

    from app.models.batch import Batch

    # Загружаем не исчерпанные партии, сортируем по дате прихода (FIFO: старые первые)
    batches = (
        await Batch.find(
            {
                "product_id": PO_ID(product_id),
                "is_exhausted": False,
                "qty_remaining": {"$gt": 0},
            }
        )
        .sort(+Batch.received_date)
        .to_list()
    )

    total_available = sum(b.qty_remaining for b in batches)
    if total_available < qty:
        raise ValueError(
            f"Недостаточно товара в партиях для FIFO-списания: " f"доступно {total_available:.3f}, запрошено {qty:.3f}"
        )

    remaining_to_consume = qty
    consumed_batches = []

    for batch in batches:
        if remaining_to_consume <= 0:
            break

        consume_from_batch = min(batch.qty_remaining, remaining_to_consume)
        batch.qty_remaining = round(batch.qty_remaining - consume_from_batch, 3)

        if batch.qty_remaining <= 0:
            batch.is_exhausted = True

        await batch.save()

        consumed_batches.append(
            {
                "batch_id": str(batch.id),
                "consumed_qty": round(consume_from_batch, 3),
                "cost_price": batch.cost_price,
            }
        )

        remaining_to_consume = round(remaining_to_consume - consume_from_batch, 3)

    logger.info(
        "FIFO списание по партиям выполнено",
        product_id=product_id,
        qty=qty,
        batches_consumed=len(consumed_batches),
    )

    return consumed_batches


async def get_expiring_batches(days: int = 7) -> list:
    """
    Возвращает партии с истекающим сроком годности.

    Args:
        days: Порог в днях (по умолчанию 7 — партии, истекающие в течение недели)

    Returns:
        Список словарей с данными о партиях
    """
    from datetime import date as date_type, timedelta

    from app.models.batch import Batch

    today = date_type.today()
    threshold = today + timedelta(days=days)

    # Ищем партии, у которых expiry_date <= threshold и партия не исчерпана
    batches = (
        await Batch.find(
            {
                "expiry_date": {"$lte": threshold.isoformat(), "$ne": None},
                "is_exhausted": False,
                "qty_remaining": {"$gt": 0},
            }
        )
        .sort(+Batch.expiry_date)
        .to_list()
    )

    result = []
    for batch in batches:
        days_until_expiry = None
        if batch.expiry_date:
            delta = batch.expiry_date - today
            days_until_expiry = delta.days

        result.append(
            {
                "batch_id": str(batch.id),
                "product_id": str(batch.product_id),
                "product_name": batch.product_name,
                "qty_remaining": batch.qty_remaining,
                "unit": batch.unit,
                "expiry_date": str(batch.expiry_date) if batch.expiry_date else None,
                "days_until_expiry": days_until_expiry,
                "supplier_name": batch.supplier_name,
                "cost_price": batch.cost_price,
                "total_value": round(batch.qty_remaining * batch.cost_price, 2),
                "is_expired": days_until_expiry is not None and days_until_expiry < 0,
            }
        )

    logger.info(
        "Партии с истекающим сроком получены",
        days_threshold=days,
        batches_found=len(result),
    )

    return result


async def notify_stock_waitlist(receipt_items: list) -> None:
    """
    UC-01: При поступлении товара на склад — уведомляем подписчиков из stock_waitlist.
    Отправляем email и помечаем подписку как уведомлённую.
    """
    from app.models.stock_waitlist import StockWaitlist
    from app.utils.email_service import send_stock_restock_notification
    from app.utils.telegram_bot import send_admin_notification

    product_ids = []
    product_map: dict = {}

    for item in receipt_items:
        pid = str(item.product_id) if hasattr(item, "product_id") else str(item.get("product_id", ""))
        pname = item.product_name if hasattr(item, "product_name") else item.get("product_name", "")
        if pid:
            product_ids.append(pid)
            product_map[pid] = pname

    if not product_ids:
        return

    # Находим все неуведомлённые подписки на эти товары
    waitlist_entries = await StockWaitlist.find({"product_id": {"$in": product_ids}, "is_notified": False}).to_list()

    if not waitlist_entries:
        return

    notified_count = 0
    for entry in waitlist_entries:
        product_name = product_map.get(entry.product_id, entry.product_name)

        # Получаем slug товара для ссылки
        try:
            from app.models.product import Product
            from beanie import PydanticObjectId

            product = await Product.get(PydanticObjectId(entry.product_id))
            product_slug = product.slug if product else "unknown"
        except Exception:
            product_slug = "unknown"

        # Отправляем email
        ok = await send_stock_restock_notification(
            to_email=entry.email,
            product_name=product_name,
            product_slug=product_slug,
        )

        if ok:
            from datetime import datetime, timezone

            entry.is_notified = True
            entry.notified_at = datetime.now(timezone.utc)
            await entry.save()
            notified_count += 1
            logger.info(
                "Подписчик уведомлён о поступлении",
                email=entry.email,
                product=product_name,
            )

    # Telegram уведомление админу о рассылке
    if notified_count > 0:
        await send_admin_notification(f"📬 UC-01: Отправлено {notified_count} уведомлений о поступлении товара")
