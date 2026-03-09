// Календарь-планировщик (UC-50) — сетка месяца с цветными событиями
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getCalendarEvents } from '@/api/admin'
import type { CalendarEvent } from '@/types'
import { PageSpinner } from '@/components/ui/Spinner'

// Типы событий с цветами
const EVENT_TYPES: Record<string, { label: string; bgColor: string; dotColor: string }> = {
  delivery: { label: 'Доставка', bgColor: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-500' },
  tender: { label: 'Тендер', bgColor: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' },
  payment: { label: 'Оплата', bgColor: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' },
  reminder: { label: 'Напоминание', bgColor: 'bg-amber-100 text-amber-800', dotColor: 'bg-amber-400' },
  certificate: { label: 'Сертификат', bgColor: 'bg-orange-100 text-orange-800', dotColor: 'bg-orange-500' },
}

// Русские названия месяцев
const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// ============================================================
// Главная страница
// ============================================================
export const AdminCalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() + 1 }
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const { data: events, isLoading } = useQuery({
    queryKey: ['calendarEvents', currentDate],
    queryFn: () => getCalendarEvents(currentDate),
  })

  // Предыдущий месяц
  const prevMonth = () => {
    setCurrentDate((d) => {
      if (d.month === 1) return { year: d.year - 1, month: 12 }
      return { year: d.year, month: d.month - 1 }
    })
    setSelectedDate(null)
  }

  // Следующий месяц
  const nextMonth = () => {
    setCurrentDate((d) => {
      if (d.month === 12) return { year: d.year + 1, month: 1 }
      return { year: d.year, month: d.month + 1 }
    })
    setSelectedDate(null)
  }

  // Строим сетку дней
  const buildGrid = () => {
    const firstDay = new Date(currentDate.year, currentDate.month - 1, 1)
    const daysInMonth = new Date(currentDate.year, currentDate.month, 0).getDate()
    // Понедельник = 0
    let startDow = firstDay.getDay() - 1
    if (startDow < 0) startDow = 6

    const cells: (number | null)[] = []
    for (let i = 0; i < startDow; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    // Добить до кратного 7
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }

  const grid = buildGrid()

  // Индекс событий по дате
  const eventsByDate = React.useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {}
    events?.forEach((ev) => {
      const dateKey = ev.date.split('T')[0]
      if (!map[dateKey]) map[dateKey] = []
      map[dateKey].push(ev)
    })
    return map
  }, [events])

  // Текущая дата
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  // Получить ключ даты по номеру дня
  const dayKey = (day: number) =>
    `${currentDate.year}-${String(currentDate.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // События выбранного дня
  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : []

  return (
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Календарь</h1>
        </div>

        {/* Легенда */}
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(EVENT_TYPES).map(([type, config]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
              <span className="text-xs text-gray-500">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Навигация */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-3">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {MONTHS_RU[currentDate.month - 1]} {currentDate.year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Сетка */}
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Дни недели */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Дни */}
          <div className="grid grid-cols-7">
            {grid.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="min-h-[90px] border-b border-r border-gray-50" />
              }

              const key = dayKey(day)
              const dayEvents = eventsByDate[key] || []
              const isToday = key === todayKey
              const isSelected = key === selectedDate
              const isWeekend = (idx % 7) >= 5

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(isSelected ? null : key)}
                  className={`min-h-[90px] p-2 border-b border-r border-gray-50 text-left hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-primary-50 border-primary-200' : ''
                  } ${isWeekend ? 'bg-gray-50/50' : ''}`}
                >
                  {/* Номер дня */}
                  <div
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1 ${
                      isToday
                        ? 'bg-primary-600 text-white'
                        : isWeekend
                        ? 'text-gray-400'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>

                  {/* Цветные точки событий */}
                  <div className="flex flex-wrap gap-0.5 mt-0.5">
                    {dayEvents.slice(0, 4).map((ev, i) => {
                      const config = EVENT_TYPES[ev.type] || EVENT_TYPES.reminder
                      return (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${config.dotColor}`}
                          title={ev.title}
                        />
                      )
                    })}
                    {dayEvents.length > 4 && (
                      <span className="text-xs text-gray-400">+{dayEvents.length - 4}</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Панель событий выбранного дня */}
      {selectedDate && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {new Date(selectedDate).toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedEvents.map((ev, i) => {
                const config = EVENT_TYPES[ev.type] || { label: ev.type, bgColor: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${config.dotColor} mt-1.5 flex-shrink-0`} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{ev.title}</div>
                      {ev.description && (
                        <div className="text-xs opacity-80 mt-0.5">{ev.description}</div>
                      )}
                      <div className="text-xs opacity-60 mt-0.5">{config.label}</div>
                    </div>
                    {ev.link && (
                      <a
                        href={ev.link}
                        className="text-xs underline opacity-70 hover:opacity-100 flex-shrink-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Открыть
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              На этот день событий нет
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminCalendarPage
