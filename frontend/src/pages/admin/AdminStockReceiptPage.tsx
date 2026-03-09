// Приходование товаров
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { getAdminProducts, createStockReceipt, getStockReceipts } from '@/api/admin'
import { formatPrice, formatDate } from '@/utils/format'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { showToast } from '@/components/ui/Toast'
import { PageSpinner } from '@/components/ui/Spinner'
import { format } from 'date-fns'

const receiptSchema = z.object({
  supplier_name: z.string().min(2, 'Укажите поставщика'),
  date: z.string().min(1, 'Выберите дату'),
  invoice_number: z.string().optional(),
  note: z.string().optional(),
  items: z.array(z.object({
    product_id: z.string().min(1, 'Выберите товар'),
    quantity: z.coerce.number().min(0.1, 'Мин. 0.1'),
    purchase_price: z.coerce.number().min(0.01, 'Укажите цену'),
  })).min(1, 'Добавьте хотя бы один товар'),
})

type ReceiptFormData = z.infer<typeof receiptSchema>

export const AdminStockReceiptPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)

  const { data: productsData } = useQuery({
    queryKey: ['adminProducts', { page: 1, per_page: 200 }],
    queryFn: () => getAdminProducts({ page: 1, per_page: 200 }),
  })

  const { data: receiptsData, isLoading } = useQuery({
    queryKey: ['adminReceipts'],
    queryFn: () => getStockReceipts({ page: 1, per_page: 30 }),
  })

  const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      items: [{ product_id: '', quantity: 1, purchase_price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const watchItems = watch('items')

  const totalAmount = watchItems?.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.purchase_price || 0),
    0
  ) || 0

  const { mutate: saveReceipt } = useMutation({
    mutationFn: (data: ReceiptFormData) => createStockReceipt(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReceipts'] })
      queryClient.invalidateQueries({ queryKey: ['adminStock'] })
      showToast.success('Приходная накладная создана')
      setShowForm(false)
    },
    onError: () => showToast.error('Ошибка при сохранении'),
  })

  const productOptions = productsData?.items.map((p) => ({ value: p.id, label: p.name })) || []

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Приходование товара</h1>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowForm(!showForm)}
        >
          Новый приход
        </Button>
      </div>

      {/* Форма нового прихода */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Новый приход</h2>
          <form onSubmit={handleSubmit((data) => saveReceipt(data))} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Поставщик"
                placeholder="ИП Ваш поставщик"
                error={errors.supplier_name?.message}
                required
                {...register('supplier_name')}
              />
              <Input
                label="Дата"
                type="date"
                error={errors.date?.message}
                required
                {...register('date')}
              />
              <Input
                label="Номер накладной"
                placeholder="НК-001"
                {...register('invoice_number')}
              />
            </div>

            {/* Позиции */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Товары</h3>
                <button
                  type="button"
                  onClick={() => append({ product_id: '', quantity: 1, purchase_price: 0 })}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Добавить строку
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <select
                        {...register(`items.${index}.product_id`)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      >
                        <option value="">Выберите товар</option>
                        {productOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Кол-во"
                        {...register(`items.${index}.quantity`)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Цена ₽"
                        {...register(`items.${index}.purchase_price`)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    <div className="w-24 pt-2.5 text-sm font-semibold text-gray-900 text-right">
                      {formatPrice((watchItems?.[index]?.quantity || 0) * (watchItems?.[index]?.purchase_price || 0))}
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="pt-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900">Итого: {formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" loading={isSubmitting}>
                Сохранить приход
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Список приходов */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">История приходов</h2>
        </div>
        {isLoading ? (
          <PageSpinner />
        ) : !receiptsData?.items.length ? (
          <div className="py-8 text-center text-gray-400 text-sm">Приходов нет</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Номер</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Поставщик</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Дата</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {receiptsData.items.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-900">{receipt.receipt_number}</td>
                  <td className="px-5 py-3 text-gray-700">{receipt.supplier_name}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{formatDate(receipt.date)}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{formatPrice(receipt.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminStockReceiptPage
