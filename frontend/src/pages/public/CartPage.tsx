// Страница корзины
import React, { useState, useCallback } from 'react'
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
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200">
      {/* Фото */}
      <Link to={`/catalog/${item.product.category?.slug || 'products'}/${item.product.slug}`}>
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          {!imageError && item.product.images?.[0] ? (
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Информация */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/catalog/${item.product.category?.slug || 'products'}/${item.product.slug}`}
          className="text-sm font-semibold text-gray-900 hover:text-primary-700 line-clamp-2"
        >
          {item.product.name}
        </Link>
        <div className="text-xs text-gray-400 mt-0.5">{item.product.country_of_origin}</div>
        <div className="text-xs text-gray-500 mt-1">
          {formatPrice(item.price)} / {item.product.unit === 'kg' ? 'кг' : 'шт'}
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantityInput
            value={item.quantity}
            onChange={(qty) => onUpdateQty(item.product.id, qty)}
            min={item.product.min_order_qty || 1}
            max={item.product.stock_quantity}
            step={item.product.order_step || 1}
            size="sm"
          />

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">
              {formatPrice(item.subtotal)}
            </span>
            <button
              onClick={() => onRemove(item.product.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Удалить"
            >
              <Trash2 className="w-4 h-4" />
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          icon={<ShoppingBag className="w-8 h-8" />}
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Корзина <span className="text-gray-400 font-normal text-base ml-2">{items.length} товаров</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-3">
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
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Итого по заказу</h2>

            {/* Позиции */}
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2 max-w-[180px]">
                    {item.product.name} × {formatQuantity(item.quantity, item.product.unit)}
                  </span>
                  <span className="text-gray-900 font-medium flex-shrink-0">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Итого</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Доставка — бесплатно</div>
            </div>

            {/* Кредитный лимит для B2B */}
            {isAuthenticated && isApproved && creditLimit > 0 && (
              <div className={cn(
                'rounded-lg p-3 mb-4 text-sm',
                isOverCredit ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  {isOverCredit && <AlertCircle className="w-4 h-4 text-red-500" />}
                  <span className="font-medium text-gray-700">Кредитный лимит</span>
                </div>
                <div className="text-gray-600">Лимит: {formatPrice(creditLimit)}</div>
                <div className="text-gray-600">Задолженность: {formatPrice(debt)}</div>
                <div className={cn('font-semibold', isOverCredit ? 'text-red-600' : 'text-gray-900')}>
                  Доступно: {formatPrice(availableCredit)}
                </div>
                {isOverCredit && (
                  <p className="text-red-600 text-xs mt-1">
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
                  className="block w-full text-center py-3 px-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Войти для оформления
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  Создать аккаунт
                </Link>
              </div>
            ) : !isApproved ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
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
