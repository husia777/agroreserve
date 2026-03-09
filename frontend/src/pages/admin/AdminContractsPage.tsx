// Госконтракты по 44-ФЗ — список, детали, график поставок
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  FileText,
  Plus,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Download,
  X,
  AlertCircle,
} from 'lucide-react'
import {
  getContracts,
  getContract,
  createContract,
  markDelivery,
  generateContractAct,
} from '@/api/admin'
import type { Contract } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

// Бейдж статуса контракта
const ContractStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: 'Активен', className: 'bg-green-100 text-green-700' },
    completed: { label: 'Выполнен', className: 'bg-blue-100 text-blue-700' },
    cancelled: { label: 'Отменён', className: 'bg-red-100 text-red-700' },
  }
  const s = map[status] || { label: status, className: 'bg-gray-100 text-gray-600' }
  return (
    <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${s.className}`}>
      {s.label}
    </span>
  )
}

// Прогресс-бар исполнения
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
  const clamp = Math.min(100, Math.max(0, percent))
  const color = clamp >= 100 ? 'bg-green-500' : clamp >= 50 ? 'bg-blue-500' : 'bg-amber-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${clamp}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{clamp}%</span>
    </div>
  )
}

// ============================================================
// Детали контракта (разворачивается)
// ============================================================
const ContractDetails: React.FC<{ contractId: string }> = ({ contractId }) => {
  const qc = useQueryClient()

  const { data: contract, isLoading } = useQuery({
    queryKey: ['contract', contractId],
    queryFn: () => getContract(contractId),
  })

  const markMut = useMutation({
    mutationFn: ({ date }: { date: string }) => markDelivery(contractId, date),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['contract', contractId] })
      qc.invalidateQueries({ queryKey: ['contracts'] })
    },
  })

  const actMut = useMutation({
    mutationFn: () => generateContractAct(contractId),
    onSuccess: (data) => {
      window.open(data.file_url, '_blank')
    },
  })

  if (isLoading) return <div className="px-6 py-4"><PageSpinner /></div>
  if (!contract) return null

  return (
    <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-5 space-y-5">
      {/* Спецификация */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Спецификация товаров</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Товар</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">По контракту</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Поставлено</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Цена</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contract.items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{item.product_name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">
                    {item.qty} {item.unit}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span
                      className={
                        item.delivered_qty >= item.qty
                          ? 'text-green-600 font-semibold'
                          : 'text-gray-600'
                      }
                    >
                      {item.delivered_qty} {item.unit}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right text-gray-600">{formatPrice(item.price)}</td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900">
                    {formatPrice(item.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* График поставок */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">График поставок</h3>
        <div className="space-y-2">
          {contract.delivery_schedule.map((sched, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                sched.is_completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {sched.is_completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatDate(sched.date)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {sched.items.length} позиций
                    {sched.order_id && ' · Заказ создан'}
                  </div>
                </div>
              </div>
              {!sched.is_completed && (
                <button
                  onClick={() => markMut.mutate({ date: sched.date })}
                  disabled={markMut.isPending}
                  className="text-xs bg-primary-600 hover:bg-primary-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                >
                  {markMut.isPending ? '...' : 'Отметить поставку'}
                </button>
              )}
              {sched.is_completed && (
                <span className="text-xs text-green-600 font-semibold">Выполнено</span>
              )}
            </div>
          ))}
          {contract.delivery_schedule.length === 0 && (
            <p className="text-sm text-gray-400 py-2">График поставок не задан</p>
          )}
        </div>
      </div>

      {/* Генерация акта */}
      <div className="flex justify-end">
        <button
          onClick={() => actMut.mutate()}
          disabled={actMut.isPending}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          {actMut.isPending ? 'Генерируем...' : 'Сформировать акт исполнения'}
        </button>
      </div>
    </div>
  )
}

// Форма нового контракта
const NewContractModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    contract_number: '',
    client_id: '',
    client_name: '',
    contract_type: 'supply',
    start_date: '',
    end_date: '',
    total_amount: 0,
    items: [] as { product_id: string; product_name: string; qty: number; delivered_qty: number; unit: string; price: number }[],
    delivery_schedule: [],
    status: 'active',
    notes: '',
  })

  const createMut = useMutation({
    mutationFn: () => createContract(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['contracts'] })
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Новый госконтракт</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Номер контракта <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.contract_number}
                onChange={(e) => setForm({ ...form, contract_number: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="44-ФЗ-001/2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Клиент (название)
              </label>
              <input
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="МБОУ «Школа №1»"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Сумма контракта, ₽
            </label>
            <input
              type="number"
              min={0}
              value={form.total_amount}
              onChange={(e) => setForm({ ...form, total_amount: +e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Заметки</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
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
              disabled={createMut.isPending}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {createMut.isPending ? 'Создаём...' : 'Создать контракт'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminContractsPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['contracts', { status: statusFilter }],
    queryFn: () => getContracts({ status: statusFilter || undefined, per_page: 50 }),
  })

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Госконтракты</h1>
          {data && (
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {data.total}
            </span>
          )}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новый контракт
        </button>
      </div>

      {/* Фильтр статуса */}
      <div className="flex gap-2">
        {[
          { value: '', label: 'Все' },
          { value: 'active', label: 'Активные' },
          { value: 'completed', label: 'Выполненные' },
          { value: 'cancelled', label: 'Отменённые' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === opt.value
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Список */}
      {isLoading ? (
        <PageSpinner />
      ) : !data?.items.length ? (
        <EmptyState
          title="Контрактов нет"
          description="Создайте первый госконтракт"
          action={{ label: 'Новый контракт', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <div className="space-y-3">
          {data.items.map((contract: Contract) => (
            <div
              key={contract._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Заголовок строки */}
              <button
                onClick={() => toggleExpand(contract._id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Номер */}
                  <div className="min-w-[140px]">
                    <div className="font-bold text-gray-900 text-sm">{contract.contract_number}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{contract.contract_type}</div>
                  </div>

                  {/* Клиент */}
                  <div className="flex-1 min-w-0 hidden md:block">
                    <div className="text-sm text-gray-700 truncate">{contract.client_name}</div>
                  </div>

                  {/* Сумма */}
                  <div className="text-sm font-semibold text-gray-900 min-w-[100px] hidden sm:block">
                    {formatPrice(contract.total_amount)}
                  </div>

                  {/* Период */}
                  <div className="text-xs text-gray-500 min-w-[140px] hidden lg:block">
                    {formatDate(contract.start_date)} — {formatDate(contract.end_date)}
                  </div>

                  {/* Прогресс */}
                  <div className="min-w-[120px] hidden md:block">
                    <ProgressBar percent={contract.completion_percent} />
                  </div>

                  {/* Статус */}
                  <ContractStatusBadge status={contract.status} />
                </div>

                {/* Стрелка */}
                <div className="ml-4">
                  {expandedId === contract._id ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Детали */}
              {expandedId === contract._id && (
                <ContractDetails contractId={contract._id} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно создания */}
      {modalOpen && <NewContractModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default AdminContractsPage
