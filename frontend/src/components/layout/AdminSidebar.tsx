// Боковая навигация административной панели
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  LayoutGrid,
  Warehouse,
  Users,
  BarChart3,
  Award,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Truck,
  Layers,
  Trash2,
  Search,
  Bell,
  Calendar,
  Map,
  TrendingUp,
  Tag,
  Database,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthStore } from '@/stores/authStore'

// Основные пункты меню
const navItems = [
  { to: '/admin', label: 'Сегодня', icon: LayoutDashboard, exact: true },
  { to: '/admin/orders', label: 'Заказы', icon: ShoppingBag },
  { to: '/admin/catalog', label: 'Каталог', icon: LayoutGrid },
  { to: '/admin/stock', label: 'Склад', icon: Warehouse },
  { to: '/admin/clients', label: 'Клиенты', icon: Users },
  { to: '/admin/finance', label: 'Финансы', icon: BarChart3 },
  { to: '/admin/certificates', label: 'Сертификаты', icon: Award },
  { to: '/admin/labels', label: 'Ярлыки', icon: Tag },
  { to: '/admin/documents', label: 'Документы', icon: FileText },
  { to: '/admin/settings', label: 'Настройки', icon: Settings },
  { to: '/admin/backups', label: 'Бэкапы', icon: Database },
]

// Расширенные пункты меню (v2 функциональность)
const extendedNavItems = [
  { to: '/admin/suppliers', label: 'Поставщики', icon: Truck },
  { to: '/admin/procurement', label: 'Закупки', icon: ShoppingBag },
  { to: '/admin/batches', label: 'Партии', icon: Layers },
  { to: '/admin/write-offs', label: 'Списания', icon: Trash2 },
  { to: '/admin/contracts', label: 'Госконтракты', icon: FileText },
  { to: '/admin/tenders', label: 'Тендеры', icon: Search },
  { to: '/admin/analytics', label: 'Аналитика', icon: BarChart3 },
  { to: '/admin/crm', label: 'CRM', icon: Users },
  { to: '/admin/reminders', label: 'Напоминания', icon: Bell },
  { to: '/admin/calendar', label: 'Календарь', icon: Calendar },
  { to: '/admin/logistics', label: 'Маршруты', icon: Map },
  { to: '/admin/price-log', label: 'Цены закупок', icon: TrendingUp },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed: externalCollapsed,
  onToggle,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalCollapsed(!internalCollapsed)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Вспомогательная функция для рендера одного пункта навигации
  const renderNavItem = (item: {
    to: string
    label: string
    icon: React.ElementType
    exact?: boolean
  }) => {
    const Icon = item.icon
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.exact}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors',
            'text-sm font-medium',
            isActive
              ? 'border border-primary-600/20 bg-primary-600/20 text-primary-400'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          )
        }
        title={collapsed ? item.label : undefined}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <aside
      className={cn(
        'flex h-screen flex-shrink-0 flex-col bg-gray-900 text-gray-300',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Шапка */}
      <div
        className={cn(
          'flex h-16 flex-shrink-0 items-center border-b border-gray-800',
          collapsed ? 'justify-center px-2' : 'justify-between px-4',
        )}
      >
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white">АГРОРЕЗЕРВ</div>
            <div className="text-xs text-primary-400">Панель управления</div>
          </div>
        )}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          aria-label={collapsed ? 'Развернуть' : 'Свернуть'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Навигация с прокруткой */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
        {/* Основные пункты */}
        {navItems.map(renderNavItem)}

        {/* Разделитель секции «РАСШИРЕННЫЕ» */}
        <div className={cn('pb-1 pt-3', collapsed ? 'px-1' : 'px-1')}>
          {!collapsed ? (
            <div className="border-t border-gray-800 px-1.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Расширенные
            </div>
          ) : (
            // В свёрнутом состоянии — просто горизонтальная линия
            <div className="mx-1 border-t border-gray-800" />
          )}
        </div>

        {/* Расширенные пункты (v2) */}
        {extendedNavItems.map(renderNavItem)}
      </nav>

      {/* Нижняя часть */}
      <div className="space-y-0.5 border-t border-gray-800 p-2">
        {/* Ссылка на сайт */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white',
          )}
          title={collapsed ? 'Сайт' : undefined}
        >
          <ExternalLink className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Открыть сайт</span>}
        </a>

        {/* Профиль */}
        {!collapsed && (
          <div className="px-2.5 py-2">
            <div className="truncate text-xs font-semibold uppercase tracking-wider text-gray-500">
              {user?.full_name}
            </div>
            <div className="truncate text-xs text-gray-600">{user?.email}</div>
          </div>
        )}

        {/* Выход */}
        <button
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-2.5 py-2',
            'text-sm text-red-400 transition-colors hover:bg-red-900/20 hover:text-red-300',
          )}
          title={collapsed ? 'Выйти' : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Выйти</span>}
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
