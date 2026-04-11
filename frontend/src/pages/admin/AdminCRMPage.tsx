// CRM Карточка клиента (UC-54) — полная информация, заметки, взаимодействия
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Users,
  ArrowLeft,
  MessageSquarePlus,
  Phone,
  Mail,
  Building2,
  TrendingUp,
  CreditCard,
  ClipboardList,
  Send,
} from 'lucide-react'
import { getAdminClients, getClientCard, addClientNote, addClientInteraction } from '@/api/admin'
import type { User } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import SearchInput from '@/components/ui/SearchInput'

// ============================================================
// Карточка клиента
// ============================================================
const ClientCardView: React.FC<{ clientId: string; onBack: () => void }> = ({
  clientId,
  onBack,
}) => {
  const qc = useQueryClient()
  const [noteText, setNoteText] = useState('')
  const [interactionForm, setInteractionForm] = useState({ type: 'call', description: '' })
  const [activeTab, setActiveTab] = useState<'notes' | 'interactions' | 'contracts'>('notes')

  const { data: card, isLoading } = useQuery({
    queryKey: ['clientCard', clientId],
    queryFn: () => getClientCard(clientId),
  })

  const noteMut = useMutation({
    mutationFn: () => addClientNote(clientId, noteText),
    onSuccess: () => {
      setNoteText('')
      qc.invalidateQueries({ queryKey: ['clientCard', clientId] })
    },
  })

  const interactionMut = useMutation({
    mutationFn: () => addClientInteraction(clientId, interactionForm),
    onSuccess: () => {
      setInteractionForm({ type: 'call', description: '' })
      qc.invalidateQueries({ queryKey: ['clientCard', clientId] })
    },
  })

  if (isLoading) return <PageSpinner />
  if (!card) return <div className="p-6 text-gray-500">Карточка не найдена</div>

  const {
    user,
    orders_count,
    total_revenue,
    avg_check,
    top_products,
    debt,
    credit_limit,
    contracts,
    notes,
    interactions,
  } = card

  const creditUsed = credit_limit > 0 ? (debt / credit_limit) * 100 : 0

  return (
    <div className="space-y-5 p-6">
      {/* Шапка */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Основная информация + статистика */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Контакты и реквизиты */}
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Building2 className="h-4 w-4 text-gray-400" />
            Реквизиты
          </h2>
          {user.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${user.phone}`} className="text-gray-700 hover:text-primary-600">
                {user.phone}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <a href={`mailto:${user.email}`} className="text-gray-700 hover:text-primary-600">
              {user.email}
            </a>
          </div>
          {user.organization && (
            <>
              <div className="text-sm font-medium text-gray-700">{user.organization.name}</div>
              {user.organization.inn && (
                <div className="text-xs text-gray-400">ИНН: {user.organization.inn}</div>
              )}
              {user.organization.legal_address && (
                <div className="text-xs text-gray-400">{user.organization.legal_address}</div>
              )}
            </>
          )}
        </div>

        {/* KPI */}
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            Статистика
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="mb-0.5 text-xs text-gray-500">Заказов</div>
              <div className="text-xl font-bold text-gray-900">{orders_count}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="mb-0.5 text-xs text-gray-500">Выручка</div>
              <div className="text-base font-bold text-gray-900">{formatPrice(total_revenue)}</div>
            </div>
            <div className="col-span-2 rounded-lg bg-gray-50 p-3">
              <div className="mb-0.5 text-xs text-gray-500">Средний чек</div>
              <div className="text-xl font-bold text-gray-900">{formatPrice(avg_check)}</div>
            </div>
          </div>
        </div>

        {/* Долг / кредитный лимит */}
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <CreditCard className="h-4 w-4 text-gray-400" />
            Кредитный лимит
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Долг</span>
              <span className={`font-bold ${debt > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPrice(debt)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Лимит</span>
              <span className="font-semibold text-gray-900">{formatPrice(credit_limit)}</span>
            </div>
            {credit_limit > 0 && (
              <div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      creditUsed > 90
                        ? 'bg-red-500'
                        : creditUsed > 60
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, creditUsed)}%` }}
                  />
                </div>
                <div className="mt-1 text-right text-xs text-gray-400">
                  {creditUsed.toFixed(0)}% использовано
                </div>
              </div>
            )}
          </div>

          {/* Топ товары */}
          {top_products.length > 0 && (
            <div>
              <h3 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Топ товары
              </h3>
              <div className="space-y-1">
                {top_products.slice(0, 3).map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="truncate text-gray-700">{p.name}</span>
                    <span className="ml-2 flex-shrink-0 text-gray-500">
                      {formatPrice(p.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Табы */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex border-b border-gray-100">
          {[
            { key: 'notes', label: 'Заметки', icon: ClipboardList },
            { key: 'interactions', label: 'Взаимодействия', icon: MessageSquarePlus },
            { key: 'contracts', label: 'Договоры', icon: ClipboardList },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Заметки */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Форма добавления */}
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Введите заметку..."
                  className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => noteMut.mutate()}
                  disabled={noteMut.isPending || !noteText.trim()}
                  className="self-end rounded-lg bg-primary-600 p-2.5 text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Список заметок */}
              {notes.length > 0 ? (
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div key={note._id} className="rounded-lg bg-gray-50 p-3">
                      <p className="text-sm text-gray-800">{note.text}</p>
                      <p className="mt-1 text-xs text-gray-400">{formatDate(note.created_at)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">Заметок нет</p>
              )}
            </div>
          )}

          {/* Взаимодействия */}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              {/* Форма добавления */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <select
                    value={interactionForm.type}
                    onChange={(e) =>
                      setInteractionForm({ ...interactionForm, type: e.target.value })
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="call">Звонок</option>
                    <option value="meeting">Встреча</option>
                    <option value="email">Email</option>
                    <option value="other">Прочее</option>
                  </select>
                  <input
                    value={interactionForm.description}
                    onChange={(e) =>
                      setInteractionForm({ ...interactionForm, description: e.target.value })
                    }
                    placeholder="Описание взаимодействия..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={() => interactionMut.mutate()}
                    disabled={interactionMut.isPending || !interactionForm.description.trim()}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              {/* Таймлайн взаимодействий */}
              {interactions.length > 0 ? (
                <div className="relative space-y-4 pl-6">
                  <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-gray-200" />
                  {interactions.map((interaction) => {
                    const typeMap: Record<string, { label: string; color: string }> = {
                      call: { label: 'Звонок', color: 'bg-blue-500' },
                      meeting: { label: 'Встреча', color: 'bg-green-500' },
                      email: { label: 'Email', color: 'bg-purple-500' },
                      other: { label: 'Прочее', color: 'bg-gray-400' },
                    }
                    const t = typeMap[interaction.type] || {
                      label: interaction.type,
                      color: 'bg-gray-400',
                    }
                    return (
                      <div key={interaction._id} className="relative">
                        <div
                          className={`absolute -left-6 top-1.5 h-3 w-3 rounded-full ${t.color}`}
                        />
                        <div className="rounded-lg bg-gray-50 p-3">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-600">{t.label}</span>
                            <span className="text-xs text-gray-400">
                              {formatDate(interaction.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800">{interaction.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">Взаимодействий нет</p>
              )}
            </div>
          )}

          {/* Договоры */}
          {activeTab === 'contracts' && (
            <div>
              {contracts.length > 0 ? (
                <div className="space-y-2">
                  {contracts.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {c.contract_number}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(c.start_date)} — {formatDate(c.end_date)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {formatPrice(c.total_amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {c.completion_percent}% выполнено
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">Договоров нет</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Список клиентов (выбор для просмотра карточки)
// ============================================================
export const AdminCRMPage: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['adminClients', { search, per_page: 50 }],
    queryFn: () => getAdminClients({ search: search || undefined, per_page: 50 }),
  })

  if (selectedClientId) {
    return <ClientCardView clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />
  }

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">CRM — Карточки клиентов</h1>
      </div>

      <div className="max-w-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Поиск по имени, компании..."
        />
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : !data?.items.length ? (
        <EmptyState title="Клиентов нет" description="Нет клиентов по заданному запросу" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((client: User) => (
            <button
              key={client.id}
              onClick={() => setSelectedClientId(client.id)}
              className="rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {client.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold text-gray-900">{client.full_name}</div>
                  <div className="truncate text-xs text-gray-400">{client.email}</div>
                </div>
              </div>
              {client.organization && (
                <div className="mb-2 truncate text-xs text-gray-600">
                  {client.organization.name}
                </div>
              )}
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    client.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : client.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {client.status === 'approved'
                    ? 'Одобрен'
                    : client.status === 'pending'
                      ? 'На модерации'
                      : client.status}
                </span>
                {client.debt > 0 && (
                  <span className="text-xs font-medium text-red-600">
                    Долг {formatPrice(client.debt)}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCRMPage
