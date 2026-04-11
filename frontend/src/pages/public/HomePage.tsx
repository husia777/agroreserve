// Главная страница — лендинг
import React from 'react'
import SEOHead, { organizationSchema, websiteSchema } from '@/components/shared/SEOHead'
import { Link } from 'react-router-dom'
import {
  TrendingDown,
  Truck,
  FileCheck,
  Leaf,
  ChevronRight,
  Phone,
  Send,
  MapPin,
  Clock,
  ShoppingBag,
  CheckCircle,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/catalog'
import { useAuthStore } from '@/stores/authStore'

// Иконки категорий
const categoryIcons: Record<string, string> = {
  ovoshchi: '🥕',
  frukty: '🍎',
  sukhofruktyi: '🍇',
  orekhyi: '🥜',
  spetsii: '🌶️',
  myod: '🍯',
  masla: '🫒',
}

// Преимущества
const advantages = [
  {
    icon: TrendingDown,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    title: 'Цены на 20–35% ниже',
    description: 'Прямые поставки, без посредников. Семейные связи с фермерами.',
  },
  {
    icon: Truck,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    title: 'Бесплатная доставка',
    description: 'Развозим по Тобольску и пригороду на собственной газели. Без доплат.',
  },
  {
    icon: FileCheck,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    title: 'Документы для 44-ФЗ',
    description: 'Полный пакет: ТОРГ-12, счёт-фактура, сертификаты ТР ТС, декларации соответствия.',
  },
  {
    icon: Leaf,
    iconColor: 'text-primary-600',
    bgColor: 'bg-primary-50',
    title: 'Свежесть гарантируем',
    description: 'Поставки каждые 2 недели. Хранение в 3-зонном складе: +15°C, +2–6°C, сухая зона.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Выберите товары',
    description: 'Просмотрите каталог, добавьте нужные товары в корзину',
  },
  {
    number: '02',
    title: 'Оформите заказ',
    description: 'Укажите адрес, выберите дату и время доставки',
  },
  {
    number: '03',
    title: 'Получите доставку',
    description: 'Доставим точно в срок, с документами и сертификатами',
  },
]

const clients = [
  {
    icon: '🏫',
    title: 'Школы',
    description: 'Прямые контракты до 600 тыс. ₽ по 44-ФЗ',
  },
  {
    icon: '🍽️',
    title: 'Кафе и рестораны',
    description: 'Свежие овощи и зелень для кухни',
  },
  {
    icon: '🏢',
    title: 'Столовые',
    description: 'Регулярные поставки по расписанию',
  },
  {
    icon: '🏪',
    title: 'Магазины',
    description: 'Широкий ассортимент по оптовым ценам',
  },
]

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <>
      <SEOHead
        title="Свежие овощи и фрукты оптом из Узбекистана"
        description="Агрорезерв — прямые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка. Документы для 44-ФЗ."
        canonical="/"
        schema={{ ...organizationSchema, ...websiteSchema }}
      />
      <div>
        {/* Hero секция */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white">
          {/* Декоративные элементы */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-white/5" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-2xl">
              {/* Бейдж */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
                Прямые поставки
              </div>

              {/* Заголовок */}
              <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Свежие овощи и фрукты
                <span className="mt-1 block text-green-200">оптом в Тобольске</span>
              </h1>

              {/* Описание */}
              <p className="mb-8 text-lg leading-relaxed text-white/80">
                Прямые поставки от фермеров. Цены на{' '}
                <span className="font-semibold text-white">20–35% ниже рынка</span>. Полный пакет
                документов для госзакупок по 44-ФЗ.
              </p>

              {/* CTA кнопки */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to={isAuthenticated ? '/catalog' : '/quick-order'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 shadow-lg shadow-primary-900/20 transition-colors hover:bg-gray-50"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Перейти в каталог
                </Link>
                <Link
                  to="/schools"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <FileCheck className="h-5 w-5" />
                  Для школ (44-ФЗ)
                </Link>
              </div>

              {/* Мини-статистика */}
              <div className="mt-8 flex items-center gap-6 border-t border-white/20 pt-6">
                <div>
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-xs text-white/70">наименований</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <div className="text-2xl font-bold">35%</div>
                  <div className="text-xs text-white/70">ниже рынка</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <div className="text-2xl font-bold">0 ₽</div>
                  <div className="text-xs text-white/70">доставка</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Почему выбирают Агрорезерв
              </h2>
              <p className="mt-2 text-gray-500">Мы не просто поставщик — мы надёжный партнёр</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv, i) => {
                const Icon = adv.icon
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-sm"
                  >
                    <div
                      className={`h-12 w-12 ${adv.bgColor} mb-4 flex items-center justify-center rounded-xl`}
                    >
                      <Icon className={`h-6 w-6 ${adv.iconColor}`} />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{adv.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{adv.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Категории */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Каталог товаров</h2>
                <p className="mt-1 text-gray-500">Свежие продукты прямо с грядки</p>
              </div>
              <Link
                to={isAuthenticated ? '/catalog' : '/quick-order'}
                className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Весь каталог
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {(categories || []).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog/${cat.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center transition-all hover:border-primary-200 hover:bg-primary-50/30 hover:shadow-sm"
                >
                  <div className="mb-3 text-4xl transition-transform group-hover:scale-110">
                    {categoryIcons[cat.slug] || '🌿'}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
                    {cat.name}
                  </div>
                  {cat.product_count > 0 && (
                    <div className="mt-0.5 text-xs text-gray-400">{cat.product_count} товаров</div>
                  )}
                </Link>
              ))}
              {/* Скелетоны если нет данных */}
              {!categories &&
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200" />
                ))}
            </div>
          </div>
        </section>

        {/* Как заказать */}
        <section className="bg-primary-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Как сделать заказ</h2>
              <p className="mt-2 text-gray-500">Просто, быстро, удобно</p>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  {/* Линия соединения */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-1/2 top-8 z-0 hidden h-0.5 w-full bg-primary-200 md:block" />
                  )}
                  <div className="relative z-10">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-200">
                      {step.number}
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-200 transition-colors hover:bg-primary-700"
              >
                Зарегистрироваться и начать
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Для кого */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Наши клиенты</h2>
              <p className="mt-2 text-gray-500">Работаем с B2B и B2C клиентами</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {clients.map((client, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-5 text-center transition-all hover:border-primary-200 hover:shadow-sm"
                >
                  <div className="mb-3 text-4xl">{client.icon}</div>
                  <div className="font-semibold text-gray-900">{client.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{client.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Блок для школ */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="max-w-lg">
                <div className="mb-2 text-sm font-medium text-blue-200">
                  🏫 Для учреждений бюджетной сферы
                </div>
                <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Работаем со школами и госучреждениями по 44-ФЗ
                </h2>
                <ul className="space-y-3 text-blue-100">
                  {[
                    'Прямые договоры до 600 000 ₽ без торгов',
                    'Полный пакет документов: ТОРГ-12, счёт-фактуры, УПД',
                    'Сертификаты ТР ТС, декларации соответствия, ветсправки',
                    'Калькулятор меню для школьного питания',
                    'ЭЦП, работаем через ЭТП и напрямую',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="/schools"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
                >
                  Подробнее для школ
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Свяжитесь с нами</h2>
              <p className="mt-2 text-gray-500">Ответим на все вопросы и оформим первый заказ</p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="tel:+79000000000"
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-primary-200 hover:shadow-sm"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div className="font-semibold text-gray-900">Телефон</div>
                <div className="mt-1 text-sm text-gray-500">+7 (900) 000-00-00</div>
              </a>
              <a
                href="https://t.me/agroreserve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-primary-200 hover:shadow-sm"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Send className="h-6 w-6 text-blue-500" />
                </div>
                <div className="font-semibold text-gray-900">Telegram</div>
                <div className="mt-1 text-sm text-gray-500">@agroreserve</div>
              </a>
              <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <div className="font-semibold text-gray-900">Адрес</div>
                <div className="mt-1 text-sm text-gray-500">г. Тобольск, Тюменская обл.</div>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-semibold text-gray-900">Время работы</div>
                <div className="mt-1 text-sm text-gray-500">Пн–Сб: 08:00–18:00</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
