"""
Админский роутер резервного копирования (UC-51).
Эндпоинты: /api/v1/admin/backups/

Бэкап через pymongo — не требует mongodump/mongorestore.
Каждый бэкап — JSON-файл с полным дампом всех коллекций.
"""

import gzip
import json
import os
from datetime import UTC, datetime
from pathlib import Path

import structlog
from bson import json_util
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from app.utils.security import require_admin

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/admin/backups", tags=["Админ: Бэкапы"])

BACKUP_DIR = "/app/backups"


# ── Схемы ────────────────────────────────────────────────────


class BackupInfo(BaseModel):
    """Информация о бэкапе."""

    name: str = Field(..., description="Имя файла бэкапа")
    created_at: str = Field(..., description="Дата создания (ISO)")
    size_bytes: int = Field(..., description="Размер в байтах")
    size_human: str = Field(..., description="Размер в читаемом формате")


class BackupListResponse(BaseModel):
    """Список бэкапов."""

    items: list[BackupInfo] = Field(default_factory=list)
    total: int = Field(default=0)


class BackupCreateResponse(BaseModel):
    """Ответ на создание бэкапа."""

    status_result: str = Field(..., alias="status")
    backup_name: str
    size_bytes: int
    size_human: str
    collections: int
    documents: int
    message: str

    model_config = {"populate_by_name": True}


class RestoreResponse(BaseModel):
    """Ответ на восстановление."""

    status_result: str = Field(..., alias="status")
    collections: int
    documents: int
    message: str

    model_config = {"populate_by_name": True}


# ── Вспомогательные функции ──────────────────────────────────


def _human_size(size_bytes: int) -> str:
    """Форматирует размер в читаемый вид."""
    if size_bytes < 1024:
        return f"{size_bytes} Б"
    if size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} КБ"
    if size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes / (1024 * 1024):.1f} МБ"
    return f"{size_bytes / (1024 * 1024 * 1024):.2f} ГБ"


def _list_backups():
    """Сканирует директорию бэкапов."""
    Path(BACKUP_DIR).mkdir(parents=True, exist_ok=True)
    backups = []

    for entry in os.scandir(BACKUP_DIR):
        if not entry.name.startswith("backup_") or not entry.name.endswith(".json.gz"):
            continue

        size = entry.stat().st_size
        try:
            ts_part = entry.name.replace("backup_", "").replace(".json.gz", "")
            dt = datetime.strptime(ts_part, "%Y%m%d_%H%M%S").replace(tzinfo=UTC)
            created_str = dt.isoformat()
        except ValueError:
            created_str = datetime.fromtimestamp(entry.stat().st_mtime, tz=UTC).isoformat()

        backups.append(
            BackupInfo(
                name=entry.name,
                created_at=created_str,
                size_bytes=size,
                size_human=_human_size(size),
            )
        )

    backups.sort(key=lambda b: b.created_at, reverse=True)
    return backups


async def _get_database():
    """Получает ссылку на базу данных MongoDB."""
    from app.models.user import User

    return User.get_motor_collection().database


async def _dump_database():
    """Дампит все коллекции базы в словарь."""
    db = await _get_database()
    dump_data = {}
    total_docs = 0

    collection_names = await db.list_collection_names()
    collection_names = [name for name in collection_names if not name.startswith("system.")]

    for col_name in sorted(collection_names):
        collection = db[col_name]
        documents = []
        async for doc in collection.find():
            documents.append(doc)
        dump_data[col_name] = json.loads(json_util.dumps(documents))
        total_docs += len(documents)

    return {
        "meta": {
            "created_at": datetime.now(UTC).isoformat(),
            "collections": len(collection_names),
            "documents": total_docs,
            "version": "1.0",
        },
        "collections": dump_data,
    }


def _rotate_backups(max_count=7):
    """Удаляет старые бэкапы, оставляя max_count последних."""
    try:
        entries = sorted(
            [e for e in os.scandir(BACKUP_DIR) if e.name.startswith("backup_") and e.name.endswith(".json.gz")],
            key=lambda x: x.stat().st_mtime,
            reverse=True,
        )
        for old_entry in entries[max_count:]:
            try:
                Path(old_entry.path).unlink()
                logger.info("Старый бэкап удалён", path=old_entry.path)
            except Exception as e:
                logger.warning("Не удалось удалить", path=old_entry.path, error=str(e))
    except Exception as e:
        logger.warning("Ошибка ротации бэкапов", error=str(e))


# ── Эндпоинты ────────────────────────────────────────────────


@router.get(
    "",
    response_model=BackupListResponse,
    summary="Список бэкапов",
)
async def list_backups(admin=Depends(require_admin)):
    """Возвращает список всех доступных бэкапов."""
    backups = _list_backups()
    return BackupListResponse(items=backups, total=len(backups))


@router.post(
    "",
    response_model=BackupCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать бэкап вручную",
)
async def create_backup(admin=Depends(require_admin)):
    """Создаёт полный бэкап базы данных MongoDB в сжатый JSON."""
    timestamp = datetime.now(UTC).strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{timestamp}.json.gz"
    backup_path = Path(BACKUP_DIR) / backup_name
    Path(BACKUP_DIR).mkdir(parents=True, exist_ok=True)

    logger.info("Создание бэкапа", admin_id=str(admin.id), backup_name=backup_name)

    try:
        dump = await _dump_database()
        json_bytes = json.dumps(dump, ensure_ascii=False).encode("utf-8")
        with gzip.open(backup_path, "wb") as f:
            f.write(json_bytes)

        size = Path(backup_path).stat().st_size
        meta = dump["meta"]
        _rotate_backups(max_count=7)

        logger.info("Бэкап создан", backup_name=backup_name, size_bytes=size)

        return {
            "status": "ok",
            "backup_name": backup_name,
            "size_bytes": size,
            "size_human": _human_size(size),
            "collections": meta["collections"],
            "documents": meta["documents"],
            "message": f"Бэкап создан: {meta['collections']} коллекций, {meta['documents']} документов",
        }

    except Exception as e:
        logger.error("Ошибка создания бэкапа", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка создания бэкапа: {e!s}",
        ) from e


@router.get(
    "/{backup_name}/download",
    summary="Скачать бэкап",
)
async def download_backup(backup_name: str, admin=Depends(require_admin)):
    """Скачивает файл бэкапа."""
    backup_path = Path(BACKUP_DIR) / backup_name
    if not backup_path.exists():
        raise HTTPException(status_code=404, detail=f"Бэкап '{backup_name}' не найден")

    return FileResponse(path=backup_path, filename=backup_name, media_type="application/gzip")


@router.post(
    "/{backup_name}/restore",
    response_model=RestoreResponse,
    summary="Восстановить из бэкапа",
)
async def restore_backup(backup_name: str, admin=Depends(require_admin)):
    """Восстанавливает базу из бэкапа. Перезаписывает текущие данные!"""
    backup_path = Path(BACKUP_DIR) / backup_name
    if not backup_path.exists():
        raise HTTPException(status_code=404, detail=f"Бэкап '{backup_name}' не найден")

    logger.warning("Восстановление из бэкапа", backup_name=backup_name, admin_id=str(admin.id))

    try:
        with gzip.open(backup_path, "rb") as f:
            raw = f.read()
        dump = json.loads(raw.decode("utf-8"))
        collections_data = dump.get("collections", {})
        db = await _get_database()
        total_docs = 0

        for col_name, documents_json in collections_data.items():
            if col_name.startswith("system."):
                continue
            collection = db[col_name]
            await collection.drop()
            if documents_json:
                documents = json_util.loads(json.dumps(documents_json))
                await collection.insert_many(documents)
                total_docs += len(documents)

        logger.info("Восстановление завершено", collections=len(collections_data), documents=total_docs)

        return {
            "status": "ok",
            "collections": len(collections_data),
            "documents": total_docs,
            "message": f"Восстановлено: {len(collections_data)} коллекций, {total_docs} документов",
        }

    except Exception as e:
        logger.error("Ошибка восстановления", error=str(e))
        raise HTTPException(status_code=500, detail=f"Ошибка восстановления: {e!s}") from e


@router.delete(
    "/{backup_name}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить бэкап",
)
async def delete_backup(backup_name: str, admin=Depends(require_admin)):
    """Удаляет указанный бэкап."""
    backup_path = Path(BACKUP_DIR) / backup_name
    if not backup_path.exists():
        raise HTTPException(status_code=404, detail=f"Бэкап '{backup_name}' не найден")

    try:
        backup_path.unlink()
        logger.info("Бэкап удалён", backup_name=backup_name)
    except Exception as e:
        logger.error("Ошибка удаления бэкапа", backup_name=backup_name, error=str(e))
