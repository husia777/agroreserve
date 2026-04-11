"""
Роутер управления документами (администратор).
Эндпоинты: /api/v1/admin/documents/
"""

import math
from datetime import UTC
from datetime import date as DateType
from pathlib import Path
from typing import Optional
from urllib.parse import quote

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel

from app.models.document import DocumentRecord
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/documents", tags=["Админ: Документы"])

DOCUMENTS_DIR = "/app/media/documents"


# ── Pydantic схемы ─────────────────────────────────────────────────────────────


class ReconciliationActRequest(BaseModel):
    """Запрос на генерацию акта сверки."""

    client_id: str
    date_from: DateType
    date_to: DateType


class ContractRequest(BaseModel):
    """Запрос на генерацию договора."""

    contract_type: str  # supply, supply_44fz, agency
    client_id: str


# ── Эндпоинты ──────────────────────────────────────────────────────────────────


@router.post(
    "/generate/{order_id}",
    status_code=status.HTTP_201_CREATED,
    summary="Сгенерировать документы по заказу",
)
async def generate_documents(
    order_id: str,
    doc_types: Optional[list[str]] = Query(
        None,
        description="Типы документов: invoice, torg12, label. По умолчанию — invoice и torg12",
    ),
    admin=Depends(require_admin),
):
    """
    Генерирует документы по заказу.

    По умолчанию генерирует:
    - Счёт на оплату (invoice)
    - Товарная накладная ТОРГ-12 (torg12)

    Можно передать список типов: ?doc_types=invoice&doc_types=torg12&doc_types=label
    """
    from app.models.order import Order

    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заказ не найден")

    types_to_generate = doc_types or ["invoice", "torg12"]

    generated = []

    from app.models.order import OrderDocument
    from app.services.document_service import generate_invoice, generate_labels, generate_torg12

    if "invoice" in types_to_generate:
        try:
            doc = await generate_invoice(order)
            if doc:
                generated.append(
                    {
                        "type": "invoice",
                        "id": str(doc.id),
                        "number": doc.number,
                        "download_url": f"/admin/documents/{doc.id}/download",
                    }
                )
                existing_types = {d.doc_type for d in order.documents}
                if "invoice" not in existing_types:
                    order.documents.append(
                        OrderDocument(
                            doc_type="invoice",
                            url=doc.file_url or f"/documents/{doc.id}/download",
                            doc_id=str(doc.id),
                        )
                    )
        except Exception as e:
            logger.error("Ошибка генерации счёта", error=str(e), order_id=order_id)
            generated.append({"type": "invoice", "error": str(e)})

    if "torg12" in types_to_generate:
        try:
            doc = await generate_torg12(order)
            if doc:
                generated.append(
                    {
                        "type": "torg12",
                        "id": str(doc.id),
                        "number": doc.number,
                        "download_url": f"/admin/documents/{doc.id}/download",
                    }
                )
                existing_types = {d.doc_type for d in order.documents}
                if "torg12" not in existing_types:
                    order.documents.append(
                        OrderDocument(
                            doc_type="torg12",
                            url=doc.file_url or f"/documents/{doc.id}/download",
                            doc_id=str(doc.id),
                        )
                    )
        except Exception as e:
            logger.error("Ошибка генерации ТОРГ-12", error=str(e), order_id=order_id)
            generated.append({"type": "torg12", "error": str(e)})

    if "label" in types_to_generate:
        try:
            from app.models.product import Product

            # Собираем уникальные товары из заказа
            products_data = []
            for item in order.items:
                try:
                    product = await Product.get(PydanticObjectId(item.product_id))
                    if product:
                        products_data.append(
                            {
                                "name": product.name,
                                "origin_country": product.origin_country,
                                "storage_conditions": product.storage_conditions,
                                "shelf_life_days": product.shelf_life_days,
                                "declaration_number": "",
                            }
                        )
                except Exception:
                    products_data.append({"name": item.product_name, "origin_country": "Россия"})

            doc = await generate_labels(products_data, order_id)
            if doc:
                generated.append(
                    {
                        "type": "label",
                        "id": str(doc.id),
                        "number": doc.number,
                        "download_url": f"/admin/documents/{doc.id}/download",
                    }
                )
        except Exception as e:
            logger.error("Ошибка генерации ярлыков", error=str(e), order_id=order_id)
            generated.append({"type": "label", "error": str(e)})

    # Сохраняем обновлённые документы в заказе
    from datetime import datetime

    order.updated_at = datetime.now(UTC)
    await order.save()

    logger.info(
        "Документы сгенерированы",
        order_id=order_id,
        order_number=order.order_number,
        generated_count=len(generated),
        admin_id=str(admin.id),
    )

    return {
        "order_id": order_id,
        "order_number": order.order_number,
        "generated": generated,
    }


@router.post(
    "/reconciliation-act",
    summary="Генерация акта сверки (UC-43)",
    response_class=Response,
)
async def generate_reconciliation_act(
    data: ReconciliationActRequest,
    admin=Depends(require_admin),
):
    """
    UC-43: Генерация акта сверки взаиморасчётов с клиентом.

    Собирает:
    - Все заказы клиента за период
    - Все оплаты клиента за период
    - Расчёт: начальное сальдо, обороты (дебет/кредит), конечное сальдо
    - Реквизиты обеих сторон (из User и SystemSettings)

    Возвращает PDF файл.
    """
    if data.date_from > data.date_to:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Дата начала периода должна быть меньше или равна дате окончания",
        )

    try:
        from app.services.document_service import generate_reconciliation_act as gen_act

        pdf_bytes = await gen_act(
            client_id=data.client_id,
            date_from=data.date_from,
            date_to=data.date_to,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except Exception as e:
        logger.error(
            "Ошибка генерации акта сверки",
            error=str(e),
            client_id=data.client_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при генерации акта сверки",
        ) from e

    logger.info(
        "Акт сверки запрошен",
        client_id=data.client_id,
        date_from=str(data.date_from),
        date_to=str(data.date_to),
        admin_id=str(admin.id),
    )

    # Определяем Content-Type по расширению
    is_pdf = not isinstance(pdf_bytes, bytes) or pdf_bytes[:4] == b"%PDF"
    content_type = "application/pdf" if is_pdf else "text/html; charset=utf-8"
    filename = f"reconciliation_{data.client_id}_{data.date_from}_{data.date_to}.pdf"

    return Response(
        content=pdf_bytes,
        media_type=content_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.post(
    "/contract",
    summary="Генерация договора (UC-55)",
    response_class=Response,
)
async def generate_contract(
    data: ContractRequest,
    admin=Depends(require_admin),
):
    """
    UC-55: Генератор договоров.

    Типы договоров:
    - supply: Договор поставки
    - supply_44fz: Госконтракт 44-ФЗ (прямая закупка до 600 000 ₽)
    - agency: Агентский договор

    Автозаполняет реквизиты клиента из профиля пользователя и SystemSettings (наши реквизиты).
    Нумерация: ДП/ГК/ДА-YYYY-NNNNN
    Возвращает PDF файл.
    """
    valid_types = ["supply", "supply_44fz", "agency"]
    if data.contract_type not in valid_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Допустимые типы договоров: {', '.join(valid_types)}",
        )

    try:
        from app.services.document_service import generate_contract_pdf

        pdf_bytes = await generate_contract_pdf(
            contract_type=data.contract_type,
            client_id=data.client_id,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except Exception as e:
        logger.error(
            "Ошибка генерации договора",
            error=str(e),
            contract_type=data.contract_type,
            client_id=data.client_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка при генерации договора",
        ) from e

    logger.info(
        "Договор сгенерирован и отдан",
        contract_type=data.contract_type,
        client_id=data.client_id,
        admin_id=str(admin.id),
    )

    content_type = "application/pdf"
    filename = f"contract_{data.contract_type}_{data.client_id}.pdf"

    return Response(
        content=pdf_bytes,
        media_type=content_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get(
    "/",
    summary="Список всех документов",
)
async def get_all_documents(
    doc_type: Optional[str] = Query(None, description="Фильтр по типу"),
    order_id: Optional[str] = Query(None, description="Фильтр по заказу"),
    client_id: Optional[str] = Query(None, description="Фильтр по клиенту"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=200),
    admin=Depends(require_admin),
):
    """Список всех документов системы."""
    query_filter: dict = {}

    if doc_type:
        query_filter["doc_type"] = doc_type
    if order_id:
        query_filter["order_id"] = order_id
    if client_id:
        query_filter["client_id"] = client_id

    total = await DocumentRecord.find(query_filter).count()
    documents = (
        await DocumentRecord.find(query_filter)
        .sort(-DocumentRecord.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    return {
        "items": [
            {
                "id": str(d.id),
                "doc_type": d.doc_type.value if hasattr(d.doc_type, "value") else d.doc_type,
                "number": d.number,
                "order_id": d.order_id,
                "client_id": d.client_id,
                "client_name": d.client_name,
                "file_name": d.file_name,
                "file_size_bytes": d.file_size_bytes,
                "download_url": f"/admin/documents/{d.id}/download",
                "created_at": d.created_at.isoformat(),
            }
            for d in documents
        ],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.get(
    "/{document_id}/download",
    summary="Скачать документ",
)
async def download_document(
    document_id: str,
    admin=Depends(require_admin),
):
    """Скачивает документ по ID (для администратора)."""
    try:
        doc = await DocumentRecord.get(PydanticObjectId(document_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден") from e

    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден")

    if not doc.file_name:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Файл документа не найден",
        )

    filepath = Path(DOCUMENTS_DIR) / doc.file_name

    if not filepath.exists():
        # Пробуем HTML версию
        html_path = filepath.replace(".pdf", ".html")
        if Path(html_path).exists():
            filepath = html_path
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Файл документа не найден на сервере",
            )

    media_type = "application/pdf" if filepath.endswith(".pdf") else "text/html"

    safe_name = quote(doc.file_name)
    return FileResponse(
        path=filepath,
        filename=doc.file_name,
        media_type=media_type,
        headers={"Content-Disposition": f"attachment; filename*=UTF-8''{safe_name}"},
    )


@router.get(
    "/files/{filename}",
    summary="Скачать файл по имени",
    include_in_schema=False,
)
async def download_document_file(filename: str):
    """Отдача файла документа по имени."""
    filepath = Path(DOCUMENTS_DIR) / filename
    if not filepath.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Файл не найден")

    if filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith(".html"):
        media_type = "text/html"
    else:
        media_type = "application/octet-stream"

    return FileResponse(path=filepath, filename=filename, media_type=media_type)
