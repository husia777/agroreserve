"""
Публичный эндпоинт для просмотра и скачивания сертификатов товара (клиент).
UC-23: Просмотр сертификатов клиентом.

Эндпоинты: /api/v1/catalog/products/{product_id}/certificates
"""

import io
import zipfile
from datetime import date as DateType
from pathlib import Path
from urllib.parse import quote

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, StreamingResponse

from app.models.certificate import Certificate
from app.models.product import Product

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/catalog", tags=["Каталог: Сертификаты"])

# Директория с файлами сертификатов
CERTIFICATES_DIR = "/app/media/certificates"

# Маппинг типов на русские названия
CERT_TYPE_LABELS = {
    "declaration_tr_ts": "Декларация ТР ТС",
    "certificate": "Сертификат соответствия",
    "vet_certificate": "Ветеринарный сертификат",
    "quality_certificate": "Удостоверение качества",
    "other": "Документ",
}


def _public_cert_dict(cert: Certificate) -> dict:
    """Формирует публичные данные сертификата (без внутренних полей)."""
    raw_type = cert.cert_type.value if hasattr(cert.cert_type, "value") else cert.cert_type
    type_label = CERT_TYPE_LABELS.get(raw_type, raw_type)

    today = DateType.today()
    days_left = (cert.expiry_date - today).days

    return {
        "id": str(cert.id),
        "number": cert.number,
        "cert_type": raw_type,
        "cert_type_label": type_label,
        "issuing_authority": cert.issuing_authority or "",
        "issued_date": str(cert.issued_date),
        "expiry_date": str(cert.expiry_date),
        "days_until_expiry": days_left,
        "is_valid": cert.expiry_date >= today,
        "has_file": bool(cert.file_url and cert.file_name),
        "file_url": f"/api/v1/catalog/certificates/{cert.id}/download" if cert.file_url else None,
        "file_name": cert.file_name,
    }


@router.get(
    "/products/{product_id}/certificates",
    summary="Сертификаты товара (UC-23)",
)
async def get_product_certificates(product_id: str):
    """
    UC-23: Возвращает действующие сертификаты товара для клиента.
    Не требует авторизации — сертификаты публичная информация.
    """
    product = None
    try:
        product = await Product.get(PydanticObjectId(product_id))
    except Exception:
        product = await Product.find_one({"slug": product_id, "is_active": True})

    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")

    if not product.certificate_ids:
        return {"certificates": [], "count": 0}

    certs: list[dict] = []
    for cert_ref in product.certificate_ids:
        try:
            # Link-объект Beanie — извлекаем ref.id; строка — используем как есть
            if hasattr(cert_ref, "ref"):
                cert_id = cert_ref.ref.id
            elif hasattr(cert_ref, "id"):
                cert_id = PydanticObjectId(str(cert_ref))
            else:
                cert_id = PydanticObjectId(str(cert_ref))
            cert = await Certificate.get(cert_id)
            if cert and cert.is_valid():
                certs.append(_public_cert_dict(cert))
        except Exception:
            logger.warning("Ошибка при загрузке сертификата для товара", product_id=product_id, cert_ref=str(cert_ref))

    return {"certificates": certs, "count": len(certs)}


@router.get(
    "/certificates/{cert_id}/download",
    summary="Скачать файл сертификата (UC-23)",
)
async def download_certificate(cert_id: str):
    """
    UC-23: Скачивание файла сертификата клиентом.
    Публичный эндпоинт — не требует авторизации.
    """
    try:
        cert = await Certificate.get(PydanticObjectId(cert_id))
    except Exception as e:
        logger.error("Ошибка при получении сертификата", cert_id=cert_id, error=str(e))
        raise HTTPException(status_code=404, detail="Сертификат не найден") from e

    if not cert:
        raise HTTPException(status_code=404, detail="Сертификат не найден")

    if not cert.is_valid():
        raise HTTPException(status_code=410, detail="Сертификат просрочен")

    if not cert.file_name:
        raise HTTPException(status_code=404, detail="Файл сертификата не загружен")

    filepath = Path(CERTIFICATES_DIR) / cert.file_name
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="Файл не найден на сервере")

    if cert.file_name.endswith(".pdf"):
        media_type = "application/pdf"
    elif cert.file_name.endswith((".jpg", ".jpeg")):
        media_type = "image/jpeg"
    elif cert.file_name.endswith(".png"):
        media_type = "image/png"
    else:
        media_type = "application/octet-stream"

    raw_type = cert.cert_type.value if hasattr(cert.cert_type, "value") else cert.cert_type
    type_label = CERT_TYPE_LABELS.get(raw_type, "cert")
    ext = Path(cert.file_name).suffix
    download_name = f"{type_label}_{cert.number}{ext}"

    safe_name = quote(download_name)
    return FileResponse(
        path=filepath,
        media_type=media_type,
        headers={"Content-Disposition": f"attachment; filename*=UTF-8''{safe_name}"},
    )


@router.get(
    "/orders/{order_id}/certificates/zip",
    summary="ZIP сертификатов по заказу (UC-23)",
)
async def download_order_certificates_zip(order_id: str):
    """
    UC-23: Скачивание ZIP-архива всех сертификатов товаров из заказа.
    """
    from app.models.order import Order

    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception as e:
        logger.error("Ошибка при получении заказа", order_id=order_id, error=str(e))
        raise HTTPException(status_code=404, detail="Заказ не найден") from e

    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")

    product_ids = set()
    for item in order.items:
        pid = str(item.product_id)
        if pid:
            product_ids.add(pid)

    if not product_ids:
        raise HTTPException(status_code=404, detail="В заказе нет товаров")

    cert_files: list[tuple] = []
    seen_cert_ids = set()

    for pid in product_ids:
        product = None
        try:
            product = await Product.get(PydanticObjectId(pid))
        except Exception:
            logger.warning("Товар из заказа не найден при сборе сертификатов", product_id=pid, order_id=order_id)

        if not product or not product.certificate_ids:
            continue

        for cert_ref in product.certificate_ids:
            try:
                cert_id = str(cert_ref) if not isinstance(cert_ref, str) else cert_ref
                if cert_id in seen_cert_ids:
                    continue
                seen_cert_ids.add(cert_id)

                cert = await Certificate.get(PydanticObjectId(cert_id))
                if not cert or not cert.is_valid() or not cert.file_name:
                    continue

                filepath = Path(CERTIFICATES_DIR) / cert.file_name
                if not filepath.exists():
                    continue

                raw_type = cert.cert_type.value if hasattr(cert.cert_type, "value") else cert.cert_type
                type_label = CERT_TYPE_LABELS.get(raw_type, "cert")
                ext = Path(cert.file_name).suffix
                zip_name = f"{type_label}_{cert.number}{ext}"

                cert_files.append((zip_name, filepath))
            except Exception:
                logger.warning(
                    "Ошибка при обработке сертификата для товара из заказа",
                    product_id=pid,
                    cert_ref=str(cert_ref),
                    order_id=order_id,
                )

    if not cert_files:
        raise HTTPException(
            status_code=404,
            detail="Нет доступных сертификатов для товаров из этого заказа",
        )

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for zip_name, filepath in cert_files:
            zf.write(filepath, zip_name)

    zip_buffer.seek(0)

    order_number = getattr(order, "order_number", order_id)
    filename = f"certificates_order_{order_number}.zip"

    logger.info(
        "ZIP сертификатов заказа сгенерирован",
        order_id=order_id,
        cert_count=len(cert_files),
    )

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
        },
    )
