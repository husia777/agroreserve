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
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Search className="h-4 w-4" />
      </div>

      {/* Поле ввода */}
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-9',
          'text-sm text-gray-900 placeholder:text-gray-400',
          'focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300',
          'transition-colors',
        )}
      />

      {/* Кнопка очистки */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchInput
