// Временная шкала статусов заказа
import React from 'react'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { OrderStatus, type OrderStatusEvent } from '@/types'
import { cn } from '@/utils/cn'
import { formatDateTime } from '@/utils/format'

interface OrderTimelineProps {
  currentStatus: OrderStatus
  statusHistory?: OrderStatusEvent[]
  className?: string
}

const allStatuses: { status: OrderStatus; label: string; description: string }[] = [
  { status: OrderStatus.NEW, label: 'Новый', description: 'Заказ принят в обработку' },
  { status: OrderStatus.CONFIRMED, label: 'Подтверждён', description: 'Заказ подтверждён менеджером' },
  { status: OrderStatus.ASSEMBLING, label: 'Собирается', description: 'Идёт комплектация заказа' },
  { status: OrderStatus.ASSEMBLED, label: 'Собран', description: 'Заказ укомплектован и готов' },
  { status: OrderStatus.DELIVERING, label: 'В пути', description: 'Курьер везёт ваш заказ' },
  { status: OrderStatus.DELIVERED, label: 'Доставлен', description: 'Заказ успешно доставлен' },
]

const statusOrder = allStatuses.map((s) => s.status)

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
  statusHistory = [],
  className,
}) => {
  // Если заказ отменён — показываем специальный вид
  if (currentStatus === OrderStatus.CANCELLED) {
    return (
      <div className={cn('flex items-center gap-3 py-4', className)}>
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <Circle className="w-4 h-4 text-red-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-red-700">Заказ отменён</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {statusHistory.find(h => h.status === OrderStatus.CANCELLED)?.note || ''}
          </div>
        </div>
      </div>
    )
  }

  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className={cn('space-y-0', className)}>
      {allStatuses.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isPending = index > currentIndex

        // Ищем время смены статуса в истории
        const historyEvent = statusHistory.find((h) => h.status === step.status)

        return (
          <div key={step.status} className="flex gap-3">
            {/* Иконка и линия */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                  isCompleted && 'bg-primary-100',
                  isCurrent && 'bg-primary-600 ring-4 ring-primary-100',
                  isPending && 'bg-gray-100'
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </div>
              {/* Линия соединения */}
              {index < allStatuses.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-8 mt-1 rounded-full',
                    isCompleted ? 'bg-primary-300' : 'bg-gray-200'
                  )}
                />
              )}
            </div>

            {/* Текст */}
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    isCompleted && 'text-primary-700',
                    isCurrent && 'text-gray-900',
                    isPending && 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
                {historyEvent && (
                  <span className="text-xs text-gray-400">
                    {formatDateTime(historyEvent.changed_at)}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'text-xs mt-0.5',
                  isCompleted || isCurrent ? 'text-gray-500' : 'text-gray-300'
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrderTimeline
