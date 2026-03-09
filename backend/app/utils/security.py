"""
Утилиты безопасности — JWT токены, хэширование паролей, зависимости FastAPI.
"""
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
import structlog
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.config import settings

logger = structlog.get_logger(__name__)

# Bearer token схема для Swagger UI
bearer_scheme = HTTPBearer(auto_error=False)


# ── Работа с паролями ─────────────────────────────────────────

def get_password_hash(password: str) -> str:
    """Хэширует пароль с использованием bcrypt."""
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password_bytes, salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверяет пароль против хэша."""
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )
    except Exception:
        return False


# ── JWT токены ────────────────────────────────────────────────

def create_access_token(
    subject: str,
    role: str = "client",
    extra_data: Optional[dict] = None,
) -> str:
    """
    Создаёт JWT access токен.

    Args:
        subject: ID пользователя (строка из ObjectId)
        role: Роль пользователя (admin/client)
        extra_data: Дополнительные данные в payload

    Returns:
        Подписанный JWT токен
    """
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": subject,
        "role": role,
        "type": "access",
        "iat": datetime.now(timezone.utc),
        "exp": expire,
    }

    if extra_data:
        payload.update(extra_data)

    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def create_refresh_token(subject: str) -> str:
    """
    Создаёт JWT refresh токен с длительным сроком жизни.

    Args:
        subject: ID пользователя

    Returns:
        Подписанный JWT refresh токен
    """
    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
    )

    payload = {
        "sub": subject,
        "type": "refresh",
        "iat": datetime.now(timezone.utc),
        "exp": expire,
    }

    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def verify_token(token: str, expected_type: str = "access") -> dict:
    """
    Декодирует и проверяет JWT токен.

    Args:
        token: JWT токен
        expected_type: Ожидаемый тип токена ('access' или 'refresh')

    Returns:
        Payload токена

    Raises:
        HTTPException: При невалидном или истёкшем токене
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Недействительный токен авторизации",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )

        # Проверяем тип токена
        token_type: str = payload.get("type", "")
        if token_type != expected_type:
            logger.warning(
                "Неверный тип токена",
                expected=expected_type,
                got=token_type,
            )
            raise credentials_exception

        # Проверяем наличие subject
        user_id: Optional[str] = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        return payload

    except JWTError as e:
        logger.warning("Ошибка валидации JWT", error=str(e))
        raise credentials_exception


# ── FastAPI Dependencies ──────────────────────────────────────

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
):
    """
    FastAPI зависимость — извлекает текущего пользователя из JWT токена.
    Используй в эндпоинтах, требующих авторизации.

    Returns:
        Объект User из базы данных

    Raises:
        HTTPException 401: При отсутствии или невалидном токене
        HTTPException 404: Если пользователь не найден в БД
    """
    # Импортируем здесь, чтобы избежать циклических импортов
    from app.models.user import User

    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Требуется авторизация",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = verify_token(credentials.credentials, expected_type="access")
    user_id: str = payload["sub"]

    # Загружаем пользователя из MongoDB
    user = await User.get(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден",
        )

    # Проверяем, что пользователь не заблокирован
    if user.status == "blocked":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Аккаунт заблокирован. Обратитесь в поддержку.",
        )

    return user


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
):
    """
    Опциональная авторизация — возвращает пользователя или None.
    Используй в эндпоинтах, где авторизация необязательна (например, каталог).
    """
    if credentials is None:
        return None

    try:
        from app.models.user import User

        payload = verify_token(credentials.credentials, expected_type="access")
        user_id: str = payload["sub"]
        return await User.get(user_id)
    except HTTPException:
        return None


async def require_admin(
    current_user=Depends(get_current_user),
):
    """
    FastAPI зависимость — требует роль admin.
    Использовать для всех эндпоинтов /api/v1/admin/.

    Raises:
        HTTPException 403: Если пользователь не admin
    """
    if current_user.role != "admin":
        logger.warning(
            "Попытка доступа к admin-ресурсу без прав",
            user_id=str(current_user.id),
            role=current_user.role,
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ запрещён. Требуются права администратора.",
        )
    return current_user


async def require_approved_client(
    current_user=Depends(get_current_user),
):
    """
    FastAPI зависимость — требует одобренного клиента (статус approved).
    Для B2B клиентов на модерации доступ к заказам запрещён.

    Raises:
        HTTPException 403: Если клиент не одобрен
    """
    if current_user.role == "admin":
        # Администратор всегда имеет доступ
        return current_user

    if current_user.status == "pending":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Ваша заявка на рассмотрении. Ожидайте одобрения администратора.",
        )

    if current_user.status == "rejected":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Ваша заявка отклонена. Обратитесь в службу поддержки.",
        )

    if current_user.status != "approved":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ к данной функции ограничен.",
        )

    return current_user
