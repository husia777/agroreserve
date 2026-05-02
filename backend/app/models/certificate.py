"""
Модель сертификата / декларации соответствия.
Коллекция: certificates
"""

from datetime import UTC, datetime
from datetime import date as DateType
from enum import Enum
from typing import Annotated, Optional

from beanie import Document, Indexed
from pydantic import Field


class CertificateType(str, Enum):
    """Типы сертификационных документов."""

    DECLARATION_TR_TS = "declaration_tr_ts"  # Декларация ТР ТС (технический регламент)
    CERTIFICATE = "certificate"  # Сертификат соответствия
    VET_CERTIFICATE = "vet_certificate"  # Ветеринарный сертификат
    QUALITY_CERTIFICATE = "quality_certificate"  # Удостоверение качества
    OTHER = "other"  # Иное


class CertificateStatus(str, Enum):
    """Статус действия сертификата."""

    ACTIVE = "active"  # Действующий
    EXPIRING_SOON = "expiring_soon"  # Истекает скоро (< 30 дней)
    EXPIRED = "expired"  # Просрочен


class Certificate(Document):
    """
    Сертификат / декларация соответствия.

    Один сертификат может быть привязан к нескольким товарам.
    При просрочке сертификата администратор получает уведомление.
    """

    # ── Номер и тип ───────────────────────────────────────────
    number: Annotated[str, Indexed()] = Field(..., description="Номер сертификата / декларации")
    cert_type: CertificateType = Field(..., description="Тип сертификационного документа")

    # ── Даты ──────────────────────────────────────────────────
    issued_date: DateType = Field(..., description="Дата выдачи")
    expiry_date: DateType = Field(..., description="Срок действия")
    issuing_authority: Optional[str] = Field(None, description="Орган, выдавший документ")

    # ── Привязка к товарам ────────────────────────────────────
    # Хранится как список строк (ObjectId) для избежания циклических зависимостей
    product_ids: list[str] = Field(
        default_factory=list,
        description="ID товаров, на которые распространяется сертификат",
    )

    # ── Файл ──────────────────────────────────────────────────
    file_url: Optional[str] = Field(None, description="URL скана сертификата (S3/GridFS)")
    file_name: Optional[str] = Field(None, description="Оригинальное имя файла")

    # ── Статус ────────────────────────────────────────────────
    status: CertificateStatus = Field(CertificateStatus.ACTIVE, description="Статус действия")

    # ── Дополнительно ─────────────────────────────────────────
    notes: Optional[str] = Field(None, description="Дополнительные заметки")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "certificates"
        indexes = [
            [("number", 1)],
            [("status", 1)],
            [("expiry_date", 1)],
            [("product_ids", 1)],
        ]

    def recalculate_status(self) -> CertificateStatus:
        """
        Пересчитывает статус на основе текущей даты.
        Вызывать при каждом чтении или через Celery задачу ежедневно.
        """
        from datetime import date as date_type

        today = date_type.today()
        from app.config import settings as app_settings

        if self.expiry_date < today:
            return CertificateStatus.EXPIRED
        days_left = (self.expiry_date - today).days
        if days_left <= app_settings.CERTIFICATE_EXPIRY_WARNING_DAYS:
            return CertificateStatus.EXPIRING_SOON
        return CertificateStatus.ACTIVE

    def is_valid(self) -> bool:
        """Проверяет, действителен ли сертификат на текущий момент."""
        from datetime import date as date_type

        return self.expiry_date >= date_type.today()
