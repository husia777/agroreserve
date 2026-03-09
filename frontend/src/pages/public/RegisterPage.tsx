// Страница регистрации — двухшаговая форма
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, MapPin } from 'lucide-react'
import { register as registerUser } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { showToast } from '@/components/ui/Toast'
import { cn } from '@/utils/cn'

// Типы клиентов
const CLIENT_TYPES = [
  { value: 'individual', label: 'Физическое лицо (B2C)' },
  { value: 'ip', label: 'ИП' },
  { value: 'ooo', label: 'ООО / АО / другое' },
]

// Схема шага 1
const step1Schema = z.object({
  full_name: z.string().min(2, 'Введите ФИО (минимум 2 символа)'),
  email: z.string().email('Некорректный email'),
  phone: z.string().regex(/^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, 'Некорректный номер телефона').optional().or(z.literal('')),
  password: z.string().min(8, 'Минимум 8 символов'),
  password_confirm: z.string(),
  client_type: z.enum(['individual', 'ip', 'ooo']),
}).refine((data) => data.password === data.password_confirm, {
  message: 'Пароли не совпадают',
  path: ['password_confirm'],
})

// Схема шага 2 (B2B)
const step2Schema = z.object({
  organization_name: z.string().min(2, 'Введите название организации'),
  inn: z.string().regex(/^\d{10,12}$/, 'ИНН: 10 или 12 цифр'),
  legal_address: z.string().min(10, 'Введите юридический адрес'),
  delivery_address: z.string().optional(),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { login: loginStore } = useAuthStore()
  const navigate = useNavigate()

  // Шаг 1
  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { client_type: 'individual' },
  })

  // Шаг 2
  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  })

  const clientType = form1.watch('client_type')
  const isB2B = clientType === 'ip' || clientType === 'ooo'

  // Переход к шагу 2
  const handleStep1 = form1.handleSubmit(async (data) => {
    if (!isB2B) {
      // Физлица регистрируем сразу
      await submitRegistration(data)
    } else {
      setStep1Data(data)
      setStep(2)
    }
  })

  // Финальная регистрация
  const submitRegistration = async (step1: Step1Data, step2?: Step2Data) => {
    try {
      const response = await registerUser({
        email: step1.email,
        phone: step1.phone || undefined,
        password: step1.password,
        full_name: step1.full_name,
        client_type: step1.client_type,
        organization_name: step2?.organization_name,
        inn: step2?.inn,
        legal_address: step2?.legal_address,
        delivery_address: step2?.delivery_address,
      })
      loginStore(response.user, response.tokens.access_token, response.tokens.refresh_token)

      if (isB2B) {
        showToast.info('Аккаунт создан! Он будет активирован после проверки менеджером.')
        navigate('/account')
      } else {
        showToast.success('Добро пожаловать в Агрорезерв!')
        navigate('/')
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } }
      const message = error?.response?.data?.detail || 'Ошибка регистрации'
      showToast.error(message)
    }
  }

  const handleStep2 = form2.handleSubmit(async (data) => {
    if (step1Data) {
      await submitRegistration(step1Data, data)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        {/* Лого */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                <path d="M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z" fill="white"/>
              </svg>
            </div>
            <div className="text-xl font-bold text-gray-900">АГРОРЕЗЕРВ</div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">Создать аккаунт</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Войти
            </Link>
          </p>
        </div>

        {/* Индикатор прогресса */}
        {isB2B && (
          <div className="flex items-center gap-3 mb-6">
            <div className={cn('flex-1 h-1.5 rounded-full transition-colors', step >= 1 ? 'bg-primary-600' : 'bg-gray-200')} />
            <div className={cn('flex-1 h-1.5 rounded-full transition-colors', step >= 2 ? 'bg-primary-600' : 'bg-gray-200')} />
            <div className="text-xs text-gray-500 whitespace-nowrap">
              Шаг {step} из 2
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Шаг 1: Основные данные */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Личные данные
              </h2>

              {/* Тип клиента */}
              <Select
                label="Тип аккаунта"
                options={CLIENT_TYPES}
                error={form1.formState.errors.client_type?.message}
                {...form1.register('client_type')}
              />

              {/* ФИО */}
              <Input
                label="ФИО"
                placeholder="Иванов Иван Иванович"
                leftIcon={<User className="w-4 h-4" />}
                error={form1.formState.errors.full_name?.message}
                required
                {...form1.register('full_name')}
              />

              {/* Email */}
              <Input
                label="Email"
                type="email"
                placeholder="your@email.ru"
                leftIcon={<Mail className="w-4 h-4" />}
                error={form1.formState.errors.email?.message}
                required
                {...form1.register('email')}
              />

              {/* Телефон */}
              <Input
                label="Телефон"
                type="tel"
                placeholder="+7 (900) 000-00-00"
                leftIcon={<Phone className="w-4 h-4" />}
                error={form1.formState.errors.phone?.message}
                hint="Необязательно. Для уведомлений в Telegram."
                {...form1.register('phone')}
              />

              {/* Пароль */}
              <Input
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                placeholder="Минимум 8 символов"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                error={form1.formState.errors.password?.message}
                required
                {...form1.register('password')}
              />

              {/* Подтверждение пароля */}
              <Input
                label="Подтвердите пароль"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Повторите пароль"
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                error={form1.formState.errors.password_confirm?.message}
                required
                {...form1.register('password_confirm')}
              />

              {/* Инфо для B2B */}
              {isB2B && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                  На следующем шаге укажите реквизиты организации для доступа к оптовым ценам.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={form1.formState.isSubmitting}
                size="lg"
                className="mt-2"
              >
                {isB2B ? 'Далее' : 'Зарегистрироваться'}
              </Button>
            </form>
          )}

          {/* Шаг 2: Реквизиты B2B */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  ← Назад
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Реквизиты организации</h2>
              </div>

              {/* Название */}
              <Input
                label="Название организации"
                placeholder="ООО «Название» или ИП Иванов И.И."
                leftIcon={<Building className="w-4 h-4" />}
                error={form2.formState.errors.organization_name?.message}
                required
                {...form2.register('organization_name')}
              />

              {/* ИНН */}
              <Input
                label="ИНН"
                placeholder="10 или 12 цифр"
                error={form2.formState.errors.inn?.message}
                hint="Для ИП — 12 цифр, для ООО — 10 цифр"
                required
                {...form2.register('inn')}
              />

              {/* Юр. адрес */}
              <Input
                label="Юридический адрес"
                placeholder="г. Тобольск, ул. Ленина, д. 1"
                leftIcon={<MapPin className="w-4 h-4" />}
                error={form2.formState.errors.legal_address?.message}
                required
                {...form2.register('legal_address')}
              />

              {/* Адрес доставки */}
              <Input
                label="Адрес доставки"
                placeholder="Если отличается от юр. адреса"
                leftIcon={<MapPin className="w-4 h-4" />}
                error={form2.formState.errors.delivery_address?.message}
                hint="Необязательно"
                {...form2.register('delivery_address')}
              />

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                После регистрации ваш аккаунт будет проверен менеджером. После одобрения вы получите доступ к оптовым ценам и заказам.
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={form2.formState.isSubmitting}
                size="lg"
              >
                Завершить регистрацию
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
