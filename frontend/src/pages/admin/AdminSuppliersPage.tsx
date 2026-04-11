// Управление поставщиками (UC — Поставщики)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Star, Truck, Pencil, Trash2, X, Phone, Mail, Hash } from 'lucide-react'
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '@/api/admin'
import type { Supplier } from '@/types'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import SearchInput from '@/components/ui/SearchInput'

// Компонент звёздного рейтинга
const StarRating: React.FC<{
  value: number
  onChange?: (v: number) => void
  readonly?: boolean
}> = ({ value, onChange, readonly }) => {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={readonly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Star
            className={`h-4 w-4 ${
              star <= (hover || value) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// Форма добавления/редактирования поставщика
const EMPTY_FORM = {
  name: '',
  contact_person: '',
  phone: '',
  email: '',
  address: '',
  inn: '',
  rating: 5,
  notes: '',
  is_active: true,
  product_ids: [] as string[],
}

const SupplierModal: React.FC<{
  supplier?: Supplier
  onClose: () => void
}> = ({ supplier, onClose }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState(
    supplier
      ? {
          name: supplier.name,
          contact_person: supplier.contact_person,
          phone: supplier.phone,
          email: supplier.email || '',
          address: supplier.address || '',
          inn: supplier.inn || '',
          rating: supplier.rating,
          notes: supplier.notes || '',
          is_active: supplier.is_active,
          product_ids: supplier.product_ids,
        }
      : { ...EMPTY_FORM },
  )

  const createMut = useMutation({
    mutationFn: (data: typeof form) => createSupplier(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suppliers'] })
      onClose()
    },
  })

  const updateMut = useMutation({
    mutationFn: (data: typeof form) => updateSupplier(supplier!._id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suppliers'] })
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (supplier) {
      updateMut.mutate(form)
    } else {
      createMut.mutate(form)
    }
  }

  const isPending = createMut.isPending || updateMut.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Заголовок */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {supplier ? 'Редактировать поставщика' : 'Новый поставщик'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {/* Название */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Название организации <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="ООО «Агросбыт»"
            />
          </div>

          {/* Контактное лицо */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Контактное лицо <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.contact_person}
              onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Иванов Иван Иванович"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Телефон */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Телефон <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+7 900 000 00 00"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="info@example.com"
              />
            </div>
          </div>

          {/* ИНН */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">ИНН</label>
            <input
              value={form.inn}
              onChange={(e) => setForm({ ...form, inn: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="1234567890"
              maxLength={12}
            />
          </div>

          {/* Адрес */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Адрес</label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="г. Москва, ул. Примерная, д. 1"
            />
          </div>

          {/* Рейтинг */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Рейтинг</label>
            <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
          </div>

          {/* Заметки */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Заметки</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Дополнительная информация..."
            />
          </div>

          {/* Активен */}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Поставщик активен</span>
          </label>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {isPending ? 'Сохраняем...' : supplier ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminSuppliersPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editSupplier, setEditSupplier] = useState<Supplier | undefined>()
  const qc = useQueryClient()

  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['suppliers', { search }],
    queryFn: () => getSuppliers({ search: search || undefined }),
  })

  const deleteMut = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['suppliers'] }),
  })

  const handleEdit = (s: Supplier) => {
    setEditSupplier(s)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditSupplier(undefined)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditSupplier(undefined)
  }

  const handleDelete = (s: Supplier) => {
    if (confirm(`Удалить поставщика «${s.name}»?`)) {
      deleteMut.mutate(s._id)
    }
  }

  return (
    <div className="space-y-5 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Поставщики</h1>
          {suppliers && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {suppliers.length}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Добавить
        </button>
      </div>

      {/* Поиск */}
      <div className="max-w-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Поиск по названию, телефону..."
        />
      </div>

      {/* Контент */}
      {isLoading ? (
        <PageSpinner />
      ) : !suppliers?.length ? (
        <EmptyState
          title="Поставщиков нет"
          description="Добавьте первого поставщика"
          action={{ label: 'Добавить поставщика', onClick: handleAdd }}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Организация
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                  Контакт
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                  Телефон
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Рейтинг
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                  Товаров
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Статус
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {suppliers.map((s) => (
                <tr key={s._id} className="transition-colors hover:bg-gray-50/50">
                  {/* Название */}
                  <td className="px-5 py-3">
                    <div className="font-semibold text-gray-900">{s.name}</div>
                    {s.inn && (
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <Hash className="h-3 w-3" />
                        ИНН {s.inn}
                      </div>
                    )}
                  </td>

                  {/* Контактное лицо */}
                  <td className="hidden px-5 py-3 text-gray-600 md:table-cell">
                    {s.contact_person}
                  </td>

                  {/* Телефон */}
                  <td className="hidden px-5 py-3 lg:table-cell">
                    <a
                      href={`tel:${s.phone}`}
                      className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary-600"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {s.phone}
                    </a>
                    {s.email && (
                      <a
                        href={`mailto:${s.email}`}
                        className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-primary-600"
                      >
                        <Mail className="h-3 w-3" />
                        {s.email}
                      </a>
                    )}
                  </td>

                  {/* Рейтинг */}
                  <td className="px-5 py-3">
                    <StarRating value={s.rating} readonly />
                  </td>

                  {/* Количество товаров */}
                  <td className="hidden px-5 py-3 text-gray-600 lg:table-cell">
                    {s.product_ids.length} поз.
                  </td>

                  {/* Статус */}
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          s.is_active ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      {s.is_active ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>

                  {/* Действия */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(s)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        title="Редактировать"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно */}
      {modalOpen && <SupplierModal supplier={editSupplier} onClose={handleCloseModal} />}
    </div>
  )
}

export default AdminSuppliersPage
