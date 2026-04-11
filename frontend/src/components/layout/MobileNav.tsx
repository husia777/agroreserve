// Мобильная нижняя навигация (Bottom tab bar)
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, ShoppingCart, Package, User } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

const tabs = [
  { to: '/catalog', label: 'Каталог', icon: LayoutGrid, guestTo: '/quick-order' },
  { to: '/cart', label: 'Корзина', icon: ShoppingCart, badge: true },
  { to: '/account/orders', label: 'Заказы', icon: Package, requiresAuth: true },
  { to: '/account/profile', label: 'Профиль', icon: User, requiresAuth: true },
]

export const MobileNav: React.FC = () => {
  const { itemsCount } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  return (
    <nav className="safe-area-bottom fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white md:hidden">
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          // Если требует авторизации, показываем ссылку на вход
          const href = tab.requiresAuth && !isAuthenticated ? '/login' : tab.to
          const Icon = tab.icon

          return (
            <NavLink
              key={tab.to}
              to={href}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2',
                  'text-xs transition-colors',
                  isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={cn('h-5 w-5', isActive && 'text-primary-600')} />
                    {/* Бейдж корзины */}
                    {tab.badge && itemsCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold leading-none text-white">
                        {itemsCount > 9 ? '9+' : itemsCount}
                      </span>
                    )}
                  </div>
                  <span className={cn('font-medium', isActive && 'text-primary-600')}>
                    {tab.label}
                  </span>
                  {/* Активная черта */}
                  {isActive && (
                    <span className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary-600" />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNav
