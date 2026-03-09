// Компонент поиска с debounce
import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SearchInputProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
  autoFocus?: boolean
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value: externalValue,
  onChange,
  placeholder = 'Поиск...',
  debounceMs = 400,
  className,
  autoFocus = false,
}) => {
  const [localValue, setLocalValue] = useState(externalValue || '')
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Синхронизация с внешним значением
  useEffect(() => {
    setLocalValue(externalValue || '')
  }, [externalValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)

    // Debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      onChange(newValue)
    }, debounceMs)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={cn('relative', className)}>
      {/* Иконка поиска */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </div>

      {/* Поле ввода */}
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          'w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white',
          'text-sm text-gray-900 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400',
          'transition-colors'
        )}
      />

      {/* Кнопка очистки */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchInput
