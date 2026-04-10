"""
Роутер аутентификации и авторизации.
Эндпоинты: /api/v1/auth/
"""
from datetime import datetime, timezone

import structlog
from fastapi import APIRouter, Depends, HTTPException, status

from app.config import settings
from app.models.user import ClientType, User, UserRole, UserStatus
from app.schemas.auth import (
    AuthLoginResponse,
    ChangePasswordRequest,
    DocumentPreferencesSchema,
    OrganizationResponse,
    RefreshTokenRequest,
    TokenResponse,
    UserLogin,
    UserRegister,
    UserResponse,
)
from app.utils.security import (
    create_access_token,
    create_refresh_token,
    get_current_user,
    get_password_hash,
    verify_password,
    verify_token,
)

router = APIRouter(prefix="/api/v1/auth", tags=["Авторизация"])
logger = structlog.get_logger(__name__)


def _build_user_response(user: User) -> UserResponse:
    """Формирует UserResponse из модели User."""
    org_response = None
    if user.organization:
        org_response = OrganizationResponse(
            name=user.organization.name,
            inn=user.organization.inn,
            kpp=user.organization.kpp,
            legal_address=user.organization.legal_address,
            bank_name=user.organization.bank_name,
            bik=user.organization.bik,
            account=user.organization.account,
        )

    # UC-265: Пакет документов
    doc_prefs = None
    if user.document_preferences:
        doc_prefs = DocumentPreferencesSchema(
            torg12=user.document_preferences.torg12,
            invoice=user.document_preferences.invoice,
            upd=user.document_preferences.upd,
            scheta_factura=user.document_preferences.scheta_factura,
            act_sverki=user.document_preferences.act_sverki,
            realization=user.document_preferences.realization,
        )
    return UserResponse(
        id=str(user.id),
        phone=user.phone,
        email=str(user.email) if user.email else None,
        full_name=user.name,
        role=user.role.value,
        client_type=user.client_type.value,
        status=user.status.value,
        organization=org_response,
        delivery_address=user.delivery_address,
        credit_limit=user.credit_limit,
        current_debt=user.current_debt,
        telegram_chat_id=user.telegram_chat_id,
        document_preferences=doc_prefs,
        created_at=user.created_at.isoformat(),
    )


def _build_tokens(user: User) -> TokenResponse:
    """Создаёт пару JWT токенов для пользователя."""
    access_token = create_access_token(
        subject=str(user.id),
        role=user.role.value,
    )
    refresh_token = create_refresh_token(subject=str(user.id))

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post(
    "/register",
    response_model=AuthLoginResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация нового пользователя",
    description="B2B клиенты получают статус 'pending' и ждут одобрения. B2C — авто-одобрение.",
)
async def register(data: UserRegister):
    """
    Регистрация нового пользователя.

    - B2B (ИП/ООО): статус pending, требует модерации администратором
    - B2C (физлицо): статус approved, сразу имеет доступ к заказам
    """
    existing_phone = await User.find_one(User.phone == data.phone)
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким телефоном уже зарегистрирован",
        )

    if data.email:
        existing_email = await User.find_one(User.email == data.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь с таким email уже зарегистрирован",
            )

    client_type = ClientType(data.get_resolved_client_type())
    org = data.get_organization()
    if client_type == ClientType.B2B and not org:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Для B2B регистрации необходимо указать реквизиты организации",
        )

    initial_status = (
        UserStatus.PENDING if client_type == ClientType.B2B else UserStatus.APPROVED
    )

    org_details = None
    if org:
        from app.models.user import OrganizationDetails
        org_details = OrganizationDetails(
            name=org.name,
            inn=org.inn,
            kpp=org.kpp,
            legal_address=org.legal_address,
            bank_name=org.bank_name,
            bik=org.bik,
            account=org.account,
        )

    new_user = User(
        phone=data.phone,
        email=data.email,
        name=data.full_name,
        password_hash=get_password_hash(data.password),
        role=UserRole.CLIENT,
        client_type=client_type,
        organization=org_details,
        delivery_address=data.delivery_address,
        status=initial_status,
    )

    await new_user.insert()

    logger.info(
        "Новый пользователь зарегистрирован",
        user_id=str(new_user.id),
        phone=data.phone,
        client_type=data.client_type,
        status=initial_status.value,
    )

    return AuthLoginResponse(
        tokens=_build_tokens(new_user),
        user=_build_user_response(new_user),
    )


@router.post(
    "/login",
    response_model=AuthLoginResponse,
    summary="Вход в систему",
    description="Авторизация по телефону+пароль или email+пароль. Возвращает JWT токены + данные пользователя.",
)
async def login(data: UserLogin):
    """
    Вход в систему.

    Принимает телефон или email + пароль.
    Возвращает access token (15 мин) и refresh token (30 дней) + данные пользователя.
    """
    if not data.phone and not data.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Укажите телефон или email для входа",
        )

    user = None
    if data.phone:
        user = await User.find_one(User.phone == data.phone)
    elif data.email:
        user = await User.find_one(User.email == data.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный телефон/email или пароль",
        )

    if not verify_password(data.password, user.password_hash):
        logger.warning("Неверный пароль при входе",
                       phone=data.phone, email=str(data.email))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный телефон/email или пароль",
        )

    if user.status == UserStatus.BLOCKED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Аккаунт заблокирован. Обратитесь в службу поддержки.",
        )

    user.last_login_at = datetime.now(timezone.utc)
    await user.save()

    logger.info("Успешный вход в систему", user_id=str(
        user.id), role=user.role.value)

    return AuthLoginResponse(
        tokens=_build_tokens(user),
        user=_build_user_response(user),
    )


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Обновление токенов",
    description="Получает новую пару токенов по действующему refresh токену.",
)
async def refresh_tokens(data: RefreshTokenRequest):
    payload = verify_token(data.refresh_token, expected_type="refresh")
    user_id: str = payload["sub"]

    user = await User.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден",
        )

    if user.status == UserStatus.BLOCKED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Аккаунт заблокирован",
        )

    return _build_tokens(user)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Текущий пользователь",
    description="Возвращает данные авторизованного пользователя.",
)
async def get_me(current_user: User = Depends(get_current_user)):
    return _build_user_response(current_user)


@router.post(
    "/logout",
    summary="Выход из системы",
)
async def logout(current_user: User = Depends(get_current_user)):
    """
    Выход из системы.
    Добавляет access token в Redis blacklist до момента его истечения.
    """
    import redis.asyncio as aioredis
    from app.config import settings

    try:
        r = aioredis.from_url(settings.REDIS_URL)
        token_key = f"blacklist:{current_user.id}"
        await r.setex(
            token_key,
            settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "1",
        )
        await r.aclose()
    except Exception as e:
        logger.warning("Не удалось добавить токен в blacklist", error=str(e))

    logger.info("Пользователь вышел из системы", user_id=str(current_user.id))
    return {"detail": "Вы успешно вышли из системы"}


@router.post(
    "/change-password",
    summary="Смена пароля",
)
async def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
):
    """Смена пароля авторизованного пользователя."""
    if not verify_password(data.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный текущий пароль",
        )

    if len(data.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Новый пароль должен быть не менее 6 символов",
        )

    current_user.password_hash = get_password_hash(data.new_password)
    current_user.updated_at = datetime.now(timezone.utc)
    await current_user.save()

    logger.info("Пароль изменён", user_id=str(current_user.id))
    return {"detail": "Пароль успешно изменён"}
