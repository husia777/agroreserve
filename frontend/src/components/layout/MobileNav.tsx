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
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-gray-200 safe-area-bottom">
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
                  'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative',
                  'text-xs transition-colors',
                  isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={cn('w-5 h-5', isActive && 'text-primary-600')} />
                    {/* Бейдж корзины */}
                    {tab.badge && itemsCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                        {itemsCount > 9 ? '9+' : itemsCount}
                      </span>
                    )}
                  </div>
                  <span className={cn('font-medium', isActive && 'text-primary-600')}>
                    {tab.label}
                  </span>
                  {/* Активная черта */}
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full" />
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
