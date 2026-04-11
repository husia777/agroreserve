// Страница входа
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { login } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { showToast } from '@/components/ui/Toast'

// Схема валидации
const loginSchema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login: loginStore } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  // Куда перенаправить после входа
  const from = (location.state as { from?: Location })?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data)
      loginStore(response.user, response.tokens.access_token, response.tokens.refresh_token)
      showToast.success(`Добро пожаловать, ${response.user.full_name.split(' ')[0]}!`)
      navigate(from === '/login' ? '/' : from, { replace: true })
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } }
      const message = error?.response?.data?.detail || 'Неверный email или пароль'
      showToast.error(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Лого */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
              <svg viewBox="0 0 36 36" fill="none" className="h-7 w-7">
                <path
                  d="M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-xl font-bold text-gray-900">АГРОРЕЗЕРВ</div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Вход в аккаунт</h1>
          <p className="mt-2 text-sm text-gray-500">
            Нет аккаунта?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {/* Форма */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="your@email.ru"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Пароль */}
            <Input
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              placeholder="Введите пароль"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Кнопка входа */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              size="lg"
              className="mt-2"
            >
              Войти
            </Button>
          </form>

          {/* Разделитель */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">или</span>
            </div>
          </div>

          {/* Telegram вход */}
          <a
            href="https://t.me/agroreserve_bot?start=login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-200 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
            </svg>
            Войти через Telegram
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
