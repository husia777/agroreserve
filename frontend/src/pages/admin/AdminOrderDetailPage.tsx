// Детали заказа в админке — UC-11: Фактический вес при отгрузке
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminOrder, updateOrderStatus, updateOrderActualQuantity, confirmPayment } from '@/api/admin'
import { OrderStatus, PaymentStatus } from '@/types'
import { formatPrice, formatDate, formatDateTime, formatQuantity } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import OrderStatusBadge from '@/components/shared/OrderStatusBadge'
import OrderTimeline from '@/components/shared/OrderTimeline'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { showToast } from '@/components/ui/Toast'
import { MapPin, Clock, User, FileText, Truck, Scale, Save } from 'lucide-react'

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.NEW]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.ASSEMBLING, OrderStatus.CANCELLED],
  [OrderStatus.ASSEMBLING]: [OrderStatus.ASSEMBLED, OrderStatus.CANCELLED],
  [OrderStatus.ASSEMBLED]: [OrderStatus.DELIVERING],
  [OrderStatus.DELIVERING]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.NEW]: 'Новый',
  [OrderStatus.CONFIRMED]: 'Подтвердить',
  [OrderStatus.ASSEMBLING]: 'Начать сборку',
  [OrderStatus.ASSEMBLED]: 'Собран',
  [OrderStatus.DELIVERING]: 'Отправить',
  [OrderStatus.DELIVERED]: 'Доставлен',
  [OrderStatus.CANCELLED]: 'Отменить',
}

/** Статусы, при которых можно редактировать фактический вес */
const EDITABLE_STATUSES: OrderStatus[] = [
  OrderStatus.ASSEMBLING,
  OrderStatus.ASSEMBLED,
  OrderStatus.DELIVERING,
]

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [statusNote, setStatusNote] = useState('')

  // Локальный стейт для фактических количеств: { product_id: значение_в_строке }
  const [actualValues, setActualValues] = useState<Record<string, string>>({})
  const [hasChanges, setHasChanges] = useState(false)

  const { data: order, isLoading } = useQuery({
    queryKey: ['adminOrder', id],
    queryFn: () => getAdminOrder(id!),
    enabled: !!id,
  })

  // Инициализация значений при загрузке заказа
  useEffect(() => {
    if (order?.items) {
      const initial: Record<string, string> = {}
      for (const item of order.items) {
        initial[item.product_id] = item.actual_qty != null
          ? String(item.actual_qty)
          : ''
      }
      setActualValues(initial)
      setHasChanges(false)
    }
  }, [order])

  const { mutate: changeStatus, isPending: isChangingStatus } = useMutation({
    mutationFn: (newStatus: OrderStatus) => updateOrderStatus(id!, newStatus, statusNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrder', id] })
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] })
      showToast.success('Статус заказа обновлён')
      setStatusNote('')
    },
    onError: () => showToast.error('Ошибка при смене статуса'),
  })

  // UC-10: Подтверждение оплаты
  const { mutate: markPaid, isPending: isMarkingPaid } = useMutation({
    mutationFn: () => confirmPayment(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrder', id] })
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] })
      showToast.success('Оплата подтверждена')
    },
    onError: () => showToast.error('Ошибка при подтверждении оплаты'),
  })

  // Мутация для сохранения фактических количеств
  const { mutate: saveActualQty, isPending: isSavingQty } = useMutation({
    mutationFn: () => {
      const items: { product_id: string; actual_qty: number }[] = []
      for (const [productId, val] of Object.entries(actualValues)) {
        const num = parseFloat(val)
        if (!isNaN(num) && num >= 0) {
          items.push({ product_id: productId, actual_qty: num })
        }
      }
      return updateOrderActualQuantity(id!, items)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrder', id] })
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] })
      showToast.success('Фактические количества сохранены')
      setHasChanges(false)
    },
    onError: () => showToast.error('Ошибка при сохранении количеств'),
  })

  /** Обработчик изменения поля фактического веса */
  const handleActualChange = useCallback((productId: string, value: string) => {
    const sanitized = value.replace(',', '.').replace(/[^0-9.]/g, '')
    setActualValues(prev => ({ ...prev, [productId]: sanitized }))
    setHasChanges(true)
  }, [])

  if (isLoading) return <PageSpinner />
  if (!order) return (
    <div className="p-6 text-center text-gray-500">
      Заказ не найден. <Link to="/admin/orders" className="text-primary-600">К списку</Link>
    </div>
  )

  const nextStatuses = STATUS_TRANSITIONS[order.status] || []
  const isEditable = EDITABLE_STATUSES.includes(order.status)

  // Подсчёт итоговой суммы по факту
  const calcFactTotal = (): number => {
    if (!order.items) return order.total
    let sum = 0
    for (const item of order.items) {
      const val = actualValues[item.product_id]
      const qty = val ? parseFloat(val) : NaN
      if (!isNaN(qty) && qty >= 0) {
        sum += qty * item.price
      } else {
        sum += item.total
      }
    }
    return sum
  }

  return (
    <div className="p-6 space-y-5">
      <Breadcrumbs
        items={[
          { label: 'Заказы', href: '/admin/orders' },
          { label: order.order_number },
        ]}
        showHome={false}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.order_number}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{formatDateTime(order.created_at)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Основной контент */}
        <div className="lg:col-span-2 space-y-4">
          {/* Состав заказа */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-900">Состав заказа</h2>
                {isEditable && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                    <Scale className="w-3 h-3" />
                    Ввод факта
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditable && hasChanges && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Save className="w-4 h-4" />}
                    loading={isSavingQty}
                    onClick={() => saveActualQty()}
                  >
                    Сохранить факт
                  </Button>
                )}
                <Button variant="ghost" size="sm" icon={<FileText className="w-4 h-4" />}>
                  Печать
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Товар</th>
                    <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase">Заказано</th>
                    <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase min-w-[120px]">Факт</th>
                    <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase">Цена</th>
                    <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase">Сумма</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items?.map((item) => {
                    const currentVal = actualValues[item.product_id] ?? ''
                    const parsedQty = parseFloat(currentVal)
                    const factTotal = !isNaN(parsedQty) && parsedQty >= 0
                      ? parsedQty * item.price
                      : item.total
                    const hasDiff = !isNaN(parsedQty) && parsedQty !== item.ordered_qty

                    return (
                      <tr key={item.product_id}>
                        <td className="px-5 py-3 font-medium text-gray-900">{item.product_name}</td>
                        <td className="px-5 py-3 text-right text-gray-600">
                          {formatQuantity(item.ordered_qty, item.unit || 'kg')}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {isEditable ? (
                            <input
                              type="text"
                              inputMode="decimal"
                              value={currentVal}
                              onChange={(e) => handleActualChange(item.product_id, e.target.value)}
                              placeholder={String(item.ordered_qty)}
                              className={`
                                w-24 text-right border rounded-lg px-2 py-1.5 text-sm
                                focus:outline-none focus:ring-2 focus:ring-primary-300
                                ${hasDiff
                                  ? 'border-orange-300 bg-orange-50 text-orange-700 font-medium'
                                  : 'border-gray-200 bg-white text-gray-700'
                                }
                              `}
                            />
                          ) : (
                            <span className={
                              item.actual_qty != null && item.actual_qty !== item.ordered_qty
                                ? 'text-orange-600 font-medium'
                                : 'text-gray-600'
                            }>
                              {item.actual_qty != null
                                ? formatQuantity(item.actual_qty, item.unit || 'kg')
                                : '—'
                              }
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right text-gray-600">{formatPrice(item.price)}</td>
                        <td className="px-5 py-3 text-right font-semibold text-gray-900">
                          {isEditable && hasDiff ? (
                            <div>
                              <div className="text-orange-600">{formatPrice(factTotal)}</div>
                              <div className="text-xs text-gray-400 line-through">{formatPrice(item.total)}</div>
                            </div>
                          ) : (
                            formatPrice(item.total)
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className="border-t-2 border-gray-200">
                  <tr>
                    <td colSpan={4} className="px-5 py-3 font-semibold text-gray-900">Итого</td>
                    <td className="px-5 py-3 text-right font-bold text-lg text-gray-900">
                      {isEditable && hasChanges ? (
                        <div>
                          <div className="text-orange-600">{formatPrice(calcFactTotal())}</div>
                          <div className="text-xs text-gray-400 line-through font-normal">{formatPrice(order.total)}</div>
                        </div>
                      ) : (
                        formatPrice(order.total)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Клиент и доставка */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Клиент</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900">{order.client?.full_name || '—'}</div>
                <div className="text-gray-500">{order.client?.email}</div>
                {order.client?.phone && <div className="text-gray-500">{order.client.phone}</div>}
                {order.client?.organization && (
                  <div className="text-primary-600 font-medium">{order.client.organization.name}</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Доставка</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{order.delivery_address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {formatDate(order.delivery_date)} · {order.delivery_slot}
                  </span>
                </div>
                <div className="text-gray-500">Оплата: {order.payment_method}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Боковая панель */}
        <div className="lg:col-span-1 space-y-4">
          {/* UC-10: Подтверждение оплаты */}
          {order.payment_method === 'prepayment' && order.payment_status !== PaymentStatus.PAID && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-5">
              <h2 className="font-semibold text-yellow-800 mb-2">Ожидает оплаты</h2>
              <p className="text-sm text-yellow-700 mb-3">
                Предоплата на карту · {formatPrice(order.total)}
              </p>
              <Button
                variant="primary"
                fullWidth
                loading={isMarkingPaid}
                onClick={() => markPaid()}
              >
                Оплата получена
              </Button>
            </div>
          )}
          {order.payment_method === 'prepayment' && order.payment_status === PaymentStatus.PAID && (
            <div className="bg-green-50 rounded-xl border border-green-200 p-5">
              <div className="flex items-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="font-semibold">Оплата получена</span>
              </div>
            </div>
          )}

          {/* Смена статуса */}
          {nextStatuses.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Сменить статус</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Примечание (необязательно)</label>
                  <textarea
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    rows={2}
                    placeholder="Комментарий к статусу..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                <div className="space-y-2">
                  {nextStatuses.map((status) => (
                    <Button
                      key={status}
                      variant={status === OrderStatus.CANCELLED ? 'danger' : 'primary'}
                      fullWidth
                      size="sm"
                      loading={isChangingStatus}
                      onClick={() => changeStatus(status)}
                    >
                      {STATUS_LABELS[status]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Подсказка про ввод факта */}
          {isEditable && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <div className="flex gap-2">
                <Scale className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Ввод фактического веса</p>
                  <p className="text-amber-700">
                    Введите реальный вес каждой позиции после взвешивания.
                    Сумма пересчитается автоматически.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Таймлайн */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">История статусов</h2>
            <OrderTimeline
              currentStatus={order.status}
              statusHistory={order.status_history}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailPage
