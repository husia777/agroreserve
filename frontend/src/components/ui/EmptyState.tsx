// Компонент пустого состояния
import React from 'react'
import { PackageOpen } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from './Button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
    >
      {/* Иконка */}
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
        {icon || <PackageOpen className="w-8 h-8" />}
      </div>

      {/* Заголовок */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Описание */}
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      )}

      {/* Кнопка действия */}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
