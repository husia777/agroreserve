// Компонент таблицы с zebra-striping, sticky header
import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface Column<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T, index: number) => React.ReactNode
  sortable?: boolean
  className?: string
  headerClassName?: string
  width?: string
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  sortConfig?: SortConfig
  onSort?: (key: string) => void
  rowKey?: (row: T) => string
  emptyMessage?: string
  className?: string
  stickyHeader?: boolean
  zebra?: boolean
  onRowClick?: (row: T) => void
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  sortConfig,
  onSort,
  rowKey,
  emptyMessage = 'Нет данных',
  className,
  stickyHeader = false,
  zebra = true,
  onRowClick,
}: TableProps<T>) {
  const getCellValue = (row: T, key: string): unknown => {
    if (key.includes('.')) {
      return key
        .split('.')
        .reduce((obj, k) => (obj as Record<string, unknown>)?.[k], row as unknown)
    }
    return row[key]
  }

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-gray-200', className)}>
      <table className="w-full text-left text-sm">
        {/* Заголовок */}
        <thead
          className={cn('border-b border-gray-200 bg-gray-50', stickyHeader && 'sticky top-0 z-10')}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500',
                  col.sortable && onSort && 'cursor-pointer select-none hover:text-gray-700',
                  col.headerClassName,
                )}
                style={col.width ? { width: col.width } : undefined}
                onClick={() => col.sortable && onSort && onSort(String(col.key))}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {/* Сортировка */}
                  {col.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          '-mb-0.5 h-3 w-3',
                          sortConfig?.key === col.key && sortConfig?.direction === 'asc'
                            ? 'text-primary-600'
                            : 'text-gray-300',
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          'h-3 w-3',
                          sortConfig?.key === col.key && sortConfig?.direction === 'desc'
                            ? 'text-primary-600'
                            : 'text-gray-300',
                        )}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Тело таблицы */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {loading ? (
            // Скелетон загрузки
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    <div className="h-4 animate-pulse rounded bg-gray-200" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            // Пустое состояние
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowKey ? rowKey(row) : rowIndex}
                className={cn(
                  zebra && rowIndex % 2 === 1 && 'bg-gray-50/50',
                  onRowClick && 'cursor-pointer transition-colors hover:bg-primary-50/30',
                )}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => {
                  const value = getCellValue(row, String(col.key))
                  return (
                    <td
                      key={String(col.key)}
                      className={cn('px-4 py-3 text-gray-700', col.className)}
                    >
                      {col.render ? col.render(value, row, rowIndex) : String(value ?? '—')}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
