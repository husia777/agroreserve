"""
Модели товара и категории.
Коллекции: products, categories
"""
from datetime import datetime, timezone
from enum import Enum
from typing import TYPE_CHECKING, List, Optional

from beanie import Document, Indexed, Link
from pydantic import Field

if TYPE_CHECKING:
    from app.models.certificate import Certificate


class ProductUnit(str, Enum):
    """Единицы измерения товара."""
    KG = "kg"     # Килограммы
    PCS = "pcs"   # Штуки
    L = "l"       # Литры


class Category(Document):
    """
    Категория товаров (Овощи, Фрукты, Сухофрукты, Орехи, Специи, Мёд, Масла).

    Поддерживает древовидную структуру через parent_id.
    """

    # ── Основные поля ─────────────────────────────────────────
    name: str = Field(..., description="Название категории", max_length=100)
    slug: Indexed(str, unique=True) = Field(..., description="URL-совместимый slug")
    icon_url: Optional[str] = Field(None, description="URL иконки категории")
    description: Optional[str] = Field(None, description="Описание категории")

    # ── Дерево категорий ──────────────────────────────────────
    # None = корневая категория
    parent_id: Optional[Link["Category"]] = Field(None, description="Родительская категория")

    # ── Сортировка ────────────────────────────────────────────
    sort_order: int = Field(0, description="Порядок отображения (меньше = выше)")

    # ── Статус ────────────────────────────────────────────────
    is_active: bool = Field(True, description="Активна ли категория")

    class Settings:
        name = "categories"
        indexes = [
            [("slug", 1)],
            [("is_active", 1), ("sort_order", 1)],
        ]


class Product(Document):
    """
    Товар каталога.

    Содержит как розничные, так и оптовые цены.
    B2B клиенты видят price_wholesale, остальные — price_retail.

    Индексы:
    - slug (уникальный)
    - category_id (для фильтрации)
    - is_active (для каталога)
    - name (для полнотекстового поиска)
    """

    # ── Основные данные ───────────────────────────────────────
    name: str = Field(..., description="Название товара", max_length=200)
    slug: Indexed(str, unique=True) = Field(..., description="URL slug (автогенерация из имени)")
    category_id: Link[Category] = Field(..., description="Категория товара")
    description: Optional[str] = Field(None, description="Описание товара")
    origin_country: str = Field("Россия", description="Страна происхождения")

    # ── Единицы измерения ─────────────────────────────────────
    unit: ProductUnit = Field(ProductUnit.KG, description="Основная единица измерения")
    # Средний вес штуки (для товаров, продаваемых поштучно)
    avg_item_weight_kg: Optional[float] = Field(
        None, ge=0, description="Средний вес одной штуки в кг (для поштучного калькулятора)"
    )

    # ── Цены ──────────────────────────────────────────────────
    # Оптовая цена (для B2B клиентов)
    price_wholesale: float = Field(..., ge=0, description="Оптовая цена за единицу (₽)")
    # Розничная цена (для физических лиц)
    price_retail: float = Field(..., ge=0, description="Розничная цена за единицу (₽)")
    # Закупочная цена (себестоимость, только для администратора)
    cost_price: float = Field(0.0, ge=0, description="Закупочная цена (себестоимость)")

    # ── Заказ ─────────────────────────────────────────────────
    min_order_qty: float = Field(1.0, ge=0, description="Минимальное количество заказа")
    order_step: float = Field(0.5, ge=0, description="Шаг изменения количества")

    # ── Склад ─────────────────────────────────────────────────
    stock_qty: float = Field(0.0, ge=0, description="Текущий остаток на складе")
    min_stock_qty: float = Field(0.0, ge=0, description="Минимальный остаток (алерт при достижении)")

    # ── Медиа ─────────────────────────────────────────────────
    images: List[str] = Field(default_factory=list, description="Список URL изображений")
    # Ссылки на связанные сертификаты
    certificate_ids: List[Link["Certificate"]] = Field(  # type: ignore
        default_factory=list,
        description="Связанные сертификаты и декларации",
    )

    # ── Хранение ──────────────────────────────────────────────
    storage_conditions: Optional[str] = Field(
        None, description="Условия хранения (например: +5...+15°C, сухое)"
    )
    shelf_life_days: Optional[int] = Field(
        None, ge=0, description="Срок годности в днях"
    )

    # ── Статус ────────────────────────────────────────────────
    is_active: bool = Field(True, description="Активен ли товар в каталоге")

    # ── Метаданные ────────────────────────────────────────────
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "products"
        indexes = [
            [("slug", 1)],
            [("is_active", 1), ("category_id", 1)],
            [("stock_qty", 1)],
            [("name", "text"), ("description", "text")],  # Полнотекстовый поиск
        ]

    def is_in_stock(self) -> bool:
        """Проверяет наличие товара на складе."""
        return self.stock_qty > 0

    def is_low_stock(self) -> bool:
        """Проверяет, что остаток ниже минимального (нужен алерт)."""
        if self.min_stock_qty <= 0:
            return False
        return self.stock_qty <= self.min_stock_qty

    def get_price_for_client(self, is_b2b: bool) -> float:
        """Возвращает цену в зависимости от типа клиента."""
        return self.price_wholesale if is_b2b else self.price_retail


# Разрешаем форвард-ссылку на Certificate (импорт в конце, чтобы избежать циклических зависимостей)
# Product.model_rebuild() вызывается из database.py после регистрации всех моделей в Beanie
