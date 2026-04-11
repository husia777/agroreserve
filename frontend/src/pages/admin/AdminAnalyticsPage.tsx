// Дашборд аналитики (UC-12) — KPI, графики, топы
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  Percent,
  Calculator,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  getAnalyticsOverview,
  getAnalyticsRevenue,
  getAnalyticsTopProducts,
  getAnalyticsTopClients,
  getAnalyticsTrends,
} from '@/api/admin'
import { formatPrice } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'

type Period = 'week' | 'month' | 'quarter' | 'year'

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'year', label: 'Год' },
]

// KPI карточка
const KpiCard: React.FC<{
  title: string
  value: string
  change?: number
  icon: React.ReactNode
  colorClass: string
}> = ({ title, value, change, icon, colorClass }) => {
  const isPositive = change !== undefined && change >= 0
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">{title}</span>
        <div className={`rounded-lg p-2 ${colorClass}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {change !== undefined && (
        <div
          className={`mt-1 flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isPositive ? '+' : ''}
          {change.toFixed(1)}% к прошлому периоду
        </div>
      )}
    </div>
  )
}

// Форматирование значений для графика
const shortPrice = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}М`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}к`
  return `${v}`
}

// ============================================================
// Главная страница
// ============================================================
export const AdminAnalyticsPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('month')

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['analyticsOverview', period],
    queryFn: () => getAnalyticsOverview({ period }),
  })

  const { data: revenue } = useQuery({
    queryKey: ['analyticsRevenue', period],
    queryFn: () => getAnalyticsRevenue({ period }),
  })

  const { data: topProducts } = useQuery({
    queryKey: ['analyticsTopProducts', period],
    queryFn: () => getAnalyticsTopProducts({ period, limit: 5 }),
  })

  const { data: topClients } = useQuery({
    queryKey: ['analyticsTopClients', period],
    queryFn: () => getAnalyticsTopClients({ period, limit: 5 }),
  })

  const { data: trends } = useQuery({
    queryKey: ['analyticsTrends'],
    queryFn: () => getAnalyticsTrends({ months: 12 }),
  })

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок и переключатель периода */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
        </div>
        <div className="flex gap-0.5 rounded-lg bg-gray-100 p-1">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                period === opt.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI карточки */}
      {overviewLoading ? (
        <PageSpinner />
      ) : overview ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          <KpiCard
            title="Выручка"
            value={formatPrice(overview.revenue)}
            change={overview.revenue_change}
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
            colorClass="bg-green-100"
          />
          <KpiCard
            title="Прибыль"
            value={formatPrice(overview.profit)}
            change={overview.profit_change}
            icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
            colorClass="bg-blue-100"
          />
          <KpiCard
            title="Заказы"
            value={String(overview.orders_count)}
            icon={<ShoppingCart className="h-5 w-5 text-purple-600" />}
            colorClass="bg-purple-100"
          />
          <KpiCard
            title="Клиенты"
            value={String(overview.clients_count)}
            icon={<Users className="h-5 w-5 text-amber-600" />}
            colorClass="bg-amber-100"
          />
          <KpiCard
            title="Средний чек"
            value={formatPrice(overview.avg_check)}
            icon={<Calculator className="h-5 w-5 text-indigo-600" />}
            colorClass="bg-indigo-100"
          />
          <KpiCard
            title="Маржа"
            value={`${overview.margin_percent.toFixed(1)}%`}
            icon={<Percent className="h-5 w-5 text-teal-600" />}
            colorClass="bg-teal-100"
          />
        </div>
      ) : null}

      {/* График выручки (area) */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Выручка за период</h2>
        {revenue && revenue.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={shortPrice} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number, name: string) => [
                  formatPrice(v),
                  name === 'revenue' ? 'Выручка' : 'Прибыль',
                ]}
              />
              <Legend
                formatter={(val) => (val === 'revenue' ? 'Выручка' : 'Прибыль')}
                wrapperStyle={{ fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#revGradient)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#profGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
            Нет данных за выбранный период
          </div>
        )}
      </div>

      {/* Топ-5 товаров + Топ-5 клиентов */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Топ-5 товаров (bar) */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Топ-5 товаров по выручке</h2>
          {topProducts && topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={shortPrice} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [formatPrice(v), 'Выручка']} />
                <Bar dataKey="revenue" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
              Нет данных
            </div>
          )}
        </div>

        {/* Топ-5 клиентов (таблица) */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Топ-5 клиентов</h2>
          {topClients && topClients.length > 0 ? (
            <div className="space-y-3">
              {topClients.map((client, i) => (
                <div key={client.client_id} className="flex items-center gap-3">
                  {/* Место */}
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? 'bg-amber-100 text-amber-700'
                        : i === 1
                          ? 'bg-gray-200 text-gray-600'
                          : i === 2
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {/* Имя */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-xs text-gray-400">
                      {client.orders_count} заказов · ср. чек {formatPrice(client.avg_check)}
                    </div>
                  </div>
                  {/* Выручка */}
                  <div className="flex-shrink-0 text-sm font-bold text-gray-900">
                    {formatPrice(client.revenue)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
              Нет данных
            </div>
          )}
        </div>
      </div>

      {/* Тренды за 12 месяцев (line) */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Тренды за последние 12 месяцев
        </h2>
        {trends && trends.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={shortPrice} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number, name: string) => [
                  formatPrice(v),
                  name === 'revenue' ? 'Выручка' : 'Прибыль',
                ]}
              />
              <Legend
                formatter={(val) => (val === 'revenue' ? 'Выручка' : 'Прибыль')}
                wrapperStyle={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">
            Нет данных за 12 месяцев
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAnalyticsPage
