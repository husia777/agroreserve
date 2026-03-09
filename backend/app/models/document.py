"""
Модель сгенерированного документа (счёт, ТОРГ-12, УПД, ярлык).
Коллекция: documents
"""
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from beanie import Document, Indexed
from pydantic import Field


class DocumentType(str, Enum):
    """Типы документов системы."""
    INVOICE = "invoice"           # Счёт на оплату
    TORG12 = "torg12"             # ТОРГ-12 (товарная накладная)
    UPD = "upd"                   # УПД (универсальный передаточный документ)
    ACT_SVERKI = "act_sverki"     # Акт сверки взаиморасчётов
    LABEL = "label"               # Ярлык для упаковки
    CONTRACT = "contract"         # Договор поставки


class DocumentRecord(Document):
    """
    Запись о сгенерированном документе.

    Нумерация автоматическая, сквозная по году:
    - Счёт-001, Счёт-002, ...
    - ТОРГ12-001, ТОРГ12-002, ...
    - УПД-001, ...

    Файлы хранятся в S3/GridFS, здесь только метаданные и URL.
    """

    # ── Тип и номер ───────────────────────────────────────────
    doc_type: DocumentType = Field(..., description="Тип документа")
    number: str = Field(..., description="Номер документа (Счёт-001, ТОРГ12-001)")
    # Год для сквозной нумерации
    year: int = Field(..., description="Год (для сквозной нумерации)")

    # ── Связи ─────────────────────────────────────────────────
    order_id: Optional[str] = Field(None, description="ID заказа (если относится к заказу)")
    client_id: str = Field(..., description="ID клиента")
    client_name: str = Field(..., description="Имя клиента (кэш)")

    # ── Файл ──────────────────────────────────────────────────
    file_url: Optional[str] = Field(None, description="URL PDF файла (S3)")
    file_name: str = Field(..., description="Имя файла для скачивания")
    file_size_bytes: Optional[int] = Field(None, description="Размер файла в байтах")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    created_by: Optional[str] = Field(None, description="ID пользователя, создавшего документ")

    class Settings:
        name = "documents"
        indexes = [
            [("doc_type", 1), ("year", 1), ("number", 1)],
            [("order_id", 1)],
            [("client_id", 1), ("created_at", -1)],
            [("doc_type", 1), ("created_at", -1)],
        ]

    @classmethod
    def get_document_prefix(cls, doc_type: DocumentType) -> str:
        """Возвращает префикс для нумерации документа."""
        prefixes = {
            DocumentType.INVOICE: "Счёт",
            DocumentType.TORG12: "ТОРГ12",
            DocumentType.UPD: "УПД",
            DocumentType.ACT_SVERKI: "Сверка",
            DocumentType.LABEL: "Ярлык",
            DocumentType.CONTRACT: "Договор",
        }
        return prefixes.get(doc_type, "Документ")
