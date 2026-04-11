"""
Роутер CRM (управление взаимоотношениями с клиентами).
Эндпоинты: /api/v1/admin/crm/

UC-54: Карточка клиента — полная информация, заметки, история взаимодействий.
"""

from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.models.crm import ClientInteraction, ClientNote, InteractionType
from app.models.user import User
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/crm", tags=["Админ: CRM"])


# ── Pydantic схемы ─────────────────────────────────────────────────────────────


class NoteCreate(BaseModel):
    """Создание заметки к клиенту."""

    text: str = Field(..., min_length=1, max_length=2000, description="Текст заметки")


class InteractionCreate(BaseModel):
    """Создание записи о взаимодействии."""

    # Фронтенд шлёт { type, description }, бэкенд принимает оба варианта
    interaction_type: Optional[str] = Field(
        None,
        description="Тип: call, email, meeting, whatsapp, order, payment, complaint, note",
    )
    type: Optional[str] = Field(None, description="Алиас для interaction_type (фронтенд)")
    title: Optional[str] = Field(None, max_length=200, description="Краткое описание")
    description: Optional[str] = Field(None, max_length=2000, description="Подробности")
    outcome: Optional[str] = Field(None, max_length=500, description="Результат")
    related_order_id: Optional[str] = Field(None, description="ID связанного заказа")
    related_order_number: Optional[str] = Field(None, description="Номер связанного заказа")

    def get_interaction_type(self) -> str:
        """Возвращает тип взаимодействия (interaction_type или type)."""
        return self.interaction_type or self.type or "note"

    def get_title(self) -> str:
        """Возвращает заголовок (из title или description)."""
        return self.title or self.description or "Без описания"


# ── Утилиты ────────────────────────────────────────────────────────────────────


def _note_to_dict(note: ClientNote) -> dict:
    """Конвертирует ClientNote в словарь."""
    return {
        "id": str(note.id),
        "text": note.text,
        "created_at": note.created_at.isoformat(),
    }


def _interaction_to_dict(interaction: ClientInteraction) -> dict:
    """Конвертирует ClientInteraction в словарь фронтенда."""
    return {
        "id": str(interaction.id),
        "type": (
            interaction.interaction_type.value
            if hasattr(interaction.interaction_type, "value")
            else interaction.interaction_type
        ),
        "description": interaction.description or interaction.title,
        "created_at": interaction.created_at.isoformat(),
    }


# ── Эндпоинты ──────────────────────────────────────────────────────────────────


@router.get(
    "/clients/{client_id}/card",
    summary="Полная карточка клиента (UC-54)",
)
async def get_client_card(
    client_id: str,
    orders_limit: int = Query(10, ge=1, le=50, description="Количество последних заказов"),
    admin=Depends(require_admin),
):
    """
    UC-54: Полная карточка клиента в CRM.

    Фронтенд деструктурирует:
    { user, orders_count, total_revenue, avg_check, top_products, debt, credit_limit, contracts, notes, interactions }
    """
    try:
        client = await User.get(PydanticObjectId(client_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден") from e

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден")

    # ── Заказы клиента ────────────────────────────────────────
    from app.models.order import Order, OrderStatus

    all_orders = (
        await Order.find(
            {"client_id.$id": PydanticObjectId(client_id)},
        )
        .sort("-Order.created_at")
        .to_list()
    )

    delivered_orders = [o for o in all_orders if o.status == OrderStatus.DELIVERED]

    # Статистика по заказам
    total_orders = len(all_orders)
    total_spent = round(sum(o.total for o in delivered_orders), 2)
    avg_check = round(total_spent / len(delivered_orders), 2) if delivered_orders else 0.0

    # Топ товары
    products_map: dict = {}
    for order in delivered_orders:
        for item in order.items:
            pid = item.product_id
            if pid not in products_map:
                products_map[pid] = {
                    "name": item.product_name,
                    "revenue": 0.0,
                }
            products_map[pid]["revenue"] += item.total

    top_products = sorted(
        products_map.values(),
        key=lambda x: x["revenue"],
        reverse=True,
    )[:5]
    for p in top_products:
        p["revenue"] = round(p["revenue"], 2)

    # ── Договоры клиента ──────────────────────────────────────
    from app.models.contract import Contract

    contracts = (
        await Contract.find(
            Contract.client_id == PydanticObjectId(client_id),
        )
        .sort("-Contract.created_at")
        .to_list()
    )

    # ── Заметки ───────────────────────────────────────────────
    notes = (
        await ClientNote.find(
            ClientNote.client_id == client_id,
        )
        .sort("-ClientNote.created_at")
        .limit(20)
        .to_list()
    )

    # ── Последние взаимодействия ──────────────────────────────
    interactions = (
        await ClientInteraction.find(
            ClientInteraction.client_id == client_id,
        )
        .sort("-ClientInteraction.created_at")
        .limit(10)
        .to_list()
    )

    logger.info(
        "Карточка клиента запрошена",
        client_id=client_id,
        client_name=client.name,
        admin_id=str(admin.id),
    )

    return {
        # Объект user — фронтенд деструктурирует { user, ... } = card
        "user": {
            "id": str(client.id),
            "full_name": client.name,
            "email": str(client.email) if client.email else None,
            "phone": client.phone,
            "role": client.role.value if hasattr(client.role, "value") else client.role,
            "client_type": client.client_type.value if hasattr(client.client_type, "value") else client.client_type,
            "status": client.status.value if hasattr(client.status, "value") else client.status,
            "delivery_address": client.delivery_address,
            "telegram_chat_id": client.telegram_chat_id,
            "organization": {
                "name": client.organization.name,
                "inn": getattr(client.organization, "inn", None),
                "kpp": getattr(client.organization, "kpp", None),
                "legal_address": getattr(client.organization, "legal_address", None),
            }
            if client.organization
            else None,
        },
        # Плоские поля статистики
        "orders_count": total_orders,
        "total_revenue": total_spent,
        "avg_check": avg_check,
        "top_products": top_products,
        # Финансы
        "debt": client.current_debt,
        "credit_limit": client.credit_limit,
        # Договоры, заметки, взаимодействия
        "contracts": [
            {
                "id": str(c.id),
                "contract_number": c.contract_number,
                "contract_type": c.contract_type,
                "total_amount": c.total_amount,
                "status": c.status,
                "start_date": str(c.start_date),
                "end_date": str(c.end_date),
                "completion_percent": c.completion_percent,
            }
            for c in contracts
        ],
        "notes": [_note_to_dict(n) for n in notes],
        "interactions": [_interaction_to_dict(i) for i in interactions],
    }


@router.post(
    "/clients/{client_id}/notes",
    status_code=status.HTTP_201_CREATED,
    summary="Добавить заметку к клиенту",
)
async def add_note(
    client_id: str,
    data: NoteCreate,
    admin=Depends(require_admin),
):
    """Добавляет заметку администратора к карточке клиента."""
    try:
        client = await User.get(PydanticObjectId(client_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден") from e

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден")

    note = ClientNote(
        client_id=client_id,
        text=data.text,
        created_by=str(admin.id),
        created_by_name=admin.name,
    )
    await note.insert()

    logger.info(
        "Заметка к клиенту добавлена",
        client_id=client_id,
        note_id=str(note.id),
        admin_id=str(admin.id),
    )

    return _note_to_dict(note)


@router.get(
    "/clients/{client_id}/interactions",
    summary="История взаимодействий с клиентом",
)
async def get_interactions(
    client_id: str,
    interaction_type: Optional[str] = Query(None, description="Фильтр по типу"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin=Depends(require_admin),
):
    """История взаимодействий с клиентом."""
    query_filter: dict = {"client_id": client_id}

    if interaction_type:
        valid_types = [t.value for t in InteractionType]
        if interaction_type not in valid_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Допустимые типы: {', '.join(valid_types)}",
            )
        query_filter["interaction_type"] = interaction_type

    await ClientInteraction.find(query_filter).count()
    interactions = (
        await ClientInteraction.find(query_filter)
        .sort("-ClientInteraction.created_at")
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    return [_interaction_to_dict(i) for i in interactions]


@router.post(
    "/clients/{client_id}/interactions",
    status_code=status.HTTP_201_CREATED,
    summary="Добавить запись о взаимодействии с клиентом",
)
async def add_interaction(
    client_id: str,
    data: InteractionCreate,
    admin=Depends(require_admin),
):
    """Добавляет запись о взаимодействии с клиентом."""
    try:
        client = await User.get(PydanticObjectId(client_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден") from e

    if not client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Клиент не найден")

    # Резолвим тип и заголовок
    resolved_type = data.get_interaction_type()
    resolved_title = data.get_title()

    valid_types = [t.value for t in InteractionType]
    if resolved_type not in valid_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Допустимые типы: {', '.join(valid_types)}",
        )

    interaction = ClientInteraction(
        client_id=client_id,
        interaction_type=InteractionType(resolved_type),
        title=resolved_title,
        description=data.description,
        outcome=data.outcome,
        related_order_id=data.related_order_id,
        related_order_number=data.related_order_number,
        created_by=str(admin.id),
        created_by_name=admin.name,
    )
    await interaction.insert()

    logger.info(
        "Взаимодействие с клиентом зафиксировано",
        client_id=client_id,
        interaction_type=resolved_type,
        title=resolved_title,
        admin_id=str(admin.id),
    )

    return _interaction_to_dict(interaction)
