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
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Склад</h1>
        <Link to="/admin/stock/receipt">
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
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
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="font-semibold text-red-800">Критичные остатки ({criticalItems.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {criticalItems.map((item) => (
                  <div key={item.product_id} className="bg-white rounded-lg border border-red-200 p-3">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {item.product?.name || '—'}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Мин: {formatQuantity(item.min_quantity, item.product?.unit || 'kg')}
                      </span>
                      <span className={cn(
                        'text-sm font-bold',
                        item.quantity <= 0 ? 'text-red-600' : 'text-orange-600'
                      )}>
                        {formatQuantity(item.quantity, item.product?.unit || 'kg')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Таблица остатков */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Товар</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Категория</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Остаток</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Мин. остаток</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...criticalItems, ...normalItems].map((item, i) => (
                  <tr
                    key={item.product_id}
                    className={cn(
                      'transition-colors',
                      item.is_critical ? 'bg-red-50/30' : i % 2 === 1 ? 'bg-gray-50/50' : ''
                    )}
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {item.product?.name || '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">
                      {item.product?.category?.name || '—'}
                    </td>
                    <td className={cn(
                      'px-5 py-3 text-right font-semibold',
                      item.quantity <= 0 ? 'text-red-600' : item.is_critical ? 'text-orange-600' : 'text-gray-900'
                    )}>
                      {formatQuantity(item.quantity, item.product?.unit || 'kg')}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-500 hidden md:table-cell">
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
