"""
Роутер корзины покупок.
Эндпоинты: /api/v1/cart/

Корзина хранится в MongoDB (коллекция carts).
Одна корзина на одного авторизованного пользователя.
"""

import uuid
from datetime import UTC, datetime

import structlog
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import ClientType
from app.utils.security import get_current_user

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/api/v1/cart", tags=["Корзина"])


# ── Схемы запросов/ответов ────────────────────────────────────


class CartItemAdd(BaseModel):
    """Запрос на добавление товара в корзину."""

    product_id: str = Field(..., description="ID товара")
    qty: float = Field(..., gt=0, description="Количество")


class CartItemUpdate(BaseModel):
    """Запрос на обновление количества."""

    qty: float = Field(..., gt=0, description="Новое количество")


class CartItemResponse(BaseModel):
    """Позиция корзины в ответе."""

    item_id: str
    product_id: str
    product_name: str
    product_slug: str
    unit: str
    qty: float
    price: float
    total: float
    min_order_qty: float
    order_step: float
    stock_qty: float

    model_config = {"from_attributes": True}


class CartResponse(BaseModel):
    """Корзина в ответе API."""

    id: str
    user_id: str
    items: list[CartItemResponse]
    total: float
    items_count: int
    updated_at: str


async def _get_or_create_cart(user_id: str) -> Cart:
    """Получает или создаёт корзину для пользователя."""
    cart = await Cart.find_one(Cart.user_id == user_id)
    if not cart:
        cart = Cart(user_id=user_id)
        await cart.insert()
    return cart


def _cart_to_response(cart: Cart) -> CartResponse:
    """Конвертирует объект Cart в ответ API."""
    return CartResponse(
        id=str(cart.id),
        user_id=cart.user_id,
        items=[
            CartItemResponse(
                item_id=item.item_id,
                product_id=item.product_id,
                product_name=item.product_name,
                product_slug=item.product_slug,
                unit=item.unit,
                qty=item.qty,
                price=item.price,
                total=item.total,
                min_order_qty=item.min_order_qty,
                order_step=item.order_step,
                stock_qty=item.stock_qty,
            )
            for item in cart.items
        ],
        total=cart.total,
        items_count=cart.items_count,
        updated_at=cart.updated_at.isoformat(),
    )


# ── Эндпоинты ────────────────────────────────────────────────


@router.get(
    "/",
    response_model=CartResponse,
    summary="Получить корзину",
)
async def get_cart(
    current_user=Depends(get_current_user),
):
    """
    Возвращает текущую корзину пользователя.
    Если корзина не существует — создаёт пустую.
    """
    cart = await _get_or_create_cart(str(current_user.id))

    # Актуализируем цены в корзине (товары могут изменить цену)
    updated = False
    for item in cart.items:
        try:
            product = await Product.get(PydanticObjectId(item.product_id))
            if product:
                # Обновляем актуальный остаток
                item.stock_qty = product.stock_qty
                updated = True
        except Exception:
            logger.warning(
                "Ошибка получения товара для актуализации корзины",
                product_id=item.product_id,
                user_id=str(current_user.id),
            )

    if updated:
        cart.recalculate()
        await cart.save()

    return _cart_to_response(cart)


@router.post(
    "/items",
    response_model=CartResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Добавить товар в корзину",
)
async def add_to_cart(
    data: CartItemAdd,
    current_user=Depends(get_current_user),
):
    """
    Добавляет товар в корзину.

    Проверки:
    - Товар существует и активен
    - Достаточно остатков
    - qty >= min_order_qty
    - qty кратно order_step
    """
    # Проверяем товар
    try:
        product = await Product.get(PydanticObjectId(data.product_id))
    except Exception:
        product = None

    if not product or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Товар не найден или недоступен",
        )

    if product.stock_qty <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Товар «{product.name}» отсутствует на складе",
        )

    if data.qty < product.min_order_qty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(f"Минимальный заказ для «{product.name}»: " f"{product.min_order_qty:.1f} {product.unit}"),
        )

    if product.stock_qty < data.qty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(f"Недостаточный остаток «{product.name}»: " f"доступно {product.stock_qty:.1f} {product.unit}"),
        )

    # Проверяем кратность шагу (с допуском на погрешность float)
    if product.order_step > 0:
        remainder = data.qty % product.order_step
        if remainder > 0.001 and (product.order_step - remainder) > 0.001:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Количество должно быть кратно {product.order_step:.1f} {product.unit}. "
                    f"Например: {product.min_order_qty:.1f}, "
                    f"{product.min_order_qty + product.order_step:.1f}, ..."
                ),
            )

    # Определяем цену
    price = product.price_wholesale if current_user.client_type == ClientType.B2B else product.price_retail

    # Получаем или создаём корзину
    cart = await _get_or_create_cart(str(current_user.id))

    # Проверяем, есть ли уже этот товар в корзине
    existing_item = next((item for item in cart.items if item.product_id == data.product_id), None)

    if existing_item:
        # Обновляем количество
        new_qty = round(existing_item.qty + data.qty, 3)
        if product.stock_qty < new_qty:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Недостаточный остаток «{product.name}»: "
                    f"в корзине {existing_item.qty:.1f}, добавляется {data.qty:.1f}, "
                    f"доступно {product.stock_qty:.1f} {product.unit}"
                ),
            )
        existing_item.qty = new_qty
        existing_item.price = price
        existing_item.total = round(new_qty * price, 2)
        existing_item.stock_qty = product.stock_qty
    else:
        # Добавляем новую позицию
        cart.items.append(
            CartItem(
                item_id=str(uuid.uuid4()),
                product_id=data.product_id,
                product_name=product.name,
                product_slug=product.slug,
                unit=product.unit,
                qty=data.qty,
                price=price,
                cost_price=product.cost_price,
                total=round(data.qty * price, 2),
                min_order_qty=product.min_order_qty,
                order_step=product.order_step,
                stock_qty=product.stock_qty,
            )
        )

    cart.recalculate()
    await cart.save()

    logger.info(
        "Товар добавлен в корзину",
        user_id=str(current_user.id),
        product_id=data.product_id,
        product_name=product.name,
        qty=data.qty,
    )

    return _cart_to_response(cart)


@router.patch(
    "/items/{item_id}",
    response_model=CartResponse,
    summary="Обновить количество товара",
)
async def update_cart_item(
    item_id: str,
    data: CartItemUpdate,
    current_user=Depends(get_current_user),
):
    """
    Обновляет количество указанной позиции в корзине.
    """
    cart = await _get_or_create_cart(str(current_user.id))

    # Ищем позицию
    item = next((i for i in cart.items if i.item_id == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Позиция не найдена в корзине",
        )

    # Проверяем товар
    try:
        product = await Product.get(PydanticObjectId(item.product_id))
    except Exception:
        product = None

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Товар не найден",
        )

    if data.qty < product.min_order_qty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Минимальный заказ: {product.min_order_qty:.1f} {product.unit}",
        )

    if product.stock_qty < data.qty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Доступно только {product.stock_qty:.1f} {product.unit}",
        )

    # Обновляем
    item.qty = data.qty
    item.total = round(data.qty * item.price, 2)
    item.stock_qty = product.stock_qty

    cart.recalculate()
    await cart.save()

    return _cart_to_response(cart)


@router.delete(
    "/items/{item_id}",
    response_model=CartResponse,
    summary="Удалить позицию из корзины",
)
async def remove_from_cart(
    item_id: str,
    current_user=Depends(get_current_user),
):
    """
    Удаляет позицию из корзины.
    """
    cart = await _get_or_create_cart(str(current_user.id))

    original_count = len(cart.items)
    cart.items = [i for i in cart.items if i.item_id != item_id]

    if len(cart.items) == original_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Позиция не найдена в корзине",
        )

    cart.recalculate()
    await cart.save()

    logger.info(
        "Позиция удалена из корзины",
        user_id=str(current_user.id),
        item_id=item_id,
    )

    return _cart_to_response(cart)


@router.delete(
    "/",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Очистить корзину",
)
async def clear_cart(
    current_user=Depends(get_current_user),
):
    """Очищает всю корзину пользователя."""
    cart = await _get_or_create_cart(str(current_user.id))
    cart.items = []
    cart.total = 0.0
    cart.items_count = 0
    cart.updated_at = datetime.now(UTC)
    await cart.save()

    logger.info("Корзина очищена", user_id=str(current_user.id))
