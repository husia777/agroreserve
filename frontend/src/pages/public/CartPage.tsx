// Страница корзины
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag, AlertCircle, ImageOff } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import QuantityInput from '@/components/shared/QuantityInput'
import { formatPrice, formatQuantity } from '@/utils/format'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { cn } from '@/utils/cn'

/** Отдельный компонент карточки товара — чтобы useState был внутри компонента, а не внутри map */
const CartItemCard: React.FC<{
  item: ReturnType<typeof useCartStore.getState>['items'][0]
  onRemove: (id: string) => void
  onUpdateQty: (id: string, qty: number) => void
}> = ({ item, onRemove, onUpdateQty }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
      {/* Фото */}
      <Link to={`/catalog/${item.product.category?.slug || 'products'}/${item.product.slug}`}>
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:h-24 sm:w-24">
          {!imageError && item.product.images?.[0] ? (
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="h-8 w-8 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Информация */}
      <div className="min-w-0 flex-1">
        <Link
          to={`/catalog/${item.product.category?.slug || 'products'}/${item.product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-primary-700"
        >
          {item.product.name}
        </Link>
        <div className="mt-0.5 text-xs text-gray-400">{item.product.country_of_origin}</div>
        <div className="mt-1 text-xs text-gray-500">
          {formatPrice(item.price)} / {item.product.unit === 'kg' ? 'кг' : 'шт'}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantityInput
            value={item.quantity}
            onChange={(qty) => onUpdateQty(item.product.id, qty)}
            min={item.product.min_order_qty || 1}
            max={item.product.stock_quantity}
            step={item.product.order_step || 1}
            size="sm"
          />

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">{formatPrice(item.subtotal)}</span>
            <button
              onClick={() => onRemove(item.product.id)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Удалить"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CartPage: React.FC = () => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore()
  const { isAuthenticated, isApproved, user } = useAuthStore()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Корзина пуста"
          description="Добавьте товары из каталога для оформления заказа"
          action={{
            label: 'Перейти в каталог',
            onClick: () => navigate('/catalog'),
          }}
        />
      </div>
    )
  }

  // Проверяем кредитный лимит для B2B
  const creditLimit = user?.credit_limit || 0
  const debt = user?.debt || 0
  const availableCredit = creditLimit - debt
  const isOverCredit = isAuthenticated && creditLimit > 0 && total > availableCredit

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Корзина{' '}
          <span className="ml-2 text-base font-normal text-gray-400">{items.length} товаров</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Список товаров */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItemCard
              key={item.product.id}
              item={item}
              onRemove={removeItem}
              onUpdateQty={updateQuantity}
            />
          ))}
        </div>

        {/* Итого */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Итого по заказу</h2>

            {/* Позиции */}
            <div className="mb-4 space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="mr-2 max-w-[180px] truncate text-gray-600">
                    {item.product.name} × {formatQuantity(item.quantity, item.product.unit)}
                  </span>
                  <span className="flex-shrink-0 font-medium text-gray-900">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-4 border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Итого</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
              <div className="mt-1 text-xs text-gray-400">Доставка — бесплатно</div>
            </div>

            {/* Кредитный лимит для B2B */}
            {isAuthenticated && isApproved && creditLimit > 0 && (
              <div
                className={cn(
                  'mb-4 rounded-lg p-3 text-sm',
                  isOverCredit ? 'border border-red-200 bg-red-50' : 'bg-gray-50',
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  {isOverCredit && <AlertCircle className="h-4 w-4 text-red-500" />}
                  <span className="font-medium text-gray-700">Кредитный лимит</span>
                </div>
                <div className="text-gray-600">Лимит: {formatPrice(creditLimit)}</div>
                <div className="text-gray-600">Задолженность: {formatPrice(debt)}</div>
                <div
                  className={cn('font-semibold', isOverCredit ? 'text-red-600' : 'text-gray-900')}
                >
                  Доступно: {formatPrice(availableCredit)}
                </div>
                {isOverCredit && (
                  <p className="mt-1 text-xs text-red-600">
                    Сумма заказа превышает доступный лимит
                  </p>
                )}
              </div>
            )}

            {/* Кнопки */}
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full rounded-xl bg-primary-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Войти для оформления
                </Link>
                <Link
                  to="/register"
                  className="block w-full rounded-xl bg-gray-100 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Создать аккаунт
                </Link>
              </div>
            ) : !isApproved ? (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                Ваш аккаунт находится на проверке. После одобрения вы сможете оформлять заказы.
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
                disabled={isOverCredit}
              >
                Оформить заказ
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
