"""
Модель пользователя (клиент и администратор).
Коллекция: users
"""

from datetime import UTC, datetime
from enum import Enum
from typing import Annotated, Optional

from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr, Field


class UserRole(str, Enum):
    """Роли пользователей в системе."""

    ADMIN = "admin"
    CLIENT = "client"


class ClientType(str, Enum):
    """Типы клиентов."""

    B2B = "b2b"  # Юридическое лицо / ИП
    B2C = "b2c"  # Физическое лицо (розница)
    INDIVIDUAL = "individual"  # Физическое лицо без регистрации


class UserStatus(str, Enum):
    """Статусы аккаунта пользователя."""

    PENDING = "pending"  # На модерации (B2B)
    APPROVED = "approved"  # Одобрен
    REJECTED = "rejected"  # Отклонён
    BLOCKED = "blocked"  # Заблокирован


class OrganizationDetails(BaseModel):
    """
    Реквизиты организации для B2B клиентов.
    Встроенная структура (embedded document, не Document).
    """

    name: str = Field(..., description="Название организации")
    inn: str = Field(..., description="ИНН")
    kpp: Optional[str] = Field(None, description="КПП (для ООО)")
    ogrn: Optional[str] = Field(None, description="ОГРН / ОГРНИП")
    legal_address: str = Field(..., description="Юридический адрес")
    bank_name: Optional[str] = Field(None, description="Название банка")
    bik: Optional[str] = Field(None, description="БИК банка")
    account: Optional[str] = Field(None, description="Расчётный счёт")
    correspondent_account: Optional[str] = Field(None, description="Корреспондентский счёт")


class DocumentPreferences(BaseModel):
    """
    UC-265: Настройка пакета документов клиента.
    Клиент выбирает, какие документы получать при отгрузке.
    """

    torg12: bool = Field(True, description="ТОРГ-12")
    invoice: bool = Field(True, description="Счёт на оплату")
    upd: bool = Field(False, description="УПД (универсальный передаточный документ)")
    scheta_factura: bool = Field(False, description="Счёт-фактура")
    act_sverki: bool = Field(False, description="Акт сверки (ежемесячный)")
    realization: bool = Field(False, description="Реализация товаров и услуг")


class NotificationChannels(BaseModel):
    """Настройки каналов уведомлений пользователя."""

    telegram: bool = True
    email: bool = True
    sms: bool = False


class User(Document):
    """
    Пользователь системы — клиент или администратор.

    Индексы:
    - phone (уникальный)
    - email (уникальный, разрежённый)
    - status (для фильтрации на модерации)
    - role (для разделения клиентов и администраторов)
    """

    # ── Контактные данные ────────────────────────────────────
    phone: Annotated[str, Indexed(unique=True)] = Field(..., description="Телефон в формате +7XXXXXXXXXX")
    email: Annotated[Optional[EmailStr], Indexed(unique=True)] = Field(None, description="Email адрес")

    name: str = Field(..., description="Полное имя / название организации")
    password_hash: str = Field(..., description="Хэш пароля (bcrypt)")

    # ── Роль и тип ────────────────────────────────────────────
    role: UserRole = Field(UserRole.CLIENT, description="Роль в системе")
    client_type: ClientType = Field(ClientType.B2C, description="Тип клиента")

    # ── Реквизиты организации (для B2B) ──────────────────────
    organization: Optional[OrganizationDetails] = Field(None, description="Реквизиты организации")

    # ── Адрес доставки по умолчанию ──────────────────────────
    delivery_address: Optional[str] = Field(None, description="Адрес доставки по умолчанию")

    # ── Финансы ───────────────────────────────────────────────
    credit_limit: float = Field(0.0, ge=0, description="Кредитный лимит в рублях")
    current_debt: float = Field(0.0, ge=0, description="Текущая задолженность в рублях")

    # ── Статус аккаунта ───────────────────────────────────────
    status: UserStatus = Field(UserStatus.APPROVED, description="Статус аккаунта")
    rejection_reason: Optional[str] = Field(None, description="Причина отклонения (от администратора)")

    # ── Telegram интеграция ───────────────────────────────────
    telegram_chat_id: Optional[str] = Field(None, description="Telegram chat ID для уведомлений")
    telegram_username: Optional[str] = Field(None, description="Telegram username")

    # ── Настройки уведомлений ─────────────────────────────────
    notification_channels: NotificationChannels = Field(
        default_factory=lambda: NotificationChannels(),
        description="Каналы уведомлений",
    )

    # ── UC-265: Пакет документов клиента ──────────────────────
    document_preferences: DocumentPreferences = Field(
        default_factory=lambda: DocumentPreferences(),
        description="Какие документы формировать при отгрузке",
    )

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        description="Дата регистрации",
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        description="Дата последнего обновления",
    )
    last_login_at: Optional[datetime] = Field(None, description="Последний вход в систему")
    external_id_1c: str | None = Field(None, description="GUID контрагента в 1С")

    class Settings:
        name = "users"
        # Индексы MongoDB
        indexes = [
            [("phone", 1)],
            [("email", 1)],
            [("role", 1)],
            [("status", 1)],
            [("created_at", -1)],
        ]

    def is_b2b_approved(self) -> bool:
        """Проверяет, является ли пользователь одобренным B2B-клиентом."""
        return (
            self.role == UserRole.CLIENT and self.client_type == ClientType.B2B and self.status == UserStatus.APPROVED
        )

    def can_place_order(self) -> bool:
        """Проверяет, может ли клиент оформить заказ (не заблокирован по кредиту)."""
        if self.role == UserRole.ADMIN:
            return True
        if self.status != UserStatus.APPROVED:
            return False
        # Проверка кредитного лимита
        if self.credit_limit > 0 and self.current_debt >= self.credit_limit:
            return False
        return True

    def available_credit(self) -> float:
        """Возвращает доступный кредит."""
        return max(0.0, self.credit_limit - self.current_debt)
