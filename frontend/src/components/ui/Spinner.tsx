// Компонент индикатора загрузки
import React from 'react'
import { cn } from '@/utils/cn'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
  label?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  label = 'Загрузка...',
}) => {
  return (
    <div className="flex items-center justify-center" role="status" aria-label={label}>
      <div
        className={cn(
          'rounded-full border-gray-200 border-t-primary-600 animate-spin',
          sizeClasses[size],
          className
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Полноэкранный спиннер
export const FullPageSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-3 text-sm text-gray-500">Загрузка...</p>
      </div>
    </div>
  )
}

// Спиннер контента страницы
export const PageSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-64">
      <Spinner size="lg" />
    </div>
  )
}

export default Spinner
