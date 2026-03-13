// Страница для школ и госучреждений — конструктор меню, преимущества, CTA
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  CheckCircle,
  FileText,
  Phone,
  ChevronRight,
  Award,
  Calculator,
  ShoppingCart,
  Flame,
  Leaf,
  Apple,
  Truck,
  Star,
  AlertCircle,
  Plus,
  Minus,
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { getSchoolDishes, orderFromMenu, createMenu } from '@/api/schools'
import type { Dish } from '@/types'
import { useCartStore } from '@/stores/cartStore'

const advantages = [
  { icon: FileText, text: 'Прямые договоры до 600 000 ₽ без конкурентных процедур по 44-ФЗ' },
  { icon: FileText, text: 'Полный пакет закрывающих документов: ТОРГ-12, УПД, счёт-фактура' },
  { icon: Award, text: 'Декларации соответствия ТР ТС и сертификаты качества на каждый товар' },
  { icon: Star, text: 'Ветеринарные справки и удостоверения качества и безопасности' },
  { icon: Calculator, text: 'Цены на 20–35% ниже среднерыночных — экономия бюджета' },
  { icon: Truck, text: 'Бесплатная доставка в утреннее время до начала учебного дня' },
  { icon: Leaf, text: 'Стабильные поставки по графику, под учебный год' },
  { icon: Apple, text: 'Электронный документооборот, ЭЦП для электронных торговых площадок' },
]

const documents = [
  { icon: '📄', name: 'ТОРГ-12', desc: 'Товарная накладная' },
  { icon: '💳', name: 'Счёт-фактура', desc: 'Для НДС-плательщиков' },
  { icon: '📋', name: 'УПД', desc: 'Универсальный передаточный документ' },
  { icon: '🏆', name: 'Декларация ТР ТС', desc: 'Соответствие техрегламентам' },
  { icon: '🏅', name: 'Сертификаты', desc: 'Качество и безопасность' },
  { icon: '🐄', name: 'Ветсправки', desc: 'Ветеринарные документы' },
]

// Типы приёма пищи
const MEAL_TYPES = [
  { value: 'breakfast', label: 'Завтрак' },
  { value: 'lunch', label: 'Обед' },
  { value: 'dinner', label: 'Ужин' },
  { value: 'snack', label: 'Полдник' },
]

// Категории блюд
const DISH_CATEGORIES = ['Все', 'Первое блюдо', 'Второе блюдо', 'Гарнир', 'Салат', 'Выпечка', 'Десерт', 'Напиток']

// ============================================================
// Конструктор меню (для авторизованных B2B/school)
// ============================================================
const MenuConstructor: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('Все')
  const [selectedDishes, setSelectedDishes] = useState<
    Record<string, { dish: Dish; portions: number; meal_type: string }>
  >({})
  const [menuWeekStart, setMenuWeekStart] = useState('')
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null)

  const { data: dishes, isLoading } = useQuery({
    queryKey: ['schoolDishes', categoryFilter],
    queryFn: () => getSchoolDishes({ category: categoryFilter !== 'Все' ? categoryFilter : undefined }),
  })

  // Добавить/убрать блюдо
  const toggleDish = (dish: Dish) => {
    const key = dish._id
    if (selectedDishes[key]) {
      const updated = { ...selectedDishes }
      delete updated[key]
      setSelectedDishes(updated)
    } else {
      setSelectedDishes({
        ...selectedDishes,
        [key]: { dish, portions: 100, meal_type: 'lunch' },
      })
    }
  }

  const updatePortions = (dishId: string, delta: number) => {
    if (!selectedDishes[dishId]) return
    const portions = Math.max(1, selectedDishes[dishId].portions + delta)
    setSelectedDishes({
      ...selectedDishes,
      [dishId]: { ...selectedDishes[dishId], portions },
    })
  }

  const updateMealType = (dishId: string, meal_type: string) => {
    if (!selectedDishes[dishId]) return
    setSelectedDishes({
      ...selectedDishes,
      [dishId]: { ...selectedDishes[dishId], meal_type },
    })
  }

  // Суммарное КБЖУ
  const totals = useMemo(() => {
    return Object.values(selectedDishes).reduce(
      (acc, { dish, portions }) => ({
        calories: acc.calories + dish.calories * portions,
        protein: acc.protein + dish.protein * portions,
        fat: acc.fat + dish.fat * portions,
        carbs: acc.carbs + dish.carbs * portions,
        portions: acc.portions + portions,
      }),
      { calories: 0, protein: 0, fat: 0, carbs: 0, portions: 0 }
    )
  }, [selectedDishes])

  const selectedCount = Object.keys(selectedDishes).length

  // Создать меню и заказ
  const createMenuMut = useMutation({
    mutationFn: async () => {
      if (!menuWeekStart) throw new Error('Укажите дату начала недели')
      const weekEnd = new Date(menuWeekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      const weekEndStr = weekEnd.toISOString().split('T')[0]

      // Группируем блюда по дням (на неделю — один день)
      const menu = await createMenu({
        week_start: menuWeekStart,
        week_end: weekEndStr,
        days: [
          {
            date: menuWeekStart,
            items: Object.values(selectedDishes).map(({ dish, portions, meal_type }) => ({
              dish_id: dish._id,
              portions,
              meal_type,
            })),
          },
        ],
      })
      return orderFromMenu(menu._id)
    },
    onSuccess: (data) => {
      setOrderSuccess(data.order_number)
      setSelectedDishes({})
    },
  })

  return (
    <div className="space-y-6">
      {/* Успешный заказ */}
      {orderSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-green-900">Заказ {orderSuccess} успешно создан!</div>
            <Link to="/account/orders" className="text-sm text-green-700 underline">
              Перейти к заказам
            </Link>
          </div>
        </div>
      )}

      {/* Фильтр по категориям */}
      <div className="flex flex-wrap gap-2">
        {DISH_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              categoryFilter === cat
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 text-gray-600 hover:border-gray-400 bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список блюд */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Выберите блюда</h3>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400 text-sm">Загружаем справочник...</div>
          ) : !dishes?.length ? (
            <div className="text-center py-8 text-gray-400 text-sm">Блюда не найдены</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dishes.map((dish: Dish) => {
                const isSelected = !!selectedDishes[dish._id]
                return (
                  <button
                    key={dish._id}
                    onClick={() => toggleDish(dish)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-gray-900 text-sm">{dish.name}</div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                          isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L5 8 2 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{dish.category} · {dish.portion_weight_g}г</div>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                        {dish.calories} ккал
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        Б {dish.protein}г
                      </span>
                      {dish.sanpin_compliant && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          ✓ СанПиН
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Корзина конструктора */}
        <div className="space-y-4">
          {/* Выбранные блюда */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Выбрано ({selectedCount})
            </h3>

            {selectedCount === 0 ? (
              <p className="text-xs text-gray-400 py-2">Выберите блюда из списка</p>
            ) : (
              <div className="space-y-3">
                {Object.values(selectedDishes).map(({ dish, portions, meal_type }) => (
                  <div key={dish._id} className="space-y-2">
                    <div className="text-sm font-medium text-gray-800 truncate">{dish.name}</div>
                    <div className="flex items-center gap-2">
                      <select
                        value={meal_type}
                        onChange={(e) => updateMealType(dish._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none"
                      >
                        {MEAL_TYPES.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          onClick={() => updatePortions(dish._id, -10)}
                          className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-10 text-center">{portions} пор.</span>
                        <button
                          onClick={() => updatePortions(dish._id, 10)}
                          className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* КБЖУ итого */}
          {selectedCount > 0 && (
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                КБЖУ итого ({totals.portions} порций)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded-lg p-2">
                  <div className="text-gray-400">Ккал</div>
                  <div className="font-bold text-gray-900">{totals.calories.toFixed(0)}</div>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <div className="text-gray-400">Белки, г</div>
                  <div className="font-bold text-gray-900">{totals.protein.toFixed(1)}</div>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <div className="text-gray-400">Жиры, г</div>
                  <div className="font-bold text-gray-900">{totals.fat.toFixed(1)}</div>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <div className="text-gray-400">Углеводы, г</div>
                  <div className="font-bold text-gray-900">{totals.carbs.toFixed(1)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Дата и кнопка заказа */}
          {selectedCount > 0 && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата начала недели
                </label>
                <input
                  type="date"
                  value={menuWeekStart}
                  onChange={(e) => setMenuWeekStart(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => createMenuMut.mutate()}
                disabled={createMenuMut.isPending || !menuWeekStart}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                <ShoppingCart className="w-5 h-5" />
                {createMenuMut.isPending ? 'Создаём заказ...' : 'Сформировать заказ'}
              </button>
              {createMenuMut.isError && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Ошибка при создании заказа
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Главная страница SchoolsPage
// ============================================================
export const SchoolsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore()

  // Показываем конструктор только для авторизованных B2B клиентов
  const canUseConstructor =
    isAuthenticated &&
    user &&
    (['b2b', 'ip', 'ooo'].includes(user.client_type) || (user as { school?: boolean }).school)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-blue-100 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              <Award className="w-4 h-4" />
              Поставщик для школьного питания
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Свежие продукты для школьного питания
              <span className="block text-blue-200 mt-1">по 44-ФЗ</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Прямые договоры до 600 000 ₽ без конкурентных процедур. Конструктор меню с расчётом
              КБЖУ. Полный пакет документов — от накладной до ветсправки.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {isAuthenticated ? (
                <a
                  href="#menu-constructor"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Конструктор меню
                </a>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Зарегистрироваться
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
              <a
                href="tel:+79000000000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Контент */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Преимущества */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Почему выбирают нас</h2>
          <p className="text-gray-500 text-sm mb-6">
            Работаем с учреждениями питания с 2018 года
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{adv.text}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Документы */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Полный комплект документов</h2>
          <p className="text-gray-500 text-sm mb-6">
            Всё необходимое для бухгалтерии, ФСНС и проверок
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200"
              >
                <div className="text-2xl">{doc.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500">{doc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Конструктор меню */}
        <section id="menu-constructor">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Конструктор меню</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Составьте меню, рассчитайте КБЖУ и сформируйте заказ одним нажатием
          </p>

          {canUseConstructor ? (
            <MenuConstructor />
          ) : isAuthenticated ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Конструктор доступен для организаций
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Зарегистрируйтесь как ИП или ООО для доступа к конструктору меню и инструментам
                школьного питания.
              </p>
              <Link
                to="/account/profile"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Обновить профиль
              </Link>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 text-center">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Зарегистрируйтесь для доступа к конструктору меню
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                Авторизованные B2B-клиенты получают доступ к конструктору меню с расчётом КБЖУ,
                автоматическим формированием заказа и отчётностью.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Зарегистрироваться
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Уже есть аккаунт? Войти
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gray-900 rounded-2xl p-10 text-white text-center">
            <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Готовы к сотрудничеству?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Свяжитесь с нами для обсуждения условий поставок и подписания договора
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+79000000000"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Позвонить
              </a>
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <FileText className="w-5 h-5" />
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SchoolsPage
