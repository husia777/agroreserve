// Карточка товара — фото, название, цена, наличие, кнопка в корзину
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ImageOff } from 'lucide-react'
import { type Product } from '@/types'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice, formatQuantity } from '@/utils/format'
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
      <Link to={productUrl} className={cn('block group', className)}>
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
          {/* Фото */}
          <div className="w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden">
            {!imageError && product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>

          {/* Инфо */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <StockBadge quantity={product.stock_quantity} minQuantity={product.min_stock_quantity} />
            </div>
            <p className="text-xs text-gray-500 mt-1">{product.country_of_origin}</p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(displayPrice)}
                </span>
                <span className="text-xs text-gray-400 ml-1">/ {product.unit === 'kg' ? 'кг' : 'шт'}</span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  isAvailable
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
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
    <div className={cn('group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200', className)}>
      {/* Бейдж скидки */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10 bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          Опт
        </div>
      )}

      {/* Статус наличия */}
      <div className="absolute top-2 right-2 z-10">
        <StockBadge quantity={product.stock_quantity} minQuantity={product.min_stock_quantity} />
      </div>

      {/* Ссылка на карточку */}
      <Link to={productUrl} className="block">
        {/* Фото */}
        <div className="aspect-square bg-gray-50 overflow-hidden">
          {!imageError && product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Информация */}
      <div className="p-3">
        <Link to={productUrl}>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 mt-1">{product.country_of_origin}</p>

        {/* Цены */}
        <div className="mt-2 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(displayPrice)}
            </span>
            <span className="text-xs text-gray-400">/ {product.unit === 'kg' ? 'кг' : 'шт'}</span>
          </div>
          {hasDiscount && (
            <div className="text-xs text-gray-400 line-through">
              {formatPrice(product.price_retail)}
            </div>
          )}
          {!showWholesale && isAuthenticated && (
            <div className="text-xs text-primary-600 mt-0.5">
              Войдите для оптовой цены
            </div>
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
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
                inCart
                  ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              )}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {inCart ? 'В корзине' : 'В корзину'}
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            Нет в наличии
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
