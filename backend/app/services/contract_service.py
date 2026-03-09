"""
Сервис управления госконтрактами.

Отвечает за:
- Пересчёт процента исполнения контракта
- Проверку просроченных контрактов
- Генерацию актов приёмки
"""
from datetime import date, datetime, timezone
from typing import Any, Dict, List, Optional

import structlog
from beanie import PydanticObjectId

from app.models.contract import Contract

logger = structlog.get_logger(__name__)


async def update_completion(contract_id: str) -> float:
    """
    Пересчитывает процент исполнения контракта.

    Формула: sum(delivered_qty * price) / total_amount * 100

    Args:
        contract_id: ID контракта (строка)

    Returns:
        Новый процент исполнения (0-100)

    Raises:
        ValueError: Если контракт не найден
    """
    try:
        contract = await Contract.get(PydanticObjectId(contract_id))
    except Exception:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if not contract:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if contract.total_amount <= 0:
        contract.completion_percent = 0.0
        await contract.save()
        return 0.0

    # Рассчитываем выполненную сумму по позициям
    delivered_amount = sum(
        item.delivered_qty * item.price
        for item in contract.items
    )

    new_percent = round(min(100.0, delivered_amount / contract.total_amount * 100), 1)
    contract.completion_percent = new_percent

    # Автоматически меняем статус при 100% исполнении
    if new_percent >= 100.0 and contract.status == "active":
        contract.status = "completed"
        logger.info(
            "Контракт автоматически завершён — 100% исполнения",
            contract_id=contract_id,
            contract_number=contract.contract_number,
        )

    contract.updated_at = datetime.now(timezone.utc)
    await contract.save()

    logger.info(
        "Процент исполнения контракта обновлён",
        contract_id=contract_id,
        contract_number=contract.contract_number,
        completion_percent=new_percent,
    )

    return new_percent


async def check_overdue_contracts() -> List[Contract]:
    """
    Находит просроченные активные контракты (end_date < сегодня, статус active).

    Автоматически обновляет статус на "overdue".

    Returns:
        Список просроченных контрактов
    """
    today = date.today()

    # Ищем активные контракты с прошедшей датой окончания
    overdue_contracts = await Contract.find(
        {
            "status": "active",
            "end_date": {"$lt": today.isoformat()},
        }
    ).to_list()

    updated_ids = []
    for contract in overdue_contracts:
        contract.status = "overdue"
        contract.updated_at = datetime.now(timezone.utc)
        await contract.save()
        updated_ids.append(str(contract.id))

    if updated_ids:
        logger.warning(
            "Обнаружены просроченные контракты",
            count=len(updated_ids),
            contract_ids=updated_ids,
        )

    return overdue_contracts


async def generate_delivery_act(contract_id: str, delivery_index: int) -> Dict[str, Any]:
    """
    Генерирует данные акта приёмки по поставке из графика.

    Args:
        contract_id: ID контракта
        delivery_index: Индекс записи в delivery_schedule

    Returns:
        Словарь с данными акта для генерации PDF

    Raises:
        ValueError: Если контракт или поставка не найдены
    """
    try:
        contract = await Contract.get(PydanticObjectId(contract_id))
    except Exception:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if not contract:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if delivery_index >= len(contract.delivery_schedule):
        raise ValueError(
            f"Поставка с индексом {delivery_index} не существует. "
            f"Контракт содержит {len(contract.delivery_schedule)} поставок."
        )

    delivery = contract.delivery_schedule[delivery_index]

    # Получаем реквизиты из настроек системы
    try:
        from app.models.settings import SystemSettings

        system_settings = await SystemSettings.find_one()
        company_name = system_settings.company_name if system_settings else "ИП Агрорезерв"
        company_inn = system_settings.inn if system_settings else ""
    except Exception:
        company_name = "ИП Агрорезерв"
        company_inn = ""

    # Формируем данные акта
    total_delivery_amount = sum(
        item.delivered_qty * item.price for item in delivery.items
    )

    act_data = {
        "act_number": f"АКТ-{contract.contract_number}-{delivery_index + 1:02d}",
        "act_date": datetime.now(timezone.utc).date().isoformat(),
        "contract_number": contract.contract_number,
        "contract_date": str(contract.start_date),
        "supplier": {
            "name": company_name,
            "inn": company_inn,
        },
        "customer": {
            "name": contract.client_name,
        },
        "delivery_date": str(delivery.date),
        "items": [
            {
                "number": idx + 1,
                "name": item.product_name,
                "qty": item.delivered_qty,
                "unit": item.unit,
                "price": item.price,
                "total": round(item.delivered_qty * item.price, 2),
            }
            for idx, item in enumerate(delivery.items)
        ],
        "total_amount": round(total_delivery_amount, 2),
        "is_completed": delivery.is_completed,
        "order_id": str(delivery.order_id) if delivery.order_id else None,
        "completion_percent": contract.completion_percent,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    logger.info(
        "Акт приёмки сформирован",
        contract_id=contract_id,
        delivery_index=delivery_index,
        total_amount=total_delivery_amount,
    )

    return act_data


async def mark_delivery_completed(
    contract_id: str,
    delivery_index: int,
    order_id: Optional[str] = None,
) -> Contract:
    """
    Отмечает поставку по контракту как выполненную.

    Шаги:
    1. Обновляет is_completed = True в графике
    2. Обновляет delivered_qty в позициях контракта
    3. Пересчитывает % исполнения
    4. При необходимости привязывает заказ

    Args:
        contract_id: ID контракта
        delivery_index: Индекс поставки в delivery_schedule
        order_id: ID связанного заказа (опционально)

    Returns:
        Обновлённый контракт
    """
    try:
        contract = await Contract.get(PydanticObjectId(contract_id))
    except Exception:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if not contract:
        raise ValueError(f"Контракт с ID {contract_id} не найден")

    if delivery_index >= len(contract.delivery_schedule):
        raise ValueError(f"Поставка с индексом {delivery_index} не существует")

    delivery = contract.delivery_schedule[delivery_index]

    if delivery.is_completed:
        raise ValueError(f"Поставка {delivery_index + 1} уже отмечена как выполненная")

    # Отмечаем поставку выполненной
    delivery.is_completed = True
    if order_id:
        delivery.order_id = PydanticObjectId(order_id)

    # Обновляем delivered_qty в позициях контракта
    for delivery_item in delivery.items:
        for contract_item in contract.items:
            if contract_item.product_id == delivery_item.product_id:
                contract_item.delivered_qty = round(
                    contract_item.delivered_qty + delivery_item.qty, 3
                )
                break

    contract.updated_at = datetime.now(timezone.utc)
    await contract.save()

    # Пересчитываем % исполнения
    await update_completion(contract_id)

    # Перезагружаем после пересчёта
    contract = await Contract.get(PydanticObjectId(contract_id))

    logger.info(
        "Поставка по контракту отмечена выполненной",
        contract_id=contract_id,
        contract_number=contract.contract_number,
        delivery_index=delivery_index,
        completion_percent=contract.completion_percent,
    )

    return contract
