// Бейдж наличия товара
import React from 'react'
import Badge from '@/components/ui/Badge'
import { formatQuantity } from '@/utils/format'

interface StockBadgeProps {
  quantity: number
  minQuantity?: number
  unit?: string
  showQuantity?: boolean
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity,
  minQuantity = 10,
  unit = 'kg',
  showQuantity = false,
}) => {
  if (quantity <= 0) {
    return (
      <Badge variant="red" size="sm" dot>
        Нет в наличии
      </Badge>
    )
  }

  if (quantity <= minQuantity) {
    return (
      <Badge variant="yellow" size="sm" dot>
        {showQuantity ? `Мало: ${formatQuantity(quantity, unit)}` : 'Мало'}
      </Badge>
    )
  }

  return (
    <Badge variant="green" size="sm" dot>
      {showQuantity ? `В наличии: ${formatQuantity(quantity, unit)}` : 'В наличии'}
    </Badge>
  )
}

export default StockBadge
