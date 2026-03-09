// API функции авторизации
import { apiClient } from './client'
import type { AuthResponse, User } from '@/types'

// Данные для входа
export interface LoginData {
  email: string
  password: string
}

// Данные для регистрации
export interface RegisterData {
  email: string
  phone?: string
  password: string
  full_name: string
  client_type: string
  // B2B поля
  organization_name?: string
  inn?: string
  legal_address?: string
  delivery_address?: string
}

// Вход в систему
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data)
  return response.data
}

// Регистрация нового пользователя
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data)
  return response.data
}

// Обновление токена
export const refreshToken = async (token: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/refresh', {
    refresh_token: token,
  })
  return response.data
}

// Получение текущего пользователя
export const getMe = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me')
  return response.data
}

// Выход из системы
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout')
}

// Смена пароля
export const changePassword = async (data: {
  current_password: string
  new_password: string
}): Promise<void> => {
  await apiClient.post('/auth/change-password', data)
}
