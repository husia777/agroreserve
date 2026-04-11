// Компонент кнопки с разными вариантами и состояниями
import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

// Стили вариантов
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  outline:
    'bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500',
}

// Стили размеров
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        // Базовые стили
        'inline-flex items-center justify-center rounded-lg font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-all duration-150',
        // Вариант
        variantClasses[variant],
        // Размер
        sizeClasses[size],
        // Полная ширина
        fullWidth && 'w-full',
        // Disabled состояние
        isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Иконка слева или спиннер загрузки */}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>
      )}

      {children && <span>{children}</span>}

      {/* Иконка справа */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  )
}

export default Button
