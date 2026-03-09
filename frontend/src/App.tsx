// Корневой роутинг приложения «Агрорезерв»
// React Router v6 с защищёнными маршрутами ProtectedRoute и AdminRoute
import React, { Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { UserRole } from '@/types'
import { PageSpinner } from '@/components/ui/Spinner'

// --- Layouts ---
import PublicLayout from '@/components/layout/PublicLayout'
import AccountLayout from '@/components/layout/AccountLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// --- Публичные страницы ---
import HomePage from '@/pages/public/HomePage'
import CatalogPage from '@/pages/public/CatalogPage'
import ProductPage from '@/pages/public/ProductPage'
import LoginPage from '@/pages/public/LoginPage'
import RegisterPage from '@/pages/public/RegisterPage'
import AboutPage from '@/pages/public/AboutPage'
import ContactsPage from '@/pages/public/ContactsPage'
import SchoolsPage from '@/pages/public/SchoolsPage'
import CartPage from '@/pages/public/CartPage'
import CheckoutPage from '@/pages/public/CheckoutPage'
import RetailCheckoutPage from '@/pages/public/RetailCheckoutPage'

// --- Страницы личного кабинета ---
import AccountDashboard from '@/pages/account/AccountDashboard'
import OrdersPage from '@/pages/account/OrdersPage'
import OrderDetailPage from '@/pages/account/OrderDetailPage'
import DocumentsPage from '@/pages/account/DocumentsPage'
import ProfilePage from '@/pages/account/ProfilePage'

// --- Страницы личного кабинета v2 (ленивая загрузка) ---
const StandingOrdersPage = React.lazy(() => import('@/pages/account/StandingOrdersPage'))
const ClientAnalyticsPage = React.lazy(() => import('@/pages/account/ClientAnalyticsPage'))

// --- Страницы администратора (ленивая загрузка для уменьшения бандла) ---
const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminOrdersPage = React.lazy(() => import('@/pages/admin/AdminOrdersPage'))
const AdminOrderDetailPage = React.lazy(() => import('@/pages/admin/AdminOrderDetailPage'))
const AdminCatalogPage = React.lazy(() => import('@/pages/admin/AdminCatalogPage'))
const AdminProductForm = React.lazy(() => import('@/pages/admin/AdminProductForm'))
const AdminStockPage = React.lazy(() => import('@/pages/admin/AdminStockPage'))
const AdminStockReceiptPage = React.lazy(() => import('@/pages/admin/AdminStockReceiptPage'))
const AdminClientsPage = React.lazy(() => import('@/pages/admin/AdminClientsPage'))
const AdminFinancePage = React.lazy(() => import('@/pages/admin/AdminFinancePage'))
const AdminCertificatesPage = React.lazy(() => import('@/pages/admin/AdminCertificatesPage'))
const AdminSettingsPage = React.lazy(() => import('@/pages/admin/AdminSettingsPage'))
const AdminBackupsPage = React.lazy(() => import('@/pages/admin/AdminBackupsPage'))

// --- Страницы администратора v2 (ленивая загрузка) ---
const AdminSuppliersPage = React.lazy(() => import('@/pages/admin/AdminSuppliersPage'))
const AdminContractsPage = React.lazy(() => import('@/pages/admin/AdminContractsPage'))
const AdminDishesPage = React.lazy(() => import('@/pages/admin/AdminDishesPage'))
const AdminWriteOffsPage = React.lazy(() => import('@/pages/admin/AdminWriteOffsPage'))
const AdminTendersPage = React.lazy(() => import('@/pages/admin/AdminTendersPage'))
const AdminAnalyticsPage = React.lazy(() => import('@/pages/admin/AdminAnalyticsPage'))
const AdminCRMPage = React.lazy(() => import('@/pages/admin/AdminCRMPage'))
const AdminRemindersPage = React.lazy(() => import('@/pages/admin/AdminRemindersPage'))
const AdminCalendarPage = React.lazy(() => import('@/pages/admin/AdminCalendarPage'))
const AdminProcurementPage = React.lazy(() => import('@/pages/admin/AdminProcurementPage'))
const AdminPriceLogPage = React.lazy(() => import('@/pages/admin/AdminPriceLogPage'))
const AdminBatchesPage = React.lazy(() => import('@/pages/admin/AdminBatchesPage'))
const AdminLogisticsPage = React.lazy(() => import('@/pages/admin/AdminLogisticsPage'))
const AdminLabelsPage = React.lazy(() => import('@/pages/admin/AdminLabelsPage'))
const AdminDocumentsPage = React.lazy(() => import('@/pages/admin/AdminDocumentsPage'))

// ============================================================
// ProtectedRoute — только для аутентифицированных пользователей
// ============================================================
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Сохраняем исходный URL — после логина вернёмся сюда
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

// ============================================================
// AdminRoute — только для администраторов
// ============================================================
const AdminRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

// ============================================================
// Обёртка Suspense для ленивых страниц
// ============================================================
const LazyPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<PageSpinner />}>{children}</Suspense>
)

// ============================================================
// Страница 404
// ============================================================
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
    <div className="text-6xl font-bold text-gray-200">404</div>
    <h1 className="text-xl font-semibold text-gray-700">Страница не найдена</h1>
    <p className="text-gray-500 text-sm">Возможно, она была перемещена или удалена</p>
    <a
      href="/"
      className="mt-2 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
    >
      На главную
    </a>
  </div>
)

// ============================================================
// Редирект неавторизованных на быстрый заказ (UC-10)
// ============================================================
const GuestCatalogRedirect: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/quick-order" replace />
  return <CatalogPage />
}

const GuestCartRedirect: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/quick-order" replace />
  return <CartPage />
}

// ============================================================
// Роутер
// ============================================================
const router = createBrowserRouter([
  {
    // ========================================================
    // Публичные маршруты (с шапкой и футером)
    // ========================================================
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalog', element: <GuestCatalogRedirect /> },
      { path: '/catalog/:category', element: <GuestCatalogRedirect /> },
      { path: '/catalog/:category/:id', element: <GuestCatalogRedirect /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contacts', element: <ContactsPage /> },
      { path: '/schools', element: <SchoolsPage /> },
      // Быстрый розничный заказ без регистрации (UC-10)
      { path: '/quick-order', element: <RetailCheckoutPage /> },
      // Корзина и оформление — доступны всем
      { path: '/cart', element: <GuestCartRedirect /> },
      // Оформление — требует входа
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/checkout', element: <CheckoutPage /> },
        ],
      },
    ],
  },
  {
    // ========================================================
    // Страницы входа/регистрации (без PublicLayout шапки)
    // ========================================================
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    // ========================================================
    // Личный кабинет клиента (требует авторизации)
    // ========================================================
    element: <ProtectedRoute />,
    children: [
      {
        element: <AccountLayout />,
        children: [
          { path: '/account', element: <AccountDashboard /> },
          { path: '/account/orders', element: <OrdersPage /> },
          { path: '/account/orders/:id', element: <OrderDetailPage /> },
          { path: '/account/documents', element: <DocumentsPage /> },
          { path: '/account/profile', element: <ProfilePage /> },
          // --- Личный кабинет v2 ---
          {
            path: '/account/standing-orders',
            element: (
              <LazyPage>
                <StandingOrdersPage />
              </LazyPage>
            ),
          },
          {
            path: '/account/analytics',
            element: (
              <LazyPage>
                <ClientAnalyticsPage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
  {
    // ========================================================
    // Панель администратора (только UserRole.ADMIN)
    // ========================================================
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          // --- Основные страницы ---
          {
            path: '/admin',
            element: (
              <LazyPage>
                <AdminDashboard />
              </LazyPage>
            ),
          },
          {
            path: '/admin/orders',
            element: (
              <LazyPage>
                <AdminOrdersPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/orders/:id',
            element: (
              <LazyPage>
                <AdminOrderDetailPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/catalog',
            element: (
              <LazyPage>
                <AdminCatalogPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/catalog/new',
            element: (
              <LazyPage>
                <AdminProductForm />
              </LazyPage>
            ),
          },
          {
            path: '/admin/catalog/:id/edit',
            element: (
              <LazyPage>
                <AdminProductForm />
              </LazyPage>
            ),
          },
          {
            path: '/admin/stock',
            element: (
              <LazyPage>
                <AdminStockPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/stock/receipt',
            element: (
              <LazyPage>
                <AdminStockReceiptPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/clients',
            element: (
              <LazyPage>
                <AdminClientsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/finance',
            element: (
              <LazyPage>
                <AdminFinancePage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/certificates',
            element: (
              <LazyPage>
                <AdminCertificatesPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/settings',
            element: (
              <LazyPage>
                <AdminSettingsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/backups',
            element: (
              <React.Suspense fallback={<div />}>
                <AdminBackupsPage />
              </React.Suspense>
            ),
          },
          {
            path: '/admin/documents',
            element: (
              <LazyPage>
                <AdminDocumentsPage />
              </LazyPage>
            ),
          },
          // --- Расширенные страницы v2 ---
          {
            path: '/admin/suppliers',
            element: (
              <LazyPage>
                <AdminSuppliersPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/contracts',
            element: (
              <LazyPage>
                <AdminContractsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/dishes',
            element: (
              <LazyPage>
                <AdminDishesPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/write-offs',
            element: (
              <LazyPage>
                <AdminWriteOffsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/tenders',
            element: (
              <LazyPage>
                <AdminTendersPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/analytics',
            element: (
              <LazyPage>
                <AdminAnalyticsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/crm',
            element: (
              <LazyPage>
                <AdminCRMPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/reminders',
            element: (
              <LazyPage>
                <AdminRemindersPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/calendar',
            element: (
              <LazyPage>
                <AdminCalendarPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/procurement',
            element: (
              <LazyPage>
                <AdminProcurementPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/price-log',
            element: (
              <LazyPage>
                <AdminPriceLogPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/batches',
            element: (
              <LazyPage>
                <AdminBatchesPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/logistics',
            element: (
              <LazyPage>
                <AdminLogisticsPage />
              </LazyPage>
            ),
          },
          {
            path: '/admin/labels',
            element: (
              <LazyPage>
                <AdminLabelsPage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
  // ============================================================
  // 404
  // ============================================================
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

// ============================================================
// Корневой компонент
// ============================================================
const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
