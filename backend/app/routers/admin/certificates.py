"""
Роутер управления сертификатами (администратор).
Эндпоинты: /api/v1/admin/certificates/
"""

import math
import shutil
import uuid
from datetime import UTC, datetime, timedelta
from datetime import date as DateType
from pathlib import Path
from typing import Optional, cast

import structlog
from beanie import Link, PydanticObjectId
from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from pydantic import BaseModel, Field

from app.models.certificate import Certificate, CertificateStatus, CertificateType
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/certificates", tags=["Админ: Сертификаты"])

# Директория для хранения сертификатов
CERTIFICATES_DIR = "/app/media/certificates"

# Допустимые типы файлов
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
}

# Количество дней до истечения для предупреждения
EXPIRY_WARNING_DAYS = 30

# Маппинг значений cert_type: фронтенд → бэкенд
CERT_TYPE_MAP: dict[str, str] = {
    "declaration": "declaration_tr_ts",
    "certificate": "certificate",
    "vet_cert": "vet_certificate",
    "quality_cert": "quality_certificate",
    "other": "other",
    # Бэкенд-значения тоже принимаем
    "declaration_tr_ts": "declaration_tr_ts",
    "vet_certificate": "vet_certificate",
    "quality_certificate": "quality_certificate",
}

# Обратный маппинг: бэкенд → фронтенд
CERT_TYPE_REVERSE: dict[str, str] = {
    "declaration_tr_ts": "declaration",
    "certificate": "certificate",
    "vet_certificate": "vet_cert",
    "quality_certificate": "quality_cert",
    "other": "other",
}

# Маппинг статусов: бэкенд → фронтенд
STATUS_MAP: dict[str, str] = {
    "active": "valid",
    "expiring_soon": "expiring_soon",
    "expired": "expired",
}


class CertificateUpdate(BaseModel):
    """Обновление метаданных сертификата (поля фронтенда)."""

    cert_number: Optional[str] = Field(None, description="Номер сертификата")
    cert_type: Optional[str] = Field(None, description="Тип сертификата")
    issuing_authority: Optional[str] = Field(None, max_length=300)
    issued_at: Optional[str] = Field(None, description="Дата выдачи (YYYY-MM-DD)")
    expires_at: Optional[str] = Field(None, description="Дата истечения (YYYY-MM-DD)")
    product_ids: Optional[list[str]] = Field(None, description="ID товаров")
    notes: Optional[str] = Field(None, max_length=1000)


def _cert_to_dict(cert: Certificate) -> dict:
    """Конвертирует Certificate в словарь с именами полей фронтенда."""
    # Пересчитываем статус динамически
    today = DateType.today()
    if cert.expiry_date < today:
        current_status = "expired"
    elif (cert.expiry_date - today).days <= EXPIRY_WARNING_DAYS:
        current_status = "expiring_soon"
    else:
        current_status = "valid"  # Фронтенд ожидает "valid", не "active"

    days_until_expiry = (cert.expiry_date - today).days

    # Маппим cert_type бэкенда → фронтенда
    raw_type = cert.cert_type.value if hasattr(cert.cert_type, "value") else cert.cert_type
    frontend_type = CERT_TYPE_REVERSE.get(raw_type, raw_type)

    return {
        "id": str(cert.id),
        "cert_number": cert.number,  # Фронтенд: cert_number
        "cert_type": frontend_type,  # Фронтенд: declaration/vet_cert/...
        "issuing_authority": cert.issuing_authority or "",
        "issued_at": str(cert.issued_date),  # Фронтенд: issued_at
        "expires_at": str(cert.expiry_date),  # Фронтенд: expires_at
        "days_until_expiry": days_until_expiry,
        "product_ids": cert.product_ids,
        "file_url": cert.file_url,
        "file_name": cert.file_name,
        "status": current_status,  # Фронтенд: valid/expiring_soon/expired
        "is_active": current_status != "expired",
        "notes": cert.notes,
        "created_at": cert.created_at.isoformat(),
        "updated_at": cert.updated_at.isoformat() if hasattr(cert, "updated_at") else cert.created_at.isoformat(),
    }


def _resolve_cert_type(raw_value: str) -> CertificateType:
    """Маппит значение cert_type из фронтенда в CertificateType."""
    mapped = CERT_TYPE_MAP.get(raw_value)
    if not mapped:
        valid = list(CERT_TYPE_MAP.keys())
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Допустимые типы: {', '.join(valid)}",
        )
    return CertificateType(mapped)


@router.get(
    "/expiring",
    summary="Сертификаты, истекающие в ближайшие 30 дней (UC-26)",
)
async def get_expiring_certificates(
    days: int = Query(30, ge=1, le=365, description="Количество дней до истечения"),
    admin=Depends(require_admin),
):
    """
    UC-26: Список сертификатов, истекающих в ближайшие N дней.

    Возвращает сертификаты со статусом expiring_soon и expired,
    отсортированные по дате истечения.
    """
    today = DateType.today()
    threshold = today + timedelta(days=days)

    # Находим сертификаты с датой истечения <= threshold (включая уже просроченные)
    certs = (
        await Certificate.find(
            Certificate.expiry_date <= threshold,
        )
        .sort("-Certificate.expiry_date")
        .to_list()
    )

    expiring = []
    expired = []

    for cert in certs:
        cert_dict = _cert_to_dict(cert)
        if cert.expiry_date < today:
            expired.append(cert_dict)
        else:
            expiring.append(cert_dict)

    logger.info(
        "Запрос истекающих сертификатов",
        days=days,
        expiring_count=len(expiring),
        expired_count=len(expired),
        admin_id=str(admin.id),
    )

    return {
        "expiring_soon": expiring,
        "expired": expired,
        "expiring_count": len(expiring),
        "expired_count": len(expired),
        "threshold_date": str(threshold),
    }


@router.get(
    "/",
    summary="Список сертификатов",
)
async def get_certificates(
    cert_status: Optional[str] = Query(None, alias="status", description="Фильтр: valid, expiring_soon, expired"),
    cert_type: Optional[str] = Query(None, description="Фильтр по типу"),
    product_id: Optional[str] = Query(None, description="Фильтр по ID товара"),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=200),
    per_page: Optional[int] = Query(None, ge=1, le=200, description="Алиас для limit"),
    admin=Depends(require_admin),
):
    """Список всех сертификатов с фильтрами."""
    # per_page — алиас фронтенда для limit
    if per_page is not None:
        limit = per_page

    query_filter: dict = {}

    # Фронтенд может передать "valid" → маппим в "active" для БД
    if cert_status:
        db_status = cert_status
        if cert_status == "valid":
            db_status = "active"
        query_filter["status"] = db_status

    # Фронтенд передаёт cert_type в своих значениях → маппим в бэкенд-значения
    if cert_type:
        mapped = CERT_TYPE_MAP.get(cert_type, cert_type)
        query_filter["cert_type"] = mapped

    if product_id:
        query_filter["product_ids"] = {"$in": [product_id]}

    total = await Certificate.find(query_filter).count()
    certs = (
        await Certificate.find(query_filter)
        .sort("-Certificate.expiry_date")
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )

    return {
        "items": [_cert_to_dict(c) for c in certs],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit) if total > 0 else 1,
    }


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Загрузить сертификат",
)
async def upload_certificate(
    cert_number: str = Form(..., description="Номер сертификата"),
    cert_type: str = Form(..., description="Тип: declaration, certificate, vet_cert, quality_cert, other"),
    issued_at: str = Form(..., description="Дата выдачи (YYYY-MM-DD)"),
    expires_at: str = Form(..., description="Срок действия (YYYY-MM-DD)"),
    issuing_authority: Optional[str] = Form(None, description="Орган, выдавший документ"),
    product_ids: Optional[str] = Form(None, description="ID товаров через запятую"),
    notes: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None, description="Скан сертификата (PDF/JPG/PNG)"),
    admin=Depends(require_admin),
):
    """
    Загружает сертификат с файлом (multipart form-data).
    Принимает поля с именами фронтенда: cert_number, issued_at, expires_at.
    """
    # Маппим cert_type из фронтенда в бэкенд
    cert_type_enum = _resolve_cert_type(cert_type)

    # Парсим даты
    try:
        issued_date = DateType.fromisoformat(issued_at)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный формат даты выдачи (ожидается YYYY-MM-DD)",
        ) from e
    try:
        expiry_date = DateType.fromisoformat(expires_at)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный формат даты истечения (ожидается YYYY-MM-DD)",
        ) from e

    # Проверяем уникальность номера
    existing = await Certificate.find_one(Certificate.number == cert_number)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Сертификат с номером {cert_number} уже существует",
        )

    # Обрабатываем список товаров
    product_id_list: list[str] = []
    if product_ids:
        product_id_list = [pid.strip() for pid in product_ids.split(",") if pid.strip()]

    # Сохраняем файл
    file_url = None
    file_name = None
    if file and file.filename:
        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Допустимые форматы: PDF, JPG, PNG",
            )

        Path(CERTIFICATES_DIR).mkdir(parents=True, exist_ok=True)
        ext = Path(file.filename).suffix
        unique_filename = f"cert_{uuid.uuid4().hex}{ext}"
        filepath = Path(CERTIFICATES_DIR) / unique_filename

        try:
            with Path.open(filepath, "wb") as f_out:
                shutil.copyfileobj(file.file, f_out)
            file_name = unique_filename
            file_url = f"/api/v1/admin/certificates/files/{unique_filename}"
            logger.info("Файл сертификата сохранён", filename=unique_filename)
        except Exception as e:
            logger.error("Ошибка сохранения файла сертификата", error=str(e))

    # Определяем начальный статус
    today = DateType.today()
    if expiry_date < today:
        initial_status = CertificateStatus.EXPIRED
    elif (expiry_date - today).days <= EXPIRY_WARNING_DAYS:
        initial_status = CertificateStatus.EXPIRING_SOON
    else:
        initial_status = CertificateStatus.ACTIVE

    cert = Certificate(
        number=cert_number,
        cert_type=cert_type_enum,
        issued_date=issued_date,
        expiry_date=expiry_date,
        issuing_authority=issuing_authority,
        product_ids=product_id_list,
        file_url=file_url,
        file_name=file_name,
        status=initial_status,
        notes=notes,
    )
    await cert.insert()

    logger.info(
        "Сертификат загружен",
        number=cert_number,
        cert_type=cert_type,
        expiry_date=str(expiry_date),
        admin_id=str(admin.id),
    )

    return _cert_to_dict(cert)


@router.patch(
    "/{cert_id}",
    summary="Обновить сертификат",
)
async def update_certificate(
    cert_id: str,
    data: CertificateUpdate,
    admin=Depends(require_admin),
):
    """
    Обновляет метаданные сертификата.
    Принимает поля фронтенда: cert_number, cert_type, issued_at, expires_at.
    """
    try:
        cert = await Certificate.get(PydanticObjectId(cert_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сертификат не найден") from e

    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сертификат не найден")

    # Маппим поля фронтенда → бэкенд
    if data.cert_number is not None:
        cert.number = data.cert_number

    if data.cert_type is not None:
        cert.cert_type = _resolve_cert_type(data.cert_type)

    if data.issuing_authority is not None:
        cert.issuing_authority = data.issuing_authority

    if data.issued_at is not None:
        try:
            cert.issued_date = DateType.fromisoformat(data.issued_at)
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Неверный формат даты выдачи",
            ) from e

    if data.expires_at is not None:
        try:
            cert.expiry_date = DateType.fromisoformat(data.expires_at)
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Неверный формат даты истечения",
            ) from e

    if data.notes is not None:
        cert.notes = data.notes

    # Пересчитываем статус
    cert.status = cert.recalculate_status()
    cert.updated_at = datetime.now(UTC)
    await cert.save()

    # Обновляем certificate_ids у привязанных товаров
    if data.product_ids is not None:
        cert_id_str = str(cert.id)
        from app.models.product import Product

        # Снимаем привязку у всех товаров, у которых был этот сертификат
        old_products = await Product.find({"certificate_ids": {"$in": [cert_id_str]}}).to_list()
        for p in old_products:
            if cert_id_str in p.certificate_ids:
                p.certificate_ids = [cid for cid in p.certificate_ids if cid != cert_id_str]
                await p.save()

        # Добавляем привязку к новым товарам
        for pid in data.product_ids:
            try:
                product = await Product.get(PydanticObjectId(pid))
                if product and cert_id_str not in product.certificate_ids:
                    product.certificate_ids.append(cast(Link["Certificate"], cert_id_str))
                    await product.save()
            except Exception:
                logger.warning("Товар не найден при привязке сертификата", product_id=pid)

        cert.product_ids = data.product_ids

        cert.updated_at = datetime.now(UTC)
        await cert.save()

    logger.info(
        "Сертификат обновлён",
        cert_id=cert_id,
        admin_id=str(admin.id),
    )

    return _cert_to_dict(cert)


@router.put(
    "/{cert_id}",
    summary="Обновить сертификат (PUT)",
)
async def update_certificate_put(
    cert_id: str,
    data: CertificateUpdate,
    admin=Depends(require_admin),
):
    """PUT-алиас для обновления — фронтенд использует PUT."""
    return await update_certificate(cert_id, data, admin)


@router.delete(
    "/{cert_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить сертификат",
)
async def delete_certificate(
    cert_id: str,
    admin=Depends(require_admin),
):
    """Удаляет сертификат и его файл."""
    try:
        cert = await Certificate.get(PydanticObjectId(cert_id))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сертификат не найден") from e

    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Сертификат не найден")

    # Удаляем файл
    if cert.file_name:
        filepath = Path(CERTIFICATES_DIR) / cert.file_name
        if filepath.exists():
            try:
                filepath.unlink()
            except Exception as e:
                logger.warning("Не удалось удалить файл сертификата", error=str(e))

    # Снимаем привязку у товаров
    cert_id_str = str(cert.id)
    from app.models.product import Product

    products = await Product.find({"certificate_ids": {"$in": [cert_id_str]}}).to_list()
    for p in products:
        p.certificate_ids = [cid for cid in p.certificate_ids if cid != cert_id_str]
        await p.save()

    await cert.delete()

    logger.info(
        "Сертификат удалён",
        cert_id=cert_id,
        number=cert.number,
        admin_id=str(admin.id),
    )


@router.get(
    "/files/{filename}",
    summary="Скачать файл сертификата",
    include_in_schema=False,
)
async def download_certificate_file(filename: str):
    """Отдача файла сертификата."""
    from fastapi.responses import FileResponse

    filepath = Path(CERTIFICATES_DIR) / filename
    if not filepath.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Файл не найден")

    if filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith((".jpg", ".jpeg")):
        media_type = "image/jpeg"
    elif filename.endswith(".png"):
        media_type = "image/png"
    else:
        media_type = "application/octet-stream"

    return FileResponse(path=filepath, filename=filename, media_type=media_type)
