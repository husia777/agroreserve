// Страница "О компании"
import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, TrendingDown, Truck, FileCheck, MapPin, Phone, Mail } from 'lucide-react'

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Заголовок */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">О компании Агрорезерв</h1>
        <p className="text-lg text-gray-500">Прямые поставки свежих овощей и фруктов в Тобольск</p>
      </div>

      {/* История */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50">
            <Leaf className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-gray-900">Наша история</h2>
            <p className="mb-4 leading-relaxed text-gray-600">
              Агрорезерв — это проект ИП Наимов Хусейн Вохиджонович, основанный на семейных связях с
              фермерскими хозяйствами. Благодаря прямым поставкам без посредников мы предлагаем цены
              на 20–35% ниже рынка при высоком качестве продуктов.
            </p>
            <p className="leading-relaxed text-gray-600">
              Наша цель — сделать свежие узбекские овощи, фрукты, сухофрукты и специи доступными для
              жителей и предприятий Тобольска. Мы работаем с B2B-клиентами (школы, кафе, рестораны,
              столовые) и частными покупателями.
            </p>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            icon: TrendingDown,
            color: 'text-green-600',
            bg: 'bg-green-50',
            title: 'Прямые поставки',
            desc: 'Без посредников, напрямую от фермеров. Свежесть и качество гарантированы.',
          },
          {
            icon: Truck,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            title: 'Бесплатная доставка',
            desc: 'Доставляем по Тобольску и пригороду на собственном транспорте.',
          },
          {
            icon: FileCheck,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            title: '44-ФЗ документы',
            desc: 'Полный пакет: ТОРГ-12, счета, УПД, сертификаты ТР ТС для госзакупок.',
          },
          {
            icon: Leaf,
            color: 'text-primary-600',
            bg: 'bg-primary-50',
            title: 'Свежесть',
            desc: 'Склад с 3 температурными зонами. Поставки раз в 2 недели.',
          },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
              <div
                className={`h-10 w-10 ${item.bg} mb-3 flex items-center justify-center rounded-lg`}
              >
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Ассортимент */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Наш ассортимент</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { icon: '🥕', name: 'Овощи' },
            { icon: '🍎', name: 'Фрукты' },
            { icon: '🍇', name: 'Сухофрукты' },
            { icon: '🥜', name: 'Орехи' },
            { icon: '🌶️', name: 'Специи' },
            { icon: '🍯', name: 'Мёд' },
            { icon: '🫒', name: 'Масла' },
            { icon: '🌿', name: 'Зелень' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-3 text-sm">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Реквизиты */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Реквизиты</h2>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {[
            { dt: 'Организация', dd: 'ИП Наимов Хусейн Вохиджонович' },
            { dt: 'ИНН', dd: '0000000000' },
            { dt: 'ОГРНИП', dd: '000000000000000' },
            { dt: 'Система налогообложения', dd: 'УСН 6%' },
            { dt: 'Банк', dd: 'ПАО «Сбербанк»' },
            { dt: 'Адрес', dd: 'г. Тобольск, Тюменская обл.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-2">
              <dt className="min-w-[160px] text-gray-500">{item.dt}:</dt>
              <dd className="font-medium text-gray-900">{item.dd}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Контакты */}
      <div className="rounded-2xl border border-primary-100 bg-primary-50 p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Контакты</h2>
        <div className="space-y-3">
          <a
            href="tel:+79000000000"
            className="flex items-center gap-3 text-gray-700 hover:text-primary-700"
          >
            <Phone className="h-5 w-5 text-primary-600" />
            +7 (900) 000-00-00
          </a>
          <a
            href="mailto:info@agroreserve.ru"
            className="flex items-center gap-3 text-gray-700 hover:text-primary-700"
          >
            <Mail className="h-5 w-5 text-primary-600" />
            info@agroreserve.ru
          </a>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="h-5 w-5 text-primary-600" />
            г. Тобольск, Тюменская область
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to="/catalog"
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Перейти в каталог
          </Link>
          <Link
            to="/contacts"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Все контакты
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
