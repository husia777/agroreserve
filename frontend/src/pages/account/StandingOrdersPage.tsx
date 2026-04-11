// Регулярные (автоматические) заказы клиента
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  RefreshCw,
  Plus,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Trash2,
} from 'lucide-react'
import {
  getStandingOrders,
  createStandingOrder,
  deleteStandingOrder,
  confirmStandingOrder,
  toggleStandingOrder,
} from '@/api/standing-orders'
import type { StandingOrder, StandingOrderItem } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

const SCHEDULE_LABELS: Record<string, string> = {
  daily: 'Ежедневно',
  weekly: 'Еженедельно',
  biweekly: 'Раз в 2 недели',
  monthly: 'Ежемесячно',
}

// Форма нового регулярного заказа
const CreateStandingOrderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    schedule: 'weekly',
    delivery_slot: '08:00-11:00',
    delivery_address: '',
    items: [] as StandingOrderItem[],
  })
  const [newItem, setNewItem] = useState({
    product_id: '',
    product_name: '',
    qty: 1,
    unit: 'кг',
    price: 0,
  })

  const createMut = useMutation({
    mutationFn: () => createStandingOrder(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['standingOrders'] })
      onClose()
    },
  })

  const addItem = () => {
    if (!newItem.product_name || newItem.qty <= 0) return
    setForm({ ...form, items: [...form.items, { ...newItem }] })
    setNewItem({ product_id: '', product_name: '', qty: 1, unit: 'кг', price: 0 })
  }

  const removeItem = (idx: number) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== idx) })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Новый регулярный заказ</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Расписание */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Периодичность</label>
              <select
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(SCHEDULE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Слот доставки</label>
              <select
                value={form.delivery_slot}
                onChange={(e) => setForm({ ...form, delivery_slot: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {['08:00-11:00', '11:00-14:00', '14:00-17:00'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Адрес */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Адрес доставки <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.delivery_address}
              onChange={(e) => setForm({ ...form, delivery_address: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="г. Москва, ул. Примерная, д. 1"
            />
          </div>

          {/* Добавление позиций */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Товары</label>

            {/* Список добавленных */}
            {form.items.length > 0 && (
              <div className="mb-3 space-y-1.5">
                {form.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                  >
                    <div className="text-sm text-gray-800">
                      {item.product_name} — {item.qty} {item.unit}
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Форма новой позиции */}
            <div className="flex flex-wrap gap-2">
              <input
                value={newItem.product_name}
                onChange={(e) => setNewItem({ ...newItem, product_name: e.target.value })}
                placeholder="Название товара"
                className="min-w-[120px] flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={newItem.qty}
                onChange={(e) => setNewItem({ ...newItem, qty: +e.target.value })}
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {['кг', 'шт', 'л', 'уп'].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                <Plus className="h-4 w-4" />
                Добавить
              </button>
            </div>
          </div>

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
              disabled={createMut.isPending || !form.delivery_address || form.items.length === 0}
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

// Карточка регулярного заказа
const StandingOrderCard: React.FC<{ order: StandingOrder }> = ({ order }) => {
  const qc = useQueryClient()
  const [expanded, setExpanded] = useState(false)

  const toggleMut = useMutation({
    mutationFn: () => toggleStandingOrder(order._id, !order.is_active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['standingOrders'] }),
  })

  const confirmMut = useMutation({
    mutationFn: () => confirmStandingOrder(order._id),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['standingOrders'] })
      alert(`Заказ ${data.order_number} создан!`)
    },
  })

  const deleteMut = useMutation({
    mutationFn: () => deleteStandingOrder(order._id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['standingOrders'] }),
  })

  const totalEstimate = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <div
      className={`rounded-xl border bg-white ${order.is_active ? 'border-gray-200' : 'border-gray-100 opacity-70'} overflow-hidden`}
    >
      {/* Шапка */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <RefreshCw
            className={`h-5 w-5 ${order.is_active ? 'text-primary-600' : 'text-gray-400'}`}
          />
          <div>
            <div className="font-semibold text-gray-900">
              {SCHEDULE_LABELS[order.schedule] || order.schedule}
            </div>
            <div className="text-xs text-gray-400">
              {order.delivery_slot} · {order.delivery_address}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Следующая дата */}
          {order.next_generation_at && order.is_active && (
            <div className="hidden text-xs text-gray-500 sm:block">
              След.: {formatDate(order.next_generation_at)}
            </div>
          )}

          {/* Подтвердить вручную */}
          {order.is_active && (
            <button
              onClick={() => confirmMut.mutate()}
              disabled={confirmMut.isPending}
              className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100 disabled:opacity-60"
            >
              <Check className="h-3.5 w-3.5" />
              Заказать сейчас
            </button>
          )}

          {/* Вкл/выкл */}
          <button
            onClick={() => toggleMut.mutate()}
            disabled={toggleMut.isPending}
            className="text-gray-400 transition-colors hover:text-gray-600"
            title={order.is_active ? 'Выключить' : 'Включить'}
          >
            {order.is_active ? (
              <ToggleRight className="h-7 w-7 text-primary-600" />
            ) : (
              <ToggleLeft className="h-7 w-7" />
            )}
          </button>

          {/* Удалить */}
          <button
            onClick={() => {
              if (confirm('Удалить регулярный заказ?')) deleteMut.mutate()
            }}
            className="rounded-lg p-1.5 text-gray-300 transition-colors hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {/* Раскрыть */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50"
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Состав */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
          <div className="space-y-1.5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.product_name}</span>
                <div className="flex items-center gap-3 text-gray-500">
                  <span>
                    {item.qty} {item.unit}
                  </span>
                  {item.price > 0 && (
                    <span className="font-medium text-gray-700">
                      {formatPrice(item.qty * item.price)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {totalEstimate > 0 && (
              <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-semibold text-gray-900">
                <span>Примерная сумма</span>
                <span>{formatPrice(totalEstimate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const StandingOrdersPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: orders, isLoading } = useQuery({
    queryKey: ['standingOrders'],
    queryFn: getStandingOrders,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Регулярные заказы</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Автоматическое создание заказов по расписанию
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Создать
        </button>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !orders?.length ? (
        <EmptyState
          title="Регулярных заказов нет"
          description="Настройте автоматическое создание заказов по расписанию"
          action={{ label: 'Создать регулярный заказ', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <StandingOrderCard key={order._id} order={order} />
          ))}
        </div>
      )}

      {modalOpen && <CreateStandingOrderModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default StandingOrdersPage
