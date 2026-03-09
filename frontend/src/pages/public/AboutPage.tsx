// Страница "О компании"
import React from "react";
import { Link } from "react-router-dom";
import {
	Leaf,
	TrendingDown,
	Truck,
	FileCheck,
	MapPin,
	Phone,
	Mail,
} from "lucide-react";

export const AboutPage: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			{/* Заголовок */}
			<div className="mb-10">
				<h1 className="text-3xl font-bold text-gray-900 mb-3">
					О компании Агрорезерв
				</h1>
				<p className="text-lg text-gray-500">
					Прямые поставки свежих овощей и фруктов в Тобольск
				</p>
			</div>

			{/* История */}
			<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
				<div className="flex items-start gap-4">
					<div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
						<Leaf className="w-6 h-6 text-primary-600" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-3">
							Наша история
						</h2>
						<p className="text-gray-600 leading-relaxed mb-4">
							Агрорезерв — это проект ИП Наимов Хусейн Вохиджонович, основанный
							на семейных связях с фермерскими хозяйствами. Благодаря прямым
							поставкам без посредников мы предлагаем цены на 20–35% ниже рынка
							при высоком качестве продуктов.
						</p>
						<p className="text-gray-600 leading-relaxed">
							Наша цель — сделать свежие узбекские овощи, фрукты, сухофрукты и
							специи доступными для жителей и предприятий Тобольска. Мы работаем
							с B2B-клиентами (школы, кафе, рестораны, столовые) и частными
							покупателями.
						</p>
					</div>
				</div>
			</div>

			{/* Преимущества */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
				{[
					{
						icon: TrendingDown,
						color: "text-green-600",
						bg: "bg-green-50",
						title: "Прямые поставки",
						desc: "Без посредников, напрямую от фермеров. Свежесть и качество гарантированы.",
					},
					{
						icon: Truck,
						color: "text-blue-600",
						bg: "bg-blue-50",
						title: "Бесплатная доставка",
						desc: "Доставляем по Тобольску и пригороду на собственном транспорте.",
					},
					{
						icon: FileCheck,
						color: "text-purple-600",
						bg: "bg-purple-50",
						title: "44-ФЗ документы",
						desc: "Полный пакет: ТОРГ-12, счета, УПД, сертификаты ТР ТС для госзакупок.",
					},
					{
						icon: Leaf,
						color: "text-primary-600",
						bg: "bg-primary-50",
						title: "Свежесть",
						desc: "Склад с 3 температурными зонами. Поставки раз в 2 недели.",
					},
				].map((item, i) => {
					const Icon = item.icon;
					return (
						<div
							key={i}
							className="bg-white rounded-xl border border-gray-200 p-5"
						>
							<div
								className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mb-3`}
							>
								<Icon className={`w-5 h-5 ${item.color}`} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
							<p className="text-sm text-gray-500">{item.desc}</p>
						</div>
					);
				})}
			</div>

			{/* Ассортимент */}
			<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
				<h2 className="text-xl font-bold text-gray-900 mb-4">
					Наш ассортимент
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
					{[
						{ icon: "🥕", name: "Овощи" },
						{ icon: "🍎", name: "Фрукты" },
						{ icon: "🍇", name: "Сухофрукты" },
						{ icon: "🥜", name: "Орехи" },
						{ icon: "🌶️", name: "Специи" },
						{ icon: "🍯", name: "Мёд" },
						{ icon: "🫒", name: "Масла" },
						{ icon: "🌿", name: "Зелень" },
					].map((item, i) => (
						<div
							key={i}
							className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm"
						>
							<span className="text-2xl">{item.icon}</span>
							<span className="font-medium text-gray-700">{item.name}</span>
						</div>
					))}
				</div>
			</div>

			{/* Реквизиты */}
			<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
				<h2 className="text-xl font-bold text-gray-900 mb-4">Реквизиты</h2>
				<dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
					{[
						{ dt: "Организация", dd: "ИП Наимов Хусейн Вохиджонович" },
						{ dt: "ИНН", dd: "0000000000" },
						{ dt: "ОГРНИП", dd: "000000000000000" },
						{ dt: "Система налогообложения", dd: "УСН 6%" },
						{ dt: "Банк", dd: "ПАО «Сбербанк»" },
						{ dt: "Адрес", dd: "г. Тобольск, Тюменская обл." },
					].map((item, i) => (
						<div key={i} className="flex gap-2">
							<dt className="text-gray-500 min-w-[160px]">{item.dt}:</dt>
							<dd className="text-gray-900 font-medium">{item.dd}</dd>
						</div>
					))}
				</dl>
			</div>

			{/* Контакты */}
			<div className="bg-primary-50 rounded-2xl border border-primary-100 p-8">
				<h2 className="text-xl font-bold text-gray-900 mb-4">Контакты</h2>
				<div className="space-y-3">
					<a
						href="tel:+79000000000"
						className="flex items-center gap-3 text-gray-700 hover:text-primary-700"
					>
						<Phone className="w-5 h-5 text-primary-600" />
						+7 (900) 000-00-00
					</a>
					<a
						href="mailto:info@agroreserve.ru"
						className="flex items-center gap-3 text-gray-700 hover:text-primary-700"
					>
						<Mail className="w-5 h-5 text-primary-600" />
						info@agroreserve.ru
					</a>
					<div className="flex items-center gap-3 text-gray-700">
						<MapPin className="w-5 h-5 text-primary-600" />
						г. Тобольск, Тюменская область
					</div>
				</div>
				<div className="mt-6 flex gap-3">
					<Link
						to="/catalog"
						className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors text-sm"
					>
						Перейти в каталог
					</Link>
					<Link
						to="/contacts"
						className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
					>
						Все контакты
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
