"""
Роутер календаря событий (администратор).
Эндпоинты: /api/v1/admin/calendar/

UC-50: Единый календарь — агрегирует все события из разных источников.
"""
from datetime import date as DateType
from typing import Optional

import structlog
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/calendar", tags=["Админ: Календарь"])


@router.get(
    "/events",
    summary="Все события на месяц (UC-50)",
)
async def get_calendar_events(
    month: Optional[str] = Query(
        None,
        description="Месяц в формате YYYY-MM (например, 2026-03). По умолчанию — текущий месяц.",
    ),
    event_types: Optional[str] = Query(
        None,
        description="Фильтр по типам через запятую: delivery,tender_deadline,payment,reminder,certificate_expiry,contract_delivery",
    ),
    admin=Depends(require_admin),
):
    """
    UC-50: Все события на указанный месяц.

    Агрегирует события из:
    - Доставки (из заказов) — зелёный
    - Дедлайны тендеров — красный
    - Ожидаемые оплаты — синий
    - Напоминания — жёлтый
    - Истечение сертификатов — оранжевый
    - Поставки по контрактам — фиолетовый

    Формат ответа: [{date, type, title, description, color, link}]
    """
    today = DateType.today()

    # Парсим параметр month
    if month:
        try:
            parts = month.split("-")
            if len(parts) != 2:
                raise ValueError("Неверный формат")
            year = int(parts[0])
            month_num = int(parts[1])
            if not (1 <= month_num <= 12) or not (2000 <= year <= 2100):
                raise ValueError("Неверные значения")
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Неверный формат параметра month. Используйте YYYY-MM (например, 2026-03)",
            )
    else:
        year = today.year
        month_num = today.month

    from app.services.calendar_service import get_events
    all_events = await get_events(year, month_num)

    # Фильтрация по типам событий
    if event_types:
        requested_types = [t.strip() for t in event_types.split(",")]
        all_events = [e for e in all_events if e["type"] in requested_types]

    # Группировка по датам для удобства
    by_date: dict = {}
    for event in all_events:
        event_date = event["date"]
        if event_date not in by_date:
            by_date[event_date] = []
        by_date[event_date].append(event)

    # Статистика по типам
    type_counts: dict = {}
    for event in all_events:
        t = event["type"]
        type_counts[t] = type_counts.get(t, 0) + 1

    logger.info(
        "Календарь событий запрошен",
        year=year,
        month=month_num,
        events_count=len(all_events),
        admin_id=str(admin.id),
    )

    return {
        "year": year,
        "month": month_num,
        "month_label": f"{year}-{month_num:02d}",
        "events": all_events,
        "events_by_date": by_date,
        "total_events": len(all_events),
        "type_counts": type_counts,
    }
