"""
Роутер профиля пользователя (личный кабинет).
Эндпоинты: /api/v1/profile/
"""

from datetime import UTC, datetime

import structlog
from fastapi import APIRouter, Depends, HTTPException, status

from app.models.user import User
from app.routers.auth import _build_user_response
from app.schemas.auth import UserResponse, UserUpdateProfile
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/v1/profile", tags=["Профиль"])
logger = structlog.get_logger(__name__)


@router.get(
    "/",
    response_model=UserResponse,
    summary="Получить профиль",
)
async def get_profile(current_user: User = Depends(get_current_user)):
    return _build_user_response(current_user)


@router.patch(
    "/",
    response_model=UserResponse,
    summary="Обновить профиль",
)
async def update_profile(
    data: UserUpdateProfile,
    current_user: User = Depends(get_current_user),
):
    if data.email and str(data.email) != str(current_user.email):
        existing = await User.find_one({"email": str(data.email)})
        if existing and str(existing.id) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь с таким email уже зарегистрирован",
            )

    if data.name is not None:
        current_user.name = data.name
    if data.email is not None:
        current_user.email = data.email
    if data.delivery_address is not None:
        current_user.delivery_address = data.delivery_address

    # UC-265: Обновление пакета документов
    if data.document_preferences is not None:
        from app.models.user import DocumentPreferences

        current_user.document_preferences = DocumentPreferences(**data.document_preferences.model_dump())

    if data.organization is not None:
        from app.models.user import ClientType, OrganizationDetails

        if current_user.client_type == ClientType.B2B:
            # Сохраняем существующие ogrn и correspondent_account
            existing_org = current_user.organization
            current_user.organization = OrganizationDetails(
                name=data.organization.name,
                inn=data.organization.inn,
                kpp=data.organization.kpp,
                ogrn=existing_org.ogrn if existing_org else None,
                legal_address=data.organization.legal_address,
                bank_name=data.organization.bank_name,
                bik=data.organization.bik,
                account=data.organization.account,
                correspondent_account=existing_org.correspondent_account if existing_org else None,
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Реквизиты организации можно указать только для B2B клиентов",
            )

    current_user.updated_at = datetime.now(UTC)
    await current_user.save()
    logger.info("Профиль обновлён", user_id=str(current_user.id))

    return _build_user_response(current_user)
