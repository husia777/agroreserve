"""
Роутер документов для клиентов (личный кабинет).
Эндпоинты: /api/v1/documents/
"""

import math
from datetime import UTC, date
from pathlib import Path
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import FileResponse

from app.models.document import DocumentRecord
from app.utils.security import get_current_user

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/documents", tags=["Документы"])

DOCUMENTS_DIR = "/app/media/documents"


@router.get(
    "/",
    summary="Мои документы",
)
async def get_my_documents(
    doc_type: Optional[str] = Query(None, description="Фильтр по типу: invoice, torg12, label"),
    date_from: Optional[date] = Query(None, description="С даты (YYYY-MM-DD)"),
    date_to: Optional[date] = Query(None, description="По дату (YYYY-MM-DD)"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user=Depends(get_current_user),
):
    """
    Список всех документов текущего пользователя.
    Фильтры: тип документа, период.
    Сортировка: по дате создания (новые первые).
    """
    user_id = str(current_user.id)

    # Строим фильтр
    query_filter: dict = {"client_id": user_id}

    if doc_type:
        query_filter["doc_type"] = doc_type

    if date_from:
        from datetime import datetime

        dt_from = datetime(date_from.year, date_from.month, date_from.day, tzinfo=UTC)
        query_filter.setdefault("created_at", {})["$gte"] = dt_from

    if date_to:
        from datetime import datetime

        dt_to = datetime(date_to.year, date_to.month, date_to.day, 23, 59, 59, tzinfo=UTC)
        query_filter.setdefault("created_at", {})["$lte"] = dt_to

    total = await DocumentRecord.find(query_filter).count()
    documents = (
        await DocumentRecord.find(query_filter)
        .sort(-DocumentRecord.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    items = [
        {
            "id": str(doc.id),
            "doc_type": doc.doc_type.value if hasattr(doc.doc_type, "value") else doc.doc_type,
            "number": doc.number,
            "order_id": doc.order_id,
            "file_name": doc.file_name,
            "file_size_bytes": doc.file_size_bytes,
            "download_url": f"/api/v1/documents/{doc.id}/download",
            "created_at": doc.created_at.isoformat(),
        }
        for doc in documents
    ]

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.get(
    "/files/{filename}",
    summary="Скачать файл по имени (внутренний эндпоинт)",
    include_in_schema=False,
)
async def download_file_by_name(filename: str):
    """Внутренний эндпоинт для отдачи PDF файлов."""
    filepath = Path(DOCUMENTS_DIR) / filename
    if not filepath.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Файл не найден")

    # Определяем content-type
    if filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith(".html"):
        media_type = "text/html"
    else:
        media_type = "application/octet-stream"

    return FileResponse(
        path=filepath,
        filename=filename,
        media_type=media_type,
    )


@router.get(
    "/{document_id}/download",
    summary="Скачать документ",
)
async def download_document(
    document_id: str,
    current_user=Depends(get_current_user),
):
    """
    Скачивает PDF документ по ID.
    Клиент может скачивать только свои документы.
    """
    try:
        doc = await DocumentRecord.get(PydanticObjectId(document_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден") from e

    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Документ не найден")

    # Проверяем принадлежность (не для администратора)
    if current_user.role != "admin" and doc.client_id != str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ к документу запрещён",
        )

    # Ищем файл на диске
    if not doc.file_name:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Файл документа не найден",
        )

    filepath = Path(DOCUMENTS_DIR) / doc.file_name

    # Пробуем HTML если PDF нет
    if not filepath.exists():
        html_path = filepath.replace(".pdf", ".html")
        if Path(html_path).exists():
            filepath = html_path
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Файл документа не найден на сервере",
            )

    media_type = "application/pdf" if filepath.endswith(".pdf") else "text/html"

    logger.info(
        "Документ скачан",
        document_id=document_id,
        user_id=str(current_user.id),
        filename=doc.file_name,
    )

    return FileResponse(
        path=filepath,
        filename=doc.file_name,
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{doc.file_name}"'},
    )


@router.post(
    "/download-zip",
    summary="Скачать документы за период (ZIP)",
)
async def download_documents_zip(
    data: dict,
    current_user=Depends(get_current_user),
):
    """Скачивает архив документов за указанный период."""
    import io
    import zipfile

    from fastapi.responses import StreamingResponse

    date_from = data.get("date_from")
    date_to = data.get("date_to")
    doc_types = data.get("doc_types")

    user_id = str(current_user.id)
    query_filter: dict = {"client_id": user_id}

    if date_from:
        from datetime import datetime as dt

        d = dt.fromisoformat(date_from)
        query_filter.setdefault("created_at", {})["$gte"] = d

    if date_to:
        from datetime import datetime as dt

        d = dt.fromisoformat(date_to).replace(hour=23, minute=59, second=59)
        query_filter.setdefault("created_at", {})["$lte"] = d

    if doc_types:
        query_filter["doc_type"] = {"$in": doc_types}

    documents = await DocumentRecord.find(query_filter).to_list()

    if not documents:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Документы за указанный период не найдены",
        )

    # Собираем ZIP
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for doc in documents:
            if not doc.file_name:
                continue
            filepath = Path(DOCUMENTS_DIR) / doc.file_name
            if filepath.exists():
                zf.write(filepath, doc.file_name)

    zip_buffer.seek(0)

    logger.info("ZIP архив документов сформирован", user_id=user_id, count=len(documents))

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": 'attachment; filename="documents.zip"'},
    )
