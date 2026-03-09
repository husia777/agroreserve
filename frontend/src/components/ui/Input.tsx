// Компонент поля ввода с floating label, ошибкой и иконкой
import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconClick,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {/* Метка */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Обёртка поля */}
        <div className="relative">
          {/* Левая иконка */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Поле ввода */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'placeholder:text-gray-400',
              // Паддинги
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              'py-2.5',
              // Состояние ошибки
              error
                ? 'border-red-300 bg-red-50 focus:ring-red-300 focus:border-red-400 text-red-900'
                : 'border-gray-300 bg-white focus:ring-primary-300 focus:border-primary-400 text-gray-900',
              // Disabled
              props.disabled && 'bg-gray-100 cursor-not-allowed text-gray-500',
              className
            )}
            {...props}
          />

          {/* Правая иконка */}
          {rightIcon && (
            <div
              className={cn(
                'absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400',
                onRightIconClick && 'cursor-pointer hover:text-gray-600'
              )}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}

        {/* Подсказка */}
        {hint && !error && (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
