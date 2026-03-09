"""
Celery задачи резервного копирования (UC-51).
Ежедневный бэкап MongoDB через pymongo (без mongodump).
"""
import gzip
import json
import os
from datetime import datetime, timezone

import structlog
from bson import json_util
from pymongo import MongoClient

from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)

BACKUP_DIR = "/app/backups"


@celery_app.task(
    name="app.tasks.backup_tasks.create_mongodb_backup",
    queue="default",
)
def create_mongodb_backup():
    """Ежедневный бэкап MongoDB через pymongo."""
    from app.config import settings

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{timestamp}.json.gz"
    backup_path = os.path.join(BACKUP_DIR, backup_name)
    os.makedirs(BACKUP_DIR, exist_ok=True)

    logger.info("Запуск автоматического бэкапа", backup_name=backup_name)

    try:
        client = MongoClient(settings.MONGODB_URI)
        db = client[settings.MONGODB_DB_NAME]
        dump_data = {}
        total_docs = 0

        for col_name in sorted(n for n in db.list_collection_names() if not n.startswith("system.")):
            documents = list(db[col_name].find())
            dump_data[col_name] = json.loads(json_util.dumps(documents))
            total_docs += len(documents)

        backup = {
            "meta": {
                "created_at": datetime.now(timezone.utc).isoformat(),
                "collections": len(dump_data),
                "documents": total_docs,
                "version": "1.0",
            },
            "collections": dump_data,
        }

        json_bytes = json.dumps(backup, ensure_ascii=False).encode("utf-8")
        with gzip.open(backup_path, "wb") as f:
            f.write(json_bytes)

        size = os.path.getsize(backup_path)
        _rotate_backups(max_count=7)
        client.close()

        logger.info("Бэкап создан", backup_name=backup_name, size_bytes=size)
        return {"status": "ok", "backup_name": backup_name, "size_bytes": size}

    except Exception as e:
        logger.error("Ошибка бэкапа", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(name="app.tasks.backup_tasks.backup_media_files", queue="default")
def backup_media_files():
    """ЗАГЛУШКА: Бэкап медиафайлов."""
    return {"status": "stub", "message": "Настройте S3 для бэкапа файлов"}


def _rotate_backups(max_count=7):
    """Удаляет старые бэкапы."""
    try:
        entries = sorted(
            [e for e in os.scandir(BACKUP_DIR) if e.name.startswith("backup_") and e.name.endswith(".json.gz")],
            key=lambda x: x.stat().st_mtime, reverse=True,
        )
        for old in entries[max_count:]:
            os.remove(old.path)
            logger.info("Старый бэкап удалён", path=old.path)
    except Exception as e:
        logger.warning("Ошибка ротации", error=str(e))
