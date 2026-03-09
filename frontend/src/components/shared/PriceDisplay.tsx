// Компонент отображения цены (₽/кг или ₽/шт)
import React from 'react'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

interface PriceDisplayProps {
  price: number
  unit?: string
  originalPrice?: number  // Зачёркнутая цена (розница для B2B)
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showUnit?: boolean
  isWholesale?: boolean
}

const sizeClasses = {
  sm: { price: 'text-base font-semibold', unit: 'text-xs', original: 'text-xs' },
  md: { price: 'text-xl font-bold', unit: 'text-sm', original: 'text-sm' },
  lg: { price: 'text-2xl font-bold', unit: 'text-base', original: 'text-base' },
}

const unitLabels: Record<string, string> = {
  kg: 'кг',
  piece: 'шт',
  liter: 'л',
  box: 'ящ',
  bag: 'мешок',
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  unit = 'kg',
  originalPrice,
  className,
  size = 'md',
  showUnit = true,
  isWholesale = false,
}) => {
  const classes = sizeClasses[size]
  const unitLabel = unitLabels[unit] || unit

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Бейдж оптовой цены */}
      {isWholesale && (
        <span className="text-xs font-medium text-primary-600 mb-0.5">Оптовая цена</span>
      )}

      <div className="flex items-baseline gap-2">
        {/* Основная цена */}
        <span className={cn('text-gray-900', classes.price)}>
          {formatPrice(price)}
          {showUnit && (
            <span className={cn('text-gray-400 font-normal ml-1', classes.unit)}>/ {unitLabel}</span>
          )}
        </span>

        {/* Зачёркнутая цена */}
        {originalPrice && originalPrice > price && (
          <span className={cn('text-gray-400 line-through', classes.original)}>
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
    </div>
  )
}

export default PriceDisplay
