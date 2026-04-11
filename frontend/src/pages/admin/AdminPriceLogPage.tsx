// История закупочных цен (UC-61) — график тренда, сравнение поставщиков
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { getPriceLog, getSuppliers, getAdminProducts } from '@/api/admin'
import type { PriceLogEntry } from '@/types'
import { formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

// Цвета для линий поставщиков
const LINE_COLORS = ['#22c55e', '#3b82f6', '#f97316', '#a855f7', '#ef4444', '#06b6d4']

// ============================================================
// Главная страница
// ============================================================
export const AdminPriceLogPage: React.FC = () => {
  const [productFilter, setProductFilter] = useState('')
  const [supplierFilter, setSupplierFilter] = useState('')

  const { data: products } = useQuery({
    queryKey: ['adminProducts', { per_page: 200 }],
    queryFn: () => getAdminProducts({ per_page: 200 }),
  })

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers(),
  })

  const { data: priceLog, isLoading } = useQuery({
    queryKey: ['priceLog', { productFilter, supplierFilter }],
    queryFn: () =>
      getPriceLog({
        product_id: productFilter || undefined,
        supplier_id: supplierFilter || undefined,
      }),
  })

  // Группируем данные по поставщику для графика
  const chartData = React.useMemo(() => {
    if (!priceLog) return []

    // Все уникальные даты
    const allDates = [...new Set(priceLog.map((e) => e.date.split('T')[0]))].sort()

    // Уникальные поставщики
    const supplierNames = [...new Set(priceLog.map((e) => e.supplier_name))]

    return allDates.map((date) => {
      const point: Record<string, string | number> = { date }
      supplierNames.forEach((name) => {
        const entry = priceLog.find(
          (e) => e.date.split('T')[0] === date && e.supplier_name === name,
        )
        if (entry) {
          point[name] = entry.price
        }
      })
      return point
    })
  }, [priceLog])

  const supplierNames = React.useMemo(() => {
    if (!priceLog) return []
    return [...new Set(priceLog.map((e) => e.supplier_name))]
  }, [priceLog])

  return (
    <div className="space-y-5 p-6">
      {/* Заголовок */}
      <div className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">История закупочных цен</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="min-w-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Все товары</option>
          {products?.items.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="min-w-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Все поставщики</option>
          {suppliers?.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !priceLog?.length ? (
        <EmptyState
          title="Нет данных по ценам"
          description="История цен появится после первых приходов товара"
        />
      ) : (
        <>
          {/* График тренда */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Тренд цен{' '}
              {productFilter && products?.items.find((p) => p.id === productFilter)?.name
                ? `— ${products.items.find((p) => p.id === productFilter)!.name}`
                : ''}
            </h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v} ₽`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [`${v} ₽`, '']} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {supplierNames.map((name, i) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={LINE_COLORS[i % LINE_COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] items-center justify-center text-sm text-gray-400">
                Нет данных для отображения
              </div>
            )}
          </div>

          {/* Таблица истории */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Дата
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Товар
                  </th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                    Поставщик
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Цена, ₽/ед.
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Изменение
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {priceLog.map((entry: PriceLogEntry) => {
                  const change = entry.change_percent
                  const isUp = change !== undefined && change > 0
                  const isDown = change !== undefined && change < 0
                  const isFlat = change !== undefined && change === 0
                  return (
                    <tr key={entry._id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-5 py-3 text-gray-500">{formatDate(entry.date)}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{entry.product_name}</td>
                      <td className="hidden px-5 py-3 text-gray-600 md:table-cell">
                        {entry.supplier_name}
                      </td>
                      <td className="px-5 py-3 text-right font-bold text-gray-900">
                        {entry.price} ₽
                      </td>
                      <td className="px-5 py-3 text-right">
                        {change !== undefined ? (
                          <div
                            className={`inline-flex items-center gap-1 text-sm font-semibold ${
                              isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-400'
                            }`}
                          >
                            {isUp && <TrendingUp className="h-3.5 w-3.5" />}
                            {isDown && <TrendingDown className="h-3.5 w-3.5" />}
                            {isFlat && <Minus className="h-3.5 w-3.5" />}
                            {isUp ? '+' : ''}
                            {change.toFixed(1)}%
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminPriceLogPage
