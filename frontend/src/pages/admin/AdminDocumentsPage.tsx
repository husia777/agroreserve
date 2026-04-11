// Страница управления документами — Админ-панель
// Список всех документов с фильтрами, скачиванием и генерацией
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  FileText,
  Download,
  Search,
  Filter,
  RefreshCw,
  FileSpreadsheet,
  FileCheck,
  File,
} from 'lucide-react'
import { apiClient } from '@/api/client'
import { formatDate } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import toast from 'react-hot-toast'

// --- Типы ---

interface AdminDocument {
  id: string
  doc_type: string
  number: string
  order_id?: string
  client_id?: string
  client_name?: string
  file_name?: string
  file_size_bytes?: number
  download_url: string
  created_at: string
}

interface DocumentsResponse {
  items: AdminDocument[]
  total: number
  page: number
  limit: number
  pages: number
}

// --- Лейблы типов документов ---

const docTypeLabels: Record<string, string> = {
  invoice: 'Счёт на оплату',
  torg12: 'ТОРГ-12',
  upd: 'УПД',
  act: 'Акт сверки',
  contract: 'Договор',
  label: 'Ярлык',
  reconciliation: 'Акт сверки',
}

const docTypeIcon = (t: string) => {
  switch (t) {
    case 'invoice':
      return <FileText className="h-4 w-4 text-blue-500" />
    case 'torg12':
      return <FileSpreadsheet className="h-4 w-4 text-green-500" />
    case 'contract':
      return <FileCheck className="h-4 w-4 text-purple-500" />
    default:
      return <File className="h-4 w-4 text-gray-500" />
  }
}

const docTypeVariant = (t: string): 'blue' | 'green' | 'yellow' | 'red' | 'gray' => {
  switch (t) {
    case 'invoice':
      return 'blue'
    case 'torg12':
      return 'green'
    case 'contract':
      return 'yellow'
    case 'act':
    case 'reconciliation':
      return 'gray'
    default:
      return 'gray'
  }
}

// --- API ---

const getAdminDocuments = async (params: {
  doc_type?: string
  order_id?: string
  client_id?: string
  page?: number
  limit?: number
}): Promise<DocumentsResponse> => {
  const response = await apiClient.get<DocumentsResponse>('/admin/documents', { params })
  return response.data
}

// --- Форматирование размера файла ---

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

// --- Компонент ---

const AdminDocumentsPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [filterType, setFilterType] = useState<string>('')
  const [searchOrderId, setSearchOrderId] = useState('')
  const limit = 20

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-documents', page, filterType, searchOrderId],
    queryFn: () =>
      getAdminDocuments({
        page,
        limit,
        doc_type: filterType || undefined,
        order_id: searchOrderId || undefined,
      }),
  })

  const handleDownload = async (doc: AdminDocument) => {
    try {
      const response = await apiClient.get(doc.download_url, { responseType: 'blob' })
      const blob = response.data as Blob
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', doc.file_name || `${doc.number}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Документ скачан')
    } catch {
      toast.error('Ошибка скачивания документа')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Документы</h1>
          <p className="mt-1 text-sm text-gray-500">Счета, накладные, акты сверки, договоры</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Обновить
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value)
            setPage(1)
          }}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Все типы</option>
          <option value="invoice">Счёт на оплату</option>
          <option value="torg12">ТОРГ-12</option>
          <option value="upd">УПД</option>
          <option value="act">Акт сверки</option>
          <option value="contract">Договор</option>
          <option value="label">Ярлык</option>
        </select>

        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Номер заказа..."
            value={searchOrderId}
            onChange={(e) => {
              setSearchOrderId(e.target.value)
              setPage(1)
            }}
            className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {data && <span className="text-xs text-gray-500">Найдено: {data.total}</span>}
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-600">Ошибка загрузки документов</p>
          <Button variant="secondary" size="sm" className="mt-3" onClick={() => refetch()}>
            Повторить
          </Button>
        </div>
      ) : !data?.items?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <FileText className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">Документов пока нет</p>
          <p className="mt-1 text-xs text-gray-400">
            Документы создаются автоматически при обработке заказов
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Тип</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Номер</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Клиент</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Файл</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Размер</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Дата</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.items.map((doc) => (
                  <tr key={doc.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {docTypeIcon(doc.doc_type)}
                        <Badge variant={docTypeVariant(doc.doc_type)}>
                          {docTypeLabels[doc.doc_type] || doc.doc_type}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">
                      {doc.number || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{doc.client_name || '—'}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-xs text-gray-500">
                      {doc.file_name || '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {formatFileSize(doc.file_size_bytes)}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {formatDate(doc.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                        title="Скачать"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Скачать
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.pages > 1 && (
            <div className="border-t border-gray-200 px-4 py-3">
              <Pagination page={page} totalPages={data.pages} onPageChange={setPage} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDocumentsPage
