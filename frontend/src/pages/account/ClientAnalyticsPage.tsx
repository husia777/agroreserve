// Моя аналитика для клиента (UC-57) — KPI, топ товары, расходы по месяцам
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ShoppingCart, TrendingUp, Receipt } from 'lucide-react'
import { getOrders } from '@/api/orders'
import { formatPrice } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'

// Утилита: форматирование числа сокращённо
const shortNum = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}М`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}к`
  return `${v}`
}

// KPI карточка
const KpiCard: React.FC<{
  title: string
  value: string
  sub?: string
  icon: React.ReactNode
  colorClass: string
}> = ({ title, value, sub, icon, colorClass }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-gray-500">{title}</span>
      <div className={`p-2 rounded-lg ${colorClass}`}>{icon}</div>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
)

// ============================================================
// Главная страница
// ============================================================
export const ClientAnalyticsPage: React.FC = () => {
  // Получаем все заказы клиента для расчёта аналитики
  const { data, isLoading } = useQuery({
    queryKey: ['myOrders', { per_page: 500 }],
    queryFn: () => getOrders({ per_page: 500 }),
  })

  // Клиентская аналитика из заказов
  const analytics = React.useMemo(() => {
    if (!data?.items) return null

    const orders = data.items
    const total = orders.reduce((sum, o) => sum + o.total, 0)
    const avgCheck = orders.length > 0 ? total / orders.length : 0

    // Топ товаров
    const productMap: Record<string, { name: string; qty: number; revenue: number }> = {}
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!productMap[item.product_id]) {
          productMap[item.product_id] = {
            name: item.product_name,
            qty: 0,
            revenue: 0,
          }
        }
        productMap[item.product_id].qty += item.ordered_qty
        productMap[item.product_id].revenue += item.total
      })
    })
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    // Расходы по месяцам
    const monthlyMap: Record<string, number> = {}
    orders.forEach((order) => {
      const date = new Date(order.created_at)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyMap[key] = (monthlyMap[key] || 0) + order.total
    })
    const monthly = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([date, amount]) => ({
        date: date.replace(/^(\d{4})-(\d{2})$/, (_, y, m) => {
          const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
          return `${months[parseInt(m) - 1]} ${y}`
        }),
        amount,
      }))

    return { orders_count: orders.length, total, avg_check: avgCheck, topProducts, monthly }
  }, [data])

  if (isLoading) return <PageSpinner />

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Нет данных для анализа</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Моя аналитика</h1>
        <p className="text-sm text-gray-500 mt-0.5">Статистика ваших заказов</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Всего заказов"
          value={String(analytics.orders_count)}
          icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
          colorClass="bg-blue-100"
        />
        <KpiCard
          title="Сумма заказов"
          value={formatPrice(analytics.total)}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          colorClass="bg-green-100"
        />
        <KpiCard
          title="Средний чек"
          value={formatPrice(analytics.avg_check)}
          sub={`за ${analytics.orders_count} заказов`}
          icon={<Receipt className="w-5 h-5 text-purple-600" />}
          colorClass="bg-purple-100"
        />
      </div>

      {/* Расходы по месяцам (area chart) */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Расходы по месяцам</h2>
        {analytics.monthly.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analytics.monthly} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="clientAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={shortNum} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [formatPrice(v), 'Сумма']} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#clientAreaGrad)"
                name="Расходы"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
            Недостаточно данных
          </div>
        )}
      </div>

      {/* Топ товаров (bar chart) */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Топ-5 заказываемых товаров</h2>
        {analytics.topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={analytics.topProducts}
              layout="vertical"
              margin={{ left: 10, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={shortNum} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(v: number) => [formatPrice(v), 'Сумма']} />
              <Bar dataKey="revenue" fill="#22c55e" radius={[0, 4, 4, 0]} name="Сумма" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
            Нет данных
          </div>
        )}
      </div>

      {/* Таблица топ товаров */}
      {analytics.topProducts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Детали по товарам</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Товар</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Кол-во</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analytics.topProducts.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-400 font-medium">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-5 py-3 text-right text-gray-600">{p.qty.toFixed(1)}</td>
                  <td className="px-5 py-3 text-right font-bold text-gray-900">
                    {formatPrice(p.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ClientAnalyticsPage
