"""
Celery задачи резервного копирования (UC-51).
Ежедневный бэкап MongoDB → локальный файл → S3 (Яндекс.Облако).
"""

import gzip
import json
import os
from datetime import UTC, datetime

import structlog
from bson import json_util
from pymongo import MongoClient

from app.tasks.celery_app import celery_app

logger = structlog.get_logger(__name__)

BACKUP_DIR = "/app/backups"


def _get_s3_client():
    """Создаёт клиент S3 (Яндекс.Облако)."""
    from app.config import settings

    if not settings.S3_ACCESS_KEY_ID or not settings.S3_SECRET_ACCESS_KEY:
        return None

    import boto3

    return boto3.client(
        "s3",
        endpoint_url=settings.S3_ENDPOINT_URL or "https://storage.yandexcloud.net",
        aws_access_key_id=settings.S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
        region_name=settings.S3_REGION or "ru-central1",
    )


def _upload_to_s3(file_path: str, s3_key: str) -> bool:
    """Загружает файл в S3 бакет."""
    from app.config import settings

    s3 = _get_s3_client()
    if not s3:
        logger.warning("S3 не настроен — пропускаем выгрузку в облако")
        return False

    bucket = settings.S3_BUCKET_NAME or "agroreserve-backups"

    try:
        s3.upload_file(
            file_path,
            bucket,
            s3_key,
            ExtraArgs={"ContentType": "application/gzip"},
        )
        logger.info("Файл загружен в S3", key=s3_key, bucket=bucket)
        return True
    except Exception as e:
        logger.error("Ошибка загрузки в S3", error=str(e), key=s3_key)
        return False


def _list_s3_backups() -> list:
    """Список бэкапов в S3."""
    from app.config import settings

    s3 = _get_s3_client()
    if not s3:
        return []

    bucket = settings.S3_BUCKET_NAME or "agroreserve-backups"

    try:
        response = s3.list_objects_v2(Bucket=bucket, Prefix="backups/")
        return sorted(
            [obj for obj in response.get("Contents", []) if obj["Key"].endswith(".json.gz")],
            key=lambda x: x["LastModified"],
            reverse=True,
        )
    except Exception as e:
        logger.error("Ошибка листинга S3", error=str(e))
        return []


def _rotate_s3_backups(max_count: int = 14):
    """Удаляет старые бэкапы из S3 (оставляет max_count)."""
    from app.config import settings

    s3 = _get_s3_client()
    if not s3:
        return

    bucket = settings.S3_BUCKET_NAME or "agroreserve-backups"
    backups = _list_s3_backups()

    for old in backups[max_count:]:
        try:
            s3.delete_object(Bucket=bucket, Key=old["Key"])
            logger.info("Старый S3 бэкап удалён", key=old["Key"])
        except Exception as e:
            logger.warning("Ошибка удаления S3 бэкапа", error=str(e), key=old["Key"])


@celery_app.task(
    name="app.tasks.backup_tasks.create_mongodb_backup",
    queue="default",
)
def create_mongodb_backup():
    """
    Ежедневный бэкап MongoDB через pymongo.
    1. Дампит все коллекции в JSON + gzip
    2. Сохраняет локально (/app/backups/)
    3. Загружает в S3 (Яндекс.Облако), если настроен
    4. Ротация: 7 локальных, 14 в S3
    """
    from app.config import settings

    timestamp = datetime.now(UTC).strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{timestamp}.json.gz"
    backup_path = os.path.join(BACKUP_DIR, backup_name)
    os.makedirs(BACKUP_DIR, exist_ok=True)

    logger.info("Запуск автоматического бэкапа", backup_name=backup_name)

    try:
        # Шаг 1: Дамп MongoDB
        client: MongoClient = MongoClient(settings.MONGODB_URI)
        db = client[settings.MONGODB_DB_NAME]
        dump_data = {}
        total_docs = 0

        for col_name in sorted(n for n in db.list_collection_names() if not n.startswith("system.")):
            documents = list(db[col_name].find())
            dump_data[col_name] = json.loads(json_util.dumps(documents))
            total_docs += len(documents)

        backup = {
            "meta": {
                "created_at": datetime.now(UTC).isoformat(),
                "collections": len(dump_data),
                "documents": total_docs,
                "version": "1.0",
            },
            "collections": dump_data,
        }

        # Шаг 2: Сохранение локально
        json_bytes = json.dumps(backup, ensure_ascii=False).encode("utf-8")
        with gzip.open(backup_path, "wb") as f:
            f.write(json_bytes)

        size = os.path.getsize(backup_path)
        client.close()

        # Шаг 3: Загрузка в S3
        s3_key = f"backups/{backup_name}"
        s3_uploaded = _upload_to_s3(backup_path, s3_key)

        # Шаг 4: Ротация
        _rotate_backups(max_count=7)
        if s3_uploaded:
            _rotate_s3_backups(max_count=14)

        logger.info(
            "Бэкап создан",
            backup_name=backup_name,
            size_bytes=size,
            s3=s3_uploaded,
            docs=total_docs,
            collections=len(dump_data),
        )
        return {
            "status": "ok",
            "backup_name": backup_name,
            "size_bytes": size,
            "s3_uploaded": s3_uploaded,
        }

    except Exception as e:
        logger.error("Ошибка бэкапа", error=str(e))
        return {"status": "error", "error": str(e)}


@celery_app.task(name="app.tasks.backup_tasks.backup_media_files", queue="default")
def backup_media_files():
    """
    Бэкап медиафайлов (фото товаров, сертификаты, документы) в S3.
    Синхронизирует только новые/изменённые файлы.
    """
    from app.config import settings

    s3 = _get_s3_client()
    if not s3:
        return {"status": "skipped", "message": "S3 не настроен"}

    bucket = settings.S3_BUCKET_NAME or "agroreserve-backups"
    media_dirs = ["/app/uploads", "/app/media"]
    uploaded = 0
    errors = 0

    for base_dir in media_dirs:
        if not os.path.exists(base_dir):
            continue

        for root, dirs, files in os.walk(base_dir):
            for file_name in files:
                local_path = os.path.join(root, file_name)
                # S3 ключ: media/uploads/certificates/file.pdf
                relative = os.path.relpath(local_path, "/app")
                s3_key = f"media/{relative}"

                try:
                    # Проверяем, нужно ли загружать (по размеру)
                    local_size = os.path.getsize(local_path)
                    try:
                        head = s3.head_object(Bucket=bucket, Key=s3_key)
                        if head["ContentLength"] == local_size:
                            continue  # Файл уже есть, размер совпадает
                    except s3.exceptions.ClientError:
                        pass  # Файла нет в S3 — загружаем

                    s3.upload_file(local_path, bucket, s3_key)
                    uploaded += 1
                except Exception as e:
                    logger.warning("Ошибка загрузки медиа", path=local_path, error=str(e))
                    errors += 1

    logger.info("Бэкап медиафайлов завершён", uploaded=uploaded, errors=errors)
    return {"status": "ok", "uploaded": uploaded, "errors": errors}


def _rotate_backups(max_count=7):
    """Удаляет старые локальные бэкапы."""
    try:
        entries = sorted(
            [e for e in os.scandir(BACKUP_DIR) if e.name.startswith("backup_") and e.name.endswith(".json.gz")],
            key=lambda x: x.stat().st_mtime,
            reverse=True,
        )
        for old in entries[max_count:]:
            os.remove(old.path)
            logger.info("Старый бэкап удалён", path=old.path)
    except Exception as e:
        logger.warning("Ошибка ротации", error=str(e))
