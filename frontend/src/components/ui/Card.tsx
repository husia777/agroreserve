// Базовая карточка
import React from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  onClick?: () => void
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-6 sm:p-8',
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        paddingClasses[padding],
        hover && 'hover:shadow-md hover:border-gray-300 transition-all cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// Секция карточки с заголовком
interface CardSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  children,
  className,
  headerAction,
}) => {
  return (
    <div className={className}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
          </div>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
