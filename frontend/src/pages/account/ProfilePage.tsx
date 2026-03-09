// Страница профиля
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { User, Building, MapPin, Eye, EyeOff, Lock } from 'lucide-react'
import { apiClient } from '@/api/client'
import { changePassword } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import { ClientType, UserStatus } from '@/types'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { showToast } from '@/components/ui/Toast'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().optional(),
  delivery_address: z.string().optional(),
})

const passwordSchema = z.object({
  current_password: z.string().min(6, 'Введите текущий пароль'),
  new_password: z.string().min(8, 'Минимум 8 символов'),
  confirm_password: z.string(),
}).refine(d => d.new_password === d.confirm_password, {
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

const statusConfig: Record<string, { label: string; variant: 'yellow' | 'green' | 'red' | 'gray' }> = {
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
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user?.full_name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{clientTypeLabels[user?.client_type || ''] || user?.client_type}</span>
              {statusInfo && (
                <Badge variant={statusInfo.variant} size="sm">{statusInfo.label}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Редактирование профиля */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Личные данные</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ФИО"
              leftIcon={<User className="w-4 h-4" />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              value={user?.email || ''}
              disabled
              hint="Email изменить нельзя"
            />
            <Input
              label="Адрес доставки"
              placeholder="Адрес для доставки заказов"
              leftIcon={<MapPin className="w-4 h-4" />}
              error={profileForm.formState.errors.delivery_address?.message}
              {...profileForm.register('delivery_address')}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              loading={profileForm.formState.isSubmitting}
            >
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>

      {/* Реквизиты организации (B2B) */}
      {isB2B && user?.organization && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-gray-500" />
            <h2 className="text-base font-semibold text-gray-900">Реквизиты организации</h2>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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

      {/* Смена пароля */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">Смена пароля</h2>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Текущий пароль"
            type={showCurrentPwd ? 'text' : 'password'}
            rightIcon={showCurrentPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            onRightIconClick={() => setShowCurrentPwd(!showCurrentPwd)}
            error={passwordForm.formState.errors.current_password?.message}
            {...passwordForm.register('current_password')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Новый пароль"
              type={showNewPwd ? 'text' : 'password'}
              rightIcon={showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            <Button
              type="submit"
              variant="secondary"
              loading={passwordForm.formState.isSubmitting}
            >
              Изменить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
