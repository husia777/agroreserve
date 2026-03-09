// Компонент пагинации
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null

  // Генерируем диапазон страниц для отображения
  const getPageNumbers = () => {
    const delta = 2
    const range: (number | '...')[] = []
    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    range.push(1)
    if (left > 2) range.push('...')
    for (let i = left; i <= right; i++) range.push(i)
    if (right < totalPages - 1) range.push('...')
    if (totalPages > 1) range.push(totalPages)

    return range
  }

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="Пагинация"
    >
      {/* Кнопка "Назад" */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(
          'p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
          page === 1 && 'opacity-30 cursor-not-allowed'
        )}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Номера страниц */}
      {getPageNumbers().map((pageNum, idx) =>
        pageNum === '...' ? (
          <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum as number)}
            className={cn(
              'min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors',
              page === pageNum
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
            aria-current={page === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        )
      )}

      {/* Кнопка "Вперёд" */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          'p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
          page === totalPages && 'opacity-30 cursor-not-allowed'
        )}
        aria-label="Следующая страница"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}

export default Pagination
