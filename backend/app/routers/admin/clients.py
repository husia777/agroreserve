"""
Роутер управления клиентами (для администратора).
Эндпоинты: /api/v1/admin/clients/

Реализует модерацию B2B клиентов и управление кредитными лимитами.
"""

import math
from datetime import UTC, datetime
from typing import Any, Optional

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel

from app.models.user import User, UserStatus
from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin/clients", tags=["Администрирование — Клиенты"])
logger = structlog.get_logger(__name__)


class CreditLimitUpdate(BaseModel):
    """Запрос на обновление кредитного лимита клиента."""

    credit_limit: float
    reason: Optional[str] = None


class RejectRequest(BaseModel):
    """Запрос на отклонение клиента."""

    reason: Optional[str] = None


def _client_to_response(client: User) -> dict[str, Any]:
    """Конвертирует User в ответ с именами полей фронтенда."""
    result: dict[str, Any] = {
        "id": str(client.id),
        "full_name": client.name,
        "email": str(client.email) if client.email else None,
        "phone": client.phone,
        "role": client.role.value if hasattr(client.role, "value") else client.role,
        "client_type": client.client_type.value if hasattr(client.client_type, "value") else client.client_type,
        "status": client.status.value if hasattr(client.status, "value") else client.status,
        "credit_limit": client.credit_limit,
        "debt": client.current_debt,
        "delivery_address": client.delivery_address,
        "telegram_chat_id": client.telegram_chat_id,
        "created_at": client.created_at.isoformat(),
        "updated_at": client.updated_at.isoformat()
        if hasattr(client, "updated_at") and client.updated_at
        else client.created_at.isoformat(),
    }

    if client.organization:
        result["organization"] = {
            "name": client.organization.name,
            "inn": getattr(client.organization, "inn", None),
            "kpp": getattr(client.organization, "kpp", None),
            "ogrn": getattr(client.organization, "ogrn", None),
            "legal_address": getattr(client.organization, "legal_address", None),
            "actual_address": getattr(client.organization, "actual_address", None),
            "bank_name": getattr(client.organization, "bank_name", None),
            "bank_account": getattr(client.organization, "account", None),
            "bik": getattr(client.organization, "bik", None),
            "corr_account": getattr(client.organization, "correspondent_account", None),
        }
    else:
        result["organization"] = None

    return result


@router.get(
    "/",
    summary="Список клиентов",
)
async def list_clients(
    client_status: str = Query(None, alias="status", description="Фильтр: pending, approved, blocked"),
    client_type: str = Query(None, description="Фильтр: b2b, b2c"),
    search: str = Query(None, description="Поиск по имени, телефону, ИНН"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    per_page: Optional[int] = Query(None, ge=1, le=100, description="Алиас для limit"),
    admin=Depends(require_admin),
):
    """Список всех клиентов с фильтрами."""
    if per_page is not None:
        limit = per_page

    query: dict = {"role": "client"}

    if client_status:
        query["status"] = client_status
    if client_type:
        query["client_type"] = client_type
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"phone": {"$regex": search, "$options": "i"}},
            {"organization.inn": {"$regex": search, "$options": "i"}},
            {"organization.name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
        ]

    total = await User.find(query).count()
    skip = (page - 1) * limit
    clients = await User.find(query).sort("-created_at").skip(skip).limit(limit).to_list()

    items = [_client_to_response(c) for c in clients]

    pages = math.ceil(total / limit) if total > 0 else 1
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages,
    }


@router.get(
    "/{client_id}",
    summary="Карточка клиента",
)
async def get_client(client_id: str, admin=Depends(require_admin)):
    """Детальная карточка клиента."""
    from beanie import PydanticObjectId

    client = await User.get(PydanticObjectId(client_id))
    if not client or client.role.value == "admin":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Клиент не найден",
        )

    return _client_to_response(client)


@router.post(
    "/{client_id}/approve",
    summary="Одобрить клиента",
)
async def approve_client(client_id: str, admin=Depends(require_admin)):
    """Одобрение B2B клиента."""
    from beanie import PydanticObjectId

    client = await User.get(PydanticObjectId(client_id))
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Клиент не найден",
        )

    if client.status != UserStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Клиент не в статусе 'pending', текущий статус: {client.status.value}",
        )

    client.status = UserStatus.APPROVED
    client.updated_at = datetime.now(UTC)
    await client.save()

    logger.info("Клиент одобрен", client_id=client_id, name=client.name)

    return _client_to_response(client)


@router.post(
    "/{client_id}/reject",
    summary="Отклонить клиента",
)
async def reject_client(
    client_id: str,
    data: Optional[RejectRequest] = None,
    admin=Depends(require_admin),
):
    """Отклонение B2B клиента с указанием причины."""
    from beanie import PydanticObjectId

    client = await User.get(PydanticObjectId(client_id))
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Клиент не найден",
        )

    client.status = UserStatus.REJECTED
    reason = data.reason if data else None
    if reason:
        client.rejection_reason = reason
    client.updated_at = datetime.now(UTC)
    await client.save()

    logger.info("Клиент отклонён", client_id=client_id, reason=reason)

    return _client_to_response(client)


@router.patch(
    "/{client_id}/credit-limit",
    summary="Обновить кредитный лимит",
)
async def update_credit_limit(
    client_id: str,
    data: CreditLimitUpdate,
    admin=Depends(require_admin),
):
    """Установка кредитного лимита для B2B клиента."""
    from beanie import PydanticObjectId

    client = await User.get(PydanticObjectId(client_id))
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Клиент не найден",
        )

    old_limit = client.credit_limit
    client.credit_limit = data.credit_limit
    client.updated_at = datetime.now(UTC)
    await client.save()

    logger.info(
        "Кредитный лимит изменён",
        client_id=client_id,
        old_limit=old_limit,
        new_limit=data.credit_limit,
        reason=data.reason,
    )

    return _client_to_response(client)
