// Цветной бейдж статуса заказа
import React from 'react'
import { OrderStatus } from '@/types'
import Badge from '@/components/ui/Badge'

interface OrderStatusBadgeProps {
  status: OrderStatus
  size?: 'sm' | 'md'
}

// Маппинг статусов на варианты Badge
const statusConfig: Record<OrderStatus, { label: string; variant: 'gray' | 'blue' | 'purple' | 'yellow' | 'green' | 'cyan' | 'red' }> = {
  [OrderStatus.NEW]: { label: 'Новый', variant: 'blue' },
  [OrderStatus.CONFIRMED]: { label: 'Подтверждён', variant: 'purple' },
  [OrderStatus.ASSEMBLING]: { label: 'Собирается', variant: 'yellow' },
  [OrderStatus.ASSEMBLED]: { label: 'Собран', variant: 'green' },
  [OrderStatus.DELIVERING]: { label: 'В пути', variant: 'cyan' },
  [OrderStatus.DELIVERED]: { label: 'Доставлен', variant: 'green' },
  [OrderStatus.CANCELLED]: { label: 'Отменён', variant: 'red' },
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] || { label: status, variant: 'gray' as const }

  return (
    <Badge variant={config.variant} size={size} dot>
      {config.label}
    </Badge>
  )
}

export default OrderStatusBadge
