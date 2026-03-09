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

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  showHome = true,
}) => {
  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn('flex items-center gap-1 text-sm', className)}
    >
      {showHome && (
        <>
          <Link
            to="/"
            className="flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Главная"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <>
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors truncate max-w-[160px]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-500 truncate max-w-[160px]">{item.label}</span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              </>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
