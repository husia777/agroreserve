"""
Роутер аналитики клиента (личный кабинет).
Эндпоинты: /api/v1/account/analytics/

UC-57: Аналитика клиента в ЛК — статистика заказов, топ товаров, расходы по месяцам.
"""

import structlog
from fastapi import APIRouter, Depends, HTTPException, status

from app.utils.security import require_approved_client as require_client

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/account/analytics", tags=["ЛК: Аналитика клиента"])


@router.get(
    "/",
    summary="Аналитика клиента в ЛК (UC-57)",
)
async def get_client_analytics(
    current_user=Depends(require_client),
):
    """
    UC-57: Аналитика клиента в личном кабинете.

    Возвращает:
    - Количество заказов и общая сумма
    - Топ товары (по частоте и сумме покупок)
    - Расходы по месяцам (данные для графика)
    - Средний чек
    - Дата последнего заказа
    """
    client_id = str(current_user.id)

    try:
        from app.services.analytics_service import get_client_analytics

        data = await get_client_analytics(client_id)
    except Exception as e:
        logger.error(
            "Ошибка получения аналитики клиента",
            error=str(e),
            client_id=client_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при получении аналитики",
        )

    logger.info(
        "Аналитика клиента получена",
        client_id=client_id,
        total_orders=data.get("total_orders"),
    )

    return data
