// Страница контактов
import React from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const ContactsPage: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-3xl font-bold text-gray-900 mb-2">Контакты</h1>
			<p className="text-gray-500 mb-8">Свяжитесь с нами удобным способом</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Контактная информация */}
				<div className="space-y-4">
					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<h2 className="text-base font-semibold text-gray-900 mb-4">
							Способы связи
						</h2>
						<div className="space-y-4">
							<a
								href="tel:+79000000000"
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
									<Phone className="w-5 h-5 text-primary-600" />
								</div>
								<div>
									<div className="text-sm font-medium text-gray-900">
										Телефон
									</div>
									<div className="text-sm text-gray-600">
										+7 (900) 000-00-00
									</div>
									<div className="text-xs text-gray-400 mt-0.5">
										Звонки пн–сб 08:00–18:00
									</div>
								</div>
							</a>

							<a
								href="https://t.me/agroreserve"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
									<Send className="w-5 h-5 text-blue-500" />
								</div>
								<div>
									<div className="text-sm font-medium text-gray-900">
										Telegram
									</div>
									<div className="text-sm text-gray-600">@agroreserve</div>
									<div className="text-xs text-gray-400 mt-0.5">
										Быстрый ответ
									</div>
								</div>
							</a>

							<a
								href="mailto:info@agroreserve.ru"
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
									<Mail className="w-5 h-5 text-orange-500" />
								</div>
								<div>
									<div className="text-sm font-medium text-gray-900">Email</div>
									<div className="text-sm text-gray-600">
										info@agroreserve.ru
									</div>
									<div className="text-xs text-gray-400 mt-0.5">
										Для официальных запросов
									</div>
								</div>
							</a>
						</div>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-6">
						<h2 className="text-base font-semibold text-gray-900 mb-4">
							Адрес и время работы
						</h2>
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
								<div>
									<div className="text-sm font-medium text-gray-900">Адрес</div>
									<div className="text-sm text-gray-600">
										г. Тобольск, Тюменская область
									</div>
									<div className="text-xs text-gray-400 mt-0.5">
										Самовывоз — по договорённости
									</div>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Clock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
								<div>
									<div className="text-sm font-medium text-gray-900">
										Время работы
									</div>
									<div className="text-sm text-gray-600">
										Пн–Сб: 08:00–18:00
									</div>
									<div className="text-xs text-gray-400 mt-0.5">
										Вс — выходной
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Карта (заглушка) */}
				<div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
					<div className="text-center p-8">
						<MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
						<p className="text-gray-500 text-sm">
							г. Тобольск, Тюменская область
						</p>
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
			<div className="mt-6 bg-primary-50 rounded-xl border border-primary-100 p-6">
				<h2 className="text-base font-semibold text-gray-900 mb-2">Доставка</h2>
				<p className="text-sm text-gray-600">
					Бесплатная доставка по Тобольску и пригороду на нашем транспорте.
					Временные слоты: 08:00–11:00, 11:00–14:00, 14:00–17:00. Доставка
					осуществляется с понедельника по субботу.
				</p>
			</div>
		</div>
	);
};

export default ContactsPage;
