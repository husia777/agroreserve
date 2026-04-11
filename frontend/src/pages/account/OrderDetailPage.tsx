// Детали заказа
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '@/api/orders'
import { downloadDocument, downloadBlob, downloadOrderCertificates } from '@/api/documents'
import { formatPrice, formatDate, formatDateTime, formatQuantity } from '@/utils/format'
import { PageSpinner } from '@/components/ui/Spinner'
import OrderStatusBadge from '@/components/shared/OrderStatusBadge'
import OrderTimeline from '@/components/shared/OrderTimeline'
import Button from '@/components/ui/Button'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Shield, FileDown, MapPin, Clock, Truck } from 'lucide-react'
import { showToast } from '@/components/ui/Toast'

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id!),
    enabled: !!id,
  })

  const [certsLoading, setCertsLoading] = useState(false)

  const handleDownloadCerts = async () => {
    if (!order) return
    setCertsLoading(true)
    try {
      const blob = await downloadOrderCertificates(order.id)
      downloadBlob(blob, `certificates_${order.order_number}.zip`)
      showToast.success('Сертификаты скачаны')
    } catch {
      showToast.error('Нет доступных сертификатов')
    } finally {
      setCertsLoading(false)
    }
  }

  const handleDownload = async (docId: string, docNumber: string) => {
    try {
      const blob = await downloadDocument(docId)
      downloadBlob(blob, `${docNumber}.pdf`)
    } catch {
      showToast.error('Ошибка при скачивании документа')
    }
  }

  if (isLoading) return <PageSpinner />
  if (!order)
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Заказ не найден</p>
        <Link to="/account/orders" className="mt-2 inline-block text-primary-600 hover:underline">
          Назад к заказам
        </Link>
      </div>
    )

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[{ label: 'Мои заказы', href: '/account/orders' }, { label: order.order_number }]}
      />

      {/* Заголовок */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.order_number}</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Оформлен {formatDateTime(order.created_at)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Состав заказа */}
        <div className="space-y-4 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-gray-900">Состав заказа</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="hidden border-b border-gray-100 bg-gray-50 sm:table-header-group">
                <tr>
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase text-gray-500">
                    Товар
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase text-gray-500">
                    Кол-во
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase text-gray-500">
                    Цена
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase text-gray-500">
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items?.map((item) => (
                  <tr key={item.product_id}>
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-900">{item.product_name}</div>
                      {item.actual_qty && item.actual_qty !== item.ordered_qty && (
                        <div className="mt-0.5 text-xs text-orange-600">
                          Факт: {formatQuantity(item.actual_qty, 'kg')}
                        </div>
                      )}
                    </td>
                    <td className="hidden px-5 py-3 text-right text-gray-600 sm:table-cell">
                      {formatQuantity(item.ordered_qty, 'kg')}
                    </td>
                    <td className="hidden px-5 py-3 text-right text-gray-600 sm:table-cell">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">
                      {formatPrice(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                <tr>
                  <td
                    colSpan={3}
                    className="hidden px-5 py-3 text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Итого
                  </td>
                  <td className="px-5 py-3 text-right text-base font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Доставка */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">Информация о доставке</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                <div>
                  <div className="text-xs text-gray-500">Адрес</div>
                  <div className="text-sm text-gray-900">{order.delivery_address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                <div>
                  <div className="text-xs text-gray-500">Дата и время</div>
                  <div className="text-sm text-gray-900">
                    {formatDate(order.delivery_date)} · {order.delivery_slot}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                <div>
                  <div className="text-xs text-gray-500">Оплата</div>
                  <div className="text-sm text-gray-900">{order.payment_method}</div>
                </div>
              </div>
              {order.note && (
                <div className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Примечание:</span> {order.note}
                </div>
              )}
            </div>
          </div>

          {/* Документы */}
          {order.documents && order.documents.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 font-semibold text-gray-900">Документы</h2>
              <div className="space-y-2">
                {order.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doc.doc_number}</div>
                      <div className="text-xs text-gray-500">{doc.doc_type}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<FileDown className="h-4 w-4" />}
                      onClick={() => handleDownload(doc.id, doc.doc_number)}
                    >
                      PDF
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Сертификаты (UC-23) */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h2 className="font-semibold text-gray-900">Сертификаты</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<FileDown className="h-4 w-4" />}
                loading={certsLoading}
                onClick={handleDownloadCerts}
              >
                Скачать ZIP
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Все сертификаты качества на товары из заказа
            </p>
          </div>
        </div>

        {/* Статус */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-5 font-semibold text-gray-900">Статус заказа</h2>
            <OrderTimeline currentStatus={order.status} statusHistory={order.status_history} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage
