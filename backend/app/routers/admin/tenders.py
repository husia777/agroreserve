"""
Роутер управления тендерами (администратор).
Эндпоинты: /api/v1/admin/tenders/

UC-13: Парсер ЕИС — поиск и управление тендерами
UC-42: Калькулятор тендерной ставки
"""

import math
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.models.tender import Tender
from app.services.tender_docs_service import generate_tender_documents_zip
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/tenders", tags=["Админ: Тендеры"])

# ── Pydantic схемы ─────────────────────────────────────────────────────────────


class TenderSearchRequest(BaseModel):
    """Запрос на поиск тендеров в ЕИС."""

    keywords: list[str] = Field(
        default=["овощи", "фрукты", "продукты"],
        description='Ключевые слова поиска (["овощи", "фрукты", "продукты"])',
    )
    region: str = Field(
        default="Тобольск",
        description='Регион ("Тобольск", "Тюменская")',
    )
    max_price: float = Field(
        default=600000.0,
        gt=0,
        description="Максимальная НМЦК (₽)",
    )


class TenderUpdate(BaseModel):
    """Обновление данных тендера."""

    status: Optional[str] = Field(
        None,
        description="Статус: new, analyzing, bid_submitted, won, lost, skipped",
    )
    notes: Optional[str] = Field(None, max_length=2000, description="Заметки по тендеру")
    our_price: Optional[float] = Field(None, gt=0, description="Наша цена в заявке (₽)")
    is_relevant: Optional[bool] = Field(None, description="Релевантен ли тендер")


class TenderBidCalculationRequest(BaseModel):
    """Запрос на расчёт тендерной ставки."""

    margin_percent: float = Field(
        default=25.0,
        ge=0.0,
        le=200.0,
        description="Желаемая наценка (%)",
    )
    logistics_fixed: float = Field(
        default=500.0,
        ge=0.0,
        description="Фиксированная стоимость логистики (₽)",
    )
    logistics_per_km: float = Field(
        default=10.0,
        ge=0.0,
        description="Стоимость логистики за км (₽)",
    )
    distance_km: float = Field(
        default=0.0,
        ge=0.0,
        description="Расстояние до заказчика (км)",
    )


# ── Утилиты ────────────────────────────────────────────────────────────────────


def _tender_to_dict(tender: Tender) -> dict:
    """Конвертирует Tender в словарь для ответа API."""
    from datetime import date

    today = date.today()
    deadline_date = tender.deadline.date() if tender.deadline else None
    days_to_deadline = (deadline_date - today).days if deadline_date and deadline_date >= today else None

    return {
        "id": str(tender.id),
        "eis_number": tender.eis_number,
        "title": tender.title,
        "customer": tender.customer,
        "region": tender.region,
        "max_price": tender.max_price,
        "our_price": tender.our_price,
        "margin_estimate": tender.margin_estimate,
        "items": [
            {
                "name": item.name,
                "qty": item.qty,
                "unit": item.unit,
                "max_price": item.max_price,
            }
            for item in tender.items
        ],
        "deadline": tender.deadline.isoformat() if tender.deadline else None,
        "days_to_deadline": days_to_deadline,
        "delivery_deadline": str(tender.delivery_deadline) if tender.delivery_deadline else None,
        "source_url": tender.source_url,
        "status": tender.status,
        "notes": tender.notes,
        "is_relevant": tender.is_relevant,
        "found_at": tender.found_at.isoformat(),
        "created_at": tender.created_at.isoformat(),
    }


# ── Эндпоинты ──────────────────────────────────────────────────────────────────


@router.get(
    "/",
    summary="Список тендеров (UC-13)",
)
async def get_tenders(
    tender_status: Optional[str] = Query(
        None,
        alias="status",
        description="Фильтр по статусу: new, analyzing, bid_submitted, won, lost, skipped",
    ),
    min_price: Optional[float] = Query(None, description="Минимальная НМЦК (₽)"),
    max_price: Optional[float] = Query(None, description="Максимальная НМЦК (₽)"),
    region: Optional[str] = Query(None, description="Регион"),
    is_relevant: Optional[bool] = Query(None, description="Только релевантные"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin=Depends(require_admin),
):
    """
    UC-13: Список найденных тендеров с фильтрами.

    Фильтры:
    - status: статус тендера
    - min_price/max_price: диапазон НМЦК
    - region: регион
    - is_relevant: только релевантные нашему ассортименту
    """
    query_filter: dict = {}

    if tender_status:
        valid_statuses = ["new", "analyzing", "bid_submitted", "won", "lost", "skipped"]
        if tender_status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Допустимые статусы: {', '.join(valid_statuses)}",
            )
        query_filter["status"] = tender_status

    if min_price is not None:
        query_filter.setdefault("max_price", {})["$gte"] = min_price

    if max_price is not None:
        query_filter.setdefault("max_price", {})["$lte"] = max_price

    if region:
        query_filter["region"] = {"$regex": region, "$options": "i"}

    if is_relevant is not None:
        query_filter["is_relevant"] = is_relevant

    total = await Tender.find(query_filter).count()
    tenders = await Tender.find(query_filter).sort(Tender.deadline).skip((page - 1) * limit).limit(limit).to_list()

    # Аналитика по текущей выборке
    from app.services.tender_service import get_tender_analytics

    analytics = await get_tender_analytics()

    return {
        "items": [_tender_to_dict(t) for t in tenders],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
        "analytics": analytics,
    }


@router.post(
    "/search",
    status_code=status.HTTP_201_CREATED,
    summary="Запустить поиск тендеров в ЕИС (UC-13)",
)
async def search_tenders(
    data: TenderSearchRequest,
    admin=Depends(require_admin),
):
    """
    UC-13: Запустить поиск новых тендеров в ЕИС.

    ВНИМАНИЕ: В текущей реализации — заглушка, генерирующая тестовые данные.
    В production здесь должен быть реальный парсинг zakupki.gov.ru.

    Параметры поиска:
    - keywords: ключевые слова (["овощи", "фрукты", "продукты"])
    - region: регион ("Тобольск", "Тюменская")
    - max_price: максимальная НМЦК (600000)

    Сохраняет найденные тендеры в БД (без дубликатов по номеру ЕИС).
    """
    from app.services.tender_service import search_eis_tenders

    try:
        found = await search_eis_tenders(
            keywords=data.keywords,
            region=data.region,
            max_price=data.max_price,
        )
    except Exception as e:
        logger.error("Ошибка поиска тендеров", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при поиске тендеров",
        ) from e

    logger.info(
        "Поиск тендеров завершён",
        keywords=data.keywords,
        region=data.region,
        found_count=len(found),
        admin_id=str(admin.id),
    )

    return {
        "found": found,
        "count": len(found),
        "search_params": {
            "keywords": data.keywords,
            "region": data.region,
            "max_price": data.max_price,
        },
        "note": "Данные сгенерированы (заглушка ЕИС). В production — реальный парсинг zakupki.gov.ru",
    }


@router.get(
    "/{tender_id}",
    summary="Детали тендера",
)
async def get_tender(
    tender_id: str,
    admin=Depends(require_admin),
):
    """Получить детальную информацию по тендеру."""
    try:
        tender = await Tender.get(PydanticObjectId(tender_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден") from e

    if not tender:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден")

    return _tender_to_dict(tender)


@router.patch(
    "/{tender_id}",
    summary="Обновить статус/заметки тендера",
)
async def update_tender(
    tender_id: str,
    data: TenderUpdate,
    admin=Depends(require_admin),
):
    """
    Обновить статус и/или заметки по тендеру.

    Допустимые статусы:
    - new: Новый, ещё не обработан
    - analyzing: Анализируется (идёт расчёт)
    - bid_submitted: Заявка подана
    - won: Выиграли
    - lost: Проиграли
    - skipped: Пропущен (не участвуем)
    """
    try:
        tender = await Tender.get(PydanticObjectId(tender_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден") from e

    if not tender:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден")

    if data.status is not None:
        valid_statuses = ["new", "analyzing", "bid_submitted", "won", "lost", "skipped"]
        if data.status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Допустимые статусы: {', '.join(valid_statuses)}",
            )
        tender.status = data.status

    if data.notes is not None:
        tender.notes = data.notes

    if data.our_price is not None:
        tender.our_price = data.our_price

    if data.is_relevant is not None:
        tender.is_relevant = data.is_relevant

    await tender.save()

    logger.info(
        "Тендер обновлён",
        tender_id=tender_id,
        new_status=data.status,
        admin_id=str(admin.id),
    )

    return _tender_to_dict(tender)


@router.delete(
    "/{tender_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Скрыть нерелевантный тендер",
)
async def hide_tender(
    tender_id: str,
    admin=Depends(require_admin),
):
    """
    Скрывает нерелевантный тендер (помечает как is_relevant=False и статус skipped).
    Тендер остаётся в БД для истории.
    """
    try:
        tender = await Tender.get(PydanticObjectId(tender_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден") from e

    if not tender:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Тендер не найден")

    tender.is_relevant = False
    tender.status = "skipped"
    await tender.save()

    logger.info(
        "Тендер скрыт",
        tender_id=tender_id,
        eis_number=tender.eis_number,
        admin_id=str(admin.id),
    )


@router.post(
    "/{tender_id}/calculate",
    summary="Расчёт нашей цены для тендера (UC-42)",
)
async def calculate_tender_bid(
    tender_id: str,
    data: TenderBidCalculationRequest,
    admin=Depends(require_admin),
):
    """
    UC-42: Калькулятор тендерной ставки.

    Рассчитывает нашу цену для участия в тендере:
    - Для каждой позиции: себестоимость (из cost_price товара), логистика (fixed + per_km), наценка (%)
    - Итого: наша цена по позициям, общая сумма, маржа %, маржа ₽
    - Сравнение с НМЦК (% снижения)

    Обновляет our_price в тендере.
    """
    from app.services.tender_service import calculate_tender_bid as calc_bid

    try:
        result = await calc_bid(
            tender_id=tender_id,
            margin_percent=data.margin_percent,
            logistics_fixed=data.logistics_fixed,
            logistics_per_km=data.logistics_per_km,
            distance_km=data.distance_km,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except Exception as e:
        logger.error(
            "Ошибка расчёта тендерной ставки",
            error=str(e),
            tender_id=tender_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при расчёте тендерной ставки",
        ) from e

    logger.info(
        "Тендерная ставка рассчитана",
        tender_id=tender_id,
        our_price=result["summary"]["total_our_price"],
        margin_pct=result["summary"]["total_margin_pct"],
        admin_id=str(admin.id),
    )

    return result


@router.get(
    "/{tender_id}/documents",
    summary="UC-227: Генерация комплекта документов для тендера",
)
async def generate_tender_docs(
    tender_id: str,
    admin=Depends(require_admin),
):
    """
    Генерирует ZIP-архив с комплектом документов для подачи заявки на тендер:
    - Коммерческое предложение
    - Декларация соответствия 44-ФЗ
    - Справка о ресурсах и опыте
    - Перечень сертификатов
    """
    try:
        buffer = await generate_tender_documents_zip(tender_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e)) from e

    return StreamingResponse(
        buffer,
        media_type="application/zip",
        headers={"Content-Disposition": f'attachment; filename="tender_{tender_id}_docs.zip"'},
    )
