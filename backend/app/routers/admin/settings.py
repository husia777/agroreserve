"""
Роутер настроек системы (для администратора).
Эндпоинты: /api/v1/admin/settings/
"""

from datetime import datetime, timezone

import structlog
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List

from app.models.settings import SystemSettings, BankDetails, DeliverySlot
from app.utils.security import require_admin

router = APIRouter(prefix="/api/v1/admin/settings", tags=["Администрирование — Настройки"])
logger = structlog.get_logger(__name__)


class SettingsUpdate(BaseModel):
    """Запрос на обновление настроек системы."""

    company_name: Optional[str] = None
    inn: Optional[str] = None
    kpp: Optional[str] = None
    ogrn: Optional[str] = None
    legal_address: Optional[str] = None
    actual_address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    work_hours: Optional[str] = None
    min_order_amount_b2b: Optional[float] = None
    default_payment_days: Optional[int] = None


@router.get(
    "/",
    summary="Получить настройки системы",
)
async def get_settings(admin=Depends(require_admin)):
    """Возвращает текущие настройки системы (синглтон)."""
    settings_doc = await SystemSettings.find_one({"singleton_key": "main"})

    if not settings_doc:
        # Создаём настройки по умолчанию при первом запросе
        settings_doc = SystemSettings()
        await settings_doc.insert()
        logger.info("Настройки системы инициализированы")

    return {
        "id": str(settings_doc.id),
        "company_name": settings_doc.company_name,
        "inn": settings_doc.inn,
        "kpp": settings_doc.kpp,
        "ogrn": settings_doc.ogrn,
        "legal_address": settings_doc.legal_address,
        "actual_address": settings_doc.actual_address,
        "phone": settings_doc.phone,
        "email": settings_doc.email,
        "website": settings_doc.website,
        "bank_details": {
            "bank_name": settings_doc.bank_details.bank_name,
            "bik": settings_doc.bank_details.bik,
            "account": settings_doc.bank_details.account,
            "correspondent_account": settings_doc.bank_details.correspondent_account,
        },
        "logo_url": settings_doc.logo_url,
        "stamp_url": settings_doc.stamp_url,
        "signature_url": settings_doc.signature_url,
        "work_hours": settings_doc.work_hours,
        "delivery_slots": [
            {
                "label": slot.label,
                "start_time": slot.start_time,
                "end_time": slot.end_time,
                "is_active": slot.is_active,
            }
            for slot in settings_doc.delivery_slots
        ],
        "min_order_amount_b2b": settings_doc.min_order_amount_b2b,
        "order_confirmation_days": settings_doc.order_confirmation_days,
        "default_payment_days": settings_doc.default_payment_days,
        "updated_at": settings_doc.updated_at.isoformat(),
    }


@router.put(
    "/",
    summary="Обновить настройки (PUT)",
)
async def update_settings_put(data: SettingsUpdate, admin=Depends(require_admin)):
    """PUT-алиас — фронтенд использует PUT."""
    return await update_settings(data, admin)


@router.patch(
    "/",
    summary="Обновить настройки",
)
async def update_settings(data: SettingsUpdate, admin=Depends(require_admin)):
    """Частичное обновление настроек системы."""
    settings_doc = await SystemSettings.find_one({"singleton_key": "main"})

    if not settings_doc:
        settings_doc = SystemSettings()

    # Применяем изменения
    if data.company_name is not None:
        settings_doc.company_name = data.company_name
    if data.inn is not None:
        settings_doc.inn = data.inn
    if data.kpp is not None:
        settings_doc.kpp = data.kpp
    if data.ogrn is not None:
        settings_doc.ogrn = data.ogrn
    if data.legal_address is not None:
        settings_doc.legal_address = data.legal_address
    if data.actual_address is not None:
        settings_doc.actual_address = data.actual_address
    if data.phone is not None:
        settings_doc.phone = data.phone
    if data.email is not None:
        settings_doc.email = data.email
    if data.work_hours is not None:
        settings_doc.work_hours = data.work_hours
    if data.min_order_amount_b2b is not None:
        settings_doc.min_order_amount_b2b = data.min_order_amount_b2b
    if data.default_payment_days is not None:
        settings_doc.default_payment_days = data.default_payment_days

    settings_doc.updated_at = datetime.now(timezone.utc)

    if settings_doc.id:
        await settings_doc.save()
    else:
        await settings_doc.insert()

    logger.info("Настройки системы обновлены", admin_id=str(admin.id))

    return {"message": "Настройки сохранены"}
