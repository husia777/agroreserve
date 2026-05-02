"""
Подключение к MongoDB через Motor (асинхронный драйвер).
Инициализация Beanie ODM с регистрацией всех документов.
"""

from typing import Optional

import structlog
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config import settings

logger = structlog.get_logger(__name__)

# Глобальный клиент MongoDB (инициализируется при старте приложения)
_client: Optional[AsyncIOMotorClient] = None
_database: Optional[AsyncIOMotorDatabase] = None


async def connect_to_mongo() -> None:
    """
    Создаёт подключение к MongoDB и инициализирует Beanie ODM.
    Вызывается в lifespan handler FastAPI.
    """
    global _client, _database

    # Импортируем все Beanie документы для регистрации (v1)
    from app.models.batch import Batch
    from app.models.cart import Cart
    from app.models.certificate import Certificate
    from app.models.contract import Contract

    # Импортируем v2 документы (Группы 4-5) — CRM
    from app.models.crm import ClientInteraction, ClientNote
    from app.models.dish import Dish
    from app.models.document import DocumentRecord as Document
    from app.models.finance import Expense
    from app.models.menu import Menu
    from app.models.notification import Notification
    from app.models.order import Order
    from app.models.price_log import PriceLog
    from app.models.product import Category, Product
    from app.models.reminder import Reminder
    from app.models.settings import SystemSettings
    from app.models.standing_order import StandingOrder
    from app.models.stock import StockReceipt
    from app.models.stock_waitlist import StockWaitlist

    # Импортируем v2 документы (Группы 1-3)
    from app.models.supplier import Supplier
    from app.models.tender import Tender
    from app.models.user import User
    from app.models.write_off import WriteOff

    logger.info("Подключение к MongoDB", uri=settings.MONGODB_URI[:50] + "...")

    _client = AsyncIOMotorClient(
        settings.MONGODB_URI,
        # Настройки пула соединений
        maxPoolSize=50,
        minPoolSize=5,
        # Таймаут соединения — 10 секунд
        serverSelectionTimeoutMS=10000,
        connectTimeoutMS=10000,
        socketTimeoutMS=30000,
        # Retry writes для надёжности
        retryWrites=True,
        retryReads=True,
    )

    _database = _client[settings.MONGODB_DB_NAME]

    # Проверяем соединение
    await _client.admin.command("ping")
    logger.info("Соединение с MongoDB установлено", db=settings.MONGODB_DB_NAME)

    # Полный список документов для Beanie
    document_models: list[type] = [
        # v1 документы
        User,
        Category,
        Product,
        Order,
        Cart,
        StockReceipt,
        Expense,
        Certificate,
        Document,
        Notification,
        SystemSettings,
        # v2 документы
        Supplier,
        Contract,
        Dish,
        Menu,
        WriteOff,
        Reminder,
        StandingOrder,
        Batch,
        Tender,
        PriceLog,
        StockWaitlist,
        # v2 CRM документы (Группы 4-5)
        ClientNote,
        ClientInteraction,
    ]

    # Инициализируем Beanie со всеми документами
    await init_beanie(
        database=_database,
        document_models=document_models,
    )

    logger.info(
        "Beanie ODM инициализирован",
        document_count=len(document_models),
    )


async def close_mongo_connection() -> None:
    """
    Закрывает соединение с MongoDB.
    Вызывается при завершении работы приложения.
    """
    global _client

    if _client:
        _client.close()
        logger.info("Соединение с MongoDB закрыто")


def get_database() -> AsyncIOMotorDatabase:
    """
    Возвращает экземпляр базы данных.
    Использовать для прямых запросов через Motor (без Beanie).
    """
    if _database is None:
        raise RuntimeError("База данных не инициализирована. Вызови connect_to_mongo() сначала.")
    return _database


def get_client() -> AsyncIOMotorClient:
    """Возвращает клиент MongoDB."""
    if _client is None:
        raise RuntimeError("Клиент MongoDB не инициализирован.")
    return _client
