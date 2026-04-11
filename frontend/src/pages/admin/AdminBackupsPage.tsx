// Страница управления резервными копиями (UC-51)
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Database,
  Download,
  Trash2,
  RotateCcw,
  PlusCircle,
  HardDrive,
  Clock,
  AlertTriangle,
  Loader2,
  Shield,
} from 'lucide-react'
import { apiClient } from '@/api/client'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import { PageSpinner } from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

// --- Типы ---

interface BackupInfo {
  name: string
  created_at: string
  size_bytes: number
  size_human: string
  type: string
}

interface BackupListResponse {
  items: BackupInfo[]
  total: number
  backup_dir: string
}

interface BackupCreateResponse {
  status: string
  backup_name: string
  size_bytes: number
  size_human: string
  message: string
}

// --- API ---

const getBackups = async (): Promise<BackupListResponse> => {
  const response = await apiClient.get<BackupListResponse>('/admin/backups')
  return response.data
}

const createBackup = async (): Promise<BackupCreateResponse> => {
  const response = await apiClient.post<BackupCreateResponse>('/admin/backups')
  return response.data
}

const deleteBackup = async (name: string): Promise<void> => {
  await apiClient.delete(`/admin/backups/${name}`)
}

const restoreBackup = async (name: string): Promise<{ status: string; message: string }> => {
  const response = await apiClient.post<{ status: string; message: string }>(
    `/admin/backups/${name}/restore`,
  )
  return response.data
}

// --- Компонент ---

const AdminBackupsPage: React.FC = () => {
  const queryClient = useQueryClient()
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'backups'],
    queryFn: getBackups,
    refetchInterval: 30000, // Обновлять каждые 30 сек
  })

  const createMutation = useMutation({
    mutationFn: createBackup,
    onSuccess: (res) => {
      toast.success(res.message)
      queryClient.invalidateQueries({ queryKey: ['admin', 'backups'] })
    },
    onError: (err: { response?: { data?: { detail?: string } } }) => {
      toast.error(err?.response?.data?.detail || 'Ошибка создания бэкапа')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBackup,
    onSuccess: () => {
      toast.success('Бэкап удалён')
      setConfirmDelete(null)
      queryClient.invalidateQueries({ queryKey: ['admin', 'backups'] })
    },
    onError: (err: { response?: { data?: { detail?: string } } }) => {
      toast.error(err?.response?.data?.detail || 'Ошибка удаления')
    },
  })

  const restoreMutation = useMutation({
    mutationFn: restoreBackup,
    onSuccess: (res) => {
      toast.success(res.message)
      setConfirmRestore(null)
    },
    onError: (err: { response?: { data?: { detail?: string } } }) => {
      toast.error(err?.response?.data?.detail || 'Ошибка восстановления')
    },
  })

  const handleDownload = (name: string) => {
    // Открываем прямую ссылку на скачивание
    const token = localStorage.getItem('access_token')
    const baseUrl = apiClient.defaults.baseURL || ''
    window.open(`${baseUrl}/admin/backups/${name}/download?token=${token}`, '_blank')
  }

  const formatDate = (iso: string): string => {
    try {
      const d = new Date(iso)
      return d.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return iso
    }
  }

  if (isLoading) return <PageSpinner />

  const backups = data?.items || []
  const totalSize = backups.reduce((sum, b) => sum + b.size_bytes, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
            <Database className="h-6 w-6 text-primary-600" />
            Резервные копии
          </h1>
          <p className="mt-1 text-sm text-gray-500">Управление бэкапами базы данных MongoDB</p>
        </div>
        <Button
          onClick={() => createMutation.mutate()}
          disabled={createMutation.isPending}
          className="flex items-center gap-2"
        >
          {createMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
          {createMutation.isPending ? 'Создание...' : 'Создать бэкап'}
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <HardDrive className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
              <p className="text-xs text-gray-500">Всего бэкапов</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {backups.length > 0 ? formatDate(backups[0].created_at) : '—'}
              </p>
              <p className="text-xs text-gray-500">Последний бэкап</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Database className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {totalSize < 1024 * 1024
                  ? `${(totalSize / 1024).toFixed(1)} КБ`
                  : `${(totalSize / (1024 * 1024)).toFixed(1)} МБ`}
              </p>
              <p className="text-xs text-gray-500">Общий размер</p>
            </div>
          </div>
        </div>
      </div>

      {/* Информация о расписании */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">Автоматическое резервное копирование</p>
          <p className="mt-0.5 text-blue-600">
            Бэкап создаётся ежедневно в 03:00 (МСК). Хранятся последние 7 копий.
          </p>
        </div>
      </div>

      {/* Список бэкапов */}
      {backups.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Database className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-medium text-gray-500">Бэкапов пока нет</p>
          <p className="mt-1 text-sm text-gray-400">
            Нажмите «Создать бэкап» для первой резервной копии
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {backups.map((backup) => (
            <div
              key={backup.name}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Информация */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                      backup.type === 'auto' ? 'bg-green-50' : 'bg-blue-50',
                    )}
                  >
                    <Database
                      className={cn(
                        'h-5 w-5',
                        backup.type === 'auto' ? 'text-green-600' : 'text-blue-600',
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{backup.name}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(backup.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        {backup.size_human}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Действия */}
                <div className="flex flex-shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => handleDownload(backup.name)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    title="Скачать"
                  >
                    <Download className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => setConfirmRestore(backup.name)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                    title="Восстановить"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(backup.name)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Удалить"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модал подтверждения восстановления */}
      {confirmRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Восстановить базу?</h3>
            </div>
            <p className="mb-2 text-sm text-gray-600">
              Текущие данные будут <span className="font-semibold text-red-600">перезаписаны</span>{' '}
              данными из бэкапа:
            </p>
            <p className="mb-4 break-all rounded-lg bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700">
              {confirmRestore}
            </p>
            <p className="mb-5 text-xs text-gray-500">
              Рекомендуем создать свежий бэкап перед восстановлением.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRestore(null)}
                className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => restoreMutation.mutate(confirmRestore)}
                disabled={restoreMutation.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
              >
                {restoreMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Восстановить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модал подтверждения удаления */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Удалить бэкап?</h3>
            </div>
            <p className="mb-2 text-sm text-gray-600">Бэкап будет удалён безвозвратно:</p>
            <p className="mb-5 break-all rounded-lg bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700">
              {confirmDelete}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => deleteMutation.mutate(confirmDelete)}
                disabled={deleteMutation.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBackupsPage
