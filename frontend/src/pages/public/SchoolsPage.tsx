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
const DISH_CATEGORIES = [
  'Все',
  'Первое блюдо',
  'Второе блюдо',
  'Гарнир',
  'Салат',
  'Выпечка',
  'Десерт',
  'Напиток',
]

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
    queryFn: () =>
      getSchoolDishes({ category: categoryFilter !== 'Все' ? categoryFilter : undefined }),
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
      { calories: 0, protein: 0, fat: 0, carbs: 0, portions: 0 },
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
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
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
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              categoryFilter === cat
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Список блюд */}
        <div className="lg:col-span-2">
          <h3 className="mb-3 text-base font-semibold text-gray-900">Выберите блюда</h3>
          {isLoading ? (
            <div className="py-8 text-center text-sm text-gray-400">Загружаем справочник...</div>
          ) : !dishes?.length ? (
            <div className="py-8 text-center text-sm text-gray-400">Блюда не найдены</div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dishes.map((dish: Dish) => {
                const isSelected = !!selectedDishes[dish._id]
                return (
                  <button
                    key={dish._id}
                    onClick={() => toggleDish(dish)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                      <div
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 12 12"
                          >
                            <path
                              d="M10 3L5 8 2 5"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {dish.category} · {dish.portion_weight_g}г
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
                        {dish.calories} ккал
                      </span>
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700">
                        Б {dish.protein}г
                      </span>
                      {dish.sanpin_compliant && (
                        <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
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
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900">
              <ShoppingCart className="h-4 w-4" />
              Выбрано ({selectedCount})
            </h3>

            {selectedCount === 0 ? (
              <p className="py-2 text-xs text-gray-400">Выберите блюда из списка</p>
            ) : (
              <div className="space-y-3">
                {Object.values(selectedDishes).map(({ dish, portions, meal_type }) => (
                  <div key={dish._id} className="space-y-2">
                    <div className="truncate text-sm font-medium text-gray-800">{dish.name}</div>
                    <div className="flex items-center gap-2">
                      <select
                        value={meal_type}
                        onChange={(e) => updateMealType(dish._id, e.target.value)}
                        className="rounded border border-gray-200 px-2 py-1 text-xs focus:outline-none"
                      >
                        {MEAL_TYPES.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() => updatePortions(dish._id, -10)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center text-xs font-semibold">
                          {portions} пор.
                        </span>
                        <button
                          onClick={() => updatePortions(dish._id, 10)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
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
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
                <Flame className="h-4 w-4" />
                КБЖУ итого ({totals.portions} порций)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white p-2">
                  <div className="text-gray-400">Ккал</div>
                  <div className="font-bold text-gray-900">{totals.calories.toFixed(0)}</div>
                </div>
                <div className="rounded-lg bg-white p-2">
                  <div className="text-gray-400">Белки, г</div>
                  <div className="font-bold text-gray-900">{totals.protein.toFixed(1)}</div>
                </div>
                <div className="rounded-lg bg-white p-2">
                  <div className="text-gray-400">Жиры, г</div>
                  <div className="font-bold text-gray-900">{totals.fat.toFixed(1)}</div>
                </div>
                <div className="rounded-lg bg-white p-2">
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
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Дата начала недели
                </label>
                <input
                  type="date"
                  value={menuWeekStart}
                  onChange={(e) => setMenuWeekStart(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => createMenuMut.mutate()}
                disabled={createMenuMut.isPending || !menuWeekStart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                <ShoppingCart className="h-5 w-5" />
                {createMenuMut.isPending ? 'Создаём заказ...' : 'Сформировать заказ'}
              </button>
              {createMenuMut.isError && (
                <p className="flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
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
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-blue-100">
              <Award className="h-4 w-4" />
              Поставщик для школьного питания
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
              Свежие продукты для школьного питания
              <span className="mt-1 block text-blue-200">по 44-ФЗ</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">
              Прямые договоры до 600 000 ₽ без конкурентных процедур. Конструктор меню с расчётом
              КБЖУ. Полный пакет документов — от накладной до ветсправки.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {isAuthenticated ? (
                <a
                  href="#menu-constructor"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  <Calculator className="h-5 w-5" />
                  Конструктор меню
                </a>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Зарегистрироваться
                  <ChevronRight className="h-5 w-5" />
                </Link>
              )}
              <a
                href="tel:+79000000000"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <Phone className="h-5 w-5" />
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Контент */}
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        {/* Преимущества */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Почему выбирают нас</h2>
          <p className="mb-6 text-sm text-gray-500">Работаем с учреждениями питания с 2018 года</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm leading-relaxed text-gray-700">{adv.text}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Документы */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Полный комплект документов</h2>
          <p className="mb-6 text-sm text-gray-500">
            Всё необходимое для бухгалтерии, ФСНС и проверок
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
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
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Конструктор меню</h2>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
              Beta
            </span>
          </div>
          <p className="mb-6 text-sm text-gray-500">
            Составьте меню, рассчитайте КБЖУ и сформируйте заказ одним нажатием
          </p>

          {canUseConstructor ? (
            <MenuConstructor />
          ) : isAuthenticated ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Конструктор доступен для организаций
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Зарегистрируйтесь как ИП или ООО для доступа к конструктору меню и инструментам
                школьного питания.
              </p>
              <Link
                to="/account/profile"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-amber-600"
              >
                Обновить профиль
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
              <Calculator className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Зарегистрируйтесь для доступа к конструктору меню
              </h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-gray-600">
                Авторизованные B2B-клиенты получают доступ к конструктору меню с расчётом КБЖУ,
                автоматическим формированием заказа и отчётностью.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Зарегистрироваться
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Уже есть аккаунт? Войти
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl bg-gray-900 p-10 text-center text-white">
            <Award className="mx-auto mb-4 h-12 w-12 text-blue-400" />
            <h2 className="mb-2 text-2xl font-bold">Готовы к сотрудничеству?</h2>
            <p className="mx-auto mb-8 max-w-md text-gray-400">
              Свяжитесь с нами для обсуждения условий поставок и подписания договора
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:+79000000000"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Phone className="h-5 w-5" />
                Позвонить
              </a>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <FileText className="h-5 w-5" />
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
