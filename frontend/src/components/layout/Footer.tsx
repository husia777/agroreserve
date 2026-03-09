// Подвал сайта — контакты, ссылки, реквизиты
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* О компании */}
					<div className="lg:col-span-1">
						<div className="flex items-center gap-2 mb-4">
							<div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
								<svg
									viewBox="0 0 36 36"
									fill="none"
									className="w-6 h-6"
									aria-hidden="true"
								>
									<path
										d="M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z"
										fill="white"
									/>
								</svg>
							</div>
							<div>
								<div className="text-base font-bold text-white">АГРОРЕЗЕРВ</div>
								<div className="text-xs text-primary-400">Тобольск</div>
							</div>
						</div>
						<p className="text-sm text-gray-400 leading-relaxed">
							Прямые поставки свежих овощей и фруктов. Документы для госзакупок
							по 44-ФЗ.
						</p>
					</div>

					{/* Каталог */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Каталог
						</h3>
						<ul className="space-y-2.5 text-sm">
							{[
								{ to: "/catalog?category=ovoshchi", label: "Овощи" },
								{ to: "/catalog?category=frukty", label: "Фрукты" },
								{ to: "/catalog?category=sukhofruktyi", label: "Сухофрукты" },
								{ to: "/catalog?category=orekhyi", label: "Орехи" },
								{ to: "/catalog?category=spetsii", label: "Специи" },
								{ to: "/catalog?category=myod", label: "Мёд и масла" },
							].map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="text-gray-400 hover:text-white transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Компания */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Компания
						</h3>
						<ul className="space-y-2.5 text-sm">
							{[
								{ to: "/about", label: "О нас" },
								{ to: "/schools", label: "Для школ" },
								{ to: "/contacts", label: "Контакты" },
								{ to: "/account/orders", label: "Мои заказы" },
								{ to: "/account/documents", label: "Документы" },
							].map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="text-gray-400 hover:text-white transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Контакты */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
							Контакты
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="tel:+79000000000"
									className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors"
								>
									<Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
									+7 (900) 000-00-00
								</a>
							</li>
							<li>
								<a
									href="https://t.me/agroreserve"
									className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Send className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
									Telegram: @agroreserve
								</a>
							</li>
							<li>
								<a
									href="mailto:info@agroreserve.ru"
									className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors"
								>
									<Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
									info@agroreserve.ru
								</a>
							</li>
							<li className="flex items-start gap-2.5 text-gray-400">
								<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
								г. Тобольск, Тюменская обл.
							</li>
							<li className="flex items-start gap-2.5 text-gray-400">
								<Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
								Пн–Сб: 08:00–18:00
							</li>
						</ul>
					</div>
				</div>

				{/* Реквизиты и копирайт */}
				<div className="mt-10 pt-6 border-t border-gray-800">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="text-xs text-gray-500">
							ИП Наимов Хусейн Вохиджонович · ИНН: 0000000000 · ОГРНИП:
							000000000000000
						</div>
						<div className="text-xs text-gray-500">
							© {new Date().getFullYear()} Агрорезерв · Все права защищены
						</div>
					</div>
					<div className="mt-2 text-xs text-gray-600">
						<a
							href="https://www.perplexity.ai/computer"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-400 transition-colors"
						>
							Created with Perplexity Computer
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
