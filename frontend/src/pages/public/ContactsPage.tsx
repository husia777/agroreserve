// Страница контактов
import React from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export const ContactsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Контакты</h1>
      <p className="mb-8 text-gray-500">Свяжитесь с нами удобным способом</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Контактная информация */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Способы связи</h2>
            <div className="space-y-4">
              <a
                href="tel:+79000000000"
                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Phone className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Телефон</div>
                  <div className="text-sm text-gray-600">+7 (900) 000-00-00</div>
                  <div className="mt-0.5 text-xs text-gray-400">Звонки пн–сб 08:00–18:00</div>
                </div>
              </a>

              <a
                href="https://t.me/agroreserve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <Send className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Telegram</div>
                  <div className="text-sm text-gray-600">@agroreserve</div>
                  <div className="mt-0.5 text-xs text-gray-400">Быстрый ответ</div>
                </div>
              </a>

              <a
                href="mailto:info@agroreserve.ru"
                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">info@agroreserve.ru</div>
                  <div className="mt-0.5 text-xs text-gray-400">Для официальных запросов</div>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Адрес и время работы</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Адрес</div>
                  <div className="text-sm text-gray-600">г. Тобольск, Тюменская область</div>
                  <div className="mt-0.5 text-xs text-gray-400">Самовывоз — по договорённости</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Время работы</div>
                  <div className="text-sm text-gray-600">Пн–Сб: 08:00–18:00</div>
                  <div className="mt-0.5 text-xs text-gray-400">Вс — выходной</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Карта (заглушка) */}
        <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <div className="p-8 text-center">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-500">г. Тобольск, Тюменская область</p>
            <a
              href="https://maps.google.com/?q=Тобольск,Тюменская+область"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-primary-600 hover:underline"
            >
              Открыть в Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Доставка */}
      <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-6">
        <h2 className="mb-2 text-base font-semibold text-gray-900">Доставка</h2>
        <p className="text-sm text-gray-600">
          Бесплатная доставка по Тобольску и пригороду на нашем транспорте. Временные слоты:
          08:00–11:00, 11:00–14:00, 14:00–17:00. Доставка осуществляется с понедельника по субботу.
        </p>
      </div>
    </div>
  )
}

export default ContactsPage
