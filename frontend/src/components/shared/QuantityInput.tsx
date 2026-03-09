// Поле ввода количества с кнопками +/-
import React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: {
    button: 'w-7 h-7',
    input: 'w-14 h-7 text-sm',
    icon: 'w-3.5 h-3.5',
  },
  md: {
    button: 'w-9 h-9',
    input: 'w-16 h-9 text-sm',
    icon: 'w-4 h-4',
  },
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  unit,
  disabled = false,
  className,
  size = 'md',
}) => {
  const classes = sizeClasses[size]

  const handleDecrease = () => {
    const newValue = Math.max(min, +(value - step).toFixed(2))
    onChange(newValue)
  }

  const handleIncrease = () => {
    const newValue = Math.min(max, +(value + step).toFixed(2))
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, +(parsed).toFixed(2)))
      onChange(clamped)
    }
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Кнопка уменьшения */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className={cn(
          'rounded-lg border border-gray-200 bg-white text-gray-600',
          'hover:bg-gray-50 hover:border-gray-300 transition-colors',
          'flex items-center justify-center flex-shrink-0',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          classes.button
        )}
        aria-label="Уменьшить"
      >
        <Minus className={classes.icon} />
      </button>

      {/* Поле ввода */}
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'text-center border border-gray-200 rounded-lg font-semibold text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            classes.input
          )}
        />
        {unit && (
          <span className="ml-1 text-sm text-gray-400">{unit}</span>
        )}
      </div>

      {/* Кнопка увеличения */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className={cn(
          'rounded-lg border border-gray-200 bg-white text-gray-600',
          'hover:bg-gray-50 hover:border-gray-300 transition-colors',
          'flex items-center justify-center flex-shrink-0',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          classes.button
        )}
        aria-label="Увеличить"
      >
        <Plus className={classes.icon} />
      </button>
    </div>
  )
}

export default QuantityInput
