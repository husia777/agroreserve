// Админ дашборд — Виджет «Сегодняшний день» (UC-58)
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  AlertTriangle,
  Clock,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { getDashboard } from '@/api/admin'
import { DeliveryPriority } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

// Карточка KPI
const KpiCard: React.FC<{
  title: string
  value: string
  change?: number
  icon: React.ReactNode
  color?: string
  link?: string
}> = ({ title, value, change, icon, color = 'bg-gray-50', link }) => {
  const content = (
    <div className={cn('rounded-xl border border-gray-200 p-4', color)}>
      <div className="flex items-start justify-between">
        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">{title}</div>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 mt-1 text-xs', change >= 0 ? 'text-green-600' : 'text-red-500')}>
          {change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {change >= 0 ? '+' : ''}{formatPrice(Math.abs(change))} от вчера
        </div>
      )}
    </div>
  )

  if (link) {
    return <Link to={link}>{content}</Link>
  }
  return content
}

const priorityConfig: Record<DeliveryPriority, { label: string; variant: 'red' | 'yellow' | 'green' }> = {
  [DeliveryPriority.URGENT]: { label: '🔴 Срочно', variant: 'red' },
  [DeliveryPriority.NORMAL]: { label: '🟡 Обычный', variant: 'yellow' },
  [DeliveryPriority.FLEXIBLE]: { label: '🟢 Гибкий', variant: 'green' },
}

export const AdminDashboard: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: getDashboard,
    refetchInterval: 60000, // Обновляем каждую минуту
  })

  if (isLoading) return <PageSpinner />

  const today = data?.today
  const yesterday = data?.yesterday
  const revenueChange = today && yesterday ? today.revenue - yesterday.revenue : undefined

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Сегодня</h1>
        <p className="text-gray-500 text-sm mt-0.5">{formatDate(new Date().toISOString())}</p>
      </div>

      {/* Финансы */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          💰 Финансы
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Выручка сегодня"
            value={formatPrice(today?.revenue || 0)}
            change={revenueChange}
            icon={<TrendingUp className="w-5 h-5" />}
            color="bg-green-50"
          />
          <KpiCard
            title="Оплачено"
            value={formatPrice(today?.paid || 0)}
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
          <KpiCard
            title="Дебиторка"
            value={formatPrice(today?.debt || 0)}
            icon={<TrendingDown className="w-5 h-5 text-red-500" />}
            color={today && today.debt > 0 ? 'bg-red-50' : undefined}
          />
          <KpiCard
            title="Новых заказов"
            value={String(today?.orders_new || 0)}
            icon={<Package className="w-5 h-5 text-blue-500" />}
            link="/admin/orders"
          />
        </div>
      </section>

      {/* Заказы */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            📦 Заказы
          </h2>
          <Link to="/admin/orders" className="text-sm text-primary-600 hover:underline">
            Все заказы →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 text-center">
            <div className="text-3xl font-bold text-blue-700">{today?.orders_new || 0}</div>
            <div className="text-sm text-blue-600 mt-1">Новых</div>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-700">{today?.orders_to_ship || 0}</div>
            <div className="text-sm text-yellow-600 mt-1">К отгрузке</div>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-100 p-4 text-center">
            <div className="text-3xl font-bold text-red-700">{today?.orders_urgent || 0}</div>
            <div className="text-sm text-red-600 mt-1">Срочных</div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Доставки на сегодня */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4" /> Доставки сегодня
            </h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {!data?.deliveries_today?.length ? (
              <div className="py-8 text-center text-gray-400 text-sm">Нет запланированных доставок</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {data.deliveries_today.map((delivery) => (
                  <Link
                    key={delivery.order_id}
                    to={`/admin/orders/${delivery.order_id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{delivery.order_number}</span>
                        <Badge variant={priorityConfig[delivery.priority]?.variant || 'gray'} size="sm">
                          {priorityConfig[delivery.priority]?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Clock className="w-3 h-3" />{delivery.slot}
                        <MapPin className="w-3 h-3 ml-1" />
                        <span className="truncate">{delivery.address}</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {formatPrice(delivery.total)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Напоминания и критичные остатки */}
        <div className="space-y-4">
          {/* Напоминания */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              📋 Напоминания
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {!data?.reminders?.length ? (
                <div className="py-6 text-center text-gray-400 text-sm">Всё в порядке 👍</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {data.reminders.map((reminder, i) => (
                    <div key={i} className={cn(
                      'flex items-start gap-3 px-4 py-3',
                      reminder.urgency === 'high' ? 'bg-red-50/50' : ''
                    )}>
                      <AlertTriangle className={cn(
                        'w-4 h-4 mt-0.5 flex-shrink-0',
                        reminder.urgency === 'high' ? 'text-red-500' : 'text-yellow-500'
                      )} />
                      <p className="text-sm text-gray-700">{reminder.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Критичные остатки */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                📊 Критичные остатки
              </h2>
              <Link to="/admin/stock" className="text-sm text-primary-600 hover:underline">Склад →</Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {!data?.critical_stock?.length ? (
                <div className="py-6 text-center text-gray-400 text-sm">Всё в норме</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {data.critical_stock.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">
                        {item.product?.name || '—'}
                      </span>
                      <span className={cn(
                        'text-sm font-bold',
                        item.quantity <= 0 ? 'text-red-600' : 'text-orange-500'
                      )}>
                        {item.quantity} кг
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
