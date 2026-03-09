// Страница управления сертификатами (UC-62 — UC-65)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ShieldCheck,
  PlusCircle,
  Trash2,
  Edit3,
  FileText,
  AlertTriangle,
  Upload,
  Calendar,
  Link as LinkIcon,
  ExternalLink,
} from 'lucide-react'
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAdminProducts,
} from '@/api/admin'
import { Certificate, CertType } from '@/types'
import { formatDate } from '@/utils/format'
import { cn } from '@/utils/cn'
import { PageSpinner } from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import toast from 'react-hot-toast'
import { differenceInDays, parseISO } from 'date-fns'

// --- Лейблы ---

const certTypeLabels: Record<CertType, string> = {
  [CertType.DECLARATION]: 'Декларация ТР ТС',
  [CertType.CERTIFICATE]: 'Сертификат',
  [CertType.VET_CERT]: 'Ветсправка',
  [CertType.QUALITY_CERT]: 'Удостоверение качества',
}

// Цвет статуса сертификата
const certStatusVariant = (status: Certificate['status']): 'green' | 'yellow' | 'red' => {
  switch (status) {
    case 'valid': return 'green'
    case 'expiring_soon': return 'yellow'
    case 'expired': return 'red'
  }
}

const certStatusLabel = (status: Certificate['status']): string => {
  switch (status) {
    case 'valid': return 'Действителен'
    case 'expiring_soon': return 'Истекает'
    case 'expired': return 'Истёк'
  }
}

// --- Схема формы ---
const certSchema = z.object({
  cert_number: z.string().min(1, 'Укажите номер сертификата'),
  cert_type: z.nativeEnum(CertType, { errorMap: () => ({ message: 'Выберите тип' }) }),
  issuing_authority: z.string().min(2, 'Укажите орган выдачи'),
  issued_at: z.string().min(1, 'Укажите дату выдачи'),
  expires_at: z.string().min(1, 'Укажите дату истечения'),
})
type CertFormValues = z.infer<typeof certSchema>

// --- Карточка сертификата ---
const CertCard: React.FC<{
  cert: Certificate
  onEdit: (cert: Certificate) => void
  onDelete: (id: string) => void
  deleting: boolean
}> = ({ cert, onEdit, onDelete, deleting }) => {
  const daysLeft = differenceInDays(parseISO(cert.expires_at), new Date())

  return (
    <div className={cn(
      'bg-white rounded-xl border p-4 space-y-3 transition-shadow hover:shadow-md',
      cert.status === 'expired' ? 'border-red-200 bg-red-50/30' :
      cert.status === 'expiring_soon' ? 'border-amber-200 bg-amber-50/30' :
      'border-gray-200'
    )}>
      {/* Верхняя строка */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className={cn(
            'w-5 h-5 flex-shrink-0',
            cert.status === 'expired' ? 'text-red-500' :
            cert.status === 'expiring_soon' ? 'text-amber-500' :
            'text-green-500'
          )} />
          <div>
            <div className="font-medium text-gray-900 text-sm">{cert.cert_number}</div>
            <div className="text-xs text-gray-500">{certTypeLabels[cert.cert_type]}</div>
          </div>
        </div>
        <Badge variant={certStatusVariant(cert.status)} size="sm">
          {certStatusLabel(cert.status)}
        </Badge>
      </div>

      {/* Орган выдачи */}
      <div className="text-xs text-gray-600">
        <span className="text-gray-400">Орган: </span>
        {cert.issuing_authority}
      </div>

      {/* Даты */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-gray-400">Выдан</div>
          <div className="text-gray-700">{formatDate(cert.issued_at)}</div>
        </div>
        <div>
          <div className="text-gray-400">Истекает</div>
          <div className={cn(
            'font-medium',
            cert.status === 'expired' ? 'text-red-600' :
            cert.status === 'expiring_soon' ? 'text-amber-600' :
            'text-gray-700'
          )}>
            {formatDate(cert.expires_at)}
            {cert.status !== 'expired' && daysLeft <= 90 && (
              <span className="ml-1">({daysLeft} дн.)</span>
            )}
          </div>
        </div>
      </div>

      {/* Привязанные товары */}
      {cert.product_ids.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <LinkIcon className="w-3 h-3" />
          <span>Привязан к {cert.product_ids.length} товарам</span>
        </div>
      )}

      {/* Файл */}
      {cert.file_url && (
        <a
          href={cert.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
        >
          <FileText className="w-3 h-3" />
          Скачать документ
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {/* Действия */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
        <button
          onClick={() => onEdit(cert)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Редактировать
        </button>
        <button
          onClick={() => {
            if (confirm('Удалить сертификат?')) onDelete(cert.id)
          }}
          disabled={deleting}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Удалить
        </button>
      </div>
    </div>
  )
}

// --- Главная страница ---
const AdminCertificatesPage: React.FC = () => {
  const queryClient = useQueryClient()

  const [certTypeFilter, setCertTypeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [page, setPage] = useState(1)

  const [formModal, setFormModal] = useState<'create' | 'edit' | null>(null)
  const [editingCert, setEditingCert] = useState<Certificate | null>(null)
  // Файл для загрузки
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  // --- Запросы ---
  const { data, isLoading } = useQuery({
    queryKey: ['admin-certificates', { certTypeFilter, statusFilter, page }],
    queryFn: () =>
      getCertificates({
        cert_type: certTypeFilter || undefined,
        status: statusFilter || undefined,
        page,
        per_page: 12,
      }),
  })

  // Запрос товаров (для привязки)
  const { data: productsData } = useQuery({
    queryKey: ['admin-products-list'],
    queryFn: () => getAdminProducts({ per_page: 200 }),
  })

  // --- Мутации ---
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createCertificate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] })
      setFormModal(null)
      setFileToUpload(null)
      toast.success('Сертификат добавлен')
    },
    onError: () => toast.error('Не удалось добавить сертификат'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Certificate> }) =>
      updateCertificate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] })
      setFormModal(null)
      setEditingCert(null)
      toast.success('Сертификат обновлён')
    },
    onError: () => toast.error('Не удалось обновить сертификат'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] })
      toast.success('Сертификат удалён')
    },
    onError: () => toast.error('Не удалось удалить сертификат'),
  })

  // --- Форма ---
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: {
      cert_type: CertType.DECLARATION,
      cert_number: '',
      issuing_authority: '',
      issued_at: new Date().toISOString().slice(0, 10),
      expires_at: '',
    },
  })

  const handleOpenCreate = () => {
    reset({
      cert_type: CertType.DECLARATION,
      cert_number: '',
      issuing_authority: '',
      issued_at: new Date().toISOString().slice(0, 10),
      expires_at: '',
    })
    setEditingCert(null)
    setFileToUpload(null)
    setFormModal('create')
  }

  const handleOpenEdit = (cert: Certificate) => {
    reset({
      cert_type: cert.cert_type,
      cert_number: cert.cert_number,
      issuing_authority: cert.issuing_authority,
      issued_at: cert.issued_at.slice(0, 10),
      expires_at: cert.expires_at.slice(0, 10),
    })
    setEditingCert(cert)
    setFileToUpload(null)
    setFormModal('edit')
  }

  const onSubmit = (values: CertFormValues) => {
    if (formModal === 'edit' && editingCert) {
      // Для обновления используем JSON (без файла)
      updateMutation.mutate({ id: editingCert.id, data: values })
    } else {
      // Для создания используем FormData (с файлом)
      const fd = new FormData()
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v))
      })
      if (fileToUpload) fd.append('file', fileToUpload)
      createMutation.mutate(fd)
    }
  }

  // Подсчёт по статусам
  const expiringSoon = data?.items.filter(c => c.status === 'expiring_soon').length ?? 0
  const expired = data?.items.filter(c => c.status === 'expired').length ?? 0

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Сертификаты</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Декларации, сертификаты качества и ветсправки
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleOpenCreate}
          icon={<PlusCircle className="w-4 h-4" />}
        >
          Добавить
        </Button>
      </div>

      {/* Предупреждения */}
      {(expiringSoon > 0 || expired > 0) && (
        <div className="space-y-2">
          {expired > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{expired} сертификат(а) истекли — требуют замены</span>
            </div>
          )}
          {expiringSoon > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{expiringSoon} сертификат(а) истекают в ближайшие 90 дней</span>
            </div>
          )}
        </div>
      )}

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2">
        <select
          value={certTypeFilter}
          onChange={(e) => { setCertTypeFilter(e.target.value); setPage(1) }}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        >
          <option value="">Все типы</option>
          {Object.entries(certTypeLabels).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        >
          <option value="">Все статусы</option>
          <option value="valid">Действительные</option>
          <option value="expiring_soon">Истекают</option>
          <option value="expired">Истёкшие</option>
        </select>
      </div>

      {/* Сетка сертификатов */}
      {isLoading ? (
        <PageSpinner />
      ) : !data?.items.length ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Сертификаты не найдены</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4"
            onClick={handleOpenCreate}
          >
            Добавить первый сертификат
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((cert) => (
              <CertCard
                key={cert.id}
                cert={cert}
                onEdit={handleOpenEdit}
                onDelete={(id) => deleteMutation.mutate(id)}
                deleting={deleteMutation.isPending}
              />
            ))}
          </div>

          {data.pages > 1 && (
            <Pagination
              page={page}
              totalPages={data.pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {/* Модалка создания/редактирования */}
      <Modal
        isOpen={!!formModal}
        onClose={() => { setFormModal(null); setEditingCert(null) }}
        title={formModal === 'edit' ? 'Редактировать сертификат' : 'Добавить сертификат'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Тип */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип документа</label>
            <select
              {...register('cert_type')}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              {Object.entries(certTypeLabels).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            {errors.cert_type && (
              <p className="text-xs text-red-500 mt-1">{errors.cert_type.message}</p>
            )}
          </div>

          {/* Номер */}
          <Input
            label="Номер документа"
            placeholder="РОСС RU Д-RU.АЯ46.В.01234"
            error={errors.cert_number?.message}
            {...register('cert_number')}
          />

          {/* Орган выдачи */}
          <Input
            label="Орган выдачи"
            placeholder="ФБУ Государственный региональный центр стандартизации"
            error={errors.issuing_authority?.message}
            {...register('issuing_authority')}
          />

          {/* Даты */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата выдачи</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                {...register('issued_at')}
              />
              {errors.issued_at && (
                <p className="text-xs text-red-500 mt-1">{errors.issued_at.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Действует до</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                {...register('expires_at')}
              />
              {errors.expires_at && (
                <p className="text-xs text-red-500 mt-1">{errors.expires_at.message}</p>
              )}
            </div>
          </div>

          {/* Загрузка файла */}
          {formModal === 'create' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Файл документа (PDF, JPG, PNG)
              </label>
              <label className={cn(
                'flex items-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-colors text-sm',
                fileToUpload
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400 text-gray-500'
              )}>
                <Upload className="w-4 h-4 flex-shrink-0" />
                {fileToUpload ? fileToUpload.name : 'Выберите файл или перетащите'}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setFileToUpload(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          )}

          {/* Привязка к товарам */}
          {(productsData?.items.length ?? 0) > 0 && formModal === 'edit' && editingCert && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Привязанные товары
              </label>
              <div className="max-h-36 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
                {productsData!.items.map((product) => {
                  const linked = editingCert.product_ids.includes(product.id)
                  return (
                    <label key={product.id} className="flex items-center gap-2 text-sm cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        defaultChecked={linked}
                        className="w-4 h-4 rounded accent-green-600"
                      />
                      <span className="text-gray-700">{product.name}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => { setFormModal(null); setEditingCert(null) }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {formModal === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminCertificatesPage
