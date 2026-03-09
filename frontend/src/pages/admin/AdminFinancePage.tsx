// Страница финансов — P&L, расходы, recharts (UC-50 — UC-57)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  PlusCircle,
  Trash2,
  Edit3,
  Calendar,
} from 'lucide-react'
import {
  getPnLReport,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '@/api/admin'
import { Expense, ExpenseCategory } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { cn } from '@/utils/cn'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import toast from 'react-hot-toast'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

// --- Схемы ---

const expenseSchema = z.object({
  category: z.nativeEnum(ExpenseCategory, { errorMap: () => ({ message: 'Выберите категорию' }) }),
  description: z.string().min(3, 'Описание минимум 3 символа'),
  amount: z
    .number({ invalid_type_error: 'Введите сумму' })
    .positive('Сумма должна быть больше 0'),
  date: z.string().min(1, 'Укажите дату'),
  is_recurring: z.boolean().optional(),
  recurrence_period: z.string().optional(),
})
type ExpenseFormValues = z.infer<typeof expenseSchema>

// --- Константы ---

type PnLPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year'

const periodLabels: Record<PnLPeriod, string> = {
  day: 'День',
  week: 'Неделя',
  month: 'Месяц',
  quarter: 'Квартал',
  year: 'Год',
}

const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  [ExpenseCategory.RENT]: 'Аренда',
  [ExpenseCategory.TRANSPORT]: 'Транспорт',
  [ExpenseCategory.PACKAGING]: 'Упаковка',
  [ExpenseCategory.SALARY]: 'Зарплата',
  [ExpenseCategory.COMMUNICATION]: 'Связь',
  [ExpenseCategory.TAXES]: 'Налоги',
  [ExpenseCategory.OTHER]: 'Прочее',
}

// --- KPI карточка ---
const KpiCard: React.FC<{
  title: string
  value: string
  subValue?: string
  icon: React.ReactNode
  trend?: number
  colorClass?: string
}> = ({ title, value, subValue, icon, trend, colorClass = 'bg-gray-50' }) => (
  <div className={cn('rounded-xl border border-gray-200 p-4', colorClass)}>
    <div className="flex items-start justify-between">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</div>
      <div className="text-gray-400">{icon}</div>
    </div>
    <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    {subValue && <div className="text-xs text-gray-500 mt-0.5">{subValue}</div>}
    {trend !== undefined && (
      <div className={cn('flex items-center gap-1 mt-1 text-xs font-medium', trend >= 0 ? 'text-green-600' : 'text-red-500')}>
        {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
      </div>
    )}
  </div>
)

// --- Тултип для графика ---
const CustomTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string }> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium text-gray-900">{formatPrice(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

// --- Главная страница ---
const AdminFinancePage: React.FC = () => {
  const queryClient = useQueryClient()

  // Период для P&L
  const [period, setPeriod] = useState<PnLPeriod>('month')

  // Пагинация расходов
  const [expensePage, setExpensePage] = useState(1)
  const [expenseCatFilter, setExpenseCatFilter] = useState<string>('')

  // Модалки
  const [expenseModal, setExpenseModal] = useState<'create' | 'edit' | null>(null)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  // --- Запросы ---
  const { data: pnlData, isLoading: pnlLoading } = useQuery({
    queryKey: ['pnl', period],
    queryFn: () => getPnLReport({ period }),
  })

  const { data: expensesData, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', { category: expenseCatFilter, page: expensePage }],
    queryFn: () =>
      getExpenses({
        category: expenseCatFilter || undefined,
        page: expensePage,
        per_page: 15,
      }),
  })

  // --- Мутации ---
  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['pnl'] })
      setExpenseModal(null)
      toast.success('Расход добавлен')
    },
    onError: () => toast.error('Не удалось добавить расход'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) =>
      updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['pnl'] })
      setExpenseModal(null)
      setEditingExpense(null)
      toast.success('Расход обновлён')
    },
    onError: () => toast.error('Не удалось обновить расход'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['pnl'] })
      toast.success('Расход удалён')
    },
    onError: () => toast.error('Не удалось удалить расход'),
  })

  // --- Форма расхода ---
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      category: ExpenseCategory.OTHER,
      description: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      is_recurring: false,
    },
  })

  const handleOpenCreate = () => {
    reset({
      category: ExpenseCategory.OTHER,
      description: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      is_recurring: false,
    })
    setEditingExpense(null)
    setExpenseModal('create')
  }

  const handleOpenEdit = (expense: Expense) => {
    reset({
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      is_recurring: expense.is_recurring,
      recurrence_period: expense.recurrence_period,
    })
    setEditingExpense(expense)
    setExpenseModal('edit')
  }

  const onSubmit = (values: ExpenseFormValues) => {
    if (expenseModal === 'edit' && editingExpense) {
      updateMutation.mutate({ id: editingExpense.id, data: values })
    } else {
      createMutation.mutate(values)
    }
  }

  // --- Агрегация данных P&L для графика ---
  const chartData = (pnlData ?? []).map((row) => ({
    name: (() => {
      try {
        return format(parseISO(row.period_start), 'd MMM', { locale: ru })
      } catch {
        return row.period_start
      }
    })(),
    Выручка: row.revenue,
    'Вал. прибыль': row.gross_profit,
    'Чист. прибыль': row.net_profit,
    Расходы: row.expenses,
  }))

  // Суммарные KPI
  const totalRevenue = pnlData?.reduce((s, r) => s + r.revenue, 0) ?? 0
  const totalGrossProfit = pnlData?.reduce((s, r) => s + r.gross_profit, 0) ?? 0
  const totalNetProfit = pnlData?.reduce((s, r) => s + r.net_profit, 0) ?? 0
  const avgMargin =
    pnlData?.length ? pnlData.reduce((s, r) => s + r.gross_margin, 0) / pnlData.length : 0

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Финансы</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          P&L отчёт, динамика выручки и управление расходами
        </p>
      </div>

      {/* Выбор периода */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(Object.keys(periodLabels) as PnLPeriod[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
              period === p
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {pnlLoading ? (
        <PageSpinner />
      ) : (
        <>
          {/* KPI карточки */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Выручка"
              value={formatPrice(totalRevenue)}
              icon={<DollarSign className="w-4 h-4" />}
              colorClass="bg-blue-50"
            />
            <KpiCard
              title="Вал. прибыль"
              value={formatPrice(totalGrossProfit)}
              subValue={`Маржа: ${avgMargin.toFixed(1)}%`}
              icon={<TrendingUp className="w-4 h-4" />}
              colorClass="bg-green-50"
            />
            <KpiCard
              title="Чист. прибыль"
              value={formatPrice(totalNetProfit)}
              icon={<TrendingUp className="w-4 h-4" />}
              colorClass={totalNetProfit >= 0 ? 'bg-emerald-50' : 'bg-red-50'}
            />
            <KpiCard
              title="Заказов"
              value={String(pnlData?.reduce((s, r) => s + r.orders_count, 0) ?? 0)}
              subValue={`Ср. чек: ${formatPrice((pnlData?.reduce((s, r) => s + r.avg_order, 0) ?? 0) / (pnlData?.length || 1))}`}
              icon={<Receipt className="w-4 h-4" />}
            />
          </div>

          {/* График P&L */}
          {chartData.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Динамика выручки и прибыли
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                  />
                  <Bar dataKey="Выручка" fill="#93c5fd" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Вал. прибыль" fill="#16a34a" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Чист. прибыль" fill="#059669" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* График расходов */}
          {chartData.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Расходы</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="Расходы"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* P&L таблица */}
          {(pnlData?.length ?? 0) > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700">Таблица P&L</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Период</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Выручка</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Себестоимость</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Вал. прибыль</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Маржа</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Расходы</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Чист. прибыль</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pnlData!.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-4 py-2.5 text-gray-600 text-xs">
                          {(() => {
                            try { return format(parseISO(row.period_start), 'd MMM yyyy', { locale: ru }) }
                            catch { return row.period_start }
                          })()}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-900">{formatPrice(row.revenue)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600 hidden md:table-cell">{formatPrice(row.cost_of_goods)}</td>
                        <td className="px-4 py-2.5 text-right text-green-700 font-medium">{formatPrice(row.gross_profit)}</td>
                        <td className="px-4 py-2.5 text-right hidden sm:table-cell">
                          <span className={cn(
                            'text-xs font-semibold px-1.5 py-0.5 rounded',
                            row.gross_margin >= 20
                              ? 'bg-green-100 text-green-700'
                              : row.gross_margin >= 10
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          )}>
                            {row.gross_margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-red-600 hidden lg:table-cell">{formatPrice(row.expenses)}</td>
                        <td className={cn(
                          'px-4 py-2.5 text-right font-semibold',
                          row.net_profit >= 0 ? 'text-emerald-700' : 'text-red-600'
                        )}>
                          {row.net_profit >= 0 ? '+' : ''}{formatPrice(row.net_profit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Блок расходов */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Шапка */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Расходы</h2>
          <div className="flex items-center gap-2">
            {/* Фильтр */}
            <select
              value={expenseCatFilter}
              onChange={(e) => { setExpenseCatFilter(e.target.value); setExpensePage(1) }}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20"
            >
              <option value="">Все категории</option>
              {Object.entries(expenseCategoryLabels).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreate}
              icon={<PlusCircle className="w-3.5 h-3.5" />}
            >
              Добавить
            </Button>
          </div>
        </div>

        {expensesLoading ? (
          <PageSpinner />
        ) : !expensesData?.items.length ? (
          <div className="text-center py-12 text-gray-400">
            <Receipt className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>Расходов не найдено</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Дата</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Описание</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Категория</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Сумма</th>
                    <th className="px-4 py-2.5 w-20" />
                  </tr>
                </thead>
                <tbody>
                  {expensesData.items.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-gray-500 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(expense.date)}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-gray-900">
                        {expense.description}
                        {expense.is_recurring && (
                          <span className="ml-1.5 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            Повт.
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        <Badge variant="gray" size="sm">
                          {expenseCategoryLabels[expense.category] ?? expense.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-red-600">
                        −{formatPrice(expense.amount)}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => handleOpenEdit(expense)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                            title="Редактировать"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Удалить расход?')) deleteMutation.mutate(expense.id)
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 rounded"
                            title="Удалить"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {expensesData.pages > 1 && (
              <div className="border-t border-gray-100 px-4 py-3">
                <Pagination
                  page={expensePage}
                  totalPages={expensesData.pages}
                  onPageChange={setExpensePage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Модалка расхода */}
      <Modal
        isOpen={!!expenseModal}
        onClose={() => { setExpenseModal(null); setEditingExpense(null) }}
        title={expenseModal === 'edit' ? 'Редактировать расход' : 'Добавить расход'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
            <select
              {...register('category')}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              {Object.entries(expenseCategoryLabels).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Описание */}
          <Input
            label="Описание"
            placeholder="Аренда склада за март"
            error={errors.description?.message}
            {...register('description')}
          />

          {/* Сумма */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сумма (₽)</label>
            <input
              type="number"
              step="100"
              min={0}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Дата */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
            <input
              type="date"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              {...register('date')}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Повторяющийся */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-green-600"
              {...register('is_recurring')}
            />
            <span className="text-sm text-gray-700">Повторяющийся расход</span>
          </label>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => { setExpenseModal(null); setEditingExpense(null) }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {expenseModal === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminFinancePage
