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
  updateStandingOrder,
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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Новый регулярный заказ</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Расписание */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Периодичность</label>
              <select
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(SCHEDULE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Слот доставки</label>
              <select
                value={form.delivery_slot}
                onChange={(e) => setForm({ ...form, delivery_slot: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {['08:00-11:00', '11:00-14:00', '14:00-17:00'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Адрес */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Адрес доставки <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.delivery_address}
              onChange={(e) => setForm({ ...form, delivery_address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="г. Москва, ул. Примерная, д. 1"
            />
          </div>

          {/* Добавление позиций */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Товары</label>

            {/* Список добавленных */}
            {form.items.length > 0 && (
              <div className="space-y-1.5 mb-3">
                {form.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <div className="text-sm text-gray-800">
                      {item.product_name} — {item.qty} {item.unit}
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Форма новой позиции */}
            <div className="flex gap-2 flex-wrap">
              <input
                value={newItem.product_name}
                onChange={(e) => setNewItem({ ...newItem, product_name: e.target.value })}
                placeholder="Название товара"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[120px]"
              />
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={newItem.qty}
                onChange={(e) => setNewItem({ ...newItem, qty: +e.target.value })}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {['кг', 'шт', 'л', 'уп'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Добавить
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={() => createMut.mutate()}
              disabled={createMut.isPending || !form.delivery_address || form.items.length === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 text-sm font-semibold transition-colors disabled:opacity-60"
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
    <div className={`bg-white rounded-xl border ${order.is_active ? 'border-gray-200' : 'border-gray-100 opacity-70'} overflow-hidden`}>
      {/* Шапка */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <RefreshCw className={`w-5 h-5 ${order.is_active ? 'text-primary-600' : 'text-gray-400'}`} />
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
            <div className="text-xs text-gray-500 hidden sm:block">
              След.: {formatDate(order.next_generation_at)}
            </div>
          )}

          {/* Подтвердить вручную */}
          {order.is_active && (
            <button
              onClick={() => confirmMut.mutate()}
              disabled={confirmMut.isPending}
              className="flex items-center gap-1.5 text-xs bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
            >
              <Check className="w-3.5 h-3.5" />
              Заказать сейчас
            </button>
          )}

          {/* Вкл/выкл */}
          <button
            onClick={() => toggleMut.mutate()}
            disabled={toggleMut.isPending}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title={order.is_active ? 'Выключить' : 'Включить'}
          >
            {order.is_active ? (
              <ToggleRight className="w-7 h-7 text-primary-600" />
            ) : (
              <ToggleLeft className="w-7 h-7" />
            )}
          </button>

          {/* Удалить */}
          <button
            onClick={() => {
              if (confirm('Удалить регулярный заказ?')) deleteMut.mutate()
            }}
            className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Раскрыть */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-gray-400 rounded-lg hover:bg-gray-50"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Состав */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
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
              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-semibold text-gray-900">
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
          <p className="text-sm text-gray-500 mt-0.5">
            Автоматическое создание заказов по расписанию
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
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
