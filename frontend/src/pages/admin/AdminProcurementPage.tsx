// Рекомендации закупок (UC-27) — что и сколько нужно купить
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ShoppingBag, AlertTriangle, Download, X } from 'lucide-react'
import { getProcurementRecommendations, getSuppliers, generateProcurementOrder } from '@/api/admin'
import type { ProcurementRecommendation } from '@/types'
import { formatPrice } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

// Модальное окно выбора поставщика и формирования заявки
const GenerateOrderModal: React.FC<{
  selectedItems: ProcurementRecommendation[]
  onClose: () => void
}> = ({ selectedItems, onClose }) => {
  const [supplierId, setSupplierId] = useState('')

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers({ is_active: true }),
  })

  const genMut = useMutation({
    mutationFn: () =>
      generateProcurementOrder({
        supplier_id: supplierId,
        items: selectedItems.map((r) => ({
          product_id: r.product_id,
          qty: r.recommended_qty,
        })),
      }),
    onSuccess: (data) => {
      window.open(data.file_url, '_blank')
      onClose()
    },
  })

  const totalEstimate = selectedItems.reduce((sum, r) => sum + r.estimated_cost, 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Сформировать заявку поставщику</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Позиции */}
          <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg bg-gray-50 p-4">
            {selectedItems.map((item) => (
              <div key={item.product_id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.product_name}</span>
                <span className="font-medium text-gray-500">
                  {item.recommended_qty} {item.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
            <span>Примерная сумма заявки:</span>
            <span>{formatPrice(totalEstimate)}</span>
          </div>

          {/* Выбор поставщика */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Поставщик <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">-- Выберите поставщика --</option>
              {suppliers?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => genMut.mutate()}
              disabled={genMut.isPending || !supplierId}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {genMut.isPending ? 'Генерируем...' : 'Скачать PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminProcurementPage: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [modalOpen, setModalOpen] = useState(false)

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['procurementRecommendations'],
    queryFn: getProcurementRecommendations,
  })

  const toggleSelect = (productId: string) => {
    const next = new Set(selected)
    if (next.has(productId)) {
      next.delete(productId)
    } else {
      next.add(productId)
    }
    setSelected(next)
  }

  const toggleSelectAll = () => {
    if (!recommendations) return
    if (selected.size === recommendations.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(recommendations.map((r) => r.product_id)))
    }
  }

  const selectedItems = recommendations?.filter((r) => selected.has(r.product_id)) || []

  return (
    <div className="space-y-5 p-6">
      {/* Заголовок */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Рекомендации закупок</h1>
          {recommendations && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {recommendations.length} позиций
            </span>
          )}
        </div>
        {selected.size > 0 && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <Download className="h-4 w-4" />
            Сформировать заявку ({selected.size})
          </button>
        )}
      </div>

      {/* Легенда */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-red-200" />
          <span className="text-gray-500">Критично (нужен срочный заказ)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-amber-100" />
          <span className="text-gray-500">Остаток ниже нормы</span>
        </div>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !recommendations?.length ? (
        <EmptyState
          title="Закупки не требуются"
          description="Все товары в достаточном количестве"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="w-8 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === recommendations.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Товар
                </th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                  Остаток
                </th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                  Мин.
                </th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                  Расход/нед.
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Рекомендация
                </th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                  Стоимость
                </th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                  Дней осталось
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recommendations.map((rec: ProcurementRecommendation) => (
                <tr
                  key={rec.product_id}
                  onClick={() => toggleSelect(rec.product_id)}
                  className={`cursor-pointer transition-colors ${
                    rec.is_critical
                      ? 'bg-red-50 hover:bg-red-100'
                      : rec.current_stock < rec.min_stock * 1.5
                        ? 'bg-amber-50 hover:bg-amber-100'
                        : 'hover:bg-gray-50/50'
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(rec.product_id)}
                      onChange={() => toggleSelect(rec.product_id)}
                      className="rounded border-gray-300 text-primary-600"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {rec.is_critical && (
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{rec.product_name}</div>
                        {rec.is_critical && (
                          <div className="text-xs font-medium text-red-500">Критичный остаток</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-right md:table-cell">
                    <span
                      className={
                        rec.current_stock < rec.min_stock
                          ? 'font-semibold text-red-600'
                          : 'text-gray-700'
                      }
                    >
                      {rec.current_stock} {rec.unit}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-right text-gray-500 md:table-cell">
                    {rec.min_stock} {rec.unit}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-gray-500 lg:table-cell">
                    {rec.avg_weekly_consumption} {rec.unit}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-bold text-primary-700">
                      {rec.recommended_qty} {rec.unit}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-right text-gray-700 sm:table-cell">
                    {formatPrice(rec.estimated_cost)}
                  </td>
                  <td className="hidden px-4 py-3 text-right lg:table-cell">
                    <span
                      className={
                        rec.days_remaining <= 3
                          ? 'font-bold text-red-600'
                          : rec.days_remaining <= 7
                            ? 'font-semibold text-amber-600'
                            : 'text-gray-500'
                      }
                    >
                      {rec.days_remaining} д.
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Итого */}
          {recommendations.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3">
              <span className="text-sm text-gray-500">
                Выбрано: {selected.size} из {recommendations.length} позиций
              </span>
              <span className="text-sm font-bold text-gray-900">
                Итого: {formatPrice(selectedItems.reduce((sum, r) => sum + r.estimated_cost, 0))}
              </span>
            </div>
          )}
        </div>
      )}

      {modalOpen && selectedItems.length > 0 && (
        <GenerateOrderModal selectedItems={selectedItems} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

export default AdminProcurementPage
