"""
Схемы для аутентификации и авторизации.
"""
import re
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class DocumentPreferencesSchema(BaseModel):
    """UC-265: Настройка пакета документов клиента."""
    torg12: bool = True
    invoice: bool = True
    upd: bool = False
    scheta_factura: bool = False
    act_sverki: bool = False
    realization: bool = False


class OrganizationCreate(BaseModel):
    """Реквизиты организации при регистрации B2B клиента."""
    name: str = Field(..., min_length=2, max_length=200,
                      description="Название организации")
    inn: str = Field(..., min_length=10, max_length=12,
                     description="ИНН (10 или 12 цифр)")
    kpp: Optional[str] = Field(
        None, min_length=9, max_length=9, description="КПП (9 цифр, для ООО)")
    legal_address: str = Field(..., min_length=5,
                               max_length=500, description="Юридический адрес")
    bank_name: Optional[str] = Field(
        None, max_length=200, description="Название банка")
    bik: Optional[str] = Field(
        None, min_length=9, max_length=9, description="БИК (9 цифр)")
    account: Optional[str] = Field(
        None, min_length=20, max_length=20, description="Расчётный счёт (20 цифр)")

    @field_validator("inn")
    @classmethod
    def validate_inn(cls, v: str) -> str:
        if not v.isdigit():
            raise ValueError("ИНН должен содержать только цифры")
        if len(v) not in (10, 12):
            raise ValueError(
                "ИНН должен содержать 10 цифр (для ООО) или 12 цифр (для ИП)")
        return v

    @field_validator("bik")
    @classmethod
    def validate_bik(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.isdigit():
            raise ValueError("БИК должен содержать только цифры")
        return v


class UserRegister(BaseModel):
    """Запрос на регистрацию нового пользователя."""
    phone: Optional[str] = Field(
        None, description="Телефон в формате +7XXXXXXXXXX")
    email: Optional[EmailStr] = Field(
        None, description="Email (необязательно)")
    full_name: str = Field(..., min_length=2,
                           max_length=200, description="Полное имя")
    password: str = Field(..., min_length=8, max_length=100,
                          description="Пароль (мин. 8 символов)")
    client_type: str = Field(
        "individual", description="Тип клиента: b2b, b2c, individual, ip, ooo")
    # Реквизиты организации — вложенный объект (альтернативный формат)
    organization: Optional[OrganizationCreate] = Field(
        None, description="Реквизиты организации (обязательно для B2B)"
    )
    # Плоские поля от фронтенда (альтернативный формат)
    organization_name: Optional[str] = Field(
        None, description="Название организации (плоский формат)")
    inn: Optional[str] = Field(None, description="ИНН (плоский формат)")
    legal_address: Optional[str] = Field(
        None, description="Юр. адрес (плоский формат)")
    delivery_address: Optional[str] = Field(
        None, max_length=500, description="Адрес доставки")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        # Нормализация: убираем пробелы, скобки, дефисы
        cleaned = re.sub(r"[\s\-\(\)]", "", v)
        # Принимаем +7... или 8...
        if cleaned.startswith("8") and len(cleaned) == 11:
            cleaned = "+7" + cleaned[1:]
        if not re.match(r"^\+7\d{10}$", cleaned):
            raise ValueError("Укажите телефон в формате +7XXXXXXXXXX")
        return cleaned

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Пароль должен содержать не менее 8 символов")
        return v

    @field_validator("client_type")
    @classmethod
    def validate_client_type(cls, v: str) -> str:
        # Принимаем оба формата: фронтенд (individual/ip/ooo) и бэкенд (b2b/b2c)
        allowed = ("b2b", "b2c", "individual", "ip", "ooo")
        if v not in allowed:
            raise ValueError(f"Тип клиента: {', '.join(allowed)}")
        return v

    def get_resolved_client_type(self) -> str:
        """Конвертирует фронтенд client_type в бэкенд формат."""
        if self.client_type in ("ip", "ooo"):
            return "b2b"
        if self.client_type == "individual":
            return "b2c"
        return self.client_type

    def get_organization(self) -> Optional[OrganizationCreate]:
        """Собирает OrganizationCreate из вложенного объекта или плоских полей."""
        if self.organization:
            return self.organization
        # Пробуем собрать из плоских полей
        if self.organization_name and self.inn and self.legal_address:
            return OrganizationCreate(
                name=self.organization_name,
                inn=self.inn,
                legal_address=self.legal_address,
            )
        return None


class UserLogin(BaseModel):
    """Запрос на вход в систему."""
    phone: Optional[str] = Field(
        None, description="Телефон в формате +7XXXXXXXXXX")
    email: Optional[EmailStr] = Field(None, description="Email адрес")
    password: str = Field(..., description="Пароль")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        cleaned = re.sub(r"[\s\-\(\)]", "", v)
        if cleaned.startswith("8") and len(cleaned) == 11:
            cleaned = "+7" + cleaned[1:]
        if not re.match(r"^\+7\d{10}$", cleaned):
            raise ValueError("Укажите телефон в формате +7XXXXXXXXXX")
        return cleaned


class TokenResponse(BaseModel):
    """Ответ с JWT токенами после успешного входа."""
    access_token: str = Field(..., description="Access токен (15 мин)")
    refresh_token: str = Field(..., description="Refresh токен (30 дней)")
    token_type: str = Field("bearer", description="Тип токена")
    expires_in: int = Field(...,
                            description="Время жизни access токена в секундах")


class RefreshTokenRequest(BaseModel):
    """Запрос на обновление токена."""
    refresh_token: str = Field(..., description="Действующий refresh токен")


class OrganizationResponse(BaseModel):
    """Реквизиты организации в ответе API."""
    name: str
    inn: str
    kpp: Optional[str] = None
    legal_address: str
    bank_name: Optional[str] = None
    bik: Optional[str] = None
    account: Optional[str] = None

    model_config = {"from_attributes": True}


class UserResponse(BaseModel):
    """Данные пользователя в ответе API."""
    id: str = Field(..., description="ID пользователя")
    phone: Optional[str] = None
    email: Optional[str] = None
    full_name: str = Field(..., description="Полное имя")
    role: str
    client_type: str
    status: str
    organization: Optional[OrganizationResponse] = None
    delivery_address: Optional[str] = None
    credit_limit: float = 0.0
    current_debt: float = 0.0
    telegram_chat_id: Optional[str] = None
    created_at: str
    document_preferences: Optional[DocumentPreferencesSchema] = None

    model_config = {"from_attributes": True}


class AuthLoginResponse(BaseModel):
    """Ответ на логин/регистрацию — токены + данные пользователя."""
    tokens: TokenResponse
    user: UserResponse

    model_config = {"from_attributes": True}


class UserUpdateProfile(BaseModel):
    """Запрос на обновление профиля пользователя."""
    name: Optional[str] = Field(None, min_length=2, max_length=200)
    email: Optional[EmailStr] = None
    delivery_address: Optional[str] = Field(None, max_length=500)
    organization: Optional[OrganizationCreate] = None
    document_preferences: Optional[DocumentPreferencesSchema] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
