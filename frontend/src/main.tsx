// Точка входа приложения «Агрорезерв»
// Провайдеры: React.StrictMode, QueryClientProvider, Toaster
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

// --- Конфигурация React Query ---
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Повторная попытка при ошибке — только 1 раз
      retry: 1,
      // Данные актуальны 5 минут
      staleTime: 5 * 60 * 1000,
      // Кэш хранится 10 минут
      gcTime: 10 * 60 * 1000,
      // Рефетч при фокусе окна — отключаем для стабильности
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Не повторять мутации при ошибке
      retry: false,
    },
  },
})

// --- Монтирование приложения ---
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Корневой элемент #root не найден в index.html')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Основное приложение с роутингом */}
      <App />

      {/* Уведомления (react-hot-toast) */}
      <Toaster
        position="top-right"
        gutter={8}
        containerStyle={{
          top: 16,
          right: 16,
        }}
        toastOptions={{
          // Общие настройки
          duration: 4000,
          style: {
            background: '#fff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            maxWidth: '380px',
          },
          // Успех
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #bbf7d0',
              background: '#f0fdf4',
            },
          },
          // Ошибка
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #fecaca',
              background: '#fef2f2',
            },
          },
          // Загрузка
          loading: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#e5e7eb',
            },
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
)

// Регистрация Service Worker (UC-45 PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.warn('SW зарегистрирован:', reg.scope)
      })
      .catch((err) => {
        console.warn('SW ошибка регистрации:', err)
      })
  })
}
