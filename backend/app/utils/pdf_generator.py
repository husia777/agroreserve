"""
Утилиты для генерации PDF документов через WeasyPrint.

Вспомогательные функции:
- Чтение PDF файлов для отдачи клиенту
- Общие стили для документов
- Получение реквизитов ИП из настроек
"""

from pathlib import Path
from typing import Optional

import structlog

logger = structlog.get_logger(__name__)

DOCUMENTS_DIR = "/app/media/documents"


def get_document_path(filename: str) -> Optional[Path]:
    """
    Возвращает полный путь к файлу документа.

    Args:
        filename: Имя файла (без пути)

    Returns:
        Путь к файлу или None если не найден
    """
    filepath = Path(DOCUMENTS_DIR) / filename
    if filepath.exists():
        return filepath

    # Пробуем HTML версию (если WeasyPrint не был доступен)
    html_path = filepath.with_suffix(".html")
    if html_path.exists():
        return html_path

    return None


def get_content_type(filepath: Path) -> str:
    """Определяет MIME тип по расширению файла."""
    suffix = filepath.suffix.lower()
    if suffix == ".pdf":
        return "application/pdf"
    if suffix == ".html":
        return "text/html; charset=utf-8"
    return "application/octet-stream"


async def read_document_bytes(filename: str) -> Optional[bytes]:
    """
    Читает файл документа и возвращает байты.

    Args:
        filename: Имя файла

    Returns:
        Байты файла или None если не найден
    """
    filepath = get_document_path(filename)
    if not filepath:
        return None

    try:
        with Path.open(filepath, "rb") as f:
            return f.read()
    except Exception as e:
        logger.error("Ошибка чтения файла документа", filename=filename, error=str(e))
        return None


def get_base_styles() -> str:
    """
    Возвращает базовые CSS стили для документов.
    """
    return """
    @page {
        size: A4;
        margin: 15mm 20mm;
    }
    body {
        font-family: Arial, 'DejaVu Sans', sans-serif;
        font-size: 12px;
        color: #000;
        line-height: 1.4;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #000;
        padding: 4px 6px;
    }
    .no-border td, .no-border th {
        border: none;
        padding: 2px 4px;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-bold { font-weight: bold; }
    .text-sm { font-size: 10px; }
    """


async def ensure_documents_dir() -> None:
    """Создаёт директорию для документов если не существует."""
    Path(DOCUMENTS_DIR).mkdir(exist_ok=True)
    logger.debug("Директория документов проверена", path=DOCUMENTS_DIR)
