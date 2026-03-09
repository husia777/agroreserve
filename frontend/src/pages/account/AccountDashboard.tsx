// Личный кабинет — дашборд
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Package, FileText, User, ChevronRight, AlertCircle } from 'lucide-react'
import { getOrders } from '@/api/orders'
import { useAuthStore } from '@/stores/authStore'
import { formatPrice, formatDate } from '@/utils/format'
import { UserStatus } from '@/types'
import OrderStatusBadge from '@/components/shared/OrderStatusBadge'
import { PageSpinner } from '@/components/ui/Spinner'

export const AccountDashboard: React.FC = () => {
  const { user, isApproved } = useAuthStore()

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['myOrders', { per_page: 5 }],
    queryFn: () => getOrders({ per_page: 5, page: 1 }),
  })

  const recentOrders = ordersData?.items || []

  return (
    <div className="space-y-5">
      {/* Приветствие */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Добро пожаловать, {user?.full_name?.split(' ')[0] || 'клиент'}!
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Личный кабинет Агрорезерв
        </p>
      </div>

      {/* Уведомление о модерации */}
      {user?.status === UserStatus.PENDING && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-yellow-800">Аккаунт на проверке</div>
            <p className="text-sm text-yellow-700 mt-0.5">
              Ваш аккаунт проходит модерацию. После одобрения вы получите доступ к оптовым ценам и сможете оформлять заказы. Обычно это занимает 1–2 рабочих дня.
            </p>
          </div>
        </div>
      )}

      {/* Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/account/orders"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{ordersData?.total || 0}</div>
            <div className="text-sm text-gray-500">Мои заказы</div>
          </div>
        </Link>

        <Link
          to="/account/documents"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">—</div>
            <div className="text-sm text-gray-500">Документы</div>
          </div>
        </Link>

        <Link
          to="/account/profile"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
          <div className="mt-3">
            <div className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</div>
            <div className="text-sm text-gray-500">Профиль</div>
          </div>
        </Link>
      </div>

      {/* Кредитный лимит для B2B */}
      {isApproved && user?.credit_limit !== undefined && user.credit_limit > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Финансы</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Кредитный лимит</div>
              <div className="text-lg font-bold text-gray-900">{formatPrice(user.credit_limit)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Задолженность</div>
              <div className={`text-lg font-bold ${user.debt > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPrice(user.debt)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Доступно</div>
              <div className="text-lg font-bold text-primary-600">
                {formatPrice(user.credit_limit - user.debt)}
              </div>
            </div>
          </div>
          {user.debt > 0 && (
            <div className="mt-3 text-sm text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2">
              Погасите задолженность для увеличения доступного лимита
            </div>
          )}
        </div>
      )}

      {/* Последние заказы */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Последние заказы</h2>
          <Link
            to="/account/orders"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            Все заказы
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <PageSpinner />
        ) : recentOrders.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            Заказов пока нет.{' '}
            <Link to="/catalog" className="text-primary-600 hover:underline">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/account/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900">{order.order_number}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} size="sm" />
                  <span className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDashboard
