// Главная страница — лендинг
import React from "react";
import SEOHead, {
	organizationSchema,
	websiteSchema,
} from "@/components/shared/SEOHead";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/catalog";
import { useAuthStore } from "@/stores/authStore";

// Иконки категорий
const categoryIcons: Record<string, string> = {
	ovoshchi: "🥕",
	frukty: "🍎",
	sukhofruktyi: "🍇",
	orekhyi: "🥜",
	spetsii: "🌶️",
	myod: "🍯",
	masla: "🫒",
};

// Преимущества
const advantages = [
	{
		icon: TrendingDown,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		title: "Цены на 20–35% ниже",
		description:
			"Прямые поставки, без посредников. Семейные связи с фермерами.",
	},
	{
		icon: Truck,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		title: "Бесплатная доставка",
		description:
			"Развозим по Тобольску и пригороду на собственной газели. Без доплат.",
	},
	{
		icon: FileCheck,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		title: "Документы для 44-ФЗ",
		description:
			"Полный пакет: ТОРГ-12, счёт-фактура, сертификаты ТР ТС, декларации соответствия.",
	},
	{
		icon: Leaf,
		iconColor: "text-primary-600",
		bgColor: "bg-primary-50",
		title: "Свежесть гарантируем",
		description:
			"Поставки каждые 2 недели. Хранение в 3-зонном складе: +15°C, +2–6°C, сухая зона.",
	},
];

const steps = [
	{
		number: "01",
		title: "Выберите товары",
		description: "Просмотрите каталог, добавьте нужные товары в корзину",
	},
	{
		number: "02",
		title: "Оформите заказ",
		description: "Укажите адрес, выберите дату и время доставки",
	},
	{
		number: "03",
		title: "Получите доставку",
		description: "Доставим точно в срок, с документами и сертификатами",
	},
];

const clients = [
	{
		icon: "🏫",
		title: "Школы",
		description: "Прямые контракты до 600 тыс. ₽ по 44-ФЗ",
	},
	{
		icon: "🍽️",
		title: "Кафе и рестораны",
		description: "Свежие овощи и зелень для кухни",
	},
	{
		icon: "🏢",
		title: "Столовые",
		description: "Регулярные поставки по расписанию",
	},
	{
		icon: "🏪",
		title: "Магазины",
		description: "Широкий ассортимент по оптовым ценам",
	},
];

export const HomePage: React.FC = () => {
	const { isAuthenticated } = useAuthStore();
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

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
				<section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white overflow-hidden">
					{/* Декоративные элементы */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
						<div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/5 rounded-full" />
						<div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
					</div>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
						<div className="max-w-2xl">
							{/* Бейдж */}
							<div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium mb-6">
								<span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
								Прямые поставки
							</div>

							{/* Заголовок */}
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
								Свежие овощи и фрукты
								<span className="block text-green-200 mt-1">
									оптом в Тобольске
								</span>
							</h1>

							{/* Описание */}
							<p className="text-lg text-white/80 mb-8 leading-relaxed">
								Прямые поставки от фермеров. Цены на{" "}
								<span className="font-semibold text-white">
									20–35% ниже рынка
								</span>
								. Полный пакет документов для госзакупок по 44-ФЗ.
							</p>

							{/* CTA кнопки */}
							<div className="flex flex-col sm:flex-row gap-3">
								<Link
									to={isAuthenticated ? "/catalog" : "/quick-order"}
									className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg shadow-primary-900/20"
								>
									<ShoppingBag className="w-5 h-5" />
									Перейти в каталог
								</Link>
								<Link
									to="/schools"
									className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors"
								>
									<FileCheck className="w-5 h-5" />
									Для школ (44-ФЗ)
								</Link>
							</div>

							{/* Мини-статистика */}
							<div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/20">
								<div>
									<div className="text-2xl font-bold">200+</div>
									<div className="text-xs text-white/70">наименований</div>
								</div>
								<div className="w-px h-8 bg-white/20" />
								<div>
									<div className="text-2xl font-bold">35%</div>
									<div className="text-xs text-white/70">ниже рынка</div>
								</div>
								<div className="w-px h-8 bg-white/20" />
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
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-10">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
								Почему выбирают Агрорезерв
							</h2>
							<p className="text-gray-500 mt-2">
								Мы не просто поставщик — мы надёжный партнёр
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{advantages.map((adv, i) => {
								const Icon = adv.icon;
								return (
									<div
										key={i}
										className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
									>
										<div
											className={`w-12 h-12 ${adv.bgColor} rounded-xl flex items-center justify-center mb-4`}
										>
											<Icon className={`w-6 h-6 ${adv.iconColor}`} />
										</div>
										<h3 className="font-semibold text-gray-900 mb-2">
											{adv.title}
										</h3>
										<p className="text-sm text-gray-500 leading-relaxed">
											{adv.description}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Категории */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between mb-8">
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
									Каталог товаров
								</h2>
								<p className="text-gray-500 mt-1">
									Свежие продукты прямо с грядки
								</p>
							</div>
							<Link
								to={isAuthenticated ? "/catalog" : "/quick-order"}
								className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm"
							>
								Весь каталог
								<ChevronRight className="w-4 h-4" />
							</Link>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
							{(categories || []).map((cat) => (
								<Link
									key={cat.id}
									to={`/catalog/${cat.slug}`}
									className="group flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50/30 hover:shadow-sm transition-all text-center"
								>
									<div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
										{categoryIcons[cat.slug] || "🌿"}
									</div>
									<div className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
										{cat.name}
									</div>
									{cat.product_count > 0 && (
										<div className="text-xs text-gray-400 mt-0.5">
											{cat.product_count} товаров
										</div>
									)}
								</Link>
							))}
							{/* Скелетоны если нет данных */}
							{!categories &&
								Array.from({ length: 7 }).map((_, i) => (
									<div
										key={i}
										className="h-28 bg-gray-200 rounded-xl animate-pulse"
									/>
								))}
						</div>
					</div>
				</section>

				{/* Как заказать */}
				<section className="bg-primary-50 py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-10">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
								Как сделать заказ
							</h2>
							<p className="text-gray-500 mt-2">Просто, быстро, удобно</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
							{steps.map((step, i) => (
								<div key={i} className="relative text-center">
									{/* Линия соединения */}
									{i < steps.length - 1 && (
										<div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-200 z-0" />
									)}
									<div className="relative z-10">
										<div className="w-16 h-16 bg-primary-600 text-white text-xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
											{step.number}
										</div>
										<h3 className="font-semibold text-gray-900 mb-2">
											{step.title}
										</h3>
										<p className="text-sm text-gray-500">{step.description}</p>
									</div>
								</div>
							))}
						</div>
						<div className="text-center mt-10">
							<Link
								to="/register"
								className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
							>
								Зарегистрироваться и начать
								<ChevronRight className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</section>

				{/* Для кого */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-10">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
								Наши клиенты
							</h2>
							<p className="text-gray-500 mt-2">
								Работаем с B2B и B2C клиентами
							</p>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							{clients.map((client, i) => (
								<div
									key={i}
									className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:border-primary-200 hover:shadow-sm transition-all"
								>
									<div className="text-4xl mb-3">{client.icon}</div>
									<div className="font-semibold text-gray-900">
										{client.title}
									</div>
									<div className="text-xs text-gray-500 mt-1">
										{client.description}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Блок для школ */}
				<section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
							<div className="max-w-lg">
								<div className="text-blue-200 text-sm font-medium mb-2">
									🏫 Для учреждений бюджетной сферы
								</div>
								<h2 className="text-2xl sm:text-3xl font-bold mb-4">
									Работаем со школами и госучреждениями по 44-ФЗ
								</h2>
								<ul className="space-y-3 text-blue-100">
									{[
										"Прямые договоры до 600 000 ₽ без торгов",
										"Полный пакет документов: ТОРГ-12, счёт-фактуры, УПД",
										"Сертификаты ТР ТС, декларации соответствия, ветсправки",
										"Калькулятор меню для школьного питания",
										"ЭЦП, работаем через ЭТП и напрямую",
									].map((item, i) => (
										<li key={i} className="flex items-start gap-2.5">
											<CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
											{item}
										</li>
									))}
								</ul>
							</div>
							<div className="flex-shrink-0">
								<Link
									to="/schools"
									className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base"
								>
									Подробнее для школ
									<ChevronRight className="w-5 h-5" />
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Контакты */}
				<section className="py-16 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-10">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
								Свяжитесь с нами
							</h2>
							<p className="text-gray-500 mt-2">
								Ответим на все вопросы и оформим первый заказ
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
							<a
								href="tel:+79000000000"
								className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all text-center"
							>
								<div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
									<Phone className="w-6 h-6 text-primary-600" />
								</div>
								<div className="font-semibold text-gray-900">Телефон</div>
								<div className="text-sm text-gray-500 mt-1">
									+7 (900) 000-00-00
								</div>
							</a>
							<a
								href="https://t.me/agroreserve"
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all text-center"
							>
								<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
									<Send className="w-6 h-6 text-blue-500" />
								</div>
								<div className="font-semibold text-gray-900">Telegram</div>
								<div className="text-sm text-gray-500 mt-1">@agroreserve</div>
							</a>
							<div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 text-center">
								<div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
									<MapPin className="w-6 h-6 text-orange-500" />
								</div>
								<div className="font-semibold text-gray-900">Адрес</div>
								<div className="text-sm text-gray-500 mt-1">
									г. Тобольск, Тюменская обл.
								</div>
							</div>
							<div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 text-center">
								<div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3">
									<Clock className="w-6 h-6 text-green-600" />
								</div>
								<div className="font-semibold text-gray-900">Время работы</div>
								<div className="text-sm text-gray-500 mt-1">
									Пн–Сб: 08:00–18:00
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default HomePage;
