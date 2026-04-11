"""
Модель настроек системы (синглтон).
Коллекция: settings
"""

from datetime import UTC, datetime
from typing import Optional

from beanie import Document
from pydantic import BaseModel, Field


class BankDetails(BaseModel):
    """Банковские реквизиты ИП."""

    bank_name: str = Field("", description="Название банка")
    bik: str = Field("", description="БИК банка")
    account: str = Field("", description="Расчётный счёт")
    correspondent_account: str = Field("", description="Корреспондентский счёт")


class DeliverySlot(BaseModel):
    """Временной слот доставки."""

    label: str = Field(..., description="Отображаемое название (08:00-11:00)")
    start_time: str = Field(..., description="Начало слота в формате HH:MM")
    end_time: str = Field(..., description="Конец слота в формате HH:MM")
    is_active: bool = Field(True, description="Активен ли слот")


class SystemSettings(Document):
    """
    Настройки системы — синглтон (один документ в коллекции).

    Содержит:
    - Реквизиты ИП для документов (счета, ТОРГ-12)
    - Логотип, печать, подпись для PDF
    - Слоты доставки
    - Часы работы
    - Прочие настройки
    """

    # ── Идентификатор синглтона ───────────────────────────────
    singleton_key: str = Field("main", description="Всегда 'main' — один документ")

    # ── Реквизиты компании ────────────────────────────────────
    company_name: str = Field("ИП Наимов Хусейн Вохиджонович", description="Название ИП/организации")
    inn: str = Field("", description="ИНН")
    kpp: Optional[str] = Field(None, description="КПП (для ООО, у ИП — нет)")
    ogrn: str = Field("", description="ОГРН / ОГРНИП")
    legal_address: str = Field("г. Тобольск, Тюменская область", description="Юридический адрес")
    actual_address: Optional[str] = Field(None, description="Фактический адрес склада")
    phone: str = Field("", description="Контактный телефон")
    email: str = Field("", description="Контактный email")
    website: str = Field("https://agroreserve.ru", description="Сайт")

    # ── Банковские реквизиты ──────────────────────────────────
    bank_details: BankDetails = Field(
        default_factory=lambda: BankDetails(
            bank_name="",
            bik="",
            account="",
            correspondent_account="",
        ),
        description="Банковские реквизиты для документов",
    )

    # ── Медиа для документов ──────────────────────────────────
    logo_url: Optional[str] = Field(None, description="URL логотипа (для PDF документов)")
    stamp_url: Optional[str] = Field(None, description="URL изображения печати")
    signature_url: Optional[str] = Field(None, description="URL изображения подписи")

    # ── Режим работы ──────────────────────────────────────────
    work_hours: str = Field("Пн-Пт: 08:00-17:00, Сб: 08:00-14:00", description="Часы работы для отображения")

    # ── Слоты доставки ────────────────────────────────────────
    delivery_slots: list[DeliverySlot] = Field(
        default_factory=lambda: [
            DeliverySlot(label="08:00-11:00", start_time="08:00", end_time="11:00", is_active=True),
            DeliverySlot(label="11:00-14:00", start_time="11:00", end_time="14:00", is_active=True),
            DeliverySlot(label="14:00-17:00", start_time="14:00", end_time="17:00", is_active=True),
        ],
        description="Временные слоты доставки",
    )

    # ── Бизнес-настройки ─────────────────────────────────────
    # Минимальная сумма заказа для B2B
    min_order_amount_b2b: float = Field(500.0, ge=0, description="Минимальная сумма B2B заказа (₽)")
    # Количество дней для подтверждения заказа (после этого — автоотмена)
    order_confirmation_days: int = Field(2, description="Дней до автоотмены неподтверждённого заказа")
    # Срок оплаты по умолчанию
    default_payment_days: int = Field(14, description="Срок оплаты по умолчанию (дней)")

    # ── Счётчики нумерации документов ────────────────────────
    # Сбрасываются в начале каждого года
    invoice_counter: int = Field(0, description="Счётчик номеров счетов")
    torg12_counter: int = Field(0, description="Счётчик номеров ТОРГ-12")
    upd_counter: int = Field(0, description="Счётчик номеров УПД")
    order_counter: int = Field(0, description="Счётчик номеров заказов")
    receipt_counter: int = Field(0, description="Счётчик номеров приходов")

    # ── Метаданные ────────────────────────────────────────────
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "settings"
        indexes = [
            [("singleton_key", 1)],
        ]
