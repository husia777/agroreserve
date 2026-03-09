"""
Роутер синхронизации с 1С:Предприятие 8.3.
Эндпоинты: /api/v1/sync/1c/

Аутентификация: API-ключ в заголовке X-API-Key.
"""
from typing import List, Optional

import structlog
from fastapi import APIRouter, Depends, Header, HTTPException, status
from pydantic import BaseModel, Field

from app.config import settings

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/sync/1c", tags=["Синхронизация 1С"])


# ── Схемы данных ─────────────────────────────────────────────

class StockUpdateItem(BaseModel):
    """Остаток товара из 1С."""
    product_id: str = Field(..., description="ID товара в системе")
    qty: float = Field(..., ge=0, description="Текущий остаток")


class PaymentUpdateItem(BaseModel):
    """Оплата из 1С."""
    order_id: str = Field(..., description="ID заказа в системе")
    amount: float = Field(..., gt=0, description="Сумма оплаты (₽)")
    date: Optional[str] = Field(None, description="Дата оплаты (ISO)")


class StockUpdateRequest(BaseModel):
    """Запрос на обновление остатков из 1С."""
    items: List[StockUpdateItem] = Field(..., min_length=1, description="Список остатков")


class PaymentUpdateRequest(BaseModel):
    """Запрос на обновление оплат из 1С."""
    payments: List[PaymentUpdateItem] = Field(..., min_length=1, description="Список оплат")


class SyncConfirmRequest(BaseModel):
    """Подтверждение синхронизации заказа."""
    sync_1c_id: Optional[str] = Field(None, description="ID документа в 1С")


# ── Зависимость: проверка API-ключа ──────────────────────────

async def verify_sync_api_key(
    x_api_key: Optional[str] = Header(None, description="API-ключ для синхронизации с 1С"),
):
    """
    Проверяет API-ключ для синхронизации с 1С.
    Ключ должен совпадать с SYNC_1C_API_KEY в настройках.
    """
    expected_key = getattr(settings, "SYNC_1C_API_KEY", "")

    if not expected_key:
        # Если ключ не настроен — разрешаем доступ только в DEBUG режиме
        if not settings.DEBUG:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Синхронизация с 1С не настроена",
            )
        return  # В DEBUG без ключа

    if not x_api_key or x_api_key != expected_key:
        logger.warning(
            "Неверный API-ключ для синхронизации 1С",
            provided_key=x_api_key[:10] if x_api_key else "не передан",
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный API-ключ",
        )


# ── Эндпоинты ─────────────────────────────────────────────────

@router.post(
    "/stock",
    summary="Обновление остатков из 1С",
)
async def sync_stock(
    data: StockUpdateRequest,
    _=Depends(verify_sync_api_key),
):
    """
    Принимает актуальные остатки товаров из 1С.
    Перезаписывает stock_qty для каждого товара.

    Формат: {"items": [{"product_id": "...", "qty": 340.5}]}
    """
    from app.services.sync_1c_service import sync_stock_from_1c

    items_data = [{"product_id": item.product_id, "qty": item.qty} for item in data.items]
    result = await sync_stock_from_1c(items_data)

    logger.info(
        "Остатки синхронизированы из 1С",
        updated=result["updated"],
        errors=len(result["errors"]),
    )

    return {
        "status": "ok",
        "updated": result["updated"],
        "errors": result["errors"],
    }


@router.post(
    "/payments",
    summary="Обновление оплат из 1С",
)
async def sync_payments(
    data: PaymentUpdateRequest,
    _=Depends(verify_sync_api_key),
):
    """
    Принимает оплаты из 1С и обновляет статусы заказов.

    При оплате:
    1. Обновляет paid_amount заказа
    2. Меняет payment_status на paid/partial
    3. Уменьшает current_debt клиента
    4. Отправляет уведомление клиенту

    Формат: {"payments": [{"order_id": "...", "amount": 5000.0, "date": "2026-03-07"}]}
    """
    from app.services.sync_1c_service import sync_payments_from_1c

    payments_data = [
        {"order_id": p.order_id, "amount": p.amount, "date": p.date}
        for p in data.payments
    ]
    result = await sync_payments_from_1c(payments_data)

    logger.info(
        "Оплаты синхронизированы из 1С",
        processed=result["processed"],
        errors=len(result["errors"]),
    )

    return {
        "status": "ok",
        "processed": result["processed"],
        "errors": result["errors"],
    }


@router.get(
    "/orders/new",
    summary="Новые заказы для передачи в 1С",
)
async def get_new_orders_for_1c(
    _=Depends(verify_sync_api_key),
):
    """
    Возвращает заказы со статусом new/confirmed, ещё не синхронизированные с 1С.
    1С забирает эти заказы и создаёт Реализацию товаров.
    """
    from app.services.sync_1c_service import get_orders_for_1c

    orders = await get_orders_for_1c()

    logger.info("1С запросил новые заказы", count=len(orders))

    return {
        "status": "ok",
        "count": len(orders),
        "orders": orders,
    }


@router.post(
    "/orders/{order_id}/synced",
    summary="Подтверждение синхронизации заказа",
)
async def confirm_order_synced(
    order_id: str,
    data: SyncConfirmRequest,
    _=Depends(verify_sync_api_key),
):
    """
    1С подтверждает, что заказ принят и создан документ.
    Отмечает заказ как synced_to_1c = True.
    """
    from app.services.sync_1c_service import mark_order_synced

    success = await mark_order_synced(order_id, data.sync_1c_id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Заказ {order_id} не найден",
        )

    logger.info(
        "Заказ подтверждён как синхронизированный",
        order_id=order_id,
        sync_1c_id=data.sync_1c_id,
    )

    return {
        "status": "ok",
        "order_id": order_id,
        "synced": True,
    }
