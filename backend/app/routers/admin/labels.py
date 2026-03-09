"""
Роутер генерации ярлыков/этикеток для товаров (администратор).
Эндпоинты: /api/v1/admin/labels/

UC-22: Печать ярлыков/сертификатов — генерация PDF с ярлыками для наклейки на упаковку.
"""
import io
import math
from datetime import date, datetime, timedelta, timezone
from typing import List, Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, field_validator

from app.models.product import Product
from app.models.certificate import Certificate
from app.models.settings import SystemSettings
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/labels", tags=["Админ: Ярлыки"])


# ── Pydantic схемы ─────────────────────────────────────────────────────────────

class LabelItem(BaseModel):
    """Один товар для генерации ярлыка."""
    product_id: str = Field(..., description="ID товара")
    packing_date: Optional[str] = Field(None, description="Дата фасовки (YYYY-MM-DD). По умолчанию — сегодня")
    net_weight: Optional[str] = Field(None, description="Масса нетто (если пустая — поле для ручного заполнения)")

    @field_validator("packing_date", mode="before")
    @classmethod
    def empty_to_none(cls, v):
        if v == "":
            return None
        return v


class LabelGenerateRequest(BaseModel):
    """Запрос на генерацию PDF с ярлыками."""
    items: List[LabelItem] = Field(..., min_length=1, max_length=50, description="Товары для ярлыков")
    labels_per_page: int = Field(6, description="Количество ярлыков на странице (6, 8, 12, 24)")
    label_format: str = Field("a4_grid", description="Формат: a4_grid (несколько на A4) или a6_single (по одному A6)")

    @field_validator("labels_per_page")
    @classmethod
    def validate_per_page(cls, v):
        allowed = [6, 8, 12, 24]
        if v not in allowed:
            raise ValueError(f"Допустимые значения: {', '.join(map(str, allowed))}")
        return v


class ProductForLabel(BaseModel):
    """Данные товара для предпросмотра."""
    _id: str
    name: str
    origin_country: str
    storage_conditions: Optional[str]
    shelf_life_days: Optional[int]
    unit: str
    certificate_number: Optional[str] = None
    certificate_type: Optional[str] = None


# ── Утилиты ────────────────────────────────────────────────────────────────────

async def _get_certificate_info(product: Product) -> tuple[Optional[str], Optional[str]]:
    """Получает номер и тип первого действующего сертификата товара."""
    if not product.certificate_ids:
        return None, None

    for cert_ref in product.certificate_ids:
        try:
            cert_id = str(cert_ref) if not isinstance(cert_ref, str) else cert_ref
            cert = await Certificate.get(PydanticObjectId(cert_id))
            if cert and cert.is_valid():
                # Маппинг типов на русские названия
                type_labels = {
                    "declaration_tr_ts": "Декларация ТР ТС",
                    "certificate": "Сертификат соответствия",
                    "vet_certificate": "Ветеринарный сертификат",
                    "quality_certificate": "Удостоверение качества",
                    "other": "Документ",
                }
                cert_type_label = type_labels.get(cert.cert_type.value, cert.cert_type.value)
                return cert.number, cert_type_label
        except Exception:
            continue

    return None, None


def _generate_label_html(
    product: Product,
    company_name: str,
    packing_date: date,
    expiry_date: Optional[date],
    net_weight: Optional[str],
    cert_number: Optional[str],
    cert_type: Optional[str],
) -> str:
    """Генерирует HTML одного ярлыка."""
    packing_str = packing_date.strftime("%d.%m.%Y")
    expiry_str = expiry_date.strftime("%d.%m.%Y") if expiry_date else "—"
    weight_str = net_weight if net_weight else "_____ кг"

    # Строка сертификата
    cert_line = ""
    if cert_number:
        cert_label = cert_type or "Документ"
        # Обрезаем длинный номер
        display_number = cert_number if len(cert_number) <= 30 else cert_number[:27] + "..."
        cert_line = f'<div class="label-row"><span class="label-key">{cert_label}:</span> <span class="label-val">{display_number}</span></div>'

    return f"""
    <div class="label">
        <div class="label-company">{company_name}</div>
        <div class="label-product">{product.name}</div>
        <div class="label-origin">Страна: {product.origin_country}</div>
        <div class="label-row"><span class="label-key">Дата фасовки:</span> <span class="label-val">{packing_str}</span></div>
        <div class="label-row"><span class="label-key">Годен до:</span> <span class="label-val">{expiry_str}</span></div>
        <div class="label-row"><span class="label-key">Масса нетто:</span> <span class="label-val">{weight_str}</span></div>
        {cert_line}
        {f'<div class="label-storage">Хранение: {product.storage_conditions}</div>' if product.storage_conditions else ''}
    </div>
    """


def _build_pdf_html(labels_html: List[str], labels_per_page: int) -> str:
    """Собирает полный HTML документ с сеткой ярлыков для WeasyPrint."""
    # Определяем сетку в зависимости от кол-ва ярлыков на странице
    grid_configs = {
        6: {"cols": 2, "rows": 3, "width": "88mm", "height": "88mm", "font": "9px"},
        8: {"cols": 2, "rows": 4, "width": "88mm", "height": "66mm", "font": "8.5px"},
        12: {"cols": 3, "rows": 4, "width": "58mm", "height": "66mm", "font": "7.5px"},
        24: {"cols": 4, "rows": 6, "width": "44mm", "height": "44mm", "font": "6.5px"},
    }
    cfg = grid_configs.get(labels_per_page, grid_configs[6])

    css = f"""
    @page {{
        size: A4;
        margin: 8mm;
    }}
    * {{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }}
    body {{
        font-family: Arial, 'DejaVu Sans', sans-serif;
        font-size: {cfg['font']};
        color: #000;
    }}
    .page {{
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        page-break-after: always;
    }}
    .page:last-child {{
        page-break-after: auto;
    }}
    .label {{
        width: {cfg['width']};
        height: {cfg['height']};
        border: 0.5px dashed #999;
        padding: 3mm;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
    }}
    .label-company {{
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 2px;
        text-align: center;
    }}
    .label-product {{
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 3px;
        text-align: center;
        color: #111;
    }}
    .label-origin {{
        font-size: 0.9em;
        color: #444;
        margin-bottom: 3px;
        text-align: center;
    }}
    .label-row {{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1px;
        line-height: 1.4;
    }}
    .label-key {{
        color: #555;
    }}
    .label-val {{
        font-weight: bold;
    }}
    .label-storage {{
        margin-top: 3px;
        font-size: 0.85em;
        color: #333;
        border-top: 0.5px solid #ccc;
        padding-top: 2px;
    }}
    """

    # Разбиваем на страницы
    pages_html = []
    per_page = labels_per_page
    total_pages = math.ceil(len(labels_html) / per_page)

    for page_num in range(total_pages):
        start = page_num * per_page
        end = start + per_page
        page_labels = labels_html[start:end]
        page_content = "\n".join(page_labels)
        pages_html.append(f'<div class="page">{page_content}</div>')

    all_pages = "\n".join(pages_html)

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <style>{css}</style>
</head>
<body>
{all_pages}
</body>
</html>"""


# ── Эндпоинты ──────────────────────────────────────────────────────────────────

@router.get(
    "/products",
    summary="Список товаров для ярлыков (UC-22)",
)
async def get_products_for_labels(
    search: Optional[str] = Query(None, description="Поиск по названию"),
    category_id: Optional[str] = Query(None, description="Фильтр по категории"),
    admin=Depends(require_admin),
):
    """Возвращает товары с информацией, нужной для генерации ярлыков."""
    query_filter: dict = {"is_active": True}

    if search:
        query_filter["name"] = {"$regex": search, "$options": "i"}

    if category_id:
        try:
            query_filter["category_id"] = PydanticObjectId(category_id)
        except Exception:
            pass

    products = await Product.find(query_filter).sort("name").limit(100).to_list()

    result = []
    for p in products:
        cert_number, cert_type = await _get_certificate_info(p)
        result.append({
            "_id": str(p.id),
            "name": p.name,
            "origin_country": p.origin_country,
            "storage_conditions": p.storage_conditions,
            "shelf_life_days": p.shelf_life_days,
            "unit": p.unit.value if p.unit else "kg",
            "certificate_number": cert_number,
            "certificate_type": cert_type,
        })

    return result


@router.post(
    "/preview",
    summary="Предпросмотр одного ярлыка (HTML) (UC-22)",
)
async def preview_label(
    data: LabelItem,
    admin=Depends(require_admin),
):
    """Возвращает HTML одного ярлыка для предпросмотра."""
    try:
        product = await Product.get(PydanticObjectId(data.product_id))
    except Exception:
        raise HTTPException(status_code=404, detail="Товар не найден")

    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")

    # Получаем настройки компании
    settings = await SystemSettings.find_one({"singleton_key": "main"})
    company_name = settings.company_name if settings else "ИП Наимов Хусейн Вохиджонович"

    # Дата фасовки
    if data.packing_date:
        try:
            packing_date = date.fromisoformat(data.packing_date)
        except ValueError:
            packing_date = date.today()
    else:
        packing_date = date.today()

    # Годен до
    expiry_date = None
    if product.shelf_life_days and product.shelf_life_days > 0:
        expiry_date = packing_date + timedelta(days=product.shelf_life_days)

    # Сертификат
    cert_number, cert_type = await _get_certificate_info(product)

    html = _generate_label_html(
        product=product,
        company_name=company_name,
        packing_date=packing_date,
        expiry_date=expiry_date,
        net_weight=data.net_weight,
        cert_number=cert_number,
        cert_type=cert_type,
    )

    return {"html": html, "product_name": product.name}


@router.post(
    "/generate",
    summary="Генерация PDF с ярлыками (UC-22)",
)
async def generate_labels_pdf(
    data: LabelGenerateRequest,
    admin=Depends(require_admin),
):
    """
    UC-22: Генерирует PDF файл с ярлыками для печати.

    Принимает список товаров, формирует HTML-шаблон и конвертирует в PDF через WeasyPrint.
    """
    # Получаем настройки компании
    settings = await SystemSettings.find_one({"singleton_key": "main"})
    company_name = settings.company_name if settings else "ИП Наимов Хусейн Вохиджонович"

    labels_html: List[str] = []

    for item in data.items:
        # Получаем товар
        try:
            product = await Product.get(PydanticObjectId(item.product_id))
        except Exception:
            logger.warning("Товар не найден для ярлыка", product_id=item.product_id)
            continue

        if not product:
            continue

        # Дата фасовки
        if item.packing_date:
            try:
                packing_date = date.fromisoformat(item.packing_date)
            except ValueError:
                packing_date = date.today()
        else:
            packing_date = date.today()

        # Годен до
        expiry_date = None
        if product.shelf_life_days and product.shelf_life_days > 0:
            expiry_date = packing_date + timedelta(days=product.shelf_life_days)

        # Сертификат
        cert_number, cert_type = await _get_certificate_info(product)

        # Генерируем HTML ярлыка
        label_html = _generate_label_html(
            product=product,
            company_name=company_name,
            packing_date=packing_date,
            expiry_date=expiry_date,
            net_weight=item.net_weight,
            cert_number=cert_number,
            cert_type=cert_type,
        )
        labels_html.append(label_html)

    if not labels_html:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Не найдено ни одного товара для генерации ярлыков",
        )

    # Собираем полный HTML
    full_html = _build_pdf_html(labels_html, data.labels_per_page)

    # Генерируем PDF через WeasyPrint
    try:
        from weasyprint import HTML
        pdf_bytes = HTML(string=full_html).write_pdf()
    except ImportError:
        # Если WeasyPrint не установлен — отдаём HTML
        logger.warning("WeasyPrint не установлен, отдаём HTML")
        return StreamingResponse(
            io.BytesIO(full_html.encode("utf-8")),
            media_type="text/html; charset=utf-8",
            headers={"Content-Disposition": "inline; filename=labels.html"},
        )
    except Exception as e:
        logger.error("Ошибка генерации PDF ярлыков", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка генерации PDF: {str(e)}",
        )

    # Формируем имя файла
    today_str = date.today().strftime("%Y-%m-%d")
    filename = f"labels_{today_str}_{len(labels_html)}pcs.pdf"

    logger.info(
        "Ярлыки сгенерированы",
        count=len(labels_html),
        labels_per_page=data.labels_per_page,
        admin_id=str(admin.id),
    )

    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Length": str(len(pdf_bytes)),
        },
    )
