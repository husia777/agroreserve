// Мои заказы
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { getOrders } from '@/api/orders'
import { OrderStatus } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import OrderStatusBadge from '@/components/shared/OrderStatusBadge'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'

const STATUS_OPTIONS = [
  { value: '', label: 'Все статусы' },
  { value: OrderStatus.NEW, label: 'Новые' },
  { value: OrderStatus.CONFIRMED, label: 'Подтверждённые' },
  { value: OrderStatus.ASSEMBLING, label: 'Собираются' },
  { value: OrderStatus.DELIVERING, label: 'В пути' },
  { value: OrderStatus.DELIVERED, label: 'Доставленные' },
  { value: OrderStatus.CANCELLED, label: 'Отменённые' },
]

export const OrdersPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<string>('')

  const { data, isLoading } = useQuery({
    queryKey: ['myOrders', { page, status }],
    queryFn: () => getOrders({
      page,
      per_page: 15,
      status: status as OrderStatus || undefined,
    }),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Мои заказы</h1>
        {data && (
          <span className="text-sm text-gray-500">{data.total} заказов</span>
        )}
      </div>

      {/* Фильтры */}
      <div className="flex gap-3">
        <div className="w-48">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : data?.items.length === 0 ? (
        <EmptyState
          title="Заказов нет"
          description={status ? 'Нет заказов с выбранным статусом' : 'Вы ещё не сделали ни одного заказа'}
          action={
            !status
              ? { label: 'Перейти в каталог', onClick: () => window.location.href = '/catalog' }
              : undefined
          }
        />
      ) : (
        <>
          {/* Таблица (desktop) */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Номер</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Дата</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Товаров</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.items.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-gray-900">{order.order_number}</td>
                    <td className="px-5 py-3 text-gray-500">{formatDate(order.created_at)}</td>
                    <td className="px-5 py-3 text-gray-600">{order.items?.length || 0} поз.</td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Детали
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Карточки (mobile) */}
          <div className="md:hidden space-y-3">
            {data?.items.map((order) => (
              <Link
                key={order.id}
                to={`/account/orders/${order.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{order.order_number}</span>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>
                <div className="text-xs text-gray-400">{formatDate(order.created_at)}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{order.items?.length || 0} позиций</span>
                  <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={data?.pages || 1}
            onPageChange={setPage}
            className="mt-4"
          />
        </>
      )}
    </div>
  )
}

export default OrdersPage
