// Управление заказами в adminке
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { getAdminOrders } from '@/api/admin'
import { OrderStatus } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import OrderStatusBadge from '@/components/shared/OrderStatusBadge'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import SearchInput from '@/components/ui/SearchInput'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Input from '@/components/ui/Input'

const STATUS_OPTIONS = [
  { value: '', label: 'Все статусы' },
  { value: OrderStatus.NEW, label: 'Новый' },
  { value: OrderStatus.CONFIRMED, label: 'Подтверждён' },
  { value: OrderStatus.ASSEMBLING, label: 'Собирается' },
  { value: OrderStatus.ASSEMBLED, label: 'Собран' },
  { value: OrderStatus.DELIVERING, label: 'В пути' },
  { value: OrderStatus.DELIVERED, label: 'Доставлен' },
  { value: OrderStatus.CANCELLED, label: 'Отменён' },
]

export const AdminOrdersPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['adminOrders', { page, status, deliveryDate, search }],
    queryFn: () => getAdminOrders({
      page,
      per_page: 20,
      status: status as OrderStatus || undefined,
      delivery_date: deliveryDate || undefined,
    }),
  })

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Заказы</h1>
        {data && <span className="text-sm text-gray-500">{data.total} заказов</span>}
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <div className="w-44">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          />
        </div>
        <div className="w-40">
          <Input
            type="date"
            value={deliveryDate}
            onChange={(e) => { setDeliveryDate(e.target.value); setPage(1) }}
            placeholder="Дата доставки"
          />
        </div>
        <div className="flex-1 min-w-[200px] max-w-sm">
          <SearchInput
            value={search}
            onChange={(v) => { setSearch(v); setPage(1) }}
            placeholder="Поиск по номеру, клиенту..."
          />
        </div>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : data?.items.length === 0 ? (
        <EmptyState title="Заказов нет" description="Нет заказов по выбранным фильтрам" />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Номер</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Клиент</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Доставка</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Дата</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.items.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-gray-900">{order.order_number}</td>
                    <td className="px-5 py-3 text-gray-700 max-w-[150px] truncate">
                      {order.client?.full_name || '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">
                      {order.delivery_date && formatDate(order.delivery_date)} {order.delivery_slot && `· ${order.delivery_slot}`}
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            totalPages={data?.pages || 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default AdminOrdersPage
