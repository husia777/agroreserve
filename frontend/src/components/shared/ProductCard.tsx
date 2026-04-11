// Карточка товара — фото, название, цена, наличие, кнопка в корзину
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ImageOff } from 'lucide-react'
import { type Product } from '@/types'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'
import StockBadge from './StockBadge'
import QuantityInput from './QuantityInput'
import { showToast } from '@/components/ui/Toast'

interface ProductCardProps {
  product: Product
  className?: string
  layout?: 'grid' | 'list'
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  layout = 'grid',
}) => {
  const [quantity, setQuantity] = useState(product.min_order_qty || 1)
  const [imageError, setImageError] = useState(false)
  const { isAuthenticated, isApproved } = useAuthStore()
  const { addItem, getItem } = useCartStore()

  // Определяем, показывать ли оптовую цену
  const showWholesale = isAuthenticated && isApproved
  const displayPrice = showWholesale ? product.price_wholesale : product.price_retail
  const hasDiscount = showWholesale && product.price_retail > product.price_wholesale
  const isAvailable = product.is_available && product.stock_quantity > 0
  const inCart = getItem(product.id)
  const productUrl = `/catalog/${product.category?.slug || 'all'}/${product.slug}`

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAvailable) return

    addItem(product, quantity, showWholesale)
    showToast.success(`«${product.name}» добавлен в корзину`)
  }

  if (layout === 'list') {
    return (
      <Link to={productUrl} className={cn('group block', className)}>
        <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm">
          {/* Фото */}
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
            {!imageError && product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageOff className="h-8 w-8 text-gray-300" />
              </div>
            )}
          </div>

          {/* Инфо */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
                {product.name}
              </h3>
              <StockBadge
                quantity={product.stock_quantity}
                minQuantity={product.min_stock_quantity}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">{product.country_of_origin}</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(displayPrice)}
                </span>
                <span className="ml-1 text-xs text-gray-400">
                  / {product.unit === 'kg' ? 'кг' : 'шт'}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  isAvailable
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'cursor-not-allowed bg-gray-100 text-gray-400',
                )}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                {inCart ? 'В корзине' : 'В корзину'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid layout
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-md',
        className,
      )}
    >
      {/* Бейдж скидки */}
      {hasDiscount && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-primary-600 px-2 py-0.5 text-xs font-bold text-white">
          Опт
        </div>
      )}

      {/* Статус наличия */}
      <div className="absolute right-2 top-2 z-10">
        <StockBadge quantity={product.stock_quantity} minQuantity={product.min_stock_quantity} />
      </div>

      {/* Ссылка на карточку */}
      <Link to={productUrl} className="block">
        {/* Фото */}
        <div className="aspect-square overflow-hidden bg-gray-50">
          {!imageError && product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Информация */}
      <div className="p-3">
        <Link to={productUrl}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-gray-400">{product.country_of_origin}</p>

        {/* Цены */}
        <div className="mb-3 mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">{formatPrice(displayPrice)}</span>
            <span className="text-xs text-gray-400">/ {product.unit === 'kg' ? 'кг' : 'шт'}</span>
          </div>
          {hasDiscount && (
            <div className="text-xs text-gray-400 line-through">
              {formatPrice(product.price_retail)}
            </div>
          )}
          {!showWholesale && isAuthenticated && (
            <div className="mt-0.5 text-xs text-primary-600">Войдите для оптовой цены</div>
          )}
        </div>

        {/* Кнопка добавления */}
        {isAvailable ? (
          <div className="flex items-center gap-2">
            <QuantityInput
              value={quantity}
              onChange={setQuantity}
              min={product.min_order_qty || 1}
              max={product.stock_quantity}
              step={product.order_step || 1}
              size="sm"
            />
            <button
              onClick={handleAddToCart}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors',
                inCart
                  ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700',
              )}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {inCart ? 'В корзине' : 'В корзину'}
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg bg-gray-100 py-1.5 text-xs font-medium text-gray-400"
          >
            Нет в наличии
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
