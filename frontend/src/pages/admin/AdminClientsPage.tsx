// Страница управления клиентами (UC-40 — UC-43)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Users,
  CheckCircle,
  XCircle,
  CreditCard,
  Search,
  Building2,
  Phone,
  Mail,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  FileDown,
} from 'lucide-react'
import {
  generateContract,
  getAdminClients,
  approveClient,
  rejectClient,
  setCreditLimit,
} from '@/api/admin'
import { UserStatus, ClientType, type User } from '@/types'
import { formatPrice, formatDate, formatPhone } from '@/utils/format'
import { cn } from '@/utils/cn'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import toast from 'react-hot-toast'

// Схема для установки кредитного лимита
const creditLimitSchema = z.object({
  credit_limit: z
    .number({ invalid_type_error: 'Введите число' })
    .min(0, 'Лимит не может быть отрицательным')
    .max(10_000_000, 'Максимальный лимит 10 000 000 ₽'),
})
type CreditLimitForm = z.infer<typeof creditLimitSchema>

// Схема для отклонения заявки
const rejectSchema = z.object({
  reason: z.string().min(5, 'Укажите причину отказа (минимум 5 символов)'),
})
type RejectForm = z.infer<typeof rejectSchema>

// Цвет бейджа статуса клиента
const statusColor = (status: UserStatus) => {
  switch (status) {
    case UserStatus.APPROVED:
      return 'green'
    case UserStatus.PENDING:
      return 'yellow'
    case UserStatus.REJECTED:
      return 'red'
    case UserStatus.BLOCKED:
      return 'red'
    default:
      return 'gray'
  }
}

// Лейбл статуса
const statusLabel = (status: UserStatus) => {
  switch (status) {
    case UserStatus.APPROVED:
      return 'Одобрен'
    case UserStatus.PENDING:
      return 'Ожидает'
    case UserStatus.REJECTED:
      return 'Отклонён'
    case UserStatus.BLOCKED:
      return 'Заблокирован'
    default:
      return status
  }
}

// Лейбл типа клиента
const clientTypeLabel = (type: ClientType) => {
  switch (type) {
    case ClientType.OOO:
      return 'ООО'
    case ClientType.INDIVIDUAL:
      return 'Физлицо'
    case ClientType.IP:
      return 'ИП'
    default:
      return type
  }
}

// Раскрывающаяся строка клиента
const ClientRow: React.FC<{
  client: User
  onApprove: (id: string) => void
  onReject: (client: User) => void
  onSetLimit: (client: User) => void
  onGenerateContract: (client: User) => void
  approving: boolean
}> = ({ client, onApprove, onReject, onSetLimit, onGenerateContract, approving }) => {
  const [expanded, setExpanded] = useState(false)

  // Процент использования кредитного лимита
  const debtPercent =
    client.credit_limit > 0
      ? Math.min(100, Math.round((client.debt / client.credit_limit) * 100))
      : 0

  return (
    <>
      <tr
        className={cn(
          'cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50',
          expanded && 'bg-green-50/40',
        )}
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Имя */}
        <td className="px-4 py-3">
          <div className="text-sm font-medium text-gray-900">{client.full_name}</div>
          <div className="text-xs text-gray-500">{client.email}</div>
        </td>
        {/* Тип */}
        <td className="hidden px-4 py-3 sm:table-cell">
          <span className="text-xs text-gray-600">{clientTypeLabel(client.client_type)}</span>
        </td>
        {/* Организация */}
        <td className="hidden px-4 py-3 md:table-cell">
          <span className="text-sm text-gray-700">{client.organization?.name ?? '—'}</span>
        </td>
        {/* Статус */}
        <td className="px-4 py-3">
          <Badge variant={statusColor(client.status)} size="sm">
            {statusLabel(client.status)}
          </Badge>
        </td>
        {/* Долг / Лимит */}
        <td className="hidden px-4 py-3 text-right lg:table-cell">
          <div className="text-sm font-medium text-gray-900">{formatPrice(client.debt)}</div>
          <div className="text-xs text-gray-400">из {formatPrice(client.credit_limit)}</div>
        </td>
        {/* Стрелка */}
        <td className="px-4 py-3 text-gray-400">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </td>
      </tr>

      {/* Раскрытая панель с деталями и кнопками */}
      {expanded && (
        <tr className="border-b border-gray-100 bg-green-50/20">
          <td colSpan={6} className="px-4 pb-4">
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {/* Контакты */}
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Контакты
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  {client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {formatPhone(client.phone)}
                  </div>
                )}
                {client.delivery_address && (
                  <div className="mt-1 text-xs text-gray-500">{client.delivery_address}</div>
                )}
              </div>

              {/* Организация */}
              {client.organization && (
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Организация
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Building2 className="h-3.5 w-3.5 text-gray-400" />
                    {client.organization.name}
                  </div>
                  <div className="text-xs text-gray-500">ИНН: {client.organization.inn}</div>
                  {client.organization.ogrn && (
                    <div className="text-xs text-gray-500">ОГРН: {client.organization.ogrn}</div>
                  )}
                </div>
              )}

              {/* Кредитный лимит */}
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Кредитный лимит
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{formatPrice(client.credit_limit)}</span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      debtPercent >= 90
                        ? 'text-red-600'
                        : debtPercent >= 70
                          ? 'text-amber-600'
                          : 'text-gray-500',
                    )}
                  >
                    использовано {debtPercent}%
                  </span>
                </div>
                {/* Прогресс-бар долга */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      debtPercent >= 90
                        ? 'bg-red-500'
                        : debtPercent >= 70
                          ? 'bg-amber-500'
                          : 'bg-green-500',
                    )}
                    style={{ width: `${debtPercent}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">Долг: {formatPrice(client.debt)}</div>
              </div>
            </div>

            {/* Дата регистрации */}
            <div className="mt-3 text-xs text-gray-400">
              Зарегистрирован: {formatDate(client.created_at)}
            </div>

            {/* Кнопки действий */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {client.status === UserStatus.PENDING && (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onApprove(client.id)
                    }}
                    loading={approving}
                    icon={<CheckCircle className="h-3.5 w-3.5" />}
                  >
                    Одобрить
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      onReject(client)
                    }}
                    icon={<XCircle className="h-3.5 w-3.5" />}
                  >
                    Отклонить
                  </Button>
                </>
              )}

              {client.status === UserStatus.APPROVED && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSetLimit(client)
                    }}
                    icon={<CreditCard className="h-3.5 w-3.5" />}
                  >
                    Кредитный лимит
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onGenerateContract(client)
                    }}
                    icon={<FileDown className="h-3.5 w-3.5" />}
                  >
                    Договор
                  </Button>
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// Главная страница клиентов
const AdminClientsPage: React.FC = () => {
  const queryClient = useQueryClient()

  // Фильтры и пагинация
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [page, setPage] = useState(1)

  // Состояния модалок
  const [rejectModal, setRejectModal] = useState<User | null>(null)
  const [limitModal, setLimitModal] = useState<User | null>(null)
  const [contractModal, setContractModal] = useState<User | null>(null)
  const [contractType, setContractType] = useState('supply')
  const [generating, setGenerating] = useState(false)

  // Запрос клиентов
  const { data, isLoading } = useQuery({
    queryKey: ['admin-clients', { search, status: statusFilter, page }],
    queryFn: () =>
      getAdminClients({ search, status: statusFilter || undefined, page, per_page: 20 }),
  })

  // Мутация: одобрить клиента
  const approveMutation = useMutation({
    mutationFn: approveClient,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] })
      toast.success(`Клиент ${updated.full_name} одобрен`)
    },
    onError: () => toast.error('Не удалось одобрить клиента'),
  })

  // Мутация: отклонить клиента
  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => rejectClient(id, reason),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] })
      setRejectModal(null)
      toast.success(`Клиент ${updated.full_name} отклонён`)
    },
    onError: () => toast.error('Не удалось отклонить клиента'),
  })

  // Мутация: установить кредитный лимит
  const limitMutation = useMutation({
    mutationFn: ({ id, limit }: { id: string; limit: number }) => setCreditLimit(id, limit),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] })
      setLimitModal(null)
      toast.success(`Лимит для ${updated.full_name} обновлён`)
    },
    onError: () => toast.error('Не удалось обновить лимит'),
  })

  // Форма отклонения
  const rejectForm = useForm<RejectForm>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: '' },
  })

  // Форма кредитного лимита
  const limitForm = useForm<CreditLimitForm>({
    resolver: zodResolver(creditLimitSchema),
    defaultValues: { credit_limit: limitModal?.credit_limit ?? 0 },
  })

  // Сбрасываем форму лимита при открытии модалки
  const handleOpenLimitModal = (client: User) => {
    setLimitModal(client)
    limitForm.reset({ credit_limit: client.credit_limit })
  }

  // Статистика по статусам
  const stats = {
    total: data?.total ?? 0,
    pending: data?.items.filter((c) => c.status === UserStatus.PENDING).length ?? 0,
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Управление регистрациями, кредитными лимитами и статусами
          </p>
        </div>

        {/* Уведомление о новых заявках */}
        {stats.pending > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">{stats.pending} заявок ожидают модерации</span>
          </div>
        )}
      </div>

      {/* Фильтры */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Поиск */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, email, организации..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          {/* Фильтр по статусу */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          >
            <option value="">Все статусы</option>
            <option value={UserStatus.PENDING}>Ожидают</option>
            <option value={UserStatus.APPROVED}>Одобренные</option>
            <option value={UserStatus.REJECTED}>Отклонённые</option>
            <option value={UserStatus.BLOCKED}>Заблокированные</option>
          </select>
        </div>
      </div>

      {/* Таблица клиентов */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <PageSpinner />
        ) : !data?.items.length ? (
          <div className="py-16 text-center">
            <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">Клиенты не найдены</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Клиент
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                      Тип
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                      Организация
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Статус
                    </th>
                    <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">
                      Долг / Лимит
                    </th>
                    <th className="w-8 px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((client) => (
                    <ClientRow
                      key={client.id}
                      client={client}
                      onApprove={(id) => approveMutation.mutate(id)}
                      onReject={(c) => {
                        setRejectModal(c)
                        rejectForm.reset()
                      }}
                      onSetLimit={handleOpenLimitModal}
                      onGenerateContract={(c) => setContractModal(c)}
                      approving={approveMutation.isPending}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Пагинация */}
            {data.pages > 1 && (
              <div className="border-t border-gray-100 px-4 py-3">
                <Pagination page={page} totalPages={data.pages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Модалка: отклонить клиента */}
      <Modal isOpen={!!rejectModal} onClose={() => setRejectModal(null)} title="Отклонить заявку">
        {rejectModal && (
          <form
            onSubmit={rejectForm.handleSubmit((values) =>
              rejectMutation.mutate({ id: rejectModal.id, reason: values.reason }),
            )}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-800">Отклонить заявку клиента:</p>
                <p className="mt-0.5 text-sm text-red-700">{rejectModal.full_name}</p>
              </div>
            </div>

            <Input
              label="Причина отказа"
              placeholder="Укажите причину отказа..."
              error={rejectForm.formState.errors.reason?.message}
              {...rejectForm.register('reason')}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setRejectModal(null)}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700"
                loading={rejectMutation.isPending}
              >
                Отклонить
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Модалка: кредитный лимит */}
      <Modal isOpen={!!limitModal} onClose={() => setLimitModal(null)} title="Кредитный лимит">
        {limitModal && (
          <form
            onSubmit={limitForm.handleSubmit((values) =>
              limitMutation.mutate({ id: limitModal.id, limit: values.credit_limit }),
            )}
            className="space-y-4"
          >
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-600">Клиент:</p>
              <p className="font-medium text-gray-900">{limitModal.full_name}</p>
              <p className="mt-1 text-xs text-gray-500">
                Текущий долг: {formatPrice(limitModal.debt)}
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Кредитный лимит (₽)
              </label>
              <input
                type="number"
                step="1000"
                min={0}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                {...limitForm.register('credit_limit', { valueAsNumber: true })}
              />
              {limitForm.formState.errors.credit_limit && (
                <p className="mt-1 text-xs text-red-500">
                  {limitForm.formState.errors.credit_limit.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                0 ₽ = без кредитного лимита (оплата только при заказе)
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setLimitModal(null)}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                loading={limitMutation.isPending}
                icon={<CreditCard className="h-4 w-4" />}
              >
                Сохранить
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Модал генерации договора (UC-55) */}
      {contractModal && (
        <Modal
          isOpen={!!contractModal}
          onClose={() => {
            setContractModal(null)
            setContractType('supply')
          }}
          title="Сгенерировать договор"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Клиент: <strong>{contractModal.full_name}</strong>
              {contractModal.organization?.name && ` (${contractModal.organization.name})`}
            </p>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Тип договора</label>
              <div className="space-y-2">
                {[
                  {
                    value: 'supply',
                    label: 'Договор поставки',
                    desc: 'Стандартный договор на поставку продукции',
                  },
                  {
                    value: 'supply_44fz',
                    label: 'Госконтракт 44-ФЗ',
                    desc: 'Прямая закупка до 600 000 руб',
                  },
                  {
                    value: 'agency',
                    label: 'Агентский договор',
                    desc: 'Договор на агентские услуги',
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                      contractType === opt.value
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300',
                    )}
                  >
                    <input
                      type="radio"
                      name="contractType"
                      value={opt.value}
                      checked={contractType === opt.value}
                      onChange={() => setContractType(opt.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  setContractModal(null)
                  setContractType('supply')
                }}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                loading={generating}
                icon={<FileDown className="h-4 w-4" />}
                onClick={async () => {
                  setGenerating(true)
                  try {
                    const blob = await generateContract(contractType, contractModal.id)
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'contract_' + contractType + '_' + contractModal.full_name + '.pdf'
                    a.click()
                    window.URL.revokeObjectURL(url)
                    setContractModal(null)
                    setContractType('supply')
                  } catch {
                    alert('Ошибка генерации договора')
                  } finally {
                    setGenerating(false)
                  }
                }}
              >
                Скачать PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AdminClientsPage
