// Страница быстрого розничного заказа без регистрации (UC-10)
// Минимальный заказ 1000₽, предоплата переводом на карту
import React, { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, format } from 'date-fns'
import { getProducts, getCategories } from '@/api/catalog'
import { createRetailOrder } from '@/api/orders'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { formatPrice, formatQuantity } from '@/utils/format'
import { showToast } from '@/components/ui/Toast'
import {
  ShoppingBag,
  MapPin,
  Phone,
  User,
  Clock,
  CreditCard,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Copy,
  MessageSquare,
} from 'lucide-react'
import type { Product, Category } from '@/types'

// --- Константы ---
const MIN_ORDER_TOTAL = 1000
const DELIVERY_SLOTS = [
  { value: '08:00-11:00', label: '08:00 – 11:00 (утро)' },
  { value: '11:00-14:00', label: '11:00 – 14:00 (полдень)' },
  { value: '14:00-17:00', label: '14:00 – 17:00 (вечер)' },
]

// Реквизиты для оплаты (Т-Банк)
const PAYMENT_DETAILS = {
  card: '2200 7007 5544 1234',
  recipient: 'Наимов Х.В.',
  bank: 'Т-Банк',
  sbp_phone: '+7 (XXX) XXX-XX-XX',
}

// Минимальная дата — завтра
const tomorrow = addDays(new Date(), 1)
const maxDate = addDays(new Date(), 7)
const minDateStr = format(tomorrow, 'yyyy-MM-dd')
const maxDateStr = format(maxDate, 'yyyy-MM-dd')

// --- Типы ---
interface CartItem {
  product: Product
  qty: number
}

// --- Zod-схема ---
const retailSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z
    .string()
    .min(10, 'Введите корректный номер телефона')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Некорректный формат телефона'),
  delivery_address: z.string().min(5, 'Укажите адрес (минимум 5 символов)'),
  delivery_date: z.string().min(1, 'Выберите дату'),
  delivery_slot: z.string().min(1, 'Выберите время'),
  note: z.string().optional(),
})

type RetailFormData = z.infer<typeof retailSchema>

// --- Компоненты ---

/** Карточка товара в каталоге */
const ProductCard: React.FC<{
  product: Product
  cartQty: number
  onAdd: () => void
  onRemove: () => void
  onSetQty: (qty: number) => void
}> = ({ product, cartQty, onAdd, onRemove, onSetQty }) => {
  const inStock = product.stock_quantity > 0 && product.is_active

  return (
    <div
      className={`bg-white rounded-xl border p-4 transition-shadow ${
        cartQty > 0 ? 'border-green-300 shadow-sm' : 'border-gray-200'
      } ${!inStock ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-snug truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {product.country_of_origin || 'Узбекистан'}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-bold text-green-700 text-sm">
            {formatPrice(product.price_retail)}
          </div>
          <div className="text-xs text-gray-400">за {product.unit}</div>
        </div>
      </div>

      {inStock ? (
        <div className="flex items-center gap-2 mt-3">
          {cartQty > 0 ? (
            <>
              <button
                type="button"
                onClick={onRemove}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                {cartQty <= product.order_step ? (
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Minus className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="number"
                value={cartQty}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  if (!isNaN(val) && val > 0) onSetQty(val)
                  else if (e.target.value === '' || val === 0) onSetQty(0)
                }}
                min={0}
                step={product.order_step}
                className="w-16 text-center text-sm font-semibold border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="button"
                onClick={onAdd}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium text-green-700 ml-auto">
                {formatPrice(cartQty * product.price_retail)}
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg py-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Добавить
            </button>
          )}
        </div>
      ) : (
        <div className="text-xs text-red-400 mt-3 text-center py-2">Нет в наличии</div>
      )}
    </div>
  )
}

// --- Основной компонент ---
export const RetailCheckoutPage: React.FC = () => {
  // Корзина
  const [cart, setCart] = useState<CartItem[]>([])
  // Категория-фильтр
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  // Поиск
  const [search, setSearch] = useState('')
  // Шаг: 'catalog' | 'form' | 'payment' | 'done'
  const [step, setStep] = useState<'catalog' | 'form' | 'payment' | 'done'>('catalog')
  // Данные созданного заказа
  const [createdOrder, setCreatedOrder] = useState<{
    order_number: string
    total: number
  } | null>(null)
  // Скопировано
  const [copied, setCopied] = useState(false)

  // Загрузка каталога
  const { data: productsData } = useQuery({
    queryKey: ['retailProducts'],
    queryFn: () => getProducts({ per_page: 200 }),
  })

  const { data: categories } = useQuery({
    queryKey: ['retailCategories'],
    queryFn: () => getCategories(),
  })

  const products = productsData?.items || []

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let result = products.filter((p: Product) => p.is_active)
    if (selectedCategory !== 'all') {
      result = result.filter((p: Product) => p.category_id === selectedCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p: Product) => p.name.toLowerCase().includes(q))
    }
    return result
  }, [products, selectedCategory, search])

  // Итого корзины
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty * item.product.price_retail, 0),
    [cart]
  )
  const cartCount = cart.length

  // Форма
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RetailFormData>({
    resolver: zodResolver(retailSchema),
    defaultValues: {
      delivery_slot: '08:00-11:00',
    },
  })

  // Мутация: создание заказа
  const { mutate: submitOrder, isPending: isSubmitting } = useMutation({
    mutationFn: (data: RetailFormData) =>
      createRetailOrder({
        name: data.name,
        phone: data.phone,
        items: cart.map((c) => ({
          product_id: c.product.id,
          qty: c.qty,
        })),
        delivery_date: data.delivery_date,
        delivery_slot: data.delivery_slot,
        delivery_address: data.delivery_address,
        note: data.note || undefined,
      }),
    onSuccess: (order) => {
      setCreatedOrder({
        order_number: order.order_number,
        total: order.total,
      })
      setStep('payment')
      showToast.success('Заказ оформлен! Переведите оплату.')
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { detail?: string } } }
      showToast.error(error?.response?.data?.detail || 'Ошибка при оформлении заказа')
    },
  })

  // Функции корзины
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id)
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id
            ? { ...c, qty: Math.round((c.qty + product.order_step) * 100) / 100 }
            : c
        )
      }
      return [...prev, { product, qty: product.order_step || 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === productId)
      if (!existing) return prev
      const step = existing.product.order_step || 1
      const newQty = Math.round((existing.qty - step) * 100) / 100
      if (newQty <= 0) return prev.filter((c) => c.product.id !== productId)
      return prev.map((c) => (c.product.id === productId ? { ...c, qty: newQty } : c))
    })
  }

  const setQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((c) => c.product.id !== productId))
    } else {
      setCart((prev) =>
        prev.map((c) =>
          c.product.id === productId ? { ...c, qty: Math.round(qty * 100) / 100 } : c
        )
      )
    }
  }

  const getCartQty = (productId: string): number => {
    return cart.find((c) => c.product.id === productId)?.qty || 0
  }

  const onSubmit = (data: RetailFormData) => {
    if (cartTotal < MIN_ORDER_TOTAL) {
      showToast.error(`Минимальная сумма заказа: ${formatPrice(MIN_ORDER_TOTAL)}`)
      return
    }
    submitOrder(data)
  }

  const copyCard = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_DETAILS.card.replace(/\s/g, ''))
      setCopied(true)
      showToast.success('Номер карты скопирован')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast.error('Не удалось скопировать')
    }
  }

  // ============================================================
  // ШАГ 1: Каталог
  // ============================================================
  if (step === 'catalog') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Шапка */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Агрорезерв</h1>
                <p className="text-xs text-gray-500">Быстрый заказ с доставкой</p>
              </div>
              <a
                href="tel:+7XXXXXXXXXX"
                className="text-sm text-green-700 font-medium hover:underline"
              >
                Позвонить
              </a>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-4 pb-32">
          {/* Поиск */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Поиск товара..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
            />
          </div>

          {/* Фильтр по категориям */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Все
            </button>
            {categories?.map((cat: Category) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={getCartQty(product.id)}
                onAdd={() => addToCart(product)}
                onRemove={() => removeFromCart(product.id)}
                onSetQty={(qty) => setQty(product.id, qty)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Товары не найдены
            </div>
          )}
        </div>

        {/* Плавающая корзина */}
        {cartCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="max-w-5xl mx-auto px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  if (cartTotal < MIN_ORDER_TOTAL) {
                    showToast.error(
                      `Минимальная сумма заказа: ${formatPrice(MIN_ORDER_TOTAL)}. Сейчас: ${formatPrice(cartTotal)}`
                    )
                    return
                  }
                  setStep('form')
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  Оформить · {cartCount} {cartCount === 1 ? 'товар' : 'товаров'}
                </span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-lg text-sm">
                  {formatPrice(cartTotal)}
                </span>
              </button>
              {cartTotal < MIN_ORDER_TOTAL && (
                <p className="text-xs text-center text-orange-600 mt-1.5">
                  Минимальный заказ {formatPrice(MIN_ORDER_TOTAL)} (ещё{' '}
                  {formatPrice(MIN_ORDER_TOTAL - cartTotal)})
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ============================================================
  // ШАГ 2: Форма контактов и доставки
  // ============================================================
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep('catalog')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Назад
            </button>
            <h1 className="text-lg font-bold text-gray-900">Оформление</h1>
          </div>
        </header>

        <div className="max-w-lg mx-auto px-4 py-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Контактные данные */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Контактные данные</h2>
              </div>
              <div className="space-y-3">
                <Input
                  label="Имя"
                  placeholder="Как к вам обращаться"
                  error={errors.name?.message}
                  required
                  {...register('name')}
                />
                <Input
                  label="Телефон"
                  placeholder="+7 (XXX) XXX-XX-XX"
                  type="tel"
                  leftIcon={<Phone className="w-4 h-4" />}
                  error={errors.phone?.message}
                  required
                  {...register('phone')}
                />
              </div>
            </div>

            {/* Доставка */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Доставка</h2>
              </div>
              <div className="space-y-3">
                <Input
                  label="Адрес доставки"
                  placeholder="г. Тобольск, ул. Ленина, д. 1, кв. 5"
                  leftIcon={<MapPin className="w-4 h-4" />}
                  error={errors.delivery_address?.message}
                  required
                  {...register('delivery_address')}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Дата доставки"
                    type="date"
                    min={minDateStr}
                    max={maxDateStr}
                    error={errors.delivery_date?.message}
                    required
                    {...register('delivery_date')}
                  />
                  <Select
                    label="Время"
                    options={DELIVERY_SLOTS}
                    placeholder="Слот"
                    error={errors.delivery_slot?.message}
                    required
                    {...register('delivery_slot')}
                  />
                </div>
              </div>
            </div>

            {/* Комментарий */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-gray-900">Комментарий</h2>
              </div>
              <textarea
                {...register('note')}
                rows={2}
                placeholder="Домофон, подъезд, пожелания..."
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
              />
            </div>

            {/* Состав заказа */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Ваш заказ</h2>
              <div className="space-y-2 mb-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="text-gray-700 truncate mr-2">
                      {item.product.name}
                      <span className="text-gray-400 ml-1">
                        {formatQuantity(item.qty, item.product.unit)} ×{' '}
                        {formatPrice(item.product.price_retail)}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 flex-shrink-0">
                      {formatPrice(item.qty * item.product.price_retail)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Итого</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Бесплатная доставка по Тобольску</p>
            </div>

            {/* Оплата */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-green-800">Оплата</h2>
              </div>
              <p className="text-sm text-green-700">
                Предоплата переводом на карту. Реквизиты будут показаны после оформления.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={isSubmitting}
            >
              Оформить заказ
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // ============================================================
  // ШАГ 3: Реквизиты для оплаты
  // ============================================================
  if (step === 'payment' && createdOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-5">
          {/* Успех */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-gray-900 mb-1">Заказ оформлен</h1>
            <p className="text-2xl font-bold text-green-700">{createdOrder.order_number}</p>
            <p className="text-sm text-gray-500 mt-2">
              Сумма к оплате: <span className="font-bold text-gray-900">{formatPrice(createdOrder.total)}</span>
            </p>
          </div>

          {/* Реквизиты */}
          <div className="bg-white rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold text-gray-900">Переведите на карту</h2>
            </div>

            <div className="space-y-4">
              {/* Номер карты */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">
                  Номер карты ({PAYMENT_DETAILS.bank})
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 font-mono text-lg font-bold text-gray-900 tracking-wider">
                    {PAYMENT_DETAILS.card}
                  </div>
                  <button
                    type="button"
                    onClick={copyCard}
                    className="p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
                    title="Скопировать"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Получатель */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">
                  Получатель
                </label>
                <p className="mt-1 text-gray-900 font-medium">{PAYMENT_DETAILS.recipient}</p>
              </div>

              {/* Сумма */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">
                  Сумма перевода
                </label>
                <p className="mt-1 text-2xl font-bold text-green-700">
                  {formatPrice(createdOrder.total)}
                </p>
              </div>

              {/* Комментарий к переводу */}
              <div className="bg-yellow-50 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  В комментарии к переводу укажите:{' '}
                  <span className="font-bold">{createdOrder.order_number}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Дальнейшие шаги */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Что дальше?</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Переведите указанную сумму на карту
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Мы подтвердим получение оплаты
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                Доставим заказ в выбранное время
              </li>
            </ol>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="text-sm text-green-700 hover:underline font-medium"
            >
              Вернуться на главную
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Фолбэк
  return null
}

export default RetailCheckoutPage
