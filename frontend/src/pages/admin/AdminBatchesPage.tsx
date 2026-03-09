// Партии товара (UC-33) — FIFO учёт, сроки годности, подсветка
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layers, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import { getBatches } from '@/api/admin'
import type { Batch } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import SearchInput from '@/components/ui/SearchInput'

// Функция для определения статуса срока годности
const getExpiryStatus = (expiryDate?: string): 'expired' | 'expiring' | 'ok' | 'none' => {
  if (!expiryDate) return 'none'
  const now = new Date()
  const expiry = new Date(expiryDate)
  const diffDays = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'expired'
  if (diffDays <= 7) return 'expiring'
  return 'ok'
}

// Тег срока годности
const ExpiryTag: React.FC<{ expiryDate?: string }> = ({ expiryDate }) => {
  if (!expiryDate) return <span className="text-gray-300 text-xs">—</span>
  const status = getExpiryStatus(expiryDate)
  const now = new Date()
  const expiry = new Date(expiryDate)
  const diffDays = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (status === 'expired') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
        <AlertTriangle className="w-3 h-3" />
        Просрочено
      </span>
    )
  }
  if (status === 'expiring') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
        <Clock className="w-3 h-3" />
        {diffDays <= 0 ? 'Сегодня' : `${diffDays} д.`}
      </span>
    )
  }
  return <span className="text-xs text-gray-500">{formatDate(expiryDate)}</span>
}

// ============================================================
// Главная страница
// ============================================================
export const AdminBatchesPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showExhausted, setShowExhausted] = useState(false)
  const [onlyExpiring, setOnlyExpiring] = useState(false)

  const { data: batches, isLoading } = useQuery({
    queryKey: ['batches', { showExhausted, onlyExpiring }],
    queryFn: () =>
      getBatches({
        is_exhausted: showExhausted ? undefined : false,
        expiring_soon: onlyExpiring ? true : undefined,
      }),
  })

  // Клиентская фильтрация по поиску
  const filtered = React.useMemo(() => {
    if (!batches) return []
    if (!search.trim()) return batches
    const q = search.toLowerCase()
    return batches.filter(
      (b) =>
        b.product_name.toLowerCase().includes(q)
    )
  }, [batches, search])

  // Статистика
  const stats = React.useMemo(() => {
    if (!batches) return { total: 0, expiring: 0, expired: 0 }
    const expiring = batches.filter((b) => getExpiryStatus(b.expiry_date) === 'expiring').length
    const expired = batches.filter((b) => getExpiryStatus(b.expiry_date) === 'expired').length
    return { total: batches.length, expiring, expired }
  }, [batches])

  return (
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center gap-3">
        <Layers className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Партии товара</h1>
        {batches && (
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {batches.length}
          </span>
        )}
      </div>

      {/* Информационные бейджи */}
      {(stats.expiring > 0 || stats.expired > 0) && (
        <div className="flex gap-3 flex-wrap">
          {stats.expired > 0 && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              Просрочено: {stats.expired} партий
            </div>
          )}
          {stats.expiring > 0 && (
            <div className="flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" />
              Истекает срок: {stats.expiring} партий
            </div>
          )}
        </div>
      )}

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder="Поиск по товару..." />
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showExhausted}
            onChange={(e) => setShowExhausted(e.target.checked)}
            className="rounded border-gray-300 text-primary-600"
          />
          Показать исчерпанные
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
          <input
            type="checkbox"
            checked={onlyExpiring}
            onChange={(e) => setOnlyExpiring(e.target.checked)}
            className="rounded border-gray-300 text-primary-600"
          />
          Только с истекающим сроком
        </label>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !filtered.length ? (
        <EmptyState title="Партий нет" description="Нет данных по партиям" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Товар</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Нач. кол-во</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Остаток</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Себестоимость</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Приход</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Срок годности</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">FIFO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((batch: Batch, idx) => {
                const expiryStatus = getExpiryStatus(batch.expiry_date)
                const rowClass = batch.is_exhausted
                  ? 'opacity-40'
                  : expiryStatus === 'expired'
                  ? 'bg-red-50'
                  : expiryStatus === 'expiring'
                  ? 'bg-amber-50'
                  : ''

                // Простая логика FIFO: первая не исчерпанная партия = следующая к отгрузке
                const isFifoNext = !batch.is_exhausted && idx === filtered.findIndex(b => !b.is_exhausted)

                return (
                  <tr key={batch._id} className={`hover:bg-gray-50/50 transition-colors ${rowClass}`}>
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-900">{batch.product_name}</div>
                      <div className="text-xs text-gray-400 font-mono">{batch._id.slice(-6)}</div>
                    </td>
                    <td className="px-5 py-3 text-right text-gray-600">
                      {batch.qty_initial}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {batch.is_exhausted ? (
                        <span className="text-gray-300">0 (исч.)</span>
                      ) : (
                        <span className={`font-semibold ${
                          batch.qty_remaining < batch.qty_initial * 0.2
                            ? 'text-amber-600'
                            : 'text-gray-900'
                        }`}>
                          {batch.qty_remaining}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-600 hidden md:table-cell">
                      {formatPrice(batch.cost_price)}
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">
                      {formatDate(batch.received_date)}
                    </td>
                    <td className="px-5 py-3">
                      <ExpiryTag expiryDate={batch.expiry_date} />
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      {isFifoNext ? (
                        <div className="flex items-center justify-center gap-1 text-xs text-green-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Следующая
                        </div>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminBatchesPage
