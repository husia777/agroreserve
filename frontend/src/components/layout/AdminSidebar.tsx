// Боковая навигация административной панели
import React, { useState } from 'react'
import {
  NavLink, useNavigate } from 'react-router-dom'
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
  const renderNavItem = (item: { to: string; label: string; icon: React.ElementType; exact?: boolean }) => {
    const Icon = item.icon
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.exact}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors',
            'text-sm font-medium',
            isActive
              ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          )
        }
        title={collapsed ? item.label : undefined}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <aside
      className={cn(
        'h-screen bg-gray-900 text-gray-300 flex flex-col flex-shrink-0',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Шапка */}
      <div className={cn(
        'flex items-center border-b border-gray-800 h-16 flex-shrink-0',
        collapsed ? 'justify-center px-2' : 'justify-between px-4'
      )}>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white">АГРОРЕЗЕРВ</div>
            <div className="text-xs text-primary-400">Панель управления</div>
          </div>
        )}
        <button
          onClick={handleToggle}
          className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0"
          aria-label={collapsed ? 'Развернуть' : 'Свернуть'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Навигация с прокруткой */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {/* Основные пункты */}
        {navItems.map(renderNavItem)}

        {/* Разделитель секции «РАСШИРЕННЫЕ» */}
        <div className={cn(
          'pt-3 pb-1',
          collapsed ? 'px-1' : 'px-1'
        )}>
          {!collapsed ? (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1.5 py-1 border-t border-gray-800">
              Расширенные
            </div>
          ) : (
            // В свёрнутом состоянии — просто горизонтальная линия
            <div className="border-t border-gray-800 mx-1" />
          )}
        </div>

        {/* Расширенные пункты (v2) */}
        {extendedNavItems.map(renderNavItem)}
      </nav>

      {/* Нижняя часть */}
      <div className="border-t border-gray-800 p-2 space-y-0.5">
        {/* Ссылка на сайт */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors',
          )}
          title={collapsed ? 'Сайт' : undefined}
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Открыть сайт</span>}
        </a>

        {/* Профиль */}
        {!collapsed && (
          <div className="px-2.5 py-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
              {user?.full_name}
            </div>
            <div className="text-xs text-gray-600 truncate">{user?.email}</div>
          </div>
        )}

        {/* Выход */}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-2.5 py-2 rounded-lg',
            'text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors'
          )}
          title={collapsed ? 'Выйти' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Выйти</span>}
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
