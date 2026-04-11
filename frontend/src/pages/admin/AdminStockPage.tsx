// Склад — текущие остатки
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus, AlertTriangle } from 'lucide-react'
import { getStockItems } from '@/api/admin'
import { formatQuantity } from '@/utils/format'
import Button from '@/components/ui/Button'
import { PageSpinner } from '@/components/ui/Spinner'
import { cn } from '@/utils/cn'

export const AdminStockPage: React.FC = () => {
  const { data: stockItems, isLoading } = useQuery({
    queryKey: ['adminStock'],
    queryFn: getStockItems,
  })

  const criticalItems = stockItems?.filter((item) => item.is_critical) || []
  const normalItems = stockItems?.filter((item) => !item.is_critical) || []

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Склад</h1>
        <Link to="/admin/stock/receipt">
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            Приходование
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          {/* Критичные остатки */}
          {criticalItems.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h2 className="font-semibold text-red-800">
                  Критичные остатки ({criticalItems.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {criticalItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="rounded-lg border border-red-200 bg-white p-3"
                  >
                    <div className="truncate text-sm font-medium text-gray-900">
                      {item.product?.name || '—'}
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Мин: {formatQuantity(item.min_quantity, item.product?.unit || 'kg')}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-bold',
                          item.quantity <= 0 ? 'text-red-600' : 'text-orange-600',
                        )}
                      >
                        {formatQuantity(item.quantity, item.product?.unit || 'kg')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Таблица остатков */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Товар
                  </th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                    Категория
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Остаток
                  </th>
                  <th className="hidden px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                    Мин. остаток
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...criticalItems, ...normalItems].map((item, i) => (
                  <tr
                    key={item.product_id}
                    className={cn(
                      'transition-colors',
                      item.is_critical ? 'bg-red-50/30' : i % 2 === 1 ? 'bg-gray-50/50' : '',
                    )}
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {item.product?.name || '—'}
                    </td>
                    <td className="hidden px-5 py-3 text-gray-500 md:table-cell">
                      {item.product?.category?.name || '—'}
                    </td>
                    <td
                      className={cn(
                        'px-5 py-3 text-right font-semibold',
                        item.quantity <= 0
                          ? 'text-red-600'
                          : item.is_critical
                            ? 'text-orange-600'
                            : 'text-gray-900',
                      )}
                    >
                      {formatQuantity(item.quantity, item.product?.unit || 'kg')}
                    </td>
                    <td className="hidden px-5 py-3 text-right text-gray-500 md:table-cell">
                      {formatQuantity(item.min_quantity, item.product?.unit || 'kg')}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {item.quantity <= 0 ? (
                        <span className="text-xs font-medium text-red-600">Нет</span>
                      ) : item.is_critical ? (
                        <span className="text-xs font-medium text-orange-600">Мало</span>
                      ) : (
                        <span className="text-xs font-medium text-green-600">В норме</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminStockPage
