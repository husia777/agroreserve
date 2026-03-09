// Layout для личного кабинета клиента
import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">

          {/* Боковое меню (только desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            {/* Карточка пользователя */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {user?.full_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isApproved ? 'Верифицированный' : 'На модерации'}
                  </div>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-4 h-4', isActive ? 'text-primary-600' : 'text-gray-400')} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4 text-primary-400" />}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </aside>

          {/* Основной контент */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Мобильная навигация */}
      <div className="lg:hidden border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto">
          {sidebarNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  )
                }
              >
                <Icon className="w-3.5 h-3.5" />
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
