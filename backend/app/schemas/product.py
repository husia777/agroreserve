"""
Схемы для товаров и категорий каталога.
"""

from typing import Optional

from pydantic import BaseModel, Field, field_validator

# ── Категории ─────────────────────────────────────────────────


class CategoryCreate(BaseModel):
    """Запрос на создание категории (только для администратора)."""

    name: str = Field(..., min_length=2, max_length=100, description="Название категории")
    slug: Optional[str] = Field(None, description="Slug (авто из имени если не указан)")
    icon_url: Optional[str] = Field(None, description="URL иконки")
    description: Optional[str] = Field(None, max_length=500)
    parent_id: Optional[str] = Field(None, description="ID родительской категории")
    sort_order: int = Field(0, ge=0, description="Порядок сортировки")
    is_active: bool = Field(True)


class CategoryUpdate(BaseModel):
    """Запрос на обновление категории."""

    name: Optional[str] = Field(None, min_length=2, max_length=100)
    icon_url: Optional[str] = None
    description: Optional[str] = Field(None, max_length=500)
    sort_order: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None


class CategoryResponse(BaseModel):
    """Категория в ответе API."""

    id: str
    name: str
    slug: str
    icon_url: Optional[str] = None
    description: Optional[str] = None
    parent_id: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True
    product_count: int = Field(0, description="Количество активных товаров в категории")

    model_config = {"from_attributes": True, "populate_by_name": True}


# ── Товары ────────────────────────────────────────────────────


class ProductCreate(BaseModel):
    """Запрос на создание товара (только для администратора)."""

    name: str = Field(..., min_length=2, max_length=200, description="Название товара")
    slug: Optional[str] = Field(None, description="Slug (авто из имени если не указан)")
    category_id: str = Field(..., description="ID категории")
    description: Optional[str] = Field(None, description="Описание товара")
    origin_country: str = Field("Россия", description="Страна происхождения")
    unit: str = Field("kg", description="Единица: kg, pcs, l")
    avg_item_weight_kg: Optional[float] = Field(None, ge=0, description="Ср. вес штуки в кг")
    price_wholesale: float = Field(..., ge=0, description="Оптовая цена (₽)")
    price_retail: float = Field(..., ge=0, description="Розничная цена (₽)")
    cost_price: float = Field(0.0, ge=0, description="Себестоимость (₽)")
    min_order_qty: float = Field(1.0, ge=0, description="Мин. кол-во заказа")
    order_step: float = Field(0.5, ge=0, description="Шаг изменения кол-ва")
    stock_qty: float = Field(0.0, ge=0, description="Остаток на складе")
    min_stock_qty: float = Field(0.0, ge=0, description="Мин. остаток (алерт)")
    images: list[str] = Field(default_factory=list, description="URL изображений")
    storage_conditions: Optional[str] = Field(None, description="Условия хранения")
    shelf_life_days: Optional[int] = Field(None, ge=0, description="Срок годности в днях")
    is_active: bool = Field(True)
    # Алиасы от фронтенда
    country_of_origin: Optional[str] = Field(None, description="=origin_country")
    price_purchase: Optional[float] = Field(None, description="=cost_price")
    unit_weight: Optional[float] = Field(None, description="=avg_item_weight_kg")
    stock_quantity: Optional[float] = Field(None, description="=stock_qty")
    min_stock_quantity: Optional[float] = Field(None, description="=min_stock_qty")

    @field_validator("unit")
    @classmethod
    def validate_unit(cls, v: str) -> str:
        # Маппинг единиц фронтенда
        unit_map = {"piece": "pcs", "liter": "l", "box": "pcs", "bag": "pcs"}
        v = unit_map.get(v, v)
        if v not in ("kg", "pcs", "l"):
            raise ValueError("Единица измерения: kg (кг), pcs (шт) или l (л)")
        return v


class ProductUpdate(BaseModel):
    """Запрос на обновление товара (частичное обновление)."""

    name: Optional[str] = Field(None, min_length=2, max_length=200)
    category_id: Optional[str] = None
    description: Optional[str] = None
    origin_country: Optional[str] = None
    unit: Optional[str] = None
    avg_item_weight_kg: Optional[float] = Field(None, ge=0)
    price_wholesale: Optional[float] = Field(None, ge=0)
    price_retail: Optional[float] = Field(None, ge=0)
    cost_price: Optional[float] = Field(None, ge=0)
    min_order_qty: Optional[float] = Field(None, ge=0)
    order_step: Optional[float] = Field(None, ge=0)
    min_stock_qty: Optional[float] = Field(None, ge=0)
    images: Optional[list[str]] = None
    storage_conditions: Optional[str] = None
    shelf_life_days: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None


class ProductResponse(BaseModel):
    """
    Товар в ответе API.
    Имена полей совпадают с фронтендом (Product interface).
    """

    id: str
    name: str
    slug: str
    category_id: str
    category_name: Optional[str] = Field(None, description="Название категории")
    category: Optional[dict] = Field(None, description="Объект категории")
    description: Optional[str] = None
    country_of_origin: str = "Россия"
    unit: str = "kg"
    unit_weight: Optional[float] = None
    price_retail: float = Field(0, description="Розничная цена (₽)")
    price_wholesale: float = Field(0, description="Оптовая цена (₽)")
    price_purchase: float = Field(0, description="Закупочная цена (₽)")
    min_order_qty: float = 1.0
    order_step: float = 0.5
    stock_quantity: float = 0.0
    min_stock_quantity: float = 0.0
    images: list[str] = Field(default_factory=list)
    storage_conditions: Optional[str] = None
    shelf_life_days: Optional[int] = None
    is_active: bool = True
    is_available: bool = Field(True, description="Доступен для заказа")
    is_low_stock: bool = Field(False, description="Мало на складе")
    popularity: int = 0
    certificate_ids: list[str] = Field(default_factory=list)
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class ProductListResponse(BaseModel):
    """Список товаров с пагинацией."""

    items: list[ProductResponse]
    total: int = Field(..., description="Всего товаров по фильтру")
    page: int = Field(..., description="Текущая страница (с 1)")
    limit: int = Field(..., description="Товаров на странице")
    pages: int = Field(..., description="Всего страниц")


class ProductFilters(BaseModel):
    """Параметры фильтрации и поиска товаров."""

    category: Optional[str] = Field(None, description="Slug или ID категории")
    search: Optional[str] = Field(None, description="Поисковый запрос")
    sort: str = Field("name", description="Сортировка: name, price_asc, price_desc, stock")
    page: int = Field(1, ge=1, description="Номер страницы")
    limit: int = Field(20, ge=1, le=100, description="Товаров на странице")
    in_stock_only: bool = Field(False, description="Только товары в наличии")
