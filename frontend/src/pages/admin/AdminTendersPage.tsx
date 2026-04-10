// Тендеры — поиск, просмотр, калькулятор цены (UC-227: документы)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Search,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Calculator,
  X,
  FileDown,
} from 'lucide-react'
import { getTenders, getTender, searchTenders, updateTender, calculateTenderPrice } from '@/api/admin'
import apiClient from '@/api/client'
import type { Tender } from '@/types'
import { formatPrice, formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'

// Бейдж статуса
const TenderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: 'Новый', className: 'bg-blue-100 text-blue-700' },
    reviewing: { label: 'Изучается', className: 'bg-amber-100 text-amber-700' },
    bid: { label: 'Подана заявка', className: 'bg-purple-100 text-purple-700' },
    won: { label: 'Выигран', className: 'bg-green-100 text-green-700' },
    lost: { label: 'Проигран', className: 'bg-red-100 text-red-700' },
    skipped: { label: 'Пропущен', className: 'bg-gray-100 text-gray-500' },
  }
  const s = map[status] || { label: status, className: 'bg-gray-100 text-gray-600' }
  return (
    <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${s.className}`}>
      {s.label}
    </span>
  )
}

// Детали тендера с калькулятором
const TenderDetails: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const qc = useQueryClient()
  const [markup, setMarkup] = useState(15)
  const [calcResult, setCalcResult] = useState<{ our_price: number; margin_estimate: number } | null>(null)
  const [downloadingDocs, setDownloadingDocs] = useState(false)

  // UC-227: Скачивание комплекта документов
  const handleDownloadDocs = async () => {
    try {
      setDownloadingDocs(true)
      const response = await apiClient.get(`/admin/tenders/${tenderId}/documents`, {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `tender_${tenderId}_docs.zip`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      alert('Ошибка при генерации документов')
    } finally {
      setDownloadingDocs(false)
    }
  }

  const { data: tender, isLoading } = useQuery({
    queryKey: ['tender', tenderId],
    queryFn: () => getTender(tenderId),
  })

  const calcMut = useMutation({
    mutationFn: () => calculateTenderPrice(tenderId, markup),
    onSuccess: (data) => setCalcResult(data),
  })

  const updateMut = useMutation({
    mutationFn: (status: string) => updateTender(tenderId, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tenders'] }),
  })

  if (isLoading) return <div className="px-6 py-4"><PageSpinner /></div>
  if (!tender) return null

  // Разница с НМЦК
  const priceDiff = tender.our_price
    ? ((tender.our_price - tender.max_price) / tender.max_price) * 100
    : null

  return (
    <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-5 space-y-5">
      {/* Позиции тендера */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Позиции тендера</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Наименование</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Кол-во</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Ед.</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Цена за ед.</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tender.items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900">{item.name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{item.qty}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{item.unit}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{formatPrice(item.unit_price)}</td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900">
                    {formatPrice(item.qty * item.unit_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Калькулятор */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-primary-600" />
          <h3 className="text-sm font-semibold text-gray-700">Калькулятор цены</h3>
        </div>

        <div className="flex items-end gap-4 flex-wrap">
          {/* НМЦК */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">НМЦК</label>
            <div className="text-lg font-bold text-gray-900">{formatPrice(tender.max_price)}</div>
          </div>

          {/* Наценка */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Наценка %</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                value={markup}
                onChange={(e) => setMarkup(+e.target.value)}
                className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={() => calcMut.mutate()}
                disabled={calcMut.isPending}
                className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-60"
              >
                {calcMut.isPending ? '...' : 'Рассчитать'}
              </button>
            </div>
          </div>

          {/* Результат */}
          {calcResult && (
            <>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Наша цена</label>
                <div className="text-lg font-bold text-primary-700">
                  {formatPrice(calcResult.our_price)}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Маржа</label>
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(calcResult.margin_estimate)}
                </div>
              </div>
            </>
          )}

          {/* Разница с НМЦК */}
          {priceDiff !== null && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">vs. НМЦК</label>
              <div
                className={`text-sm font-bold ${
                  priceDiff < 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Смена статуса и ссылка */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={tender.status}
          onChange={(e) => updateMut.mutate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {[
            { value: 'new', label: 'Новый' },
            { value: 'reviewing', label: 'Изучается' },
            { value: 'bid', label: 'Подана заявка' },
            { value: 'won', label: 'Выигран' },
            { value: 'lost', label: 'Проигран' },
            { value: 'skipped', label: 'Пропущен' },
          ].map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* UC-227: Кнопка генерации документов */}
        <button
          onClick={handleDownloadDocs}
          disabled={downloadingDocs}
          className="flex items-center gap-2 bg-white border border-primary-300 hover:bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
        >
          <FileDown className={`w-4 h-4 ${downloadingDocs ? 'animate-pulse' : ''}`} />
          {downloadingDocs ? 'Генерация...' : 'Скачать документы'}
        </button>

        <a
          href={tender.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Открыть на ЕИС
        </a>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница
// ============================================================
export const AdminTendersPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['tenders', { page, status: statusFilter }],
    queryFn: () => getTenders({ page, per_page: 20, status: statusFilter || undefined }),
  })

  const searchMut = useMutation({
    mutationFn: searchTenders,
    onSuccess: (result) => {
      alert(`Найдено новых тендеров: ${result.found}`)
      qc.invalidateQueries({ queryKey: ['tenders'] })
    },
  })

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Тендеры</h1>
          {data && (
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {data.total}
            </span>
          )}
        </div>
        <button
          onClick={() => searchMut.mutate()}
          disabled={searchMut.isPending}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${searchMut.isPending ? 'animate-spin' : ''}`} />
          Поиск новых
        </button>
      </div>

      {/* Фильтр статуса */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: '', label: 'Все' },
          { value: 'new', label: 'Новые' },
          { value: 'reviewing', label: 'Изучаются' },
          { value: 'bid', label: 'Поданы заявки' },
          { value: 'won', label: 'Выиграны' },
          { value: 'lost', label: 'Проиграны' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setStatusFilter(opt.value); setPage(1) }}
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
          title="Тендеров нет"
          description="Нажмите «Поиск новых» для обновления базы тендеров"
        />
      ) : (
        <>
          <div className="space-y-2">
            {data.items.map((tender: Tender) => (
              <div
                key={tender._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(tender._id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Номер ЕИС */}
                    <div className="min-w-[130px]">
                      <div className="font-mono text-xs text-gray-500">{tender.eis_number}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{tender.region}</div>
                    </div>

                    {/* Название */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{tender.title}</div>
                      <div className="text-xs text-gray-500 truncate">{tender.customer}</div>
                    </div>

                    {/* НМЦК */}
                    <div className="hidden sm:block min-w-[100px] text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {formatPrice(tender.max_price)}
                      </div>
                      <div className="text-xs text-gray-400">НМЦК</div>
                    </div>

                    {/* Дедлайн */}
                    <div className="hidden lg:block min-w-[90px] text-right">
                      <div className="text-xs text-gray-600">{formatDate(tender.deadline)}</div>
                      <div className="text-xs text-gray-400">дедлайн</div>
                    </div>

                    {/* Статус */}
                    <TenderStatusBadge status={tender.status} />
                  </div>

                  <div className="ml-4">
                    {expandedId === tender._id ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedId === tender._id && (
                  <TenderDetails tenderId={tender._id} />
                )}
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={data.pages || 1} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}

export default AdminTendersPage
