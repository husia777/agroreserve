// Страница карточки товара
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  ImageOff,
  Award,
  Info,
  Calculator,
  FileDown,
  Bell,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { getProductBySlug, getProductCertificates, subscribeStockNotify } from '@/api/catalog'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { PageSpinner } from '@/components/ui/Spinner'
import StockBadge from '@/components/shared/StockBadge'
import QuantityInput from '@/components/shared/QuantityInput'
import { formatPrice, formatQuantity } from '@/utils/format'
import { showToast } from '@/components/ui/Toast'
import { cn } from '@/utils/cn'
import SEOHead, { productSchema } from '@/components/shared/SEOHead'

export const ProductPage: React.FC = () => {
  const { id: slug } = useParams<{ category: string; id: string }>()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [calcKg, setCalcKg] = useState(1)
  const [calcPcs, setCalcPcs] = useState(1)
  const [_, setCalcMode] = useState<'kg' | 'pcs'>('kg')

  // UC-01: Состояние подписки на уведомление о поступлении
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySubscribed, setNotifySubscribed] = useState(false)
  const [showNotifyForm, setShowNotifyForm] = useState(false)

  // UC-107: Калькулятор порций
  const [portionWeight, setPortionWeight] = useState(150)
  const [portionKg, setPortionKg] = useState(10)

  const { isAuthenticated, isApproved, user } = useAuthStore()

  const { addItem } = useCartStore()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  })

  // UC-23: Загрузка сертификатов товара
  const { data: certsData } = useQuery({
    queryKey: ['product-certs', product?.id],
    queryFn: () => getProductCertificates(product!.id),
    enabled: !!product && (product.certificate_ids?.length ?? 0) > 0,
  })

  // UC-01: Мутация подписки на уведомление о поступлении
  const notifyMutation = useMutation({
    mutationFn: (data: { productId: string; email: string }) =>
      subscribeStockNotify(data.productId, data.email),
    onSuccess: (data) => {
      if (data.subscribed) {
        setNotifySubscribed(true)
        showToast.success(data.message)
      } else {
        showToast.info(data.message)
      }
    },
    onError: () => {
      showToast.error('Не удалось подписаться. Попробуйте позже.')
    },
  })

  if (isLoading) return <PageSpinner />
  if (!product)
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-gray-500">Товар не найден</p>
        <Link to="/catalog" className="mt-4 inline-block text-primary-600 hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    )

  const showWholesale = isAuthenticated && isApproved
  const displayPrice = showWholesale ? product.price_wholesale : product.price_retail
  const isAvailable = product.is_available && product.stock_quantity > 0
  const hasImages = product.images && product.images.length > 0

  // Поштучный калькулятор (UC-24)
  const avgWeight = product.unit_weight || 0.15 // кг за штуку
  const calcKgFromPcs = +(calcPcs * avgWeight).toFixed(2)
  const calcSumKg = +(calcKg * displayPrice).toFixed(2)
  const calcSumPcs = +(calcKgFromPcs * displayPrice).toFixed(2)

  // UC-107: Калькулятор порций

  // UC-107: Калькулятор порций
  const portionCount = portionWeight > 0 ? Math.floor((portionKg * 1000) / portionWeight) : 0
  const portionCost = portionCount > 0 ? (portionKg * displayPrice) / portionCount : 0
  const portionTotal = portionKg * displayPrice

  const handleAddToCart = () => {
    addItem(product, quantity, showWholesale)
    showToast.success(
      `«${product.name}» добавлен в корзину (${formatQuantity(quantity, product.unit)})`,
    )
  }

  // UC-01: Обработчик подписки на уведомление
  const handleNotifySubmit = () => {
    const emailToUse = notifyEmail || (user?.email ?? '')
    if (!emailToUse) {
      showToast.error('Укажите email для уведомления')
      return
    }
    notifyMutation.mutate({ productId: product.id, email: emailToUse })
  }

  // UC-01: Быстрая подписка (авторизованный пользователь с email)
  const handleQuickNotify = () => {
    if (user?.email) {
      notifyMutation.mutate({ productId: product.id, email: user.email })
    } else {
      setShowNotifyForm(true)
    }
  }

  const breadcrumbs = [
    { label: 'Каталог', href: '/catalog' },
    ...(product.category
      ? [{ label: product.category.name, href: `/catalog/${product.category.slug}` }]
      : []),
    { label: product.name },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <SEOHead
        title={product.name}
        description={product.description || `${product.name} — купить оптом в Агрорезерв`}
        canonical={`/catalog/${product.category?.slug || '_'}/${product.slug}`}
        ogImage={product.images?.[0]}
        ogType="product"
        schema={productSchema({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price_retail,
          unit: product.unit,
          category_slug: product.category?.slug,
          image: product.images?.[0],
          stock_qty: product.stock_quantity,
        })}
      />

      {/* Хлебные крошки */}
      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Галерея */}
        <div>
          {/* Главное фото */}
          <div className="mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-50">
            {hasImages && !product.images[selectedImage] ? (
              <div className="flex h-full w-full items-center justify-center">
                <ImageOff className="h-16 w-16 text-gray-300" />
              </div>
            ) : hasImages ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageOff className="h-16 w-16 text-gray-300" />
              </div>
            )}
          </div>

          {/* Миниатюры */}
          {hasImages && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                    selectedImage === i ? 'border-primary-600' : 'border-transparent',
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div>
          {/* Название и статус */}
          <div className="mb-2 flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <StockBadge
              quantity={product.stock_quantity}
              minQuantity={product.min_stock_quantity}
              unit={product.unit}
              showQuantity
            />
          </div>

          {/* Страна */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Info className="h-4 w-4" />
            <span>
              Страна: <strong className="text-gray-700">{product.country_of_origin}</strong>
            </span>
          </div>

          {/* Цена */}
          <div className="mb-5 rounded-xl bg-gray-50 p-4">
            {showWholesale ? (
              <div>
                <div className="mb-1 text-xs font-semibold text-primary-600">
                  Оптовая цена (для вас)
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price_wholesale)}
                  <span className="ml-2 text-base font-normal text-gray-400">
                    / {product.unit === 'kg' ? 'кг' : 'шт'}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-400 line-through">
                  Розница: {formatPrice(product.price_retail)}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price_retail)}
                  <span className="ml-2 text-base font-normal text-gray-400">
                    / {product.unit === 'kg' ? 'кг' : 'шт'}
                  </span>
                </div>
                {isAuthenticated ? (
                  <div className="mt-1 text-sm text-primary-600">
                    Оптовая цена доступна после подтверждения аккаунта
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-primary-600">
                    <Link to="/login" className="underline hover:text-primary-700">
                      Войдите
                    </Link>{' '}
                    для получения оптовой цены
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Описание */}
          {product.description && (
            <p className="mb-5 text-sm leading-relaxed text-gray-600">{product.description}</p>
          )}

          {/* Добавить в корзину / Уведомить о поступлении (UC-01) */}
          {isAvailable ? (
            <div className="mb-6 flex items-center gap-3">
              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={product.min_order_qty || 1}
                max={product.stock_quantity}
                step={product.order_step || 1}
                unit={product.unit === 'kg' ? 'кг' : 'шт'}
                disabled={false}
                size="md"
              />
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-base font-semibold text-white shadow-sm shadow-primary-200 transition-colors hover:bg-primary-700"
              >
                Добавить в корзину
              </button>
            </div>
          ) : (
            <div className="mb-6">
              {/* Кнопка «Нет в наличии» — неактивная */}
              <button
                disabled
                className="mb-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-2.5 text-base font-semibold text-gray-400"
              >
                Нет в наличии
              </button>

              {/* UC-01: Кнопка/форма подписки на уведомление */}
              {notifySubscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-green-800">
                    Мы уведомим вас, когда товар поступит в наличие
                  </span>
                </div>
              ) : isAuthenticated && user?.email && !showNotifyForm ? (
                <button
                  onClick={handleQuickNotify}
                  disabled={notifyMutation.isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-6 py-2.5 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
                >
                  {notifyMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                  Уведомить о поступлении
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Оставьте email — мы сообщим, когда товар появится:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={notifyEmail || (user?.email ?? '')}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                      onClick={handleNotifySubmit}
                      disabled={notifyMutation.isPending}
                      className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
                    >
                      {notifyMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">Уведомить</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Минимальный заказ */}
          {product.min_order_qty && product.min_order_qty > 1 && (
            <p className="mb-5 text-xs text-gray-500">
              Минимальный заказ: {formatQuantity(product.min_order_qty, product.unit)}
            </p>
          )}

          {/* Сертификаты (UC-23) */}
          {product.certificate_ids?.length > 0 && (
            <div className="mb-5 rounded-lg bg-blue-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-sm font-medium text-blue-800">Сертификат соответствия</span>
              </div>
              {certsData?.certificates?.map((cert) => (
                <div
                  key={cert._id}
                  className="flex items-center justify-between gap-2 border-t border-blue-100 py-1.5 first:border-t-0"
                >
                  <div className="text-xs text-blue-700">
                    {cert.cert_type_label || 'Сертификат'} №{cert.number}
                    {cert.expiry_date && (
                      <span className="ml-1 text-blue-400">
                        до {new Date(cert.expiry_date).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                  {cert.has_file && cert.file_url && (
                    <a
                      href={cert.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={cert.file_name || 'certificate.pdf'}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      Скачать
                    </a>
                  )}
                </div>
              ))}
              {(!certsData?.certificates || certsData.certificates.length === 0) && (
                <span className="text-xs text-blue-500">Декларация ТР ТС / Сертификат</span>
              )}
            </div>
          )}

          {/* Условия хранения */}
          {product.storage_conditions && (
            <div className="mb-5 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <span className="font-medium text-gray-900">Условия хранения: </span>
              {product.storage_conditions}
            </div>
          )}

          {/* UC-107: Калькулятор порций */}
          {product.unit === 'kg' && (
            <div className="mb-5 rounded-xl border border-gray-200 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-gray-900">Калькулятор порций</h3>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Кол-во (кг)
                  </label>
                  <input
                    type="number"
                    value={portionKg}
                    onChange={(e) => setPortionKg(Math.max(0, +e.target.value))}
                    min="0"
                    step="1"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Порция (г)</label>
                  <div className="flex gap-1">
                    {[100, 150, 200].map((w) => (
                      <button
                        key={w}
                        onClick={() => setPortionWeight(w)}
                        className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                          portionWeight === w
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {w}г
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Результат */}
              <div className="rounded-lg bg-primary-50 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-700">
                    {portionKg} кг {product.name.toLowerCase()}
                  </span>
                  <span className="text-lg font-bold text-primary-700">
                    = {portionCount} порций
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xs text-gray-500">по {portionWeight}г каждая</span>
                  <span className="text-xs text-gray-500">
                    {formatPrice(portionCost)} / порция · {formatPrice(portionTotal)} итого
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Поштучный калькулятор (UC-24) */}
          {product.unit === 'piece' && product.unit_weight && (
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-gray-900">Поштучный калькулятор</h3>
              </div>
              <p className="mb-3 text-xs text-gray-500">
                1 шт ≈ {product.unit_weight * 1000}г ({product.unit_weight} кг)
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* По кг */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Кол-во (кг)
                  </label>
                  <input
                    type="number"
                    value={calcKg}
                    onChange={(e) => {
                      setCalcKg(+e.target.value)
                      setCalcMode('kg')
                    }}
                    min="0"
                    step="0.1"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    ≈ {Math.round(calcKg / (product.unit_weight || 0.15))} шт
                  </div>
                  <div className="mt-0.5 text-sm font-bold text-gray-900">
                    {formatPrice(calcSumKg)}
                  </div>
                </div>

                {/* По штукам */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Кол-во (шт)
                  </label>
                  <input
                    type="number"
                    value={calcPcs}
                    onChange={(e) => {
                      setCalcPcs(+e.target.value)
                      setCalcMode('pcs')
                    }}
                    min="0"
                    step="1"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  <div className="mt-1 text-xs text-gray-500">≈ {calcKgFromPcs} кг</div>
                  <div className="mt-0.5 text-sm font-bold text-gray-900">
                    {formatPrice(calcSumPcs)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
