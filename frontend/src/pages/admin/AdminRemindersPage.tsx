// Напоминания (UC-53) — список, создание, группировка по времени
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Bell, Plus, Check, Trash2, X, RefreshCw } from 'lucide-react'
import { getReminders, createReminder, completeReminder, deleteReminder } from '@/api/admin'
import type { ReminderV2 } from '@/types'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

// Форма нового напоминания
const ReminderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    title: '',
    description: '',
    remind_at: '',
    is_recurring: false,
    related_type: '',
    related_id: '',
    is_completed: false,
  })

  const createMut = useMutation({
    mutationFn: () => createReminder(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reminders'] })
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Новое напоминание</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Заголовок */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Заголовок <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Оплатить счёт поставщику"
            />
          </div>

          {/* Описание */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Дополнительные детали..."
            />
          </div>

          {/* Дата и время */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Дата и время <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={form.remind_at}
              onChange={(e) => setForm({ ...form, remind_at: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Привязка к объекту */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Тип объекта</label>
            <select
              value={form.related_type}
              onChange={(e) => setForm({ ...form, related_type: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Без привязки</option>
              <option value="order">Заказ</option>
              <option value="contract">Договор</option>
              <option value="tender">Тендер</option>
              <option value="certificate">Сертификат</option>
            </select>
          </div>

          {form.related_type && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID объекта</label>
              <input
                value={form.related_id}
                onChange={(e) => setForm({ ...form, related_id: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Введите ID..."
              />
            </div>
          )}

          {/* Повторяющееся */}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_recurring}
              onChange={(e) => setForm({ ...form, is_recurring: e.target.checked })}
              className="rounded border-gray-300 text-primary-600"
            />
            <span className="text-sm text-gray-700">Повторяющееся напоминание</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => createMut.mutate()}
              disabled={createMut.isPending || !form.title || !form.remind_at}
              className="flex-1 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {createMut.isPending ? 'Создаём...' : 'Создать'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Карточка напоминания
const ReminderCard: React.FC<{ reminder: ReminderV2 }> = ({ reminder }) => {
  const qc = useQueryClient()

  const completeMut = useMutation({
    mutationFn: () => completeReminder(reminder._id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders'] }),
  })

  const deleteMut = useMutation({
    mutationFn: () => deleteReminder(reminder._id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders'] }),
  })

  const isOverdue = !reminder.is_completed && new Date(reminder.remind_at) < new Date()

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
        reminder.is_completed
          ? 'border-gray-100 bg-gray-50 opacity-60'
          : isOverdue
            ? 'border-red-200 bg-red-50'
            : 'border-gray-200 bg-white'
      }`}
    >
      {/* Чекбокс */}
      <button
        onClick={() => !reminder.is_completed && completeMut.mutate()}
        disabled={reminder.is_completed || completeMut.isPending}
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          reminder.is_completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 hover:border-primary-500'
        }`}
      >
        {reminder.is_completed && <Check className="h-3 w-3 text-white" />}
      </button>

      {/* Контент */}
      <div className="min-w-0 flex-1">
        <div
          className={`text-sm font-medium ${
            reminder.is_completed ? 'text-gray-400 line-through' : 'text-gray-900'
          }`}
        >
          {reminder.title}
        </div>
        {reminder.description && (
          <div className="mt-0.5 text-xs text-gray-500">{reminder.description}</div>
        )}
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span
            className={`text-xs font-medium ${
              isOverdue && !reminder.is_completed ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            {new Date(reminder.remind_at).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {reminder.is_recurring && (
            <span className="flex items-center gap-1 text-xs text-blue-600">
              <RefreshCw className="h-3 w-3" />
              Повторяется
            </span>
          )}
          {reminder.related_type && (
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
              {reminder.related_type}
            </span>
          )}
          {isOverdue && !reminder.is_completed && (
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
              Просрочено
            </span>
          )}
        </div>
      </div>

      {/* Удалить */}
      <button
        onClick={() => deleteMut.mutate()}
        className="flex-shrink-0 rounded-lg p-1.5 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
        title="Удалить"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminRemindersPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')

  const { data, isLoading } = useQuery({
    queryKey: [
      'reminders',
      { is_completed: filter === 'completed' ? true : filter === 'active' ? false : undefined },
    ],
    queryFn: () =>
      getReminders({
        is_completed: filter === 'completed' ? true : filter === 'active' ? false : undefined,
        per_page: 100,
      }),
  })

  // Группировка: сегодня, на этой неделе, позже
  const grouped = React.useMemo(() => {
    if (!data?.items) return { overdue: [], today: [], week: [], later: [], completed: [] }

    const now = new Date()
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
    const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const overdue: ReminderV2[] = []
    const today: ReminderV2[] = []
    const week: ReminderV2[] = []
    const later: ReminderV2[] = []
    const completed: ReminderV2[] = []

    data.items.forEach((r) => {
      if (r.is_completed) {
        completed.push(r)
        return
      }
      const remindDate = new Date(r.remind_at)
      if (remindDate < now) {
        overdue.push(r)
      } else if (remindDate <= todayEnd) {
        today.push(r)
      } else if (remindDate <= weekEnd) {
        week.push(r)
      } else {
        later.push(r)
      }
    })

    return { overdue, today, week, later, completed }
  }, [data])

  const renderGroup = (title: string, items: ReminderV2[], colorClass = '') => {
    if (items.length === 0) return null
    return (
      <div>
        <h3
          className={`mb-2 text-xs font-semibold uppercase tracking-wider ${colorClass || 'text-gray-400'}`}
        >
          {title} ({items.length})
        </h3>
        <div className="space-y-2">
          {items.map((r) => (
            <ReminderCard key={r._id} reminder={r} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Напоминания</h1>
          {data && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {data.total}
            </span>
          )}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Создать
        </button>
      </div>

      {/* Фильтр */}
      <div className="flex gap-2">
        {[
          { value: 'active', label: 'Активные' },
          { value: 'all', label: 'Все' },
          { value: 'completed', label: 'Выполненные' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value as typeof filter)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === opt.value
                ? 'bg-primary-600 text-white'
                : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Список */}
      {isLoading ? (
        <PageSpinner />
      ) : data?.items.length === 0 ? (
        <EmptyState
          title="Напоминаний нет"
          description="Создайте первое напоминание"
          action={{ label: 'Создать', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <div className="space-y-6">
          {renderGroup('Просрочено', grouped.overdue, 'text-red-500')}
          {renderGroup('Сегодня', grouped.today, 'text-amber-600')}
          {renderGroup('На этой неделе', grouped.week, 'text-blue-600')}
          {renderGroup('Позже', grouped.later)}
          {renderGroup('Выполненные', grouped.completed)}
        </div>
      )}

      {modalOpen && <ReminderModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default AdminRemindersPage
