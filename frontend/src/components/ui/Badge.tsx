// Компонент бейджа для статусов и меток
import React from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'gray' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'cyan' | 'orange'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  orange: 'bg-orange-100 text-orange-800',
}

const dotVariantClasses: Record<BadgeVariant, string> = {
  gray: 'bg-gray-400',
  green: 'bg-green-600',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  cyan: 'bg-cyan-500',
  orange: 'bg-orange-500',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  size = 'md',
  children,
  className,
  dot = false,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotVariantClasses[variant])}
        />
      )}
      {children}
    </span>
  )
}

export default Badge
