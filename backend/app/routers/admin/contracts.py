"""
Роутер управления госконтрактами (администратор).
Эндпоинты: /api/v1/admin/contracts/
"""

import math
from datetime import UTC, datetime
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.models.contract import Contract, ContractItem, DeliverySchedule
from app.schemas.contract import (
    ContractCreate,
    ContractItemSchema,
    ContractListResponse,
    ContractResponse,
    ContractUpdate,
    DeliveryMarkRequest,
    DeliveryScheduleSchema,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/contracts", tags=["Админ: Контракты"])


def _to_response(contract: Contract) -> ContractResponse:
    """Конвертирует Contract в ответ API."""
    return ContractResponse(
        id=str(contract.id),
        contract_number=contract.contract_number,
        client_id=str(contract.client_id),
        client_name=contract.client_name,
        contract_type=contract.contract_type,
        start_date=str(contract.start_date),
        end_date=str(contract.end_date),
        total_amount=contract.total_amount,
        items=[
            ContractItemSchema(
                product_id=str(item.product_id),
                product_name=item.product_name,
                qty=item.qty,
                delivered_qty=item.delivered_qty,
                unit=item.unit,
                price=item.price,
            )
            for item in contract.items
        ],
        delivery_schedule=[
            DeliveryScheduleSchema(
                date=ds.date,
                items=[
                    ContractItemSchema(
                        product_id=str(i.product_id),
                        product_name=i.product_name,
                        qty=i.qty,
                        delivered_qty=i.delivered_qty,
                        unit=i.unit,
                        price=i.price,
                    )
                    for i in ds.items
                ],
                is_completed=ds.is_completed,
                order_id=str(ds.order_id) if ds.order_id else None,
            )
            for ds in contract.delivery_schedule
        ],
        completion_percent=contract.completion_percent,
        status=contract.status,
        documents=contract.documents,
        notes=contract.notes,
        created_at=contract.created_at.isoformat(),
        updated_at=contract.updated_at.isoformat(),
    )


@router.get(
    "/",
    response_model=ContractListResponse,
    summary="Список госконтрактов",
)
async def get_contracts(
    contract_status: Optional[str] = Query(None, alias="status", description="Фильтр по статусу"),
    client_id: Optional[str] = Query(None, description="Фильтр по клиенту"),
    contract_type: Optional[str] = Query(None, description="Тип: 44fz, direct"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    _=Depends(require_admin),
):
    """
    Список всех контрактов с возможностью фильтрации.
    Сортировка: по дате создания (новые первые).
    """
    query: dict = {}

    if contract_status:
        query["status"] = contract_status
    if client_id:
        try:
            query["client_id"] = PydanticObjectId(client_id)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат client_id",
            ) from e
    if contract_type:
        query["contract_type"] = contract_type

    total = await Contract.find(query).count()
    contracts = await Contract.find(query).sort(-Contract.created_at).skip((page - 1) * limit).limit(limit).to_list()

    return ContractListResponse(
        items=[_to_response(c) for c in contracts],
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.post(
    "/",
    response_model=ContractResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать контракт",
)
async def create_contract(
    data: ContractCreate,
    _=Depends(require_admin),
):
    """
    Создать новый госконтракт или прямой договор.
    """
    # Валидируем тип контракта
    valid_types = {"44fz", "direct"}
    if data.contract_type not in valid_types:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Недопустимый тип контракта. Допустимые значения: {', '.join(valid_types)}",
        )

    # Проверяем уникальность номера
    existing = await Contract.find_one({"contract_number": data.contract_number})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Контракт с номером {data.contract_number!r} уже существует",
        )

    now = datetime.now(UTC)

    contract = Contract(
        contract_number=data.contract_number,
        client_id=PydanticObjectId(data.client_id),
        client_name=data.client_name,
        contract_type=data.contract_type,
        start_date=data.start_date,
        end_date=data.end_date,
        total_amount=data.total_amount,
        items=[
            ContractItem(
                product_id=PydanticObjectId(item.product_id),
                product_name=item.product_name,
                qty=item.qty,
                delivered_qty=item.delivered_qty,
                unit=item.unit,
                price=item.price,
            )
            for item in data.items
        ],
        delivery_schedule=[
            DeliverySchedule(
                date=ds.date,
                items=[
                    ContractItem(
                        product_id=PydanticObjectId(i.product_id),
                        product_name=i.product_name,
                        qty=i.qty,
                        delivered_qty=i.delivered_qty,
                        unit=i.unit,
                        price=i.price,
                    )
                    for i in ds.items
                ],
                is_completed=ds.is_completed,
                order_id=None,
            )
            for ds in data.delivery_schedule
        ],
        status="active",
        notes=data.notes,
        created_at=now,
        updated_at=now,
    )
    await contract.insert()

    logger.info(
        "Контракт создан",
        contract_id=str(contract.id),
        contract_number=data.contract_number,
        client=data.client_name,
        total_amount=data.total_amount,
    )

    return _to_response(contract)


@router.get(
    "/{contract_id}",
    response_model=ContractResponse,
    summary="Детали контракта с % исполнения",
)
async def get_contract(
    contract_id: str,
    _=Depends(require_admin),
):
    """
    Детальная информация о контракте, включая % исполнения и график поставок.
    """
    try:
        contract = await Contract.get(PydanticObjectId(contract_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Контракт не найден") from e

    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Контракт не найден")

    return _to_response(contract)


@router.patch(
    "/{contract_id}",
    response_model=ContractResponse,
    summary="Обновить контракт",
)
async def update_contract(
    contract_id: str,
    data: ContractUpdate,
    _=Depends(require_admin),
):
    """
    Обновить данные контракта.
    """
    try:
        contract = await Contract.get(PydanticObjectId(contract_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Контракт не найден") from e

    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Контракт не найден")

    # Обновляем поля
    if data.contract_number is not None:
        # Проверяем уникальность нового номера
        existing = await Contract.find_one({"contract_number": data.contract_number, "_id": {"$ne": contract.id}})
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Контракт с номером {data.contract_number!r} уже существует",
            )
        contract.contract_number = data.contract_number

    if data.contract_type is not None:
        contract.contract_type = data.contract_type

    if data.start_date is not None:
        contract.start_date = data.start_date

    if data.end_date is not None:
        contract.end_date = data.end_date

    if data.total_amount is not None:
        contract.total_amount = data.total_amount

    if data.items is not None:
        contract.items = [
            ContractItem(
                product_id=PydanticObjectId(item.product_id),
                product_name=item.product_name,
                qty=item.qty,
                delivered_qty=item.delivered_qty,
                unit=item.unit,
                price=item.price,
            )
            for item in data.items
        ]

    if data.delivery_schedule is not None:
        contract.delivery_schedule = [
            DeliverySchedule(
                date=ds.date,
                items=[
                    ContractItem(
                        product_id=PydanticObjectId(i.product_id),
                        product_name=i.product_name,
                        qty=i.qty,
                        delivered_qty=i.delivered_qty,
                        unit=i.unit,
                        price=i.price,
                    )
                    for i in ds.items
                ],
                is_completed=ds.is_completed,
                order_id=None,
            )
            for ds in data.delivery_schedule
        ]

    if data.status is not None:
        valid_statuses = {"active", "completed", "cancelled", "overdue"}
        if data.status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Недопустимый статус. Допустимые значения: {', '.join(valid_statuses)}",
            )
        contract.status = data.status

    if data.notes is not None:
        contract.notes = data.notes

    contract.updated_at = datetime.now(UTC)
    await contract.save()

    # Пересчитываем % после обновления позиций
    if data.items is not None:
        from app.services.contract_service import update_completion

        await update_completion(contract_id)
        refreshed = await Contract.get(PydanticObjectId(contract_id))
        if refreshed is not None:
            contract = refreshed

    logger.info(
        "Контракт обновлён",
        contract_id=contract_id,
        contract_number=contract.contract_number,
    )

    return _to_response(contract)


@router.post(
    "/{contract_id}/delivery",
    response_model=ContractResponse,
    summary="Отметить поставку по контракту",
)
async def mark_delivery(
    contract_id: str,
    data: DeliveryMarkRequest,
    _=Depends(require_admin),
):
    """
    Отметить выполнение поставки по графику.

    Обновляет delivered_qty в позициях контракта и пересчитывает % исполнения.
    При достижении 100% статус автоматически меняется на "completed".
    """
    from app.services.contract_service import mark_delivery_completed

    try:
        contract = await mark_delivery_completed(
            contract_id=contract_id,
            delivery_index=data.schedule_index,
            order_id=data.order_id,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    logger.info(
        "Поставка отмечена через API",
        contract_id=contract_id,
        schedule_index=data.schedule_index,
        completion_percent=contract.completion_percent,
    )

    return _to_response(contract)


@router.get(
    "/{contract_id}/acts",
    summary="Получить данные акта приёмки",
)
async def get_delivery_act(
    contract_id: str,
    delivery_index: int = Query(0, ge=0, description="Индекс поставки в графике"),
    _=Depends(require_admin),
):
    """
    Получить данные акта приёмки по поставке.

    Возвращает структуру данных для генерации PDF акта приёмки.
    Акт включает: контрагентов, перечень товаров, суммы, подписи.
    """
    from app.services.contract_service import generate_delivery_act

    try:
        act_data = await generate_delivery_act(contract_id, delivery_index)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)) from e

    return act_data
