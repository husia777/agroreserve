// Утилиты форматирования
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

// Форматирование цены в рублях
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Форматирование числа
export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

// Форматирование даты
export const formatDate = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'd MMMM yyyy', { locale: ru })
  } catch {
    return dateStr
  }
}

// Форматирование даты и времени
export const formatDateTime = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'd MMMM yyyy, HH:mm', { locale: ru })
  } catch {
    return dateStr
  }
}

// Форматирование времени
export const formatTime = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'HH:mm', { locale: ru })
  } catch {
    return dateStr
  }
}

// Относительное время
export const formatRelative = (dateStr: string): string => {
  try {
    return formatDistanceToNow(parseISO(dateStr), { locale: ru, addSuffix: true })
  } catch {
    return dateStr
  }
}

// Форматирование веса/количества
export const formatQuantity = (qty: number, unit: string): string => {
  const unitLabels: Record<string, string> = {
    kg: 'кг',
    piece: 'шт',
    liter: 'л',
    box: 'ящ',
    bag: 'мешок',
  }
  return `${formatNumber(qty, qty % 1 !== 0 ? 1 : 0)} ${unitLabels[unit] || unit}`
}

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`
  }
  return phone
}

// Форматирование ИНН
export const formatInn = (inn: string): string => {
  if (inn.length === 10) {
    return `${inn.slice(0, 2)} ${inn.slice(2, 7)} ${inn.slice(7)}`
  }
  if (inn.length === 12) {
    return `${inn.slice(0, 2)} ${inn.slice(2, 7)} ${inn.slice(7, 10)} ${inn.slice(10)}`
  }
  return inn
}
