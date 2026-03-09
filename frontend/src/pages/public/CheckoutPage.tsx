// Страница оформления заказа
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, format } from 'date-fns'
import { createOrder } from '@/api/orders'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { DeliveryPriority, PaymentMethod } from '@/types'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { formatPrice, formatQuantity } from '@/utils/format'
import { showToast } from '@/components/ui/Toast'
import { MapPin, Clock, Truck, CreditCard } from 'lucide-react'

// Минимальная дата — завтра
const today = new Date()
const maxDate = addDays(new Date(), 14)
const minDateStr = format(today, 'yyyy-MM-dd')
const maxDateStr = format(maxDate, 'yyyy-MM-dd')

// Схема валидации
const checkoutSchema = z.object({
  delivery_address: z.string().min(10, 'Укажите полный адрес доставки'),
  delivery_date: z
    .string()
    .min(1, 'Выберите дату')
    .refine((d) => new Date(d) >= new Date(new Date().toDateString()), 'Дата не может быть в прошлом'),
  delivery_slot: z.string().min(1, 'Выберите временной слот'),
  delivery_priority: z.nativeEnum(DeliveryPriority),
  payment_method: z.nativeEnum(PaymentMethod),
  note: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const DELIVERY_SLOTS = [
  { value: '08:00-11:00', label: '08:00 – 11:00 (утро)' },
  { value: '11:00-14:00', label: '11:00 – 14:00 (полдень)' },
  { value: '14:00-17:00', label: '14:00 – 17:00 (вечер)' },
]

const PRIORITY_OPTIONS = [
  { value: DeliveryPriority.NORMAL, label: '🟡 Обычная доставка' },
  { value: DeliveryPriority.FLEXIBLE, label: '🟢 Гибкая — любое время' },
  { value: DeliveryPriority.URGENT, label: '🔴 Срочно (госконтракт)' },
]

const PAYMENT_OPTIONS = [
  { value: PaymentMethod.BANK_TRANSFER, label: 'Безналичный расчёт (счёт)' },
  { value: PaymentMethod.CASH, label: 'Наличными при получении' },
  { value: PaymentMethod.CARD_ON_DELIVERY, label: 'Картой при получении' },
  { value: PaymentMethod.PREPAYMENT, label: 'Предоплата на карту' },
]

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCartStore()
  const { user } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      delivery_address: user?.organization?.actual_address || '',
      delivery_priority: DeliveryPriority.NORMAL,
      payment_method: PaymentMethod.BANK_TRANSFER,
    },
  })

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const order = await createOrder({
          ...data,
          items: items.map(i => ({ product_id: i.product.id, qty: i.quantity })),
        })
      clearCart()
      showToast.success(`Заказ ${order.order_number} оформлен!`)
      navigate(`/account/orders/${order.id}`)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } }
      showToast.error(error?.response?.data?.detail || 'Ошибка при оформлении заказа')
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Оформление заказа</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Форма */}
          <div className="lg:col-span-2 space-y-5">
            {/* Доставка */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">Доставка</h2>
              </div>
              <div className="space-y-4">
                <Input
                  label="Адрес доставки"
                  placeholder="г. Тобольск, ул. Ленина, д. 1"
                  leftIcon={<MapPin className="w-4 h-4" />}
                  error={errors.delivery_address?.message}
                  required
                  {...register('delivery_address')}
                />

                <div className="grid grid-cols-2 gap-4">
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
                    label="Время доставки"
                    options={DELIVERY_SLOTS}
                    placeholder="Выберите слот"
                    error={errors.delivery_slot?.message}
                    required
                    {...register('delivery_slot')}
                  />
                </div>

                <Select
                  label="Приоритет доставки"
                  options={PRIORITY_OPTIONS}
                  error={errors.delivery_priority?.message}
                  {...register('delivery_priority')}
                />
              </div>
            </div>

            {/* Оплата */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">Оплата</h2>
              </div>
              <Select
                label="Способ оплаты"
                options={PAYMENT_OPTIONS}
                error={errors.payment_method?.message}
                required
                {...register('payment_method')}
              />
            </div>

            {/* Примечание */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">Дополнительно</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Примечание к заказу
                </label>
                <textarea
                  {...register('note')}
                  rows={3}
                  placeholder="Особые пожелания, инструкции для курьера..."
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
                />
              </div>
            </div>
          </div>

          {/* Состав заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-4">Ваш заказ</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="text-gray-600 min-w-0 mr-2">
                      <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                      <div className="text-gray-400">
                        {formatQuantity(item.quantity, item.product.unit)} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 flex-shrink-0">
                      {formatPrice(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Итого</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">+ бесплатная доставка</div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isSubmitting}
              >
                Подтвердить заказ
              </Button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Нажимая «Подтвердить», вы соглашаетесь с условиями заказа
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
