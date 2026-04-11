// Layout для личного кабинета клиента
import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, FileText, User, ChevronRight } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'
import { cn } from '@/utils/cn'
import { useAuthStore } from '@/stores/authStore'

const sidebarNav = [
  { to: '/account', label: 'Обзор', icon: LayoutDashboard, exact: true },
  { to: '/account/orders', label: 'Мои заказы', icon: Package },
  { to: '/account/documents', label: 'Документы', icon: FileText },
  { to: '/account/profile', label: 'Профиль', icon: User },
]

export const AccountLayout: React.FC = () => {
  const { user, isApproved } = useAuthStore()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Боковое меню (только desktop) */}
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            {/* Карточка пользователя */}
            <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {user?.full_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isApproved ? 'Верифицированный' : 'На модерации'}
                  </div>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <nav className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {sidebarNav.map((item, idx) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                        idx > 0 && 'border-t border-gray-100',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={cn('h-4 w-4', isActive ? 'text-primary-600' : 'text-gray-400')}
                        />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight className="h-4 w-4 text-primary-400" />}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </aside>

          {/* Основной контент */}
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Мобильная навигация */}
      <div className="border-t border-gray-200 bg-white lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2">
          {sidebarNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:bg-gray-100',
                  )
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </NavLink>
            )
          })}
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}

export default AccountLayout
