// Страница профиля (UC-265: настройка пакета документов)
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { Building, MapPin, Eye, EyeOff, Lock, FileText, User as UserIcon } from 'lucide-react'
import { apiClient } from '@/api/client'
import { changePassword } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import { ClientType, UserStatus, type User as UserType } from '@/types'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { showToast } from '@/components/ui/Toast'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().optional(),
  delivery_address: z.string().optional(),
})

const passwordSchema = z
  .object({
    current_password: z.string().min(6, 'Введите текущий пароль'),
    new_password: z.string().min(8, 'Минимум 8 символов'),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: 'Пароли не совпадают',
    path: ['confirm_password'],
  })

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

const clientTypeLabels: Record<string, string> = {
  [ClientType.INDIVIDUAL]: 'Физическое лицо',
  [ClientType.IP]: 'ИП',
  [ClientType.OOO]: 'Организация',
}

const statusConfig: Record<
  string,
  { label: string; variant: 'yellow' | 'green' | 'red' | 'gray' }
> = {
  [UserStatus.PENDING]: { label: 'На проверке', variant: 'yellow' },
  [UserStatus.APPROVED]: { label: 'Активен', variant: 'green' },
  [UserStatus.REJECTED]: { label: 'Отклонён', variant: 'red' },
  [UserStatus.BLOCKED]: { label: 'Заблокирован', variant: 'gray' },
}

export const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore()
  const queryClient = useQueryClient()
  const [showCurrentPwd, setShowCurrentPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      phone: user?.phone || '',
      delivery_address: user?.delivery_address || '',
    },
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const handleProfileSubmit = profileForm.handleSubmit(async (data) => {
    try {
      const response = await apiClient.patch('/profile', data)
      setUser(response.data)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      showToast.success('Профиль обновлён')
    } catch {
      showToast.error('Ошибка при сохранении профиля')
    }
  })

  const handlePasswordSubmit = passwordForm.handleSubmit(async (data) => {
    try {
      await changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
      })
      passwordForm.reset()
      showToast.success('Пароль изменён')
    } catch {
      showToast.error('Ошибка при смене пароля. Проверьте текущий пароль.')
    }
  })

  const statusInfo = user ? statusConfig[user.status] : null
  const isB2B = user?.client_type !== ClientType.INDIVIDUAL

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>

      {/* Информация об аккаунте */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <UserIcon className="h-7 w-7 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user?.full_name}</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {clientTypeLabels[user?.client_type || ''] || user?.client_type}
              </span>
              {statusInfo && (
                <Badge variant={statusInfo.variant} size="sm">
                  {statusInfo.label}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Редактирование профиля */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Личные данные</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="ФИО"
              leftIcon={<UserIcon className="h-4 w-4" />}
              error={profileForm.formState.errors.full_name?.message}
              {...profileForm.register('full_name')}
            />
            <Input
              label="Телефон"
              placeholder="+7 (900) 000-00-00"
              error={profileForm.formState.errors.phone?.message}
              {...profileForm.register('phone')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Email" value={user?.email || ''} disabled hint="Email изменить нельзя" />
            <Input
              label="Адрес доставки"
              placeholder="Адрес для доставки заказов"
              leftIcon={<MapPin className="h-4 w-4" />}
              error={profileForm.formState.errors.delivery_address?.message}
              {...profileForm.register('delivery_address')}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={profileForm.formState.isSubmitting}>
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>

      {/* Реквизиты организации (B2B) */}
      {isB2B && user?.organization && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            <h2 className="text-base font-semibold text-gray-900">Реквизиты организации</h2>
          </div>
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-gray-500">Название</dt>
              <dd className="font-medium text-gray-900">{user.organization.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">ИНН</dt>
              <dd className="font-medium text-gray-900">{user.organization.inn}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Юридический адрес</dt>
              <dd className="font-medium text-gray-900">{user.organization.legal_address}</dd>
            </div>
            {user.organization.bank_name && (
              <div>
                <dt className="text-gray-500">Банк</dt>
                <dd className="font-medium text-gray-900">{user.organization.bank_name}</dd>
              </div>
            )}
          </dl>
          <div className="mt-3 text-xs text-gray-400">
            Для изменения реквизитов свяжитесь с менеджером
          </div>
        </div>
      )}

      {/* UC-265: Настройка пакета документов */}
      {isB2B && user && <DocumentPreferencesBlock user={user} />}

      {/* Смена пароля */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">Смена пароля</h2>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Текущий пароль"
            type={showCurrentPwd ? 'text' : 'password'}
            rightIcon={
              showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />
            }
            onRightIconClick={() => setShowCurrentPwd(!showCurrentPwd)}
            error={passwordForm.formState.errors.current_password?.message}
            {...passwordForm.register('current_password')}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Новый пароль"
              type={showNewPwd ? 'text' : 'password'}
              rightIcon={showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              onRightIconClick={() => setShowNewPwd(!showNewPwd)}
              error={passwordForm.formState.errors.new_password?.message}
              hint="Минимум 8 символов"
              {...passwordForm.register('new_password')}
            />
            <Input
              label="Подтвердите пароль"
              type="password"
              error={passwordForm.formState.errors.confirm_password?.message}
              {...passwordForm.register('confirm_password')}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="secondary" loading={passwordForm.formState.isSubmitting}>
              Изменить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// UC-265: Компонент настройки пакета документов
const DOCUMENT_OPTIONS = [
  { key: 'torg12', label: 'ТОРГ-12', description: 'Товарная накладная' },
  { key: 'invoice', label: 'Счёт на оплату', description: 'Для предоплаты или постоплаты' },
  { key: 'upd', label: 'УПД', description: 'Универсальный передаточный документ' },
  { key: 'scheta_factura', label: 'Счёт-фактура', description: 'Для организаций с НДС' },
  { key: 'act_sverki', label: 'Акт сверки', description: 'Ежемесячная сверка взаиморасчётов' },
  {
    key: 'realization',
    label: 'Реализация товаров',
    description: 'Документ реализации товаров и услуг',
  },
] as const

interface DocPrefs {
  torg12: boolean
  invoice: boolean
  upd: boolean
  scheta_factura: boolean
  act_sverki: boolean
  realization: boolean
}

const DocumentPreferencesBlock: React.FC<{ user: UserType }> = ({ user }) => {
  const [saving, setSaving] = useState(false)
  const [prefs, setPrefs] = useState<DocPrefs>({
    torg12: user?.document_preferences?.torg12 ?? true,
    invoice: user?.document_preferences?.invoice ?? true,
    upd: user?.document_preferences?.upd ?? false,
    scheta_factura: user?.document_preferences?.scheta_factura ?? false,
    act_sverki: user?.document_preferences?.act_sverki ?? false,
    realization: user?.document_preferences?.realization ?? false,
  })

  const handleToggle = (key: keyof DocPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await apiClient.patch('/profile', { document_preferences: prefs })
      showToast.success('Настройки документов сохранены')
    } catch {
      showToast.error('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-gray-500" />
        <h2 className="text-base font-semibold text-gray-900">Пакет документов</h2>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Выберите, какие документы формировать при каждой отгрузке
      </p>
      <div className="space-y-3">
        {DOCUMENT_OPTIONS.map((doc) => (
          <label key={doc.key} className="group flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={prefs[doc.key]}
              onChange={() => handleToggle(doc.key)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                {doc.label}
              </span>
              <span className="block text-xs text-gray-400">{doc.description}</span>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>
          Сохранить настройки
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage
