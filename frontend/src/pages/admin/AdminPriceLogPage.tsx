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
import { formatPrice, formatDate } from '@/utils/format'
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
          (e) => e.date.split('T')[0] === date && e.supplier_name === name
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
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">История закупочных цен</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[200px]"
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
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[200px]"
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
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Тренд цен {productFilter && products?.items.find(p => p.id === productFilter)?.name
                ? `— ${products.items.find(p => p.id === productFilter)!.name}`
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
              <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">
                Нет данных для отображения
              </div>
            )}
          </div>

          {/* Таблица истории */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Дата</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Товар</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Поставщик</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Цена, ₽/ед.</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Изменение</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {priceLog.map((entry: PriceLogEntry) => {
                  const change = entry.change_percent
                  const isUp = change !== undefined && change > 0
                  const isDown = change !== undefined && change < 0
                  const isFlat = change !== undefined && change === 0
                  return (
                    <tr key={entry._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 text-gray-500">{formatDate(entry.date)}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{entry.product_name}</td>
                      <td className="px-5 py-3 text-gray-600 hidden md:table-cell">
                        {entry.supplier_name}
                      </td>
                      <td className="px-5 py-3 text-right font-bold text-gray-900">
                        {entry.price} ₽
                      </td>
                      <td className="px-5 py-3 text-right">
                        {change !== undefined ? (
                          <div
                            className={`inline-flex items-center gap-1 text-sm font-semibold ${
                              isUp
                                ? 'text-red-600'
                                : isDown
                                ? 'text-green-600'
                                : 'text-gray-400'
                            }`}
                          >
                            {isUp && <TrendingUp className="w-3.5 h-3.5" />}
                            {isDown && <TrendingDown className="w-3.5 h-3.5" />}
                            {isFlat && <Minus className="w-3.5 h-3.5" />}
                            {isUp ? '+' : ''}{change.toFixed(1)}%
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
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
