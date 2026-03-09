"""
Роутер подписки на уведомление о поступлении товара (UC-01).
Эндпоинты: /api/v1/catalog/products/{product_id}/notify

- POST — подписаться (email обязателен; user_id привязывается если авторизован)
- DELETE — отписаться
- GET — проверить, подписан ли текущий email
"""
from typing import Optional

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, EmailStr

from app.models.product import Product
from app.models.stock_waitlist import StockWaitlist
from app.utils.security import get_current_user_optional

router = APIRouter(prefix="/api/v1/catalog/products", tags=["Каталог — уведомления"])
logger = structlog.get_logger(__name__)


# ── Схемы запроса/ответа ──────────────────────────────────────

class NotifySubscribeRequest(BaseModel):
    """Тело запроса подписки на уведомление."""
    email: EmailStr


class NotifyStatusResponse(BaseModel):
    """Ответ о статусе подписки."""
    subscribed: bool
    email: Optional[str] = None
    product_id: str


class NotifySubscribeResponse(BaseModel):
    """Ответ после подписки."""
    ok: bool
    message: str
    subscribed: bool


# ── Эндпоинты ─────────────────────────────────────────────────

@router.post(
    "/{product_id}/notify",
    response_model=NotifySubscribeResponse,
    summary="Подписаться на уведомление о поступлении товара",
    status_code=status.HTTP_200_OK,
)
async def subscribe_stock_notify(
    product_id: str,
    body: NotifySubscribeRequest,
    current_user=Depends(get_current_user_optional),
):
    """
    UC-01: Клиент подписывается на уведомление о поступлении товара.
    Если уже подписан — возвращаем OK без дублирования.
    """
    # Проверяем что товар существует
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Товар не найден",
        )

    # Проверяем: товар уже в наличии — подписка не нужна
    if product.is_active and product.stock_qty > 0:
        return NotifySubscribeResponse(
            ok=True,
            message="Товар уже в наличии — подписка не требуется",
            subscribed=False,
        )

    # Проверяем существующую подписку
    existing = await StockWaitlist.find_one(
        StockWaitlist.product_id == product_id,
        StockWaitlist.email == body.email,
        StockWaitlist.is_notified == False,  # noqa: E712
    )

    if existing:
        logger.info(
            "Повторная подписка на поступление (уже есть)",
            product_id=product_id,
            email=body.email,
        )
        return NotifySubscribeResponse(
            ok=True,
            message="Вы уже подписаны на уведомление о поступлении этого товара",
            subscribed=True,
        )

    # Создаём подписку
    waitlist = StockWaitlist(
        product_id=product_id,
        product_name=product.name,
        email=body.email,
        user_id=str(current_user.id) if current_user else None,
        user_name=current_user.name if current_user else None,
    )
    await waitlist.insert()

    logger.info(
        "Новая подписка на поступление товара",
        product_id=product_id,
        product_name=product.name,
        email=body.email,
        user_id=str(current_user.id) if current_user else None,
    )

    return NotifySubscribeResponse(
        ok=True,
        message="Мы уведомим вас по email, когда товар поступит в наличие",
        subscribed=True,
    )


@router.get(
    "/{product_id}/notify",
    response_model=NotifyStatusResponse,
    summary="Проверить подписку на уведомление о поступлении",
)
async def check_stock_notify(
    product_id: str,
    email: str = Query(..., description="Email для проверки подписки"),
):
    """
    Проверяет, подписан ли email на уведомление о поступлении товара.
    """
    existing = await StockWaitlist.find_one(
        StockWaitlist.product_id == product_id,
        StockWaitlist.email == email,
        StockWaitlist.is_notified == False,  # noqa: E712
    )

    return NotifyStatusResponse(
        subscribed=existing is not None,
        email=email if existing else None,
        product_id=product_id,
    )


@router.delete(
    "/{product_id}/notify",
    summary="Отписаться от уведомления о поступлении",
)
async def unsubscribe_stock_notify(
    product_id: str,
    email: str = Query(..., description="Email для отписки"),
):
    """
    Удаляет подписку на уведомление о поступлении товара.
    """
    existing = await StockWaitlist.find_one(
        StockWaitlist.product_id == product_id,
        StockWaitlist.email == email,
        StockWaitlist.is_notified == False,  # noqa: E712
    )

    if not existing:
        return {"ok": True, "message": "Подписка не найдена"}

    await existing.delete()

    logger.info(
        "Отписка от уведомления о поступлении",
        product_id=product_id,
        email=email,
    )

    return {"ok": True, "message": "Вы отписались от уведомления"}
