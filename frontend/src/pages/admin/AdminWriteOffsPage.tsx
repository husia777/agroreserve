// Списания товаров со склада — форма, таблица, аналитика (UC-113: фото брака)
import React, { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, Plus, X, BarChart2, Camera } from 'lucide-react'
import { getWriteOffs, createWriteOff, getWriteOffAnalytics, getAdminProducts } from '@/api/admin'
import apiClient from '@/api/client'
import type { WriteOff } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const REASONS = [
  { value: 'spoilage', label: 'Порча' },
  { value: 'expiry', label: 'Истёк срок' },
  { value: 'damage', label: 'Бой / поломка' },
  { value: 'other', label: 'Прочее' },
]

const REASON_LABELS: Record<string, string> = {
  spoilage: 'Порча',
  expiry: 'Истёк срок',
  damage: 'Бой / поломка',
  other: 'Прочее',
}

const PIE_COLORS = ['#ef4444', '#f97316', '#eab308', '#6b7280']

// Форма нового списания
const WriteOffModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    product_id: '',
    qty: 1,
    reason: 'spoilage',
    description: '',
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // UC-113: Обработка выбора фото
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Фото не должно превышать 5 МБ')
      return
    }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  // Получаем список продуктов для выбора
  const { data: products } = useQuery({
    queryKey: ['adminProducts', { per_page: 200 }],
    queryFn: () => getAdminProducts({ per_page: 200, is_active: true }),
  })

  const createMut = useMutation({
    mutationFn: async () => {
      // UC-113: Сначала загружаем фото, потом создаём списание
      let photo_url: string | undefined
      if (photoFile) {
        const fd = new FormData()
        fd.append('file', photoFile)
        const uploadRes = await apiClient.post('/admin/write-offs/upload-photo', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        photo_url = uploadRes.data.url
      }
      return createWriteOff({ ...form, photo_url })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['writeOffs'] })
      qc.invalidateQueries({ queryKey: ['writeOffAnalytics'] })
      if (photoPreview) URL.revokeObjectURL(photoPreview)
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Новое списание</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Товар */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Товар <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.product_id}
              onChange={(e) => setForm({ ...form, product_id: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">-- Выберите товар --</option>
              {products?.items.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Количество */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Количество <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0.01}
              step={0.01}
              required
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: +e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Причина */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Причина <span className="text-red-500">*</span>
            </label>
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Описание */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Описание (необязательно)
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Подробности..."
            />
          </div>

          {/* UC-113: Фото брака */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Фото (необязательно)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoSelect}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Фото брака"
                  className="h-32 w-full rounded-lg border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoFile(null)
                    setPhotoPreview(null)
                  }}
                  className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm text-gray-500 transition-colors hover:border-primary-400 hover:text-primary-600"
              >
                <Camera className="h-4 w-4" />
                Сфотографировать брак
              </button>
            )}
            <p className="mt-1 text-xs text-gray-400">Макс. 5 МБ. На телефоне откроется камера.</p>
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
              disabled={createMut.isPending || !form.product_id}
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {createMut.isPending ? 'Списываем...' : 'Оформить списание'}
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
export const AdminWriteOffsPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['writeOffs', { page }],
    queryFn: () => getWriteOffs({ page, per_page: 20 }),
  })

  const { data: analytics } = useQuery({
    queryKey: ['writeOffAnalytics'],
    queryFn: () => getWriteOffAnalytics(),
    enabled: showAnalytics,
  })

  return (
    <div className="space-y-5 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trash2 className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">Списания</h1>
          {data && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {data.total}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              showAnalytics
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            Аналитика
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Plus className="h-4 w-4" />
            Списать товар
          </button>
        </div>
      </div>

      {/* Аналитика */}
      {showAnalytics && analytics && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* По причинам (pie) */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">По причинам</h3>
            {analytics.by_reason.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analytics.by_reason}
                    dataKey="total_loss"
                    nameKey="reason"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ reason, percent }) =>
                      `${REASON_LABELS[reason] || reason}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analytics.by_reason.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [formatPrice(value), 'Убыток']}
                    labelFormatter={(label) => REASON_LABELS[label] || label}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-8 text-center text-sm text-gray-400">Нет данных</p>
            )}
          </div>

          {/* По товарам (bar) */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">Топ товаров по убыткам</h3>
            {analytics.by_product.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={analytics.by_product.slice(0, 8)}
                  layout="vertical"
                  margin={{ left: 20, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [formatPrice(v), 'Убыток']} />
                  <Bar dataKey="total_loss" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-8 text-center text-sm text-gray-400">Нет данных</p>
            )}
          </div>
        </div>
      )}

      {/* Таблица */}
      {isLoading ? (
        <PageSpinner />
      ) : !data?.items.length ? (
        <EmptyState
          title="Списаний нет"
          description="Оформите первое списание"
          action={{ label: 'Списать товар', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Дата
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Товар
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Кол-во
                  </th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                    Причина
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Убыток
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.items.map((wo: WriteOff) => (
                  <tr key={wo._id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-5 py-3 text-gray-500">{formatDate(wo.created_at)}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-900">{wo.product_name}</div>
                      {wo.description && (
                        <div className="max-w-[200px] truncate text-xs text-gray-400">
                          {wo.description}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700">
                      {wo.qty} {wo.unit}
                    </td>
                    <td className="hidden px-5 py-3 md:table-cell">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          wo.reason === 'spoilage'
                            ? 'bg-red-100 text-red-700'
                            : wo.reason === 'expiry'
                              ? 'bg-orange-100 text-orange-700'
                              : wo.reason === 'damage'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {REASON_LABELS[wo.reason] || wo.reason}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-red-600">
                      -{formatPrice(wo.total_loss)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={data.pages || 1} onPageChange={setPage} />
        </>
      )}

      {modalOpen && <WriteOffModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default AdminWriteOffsPage
