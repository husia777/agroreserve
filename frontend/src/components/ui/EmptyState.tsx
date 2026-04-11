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
      className={cn('flex flex-col items-center justify-center px-4 py-16 text-center', className)}
    >
      {/* Иконка */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        {icon || <PackageOpen className="h-8 w-8" />}
      </div>

      {/* Заголовок */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

      {/* Описание */}
      {description && <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>}

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
