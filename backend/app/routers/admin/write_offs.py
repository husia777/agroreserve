"""
Роутер управления списаниями товаров (администратор).
Эндпоинты: /api/v1/admin/write-offs/
"""

import math
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Optional

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status

from app.models.write_off import WriteOff
from app.schemas.write_off import (
    WriteOffAnalytics,
    WriteOffCreate,
    WriteOffListResponse,
    WriteOffResponse,
)
from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/write-offs", tags=["Админ: Списания"])

# Допустимые причины списания
VALID_REASONS = {"spoilage", "expired", "damage", "other"}
UPLOAD_DIR = "/app/uploads/write_offs"


def _to_response(wo: WriteOff) -> WriteOffResponse:
    """Конвертирует WriteOff в ответ API."""
    return WriteOffResponse(
        id=str(wo.id),
        product_id=str(wo.product_id),
        product_name=wo.product_name,
        qty=wo.qty,
        unit=wo.unit,
        cost_price=wo.cost_price,
        total_loss=wo.total_loss,
        reason=wo.reason,
        description=wo.description,
        photo_url=wo.photo_url,
        batch_id=str(wo.batch_id) if wo.batch_id else None,
        created_by=str(wo.created_by),
        created_at=wo.created_at.isoformat(),
    )


@router.get(
    "/",
    response_model=WriteOffListResponse,
    summary="Список списаний",
)
async def get_write_offs(
    reason: Optional[str] = Query(None, description="Причина: spoilage, expired, damage, other"),
    product_id: Optional[str] = Query(None, description="Фильтр по товару"),
    date_from: Optional[str] = Query(None, description="С даты (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="По дату (YYYY-MM-DD)"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    _=Depends(require_admin),
):
    """
    Список актов списания с возможностью фильтрации.
    Сортировка: по дате создания (новые первые).
    """

    query: dict = {}

    if reason:
        if reason not in VALID_REASONS:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Недопустимая причина. Допустимые значения: {', '.join(VALID_REASONS)}",
            )
        query["reason"] = reason

    if product_id:
        try:
            query["product_id"] = PydanticObjectId(product_id)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат product_id",
            ) from e

    # Фильтрация по дате
    date_filter: dict = {}
    if date_from:
        try:
            date_filter["$gte"] = datetime.fromisoformat(date_from)
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат date_from. Используйте YYYY-MM-DD",
            ) from e
    if date_to:
        try:
            # До конца указанного дня
            dt_to = datetime.fromisoformat(date_to).replace(hour=23, minute=59, second=59)
            date_filter["$lte"] = dt_to
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Неверный формат date_to. Используйте YYYY-MM-DD",
            ) from e
    if date_filter:
        query["created_at"] = date_filter

    total = await WriteOff.find(query).count()
    write_offs = await WriteOff.find(query).sort("-WriteOff.created_at").skip((page - 1) * limit).limit(limit).to_list()

    return WriteOffListResponse(
        items=[_to_response(wo) for wo in write_offs],
        total=total,
        page=page,
        limit=limit,
        pages=math.ceil(total / limit) if total > 0 else 1,
    )


@router.post(
    "/",
    response_model=WriteOffResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать акт списания",
)
async def create_write_off(
    data: WriteOffCreate,
    current_admin=Depends(require_admin),
):
    """
    Создать акт списания товара.

    Автоматически:
    1. Уменьшает остаток товара в каталоге
    2. Создаёт расход в P&L (категория "other")
    3. Если указан batch_id — списывает из конкретной партии

    Raises:
        400: Если товар не найден или недостаточный остаток
    """
    from app.models.finance import Expense, ExpenseCategory
    from app.models.product import Product

    # Валидация причины
    if data.reason not in VALID_REASONS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Недопустимая причина списания. Допустимые значения: {', '.join(VALID_REASONS)}",
        )

    # Загружаем товар
    try:
        product = await Product.get(PydanticObjectId(data.product_id))
    except Exception:
        product = None

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Товар с ID {data.product_id} не найден",
        )

    # Проверяем достаточность остатков
    if product.stock_qty < data.qty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Недостаточный остаток товара «{product.name}»: "
                f"доступно {product.stock_qty:.3f} {product.unit}, "
                f"запрошено {data.qty:.3f} {product.unit}"
            ),
        )

    cost_price = product.cost_price
    total_loss = round(data.qty * cost_price, 2)
    now = datetime.now(UTC)

    # Если указана конкретная партия — списываем из неё (FIFO)
    batch_id_obj = None
    if data.batch_id:
        try:
            batch_id_obj = PydanticObjectId(data.batch_id)
            from app.models.batch import Batch

            batch = await Batch.get(batch_id_obj)
            if batch:
                if batch.qty_remaining < data.qty:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=(
                            f"В партии недостаточно товара: "
                            f"доступно {batch.qty_remaining:.3f}, "
                            f"запрошено {data.qty:.3f}"
                        ),
                    )
                cost_price = batch.cost_price  # Используем себестоимость партии
                total_loss = round(data.qty * cost_price, 2)

                batch.qty_remaining = round(batch.qty_remaining - data.qty, 3)
                if batch.qty_remaining <= 0:
                    batch.is_exhausted = True
                await batch.save()
        except HTTPException:
            raise
        except Exception:
            batch_id_obj = None

    # 1. Уменьшаем остаток товара
    product.stock_qty = round(product.stock_qty - data.qty, 3)
    product.updated_at = now
    await product.save()

    logger.info(
        "Остаток товара уменьшен при списании",
        product_id=data.product_id,
        product_name=product.name,
        written_off_qty=data.qty,
        new_stock=product.stock_qty,
    )

    # 2. Создаём акт списания
    write_off = WriteOff(
        product_id=PydanticObjectId(data.product_id),
        product_name=product.name,
        qty=data.qty,
        unit=data.unit,
        cost_price=cost_price,
        total_loss=total_loss,
        reason=data.reason,
        description=data.description,
        photo_url=data.photo_url,
        batch_id=batch_id_obj,
        created_by=PydanticObjectId(str(current_admin.id)),
        created_at=now,
    )
    await write_off.insert()

    # 3. Создаём расход в P&L
    reason_descriptions = {
        "spoilage": "Порча товара",
        "expired": "Истёк срок годности",
        "damage": "Механическое повреждение",
        "other": "Списание товара",
    }
    expense_desc = f"{reason_descriptions.get(data.reason, 'Списание')}: " f"{product.name} {data.qty} {data.unit}"
    if data.description:
        expense_desc += f". {data.description}"

    expense = Expense(
        date=now.date(),
        category=ExpenseCategory.OTHER,
        description=expense_desc[:500],
        amount=total_loss,
        is_recurring=False,
        created_at=now,
        created_by=str(current_admin.id),
        recurring_day=None,
        receipt_photo=data.photo_url,
    )
    await expense.insert()

    logger.info(
        "Акт списания создан",
        write_off_id=str(write_off.id),
        product=product.name,
        qty=data.qty,
        total_loss=total_loss,
        reason=data.reason,
        expense_id=str(expense.id),
    )

    return _to_response(write_off)


@router.get(
    "/analytics",
    response_model=WriteOffAnalytics,
    summary="Аналитика списаний",
)
async def get_write_off_analytics(
    days: int = Query(30, ge=1, le=365, description="Период анализа (дней)"),
    _=Depends(require_admin),
):
    """
    Аналитика списаний за период:
    - Общий убыток
    - Группировка по причинам
    - Топ товаров по убыткам
    - Динамика по месяцам
    """
    from datetime import timedelta

    since = datetime.now(UTC) - timedelta(days=days)
    write_offs = await WriteOff.find({"created_at": {"$gte": since}}).to_list()

    total_loss = sum(wo.total_loss for wo in write_offs)
    total_qty = sum(wo.qty for wo in write_offs)

    # Группировка по причинам
    by_reason: dict = {}
    for wo in write_offs:
        key = wo.reason
        if key not in by_reason:
            by_reason[key] = {"reason": key, "count": 0, "total_loss": 0.0, "total_qty": 0.0}
        by_reason[key]["count"] += 1
        by_reason[key]["total_loss"] = round(by_reason[key]["total_loss"] + wo.total_loss, 2)
        by_reason[key]["total_qty"] = round(by_reason[key]["total_qty"] + wo.qty, 3)

    # Группировка по товарам (топ-10 по убыткам)
    by_product: dict = {}
    for wo in write_offs:
        key = str(wo.product_id)
        if key not in by_product:
            by_product[key] = {
                "product_id": key,
                "product_name": wo.product_name,
                "total_loss": 0.0,
                "total_qty": 0.0,
                "count": 0,
            }
        by_product[key]["total_loss"] = round(by_product[key]["total_loss"] + wo.total_loss, 2)
        by_product[key]["total_qty"] = round(by_product[key]["total_qty"] + wo.qty, 3)
        by_product[key]["count"] += 1

    top_products = sorted(by_product.values(), key=lambda x: x["total_loss"], reverse=True)[:10]

    # Динамика по месяцам
    by_month: dict = {}
    for wo in write_offs:
        month_key = wo.created_at.strftime("%Y-%m")
        if month_key not in by_month:
            by_month[month_key] = {"month": month_key, "total_loss": 0.0, "count": 0}
        by_month[month_key]["total_loss"] = round(by_month[month_key]["total_loss"] + wo.total_loss, 2)
        by_month[month_key]["count"] += 1

    by_month_list = sorted(by_month.values(), key=lambda x: x["month"])

    return WriteOffAnalytics(
        total_loss=round(total_loss, 2),
        total_qty=round(total_qty, 3),
        by_reason=list(by_reason.values()),
        by_product=top_products,
        by_month=by_month_list,
    )


@router.post(
    "/upload-photo",
    summary="UC-113: Загрузка фото брака",
)
async def upload_write_off_photo(
    file: UploadFile = File(...),
    admin=Depends(require_admin),
):
    """Загружает фото испорченного товара. Возвращает URL."""
    # Валидация
    allowed_types = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(400, detail="Допустимые форматы: JPEG, PNG, WebP")

    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(400, detail="Максимальный размер: 5 МБ")

    # Сохранение
    Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
    _filename = file.filename or ""
    ext = _filename.rsplit(".", 1)[-1] if "." in _filename else "jpg"
    filename = f"{uuid.uuid4().hex}.{ext}"
    filepath = Path(UPLOAD_DIR) / filename

    with Path.open(filepath, "wb") as f:
        f.write(content)

    url = f"/uploads/write_offs/{filename}"
    return {"url": url, "filename": filename}
