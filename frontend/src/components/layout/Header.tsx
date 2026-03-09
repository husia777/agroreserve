// Шапка сайта — лого, навигация, корзина, кнопка входа/профиля
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut, Settings, Package } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { cn } from '@/utils/cn'

const navLinks = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О нас' },
  { to: '/schools', label: 'Для школ' },
  { to: '/contacts', label: 'Контакты' },
]

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { isAuthenticated, isAdmin, user, logout } = useAuthStore()
  const { itemsCount } = useCartStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
              <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6" aria-hidden="true">
                {/* Стилизованный листок */}
                <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4z" fill="white" fillOpacity="0.2"/>
                <path d="M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z" fill="white"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold text-gray-900 tracking-tight">АГРОРЕЗЕРВ</div>
              <div className="text-xs text-primary-600 font-medium -mt-0.5">Тобольск</div>
            </div>
          </Link>

          {/* Навигация (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            {/* Корзина */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Корзина"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                  {itemsCount > 99 ? '99+' : itemsCount}
                </span>
              )}
            </Link>

            {/* Пользователь */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-700" />
                  </div>
                  <span className="hidden sm:block max-w-[100px] truncate">
                    {user?.full_name.split(' ')[0]}
                  </span>
                </button>

                {/* Меню пользователя */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-20 py-1">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {user?.full_name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Package className="w-4 h-4 text-gray-400" />
                        Мои заказы
                      </Link>
                      <Link
                        to="/account/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        Профиль
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 font-medium"
                        >
                          <Settings className="w-4 h-4" />
                          Панель управления
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Выйти
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
              >
                Войти
              </Link>
            )}

            {/* Мобильное меню */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильная навигация */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
