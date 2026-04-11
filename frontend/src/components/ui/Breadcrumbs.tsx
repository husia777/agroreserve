// Компонент хлебных крошек
import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, showHome = true }) => {
  return (
    <nav aria-label="Хлебные крошки" className={cn('flex items-center gap-1 text-sm', className)}>
      {showHome && (
        <>
          <Link
            to="/"
            className="flex items-center text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Главная"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="max-w-[200px] truncate font-medium text-gray-900">{item.label}</span>
            ) : (
              <>
                {item.href ? (
                  <Link
                    to={item.href}
                    className="max-w-[160px] truncate text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="max-w-[160px] truncate text-gray-500">{item.label}</span>
                )}
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
              </>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
