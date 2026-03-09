"""
Конфигурация приложения Агрорезерв.
Все настройки загружаются из переменных окружения через Pydantic Settings.
"""
from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Настройки приложения — загружаются из .env файла.
    Порядок приоритета: переменные окружения > .env > значения по умолчанию.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Приложение ────────────────────────────────────────────
    APP_NAME: str = "Агрорезерв"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # ── MongoDB ───────────────────────────────────────────────
    MONGODB_URI: str = "mongodb://admin:supersecret@localhost:27017/agroreserve?authSource=admin"
    MONGODB_DB_NAME: str = "agroreserve"

    # ── Redis ─────────────────────────────────────────────────
    REDIS_URI: str = "redis://:redispass@localhost:6379/0"
    REDIS_PASSWORD: str = "redispass"

    # ── JWT Аутентификация ────────────────────────────────────
    JWT_SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # ── CORS ──────────────────────────────────────────────────
    CORS_ORIGINS: str = "https://agroreserve.ru,https://agroreserve.ru,http://localhost:3000,http://localhost:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        """Возвращает список разрешённых CORS-источников."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    # ── 1С:Предприятие OData API ─────────────────────────────
    ODATA_1C_URL: str = ""
    ODATA_1C_LOGIN: str = ""
    ODATA_1C_PASSWORD: str = ""
    SYNC_1C_INTERVAL_MINUTES: int = 5

    # ── Telegram Bot ──────────────────────────────────────────
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_ADMIN_CHAT_ID: str = ""
    TELEGRAM_WEBHOOK_SECRET: str = ""

    # ── Email / SMTP ──────────────────────────────────────────
    SMTP_HOST: str = "smtp.yandex.ru"
    SMTP_PORT: int = 465
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_NAME: str = "Агрорезерв"
    SMTP_FROM_EMAIL: str = "noreply@agroreserve.ru"
    SMTP_USE_TLS: bool = True

    # ── S3 / Яндекс.Облако Object Storage ────────────────────
    S3_ENDPOINT_URL: str = "https://storage.yandexcloud.net"
    S3_ACCESS_KEY_ID: str = ""
    S3_SECRET_ACCESS_KEY: str = ""
    S3_BUCKET_NAME: str = "agroreserve"
    S3_REGION: str = "ru-central1"
    S3_PUBLIC_URL: str = "https://storage.yandexcloud.net/agroreserve"

    # ── Rate Limiting ─────────────────────────────────────────
    RATE_LIMIT_PER_MINUTE: int = 100
    RATE_LIMIT_ADMIN_PER_MINUTE: int = 1000

    # ── Загрузка файлов ───────────────────────────────────────
    MAX_UPLOAD_SIZE_BYTES: int = 10 * 1024 * 1024  # 10 MB
    ALLOWED_IMAGE_TYPES: str = "image/jpeg,image/png,image/webp"
    ALLOWED_DOC_TYPES: str = "application/pdf,image/jpeg,image/png"

    @property
    def allowed_image_types_list(self) -> List[str]:
        return [t.strip() for t in self.ALLOWED_IMAGE_TYPES.split(",")]

    @property
    def allowed_doc_types_list(self) -> List[str]:
        return [t.strip() for t in self.ALLOWED_DOC_TYPES.split(",")]

    # ── Бизнес настройки ─────────────────────────────────────
    TAX_RATE_PERCENT: int = 6  # УСН 6%
    CERTIFICATE_EXPIRY_WARNING_DAYS: int = 30
    DEBT_OVERDUE_WARNING_DAYS: int = 30
    DEBT_OVERDUE_BLOCK_DAYS: int = 60

    # ── Синхронизация с 1С (API-ключ для защиты эндпоинтов) ──
    SYNC_1C_API_KEY: str = ""  # Установить случайный ключ в production


@lru_cache()
def get_settings() -> Settings:
    """
    Возвращает синглтон настроек.
    lru_cache гарантирует единственный экземпляр на весь жизненный цикл приложения.
    """
    return Settings()


# Глобальный экземпляр для прямого импорта
settings = get_settings()
