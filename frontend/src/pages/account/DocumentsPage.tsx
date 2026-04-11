// Мои документы
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileDown, FileText } from 'lucide-react'
import { getDocuments, downloadDocument, downloadBlob } from '@/api/documents'
import { DocType } from '@/types'
import { formatDate } from '@/utils/format'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import { showToast } from '@/components/ui/Toast'

const DOC_TYPE_OPTIONS = [
  { value: '', label: 'Все типы' },
  { value: DocType.INVOICE, label: 'Счёт на оплату' },
  { value: DocType.TORG12, label: 'ТОРГ-12' },
  { value: DocType.UPD, label: 'УПД' },
  { value: DocType.ACT, label: 'Акт сверки' },
]

const docTypeLabels: Record<
  string,
  { label: string; variant: 'blue' | 'purple' | 'green' | 'orange' | 'gray' }
> = {
  [DocType.INVOICE]: { label: 'Счёт', variant: 'blue' },
  [DocType.TORG12]: { label: 'ТОРГ-12', variant: 'green' },
  [DocType.UPD]: { label: 'УПД', variant: 'purple' },
  [DocType.ACT]: { label: 'Акт', variant: 'orange' },
  [DocType.CONTRACT]: { label: 'Договор', variant: 'gray' },
}

export const DocumentsPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [docType, setDocType] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['myDocuments', { page, docType }],
    queryFn: () =>
      getDocuments({
        page,
        per_page: 20,
        doc_type: docType || undefined,
      }),
  })

  const handleDownload = async (docId: string, docNumber: string) => {
    setDownloading(docId)
    try {
      const blob = await downloadDocument(docId)
      downloadBlob(blob, `${docNumber}.pdf`)
      showToast.success('Файл скачан')
    } catch {
      showToast.error('Ошибка при скачивании')
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Мои документы</h1>
      </div>

      {/* Фильтры */}
      <div className="flex gap-3">
        <div className="w-48">
          <Select
            options={DOC_TYPE_OPTIONS}
            value={docType}
            onChange={(e) => {
              setDocType(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : data?.items.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="Документов нет"
          description="Документы появятся после оформления заказов"
        />
      ) : (
        <>
          {/* Таблица (desktop) */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white sm:block">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Документ
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Тип
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Дата
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Действие
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.items.map((doc) => {
                  const typeConfig = docTypeLabels[doc.doc_type] || {
                    label: doc.doc_type,
                    variant: 'gray' as const,
                  }
                  return (
                    <tr key={doc.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{doc.doc_number}</td>
                      <td className="px-5 py-3">
                        <Badge variant={typeConfig.variant} size="sm">
                          {typeConfig.label}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{formatDate(doc.created_at)}</td>
                      <td className="px-5 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<FileDown className="h-4 w-4" />}
                          loading={downloading === doc.id}
                          onClick={() => handleDownload(doc.id, doc.doc_number)}
                        >
                          Скачать PDF
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 sm:hidden">
            {data?.items.map((doc) => {
              const typeConfig = docTypeLabels[doc.doc_type] || {
                label: doc.doc_type,
                variant: 'gray' as const,
              }
              return (
                <div key={doc.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">{doc.doc_number}</span>
                    <Badge variant={typeConfig.variant} size="sm">
                      {typeConfig.label}
                    </Badge>
                  </div>
                  <div className="mb-3 text-xs text-gray-400">{formatDate(doc.created_at)}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<FileDown className="h-4 w-4" />}
                    loading={downloading === doc.id}
                    onClick={() => handleDownload(doc.id, doc.doc_number)}
                    fullWidth
                  >
                    Скачать PDF
                  </Button>
                </div>
              )
            })}
          </div>

          <Pagination page={page} totalPages={data?.pages || 1} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}

export default DocumentsPage
