// Маршрутный лист (UC-63) — планирование доставки на день
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { MapPin, Download, Weight, Navigation, Package } from 'lucide-react'
import { getRouteSheet, downloadRouteSheetPdf } from '@/api/admin'
import type { RouteSheetItem } from '@/api/admin'
import { formatPrice } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

// Метки метода оплаты
const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'Нал.',
  bank: 'Безнал.',
  card: 'Карта',
  credit: 'Кредит',
}

// Метки статуса оплаты
const getPaymentStatusClass = (status: string): string => {
  switch (status) {
    case 'paid': return 'text-green-600 bg-green-50'
    case 'pending': return 'text-amber-600 bg-amber-50'
    case 'overdue': return 'text-red-600 bg-red-50'
    default: return 'text-gray-500 bg-gray-50'
  }
}

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  paid: 'Оплачено',
  pending: 'Ожидает',
  partial: 'Частично',
  overdue: 'Просрочено',
}

// ============================================================
// Главная страница
// ============================================================
export const AdminLogisticsPage: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  })

  const { data: routeSheet, isLoading } = useQuery({
    queryKey: ['routeSheet', date],
    queryFn: () => getRouteSheet(date),
    enabled: !!date,
  })

  const pdfMut = useMutation({
    mutationFn: () => downloadRouteSheetPdf(date),
    onSuccess: (data) => {
      window.open(data.file_url, '_blank')
    },
  })

  return (
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Маршрутный лист</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Выбор даты */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {routeSheet && routeSheet.items.length > 0 && (
            <button
              onClick={() => pdfMut.mutate()}
              disabled={pdfMut.isPending}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {pdfMut.isPending ? 'Генерируем...' : 'Скачать PDF'}
            </button>
          )}
        </div>
      </div>

      {/* Сводка */}
      {routeSheet && routeSheet.items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Navigation className="w-4 h-4" />
              Точек доставки
            </div>
            <div className="text-2xl font-bold text-gray-900">{routeSheet.total_stops}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Weight className="w-4 h-4" />
              Общий вес
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {routeSheet.total_weight.toFixed(1)} кг
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Package className="w-4 h-4" />
              Заказов
            </div>
            <div className="text-2xl font-bold text-gray-900">{routeSheet.items.length}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-gray-500 text-xs mb-1">Сумма к получению</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(routeSheet.total_amount)}
            </div>
          </div>
        </div>
      )}

      {/* Таблица маршрута */}
      {isLoading ? (
        <PageSpinner />
      ) : !routeSheet || routeSheet.items.length === 0 ? (
        <EmptyState
          title="Доставок нет"
          description="На выбранную дату нет заказов к доставке"
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-8">
                  №
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Заказ / Клиент
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Адрес
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Слот
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Товары
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Оплата
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Вес
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {routeSheet.items.map((item: RouteSheetItem, idx) => (
                <tr key={item.order_id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 font-medium">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{item.order_number}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">
                      {item.client_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[200px]">
                    <div className="truncate text-xs">{item.address}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                      {item.slot}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-[180px]">
                    <div className="truncate text-xs">{item.items_summary}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {formatPrice(item.total)}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-500">
                        {PAYMENT_METHOD_LABELS[item.payment_method] || item.payment_method}
                      </span>
                      <span
                        className={`text-xs font-medium px-1.5 py-0.5 rounded ${getPaymentStatusClass(item.payment_status)}`}
                      >
                        {PAYMENT_STATUS_LABELS[item.payment_status] || item.payment_status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500 hidden md:table-cell">
                    {item.weight_kg.toFixed(1)} кг
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Итог */}
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr>
                <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Итого: {routeSheet.items.length} заказов, {routeSheet.total_stops} точек
                </td>
                <td className="px-4 py-3 text-right font-bold text-gray-900">
                  {formatPrice(routeSheet.total_amount)}
                </td>
                <td />
                <td className="px-4 py-3 text-right font-semibold text-gray-700 hidden md:table-cell">
                  {routeSheet.total_weight.toFixed(1)} кг
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminLogisticsPage
