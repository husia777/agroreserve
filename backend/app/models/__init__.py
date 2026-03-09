# Пакет моделей данных Агрорезерв (Beanie документы для MongoDB)
# v1 модели
from app.models.cart import Cart
from app.models.certificate import Certificate
from app.models.document import DocumentRecord
from app.models.finance import Expense
from app.models.notification import Notification
from app.models.order import Order
from app.models.product import Category, Product
from app.models.settings import SystemSettings
from app.models.stock import StockReceipt
from app.models.user import User

# v2 модели (Группы 1-3)
from app.models.batch import Batch
from app.models.contract import Contract
from app.models.dish import Dish
from app.models.menu import Menu
from app.models.price_log import PriceLog
from app.models.stock_waitlist import StockWaitlist
from app.models.reminder import Reminder
from app.models.standing_order import StandingOrder
from app.models.supplier import Supplier
from app.models.tender import Tender
from app.models.write_off import WriteOff

__all__ = [
    # v1
    "User",
    "Category",
    "Product",
    "Order",
    "Cart",
    "StockReceipt",
    "Expense",
    "Certificate",
    "DocumentRecord",
    "Notification",
    "SystemSettings",
    # v2
    "Supplier",
    "Contract",
    "Dish",
    "Menu",
    "WriteOff",
    "Reminder",
    "StandingOrder",
    "Batch",
    "Tender",
    "PriceLog",
    "StockWaitlist",
]
