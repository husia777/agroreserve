import { b as H, r as u, u as J, a as $, j as e } from "./query-CSqTlvHZ.js";
import {
	u as O,
	y as W,
	P as X,
	k as x,
	c as Y,
	I as l,
	t as Z,
	F as L,
	p as R,
	z as ee,
	r as o,
	H as se,
} from "./index-CqKRh0bB.js";
import { C as ae, D as re } from "./admin-Cg3Azfz7.js";
import {
	ai as T,
	w as ne,
	av as q,
	ar as oe,
	b as le,
	d as te,
	am as ce,
	a4 as ie,
	o as me,
	ao as de,
	C as pe,
	aw as xe,
	a as ge,
} from "./ui-DkQ5vUzx.js";
import "./vendor-DCpvk_e6.js";
const ue = R({
		company_name: o().min(2, "Укажите название компании"),
		company_inn: o()
			.min(10, "ИНН минимум 10 символов")
			.max(12, "ИНН максимум 12 символов"),
		company_ogrn: o().optional(),
		company_address: o().min(5, "Укажите адрес"),
		company_phone: o().min(7, "Укажите телефон"),
		company_email: o().email("Некорректный email"),
		company_director: o().min(2, "Укажите руководителя"),
		bank_name: o().optional(),
		bank_account: o().optional(),
		bik: o().optional(),
		corr_account: o().optional(),
		tax_rate: se({ invalid_type_error: "Введите ставку налога" })
			.min(0)
			.max(100),
		working_hours: o().min(3, "Укажите часы работы"),
		delivery_slots: ee(R({ slot: o().min(1, "Введите временной слот") })),
	}),
	p = ({ title: g, description: t, icon: m, children: i }) =>
		e.jsxs("div", {
			className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
			children: [
				e.jsxs("div", {
					className:
						"px-5 py-4 border-b border-gray-100 flex items-center gap-3",
					children: [
						e.jsx("div", {
							className: "p-1.5 bg-green-50 rounded-lg text-green-600",
							children: m,
						}),
						e.jsxs("div", {
							children: [
								e.jsx("h2", {
									className: "text-sm font-semibold text-gray-900",
									children: g,
								}),
								t &&
									e.jsx("p", {
										className: "text-xs text-gray-500",
										children: t,
									}),
							],
						}),
					],
				}),
				e.jsx("div", { className: "p-5", children: i }),
			],
		}),
	fe = () => {
		var _, j, b, f, N, v, k, w, S, C, P, F;
		const g = H(),
			[t, m] = u.useState(null),
			i = u.useRef(null),
			{ data: s, isLoading: A } = J({
				queryKey: ["admin-settings"],
				queryFn: re,
			}),
			d = $({
				mutationFn: (n) => ae(n),
				onSuccess: () => {
					(g.invalidateQueries({ queryKey: ["admin-settings"] }),
						L.success("Настройки сохранены"));
				},
				onError: () => L.error("Не удалось сохранить настройки"),
			}),
			{
				register: a,
				handleSubmit: G,
				reset: h,
				control: B,
				formState: { errors: r, isDirty: D },
			} = O({
				resolver: Z(ue),
				defaultValues: {
					company_name: "",
					company_inn: "",
					company_ogrn: "",
					company_address: "",
					company_phone: "",
					company_email: "",
					company_director: "",
					bank_name: "",
					bank_account: "",
					bik: "",
					corr_account: "",
					tax_rate: 6,
					working_hours: "Пн–Сб: 07:00–19:00",
					delivery_slots: [
						{ slot: "08:00-11:00" },
						{ slot: "11:00-14:00" },
						{ slot: "14:00-17:00" },
					],
				},
			}),
			{
				fields: y,
				append: M,
				remove: Q,
			} = W({ control: B, name: "delivery_slots" });
		u.useEffect(() => {
			s &&
				(h({
					company_name: s.company_name,
					company_inn: s.company_inn,
					company_ogrn: s.company_ogrn ?? "",
					company_address: s.company_address,
					company_phone: s.company_phone,
					company_email: s.company_email,
					company_director: s.company_director,
					bank_name: s.bank_name ?? "",
					bank_account: s.bank_account ?? "",
					bik: s.bik ?? "",
					corr_account: s.corr_account ?? "",
					tax_rate: s.tax_rate,
					working_hours: s.working_hours,
					delivery_slots: s.delivery_slots.map((n) => ({ slot: n })),
				}),
				s.logo_url && m(s.logo_url));
		}, [s, h]);
		const K = (n) => {
				var I;
				const c = (I = n.target.files) == null ? void 0 : I[0];
				if (c) {
					const z = new FileReader();
					((z.onload = (V) => {
						var E;
						return m((E = V.target) == null ? void 0 : E.result);
					}),
						z.readAsDataURL(c));
				}
			},
			U = (n) => {
				d.mutate({
					...n,
					delivery_slots: n.delivery_slots.map((c) => c.slot),
					tax_rate: n.tax_rate,
					logo_url: t ?? (s == null ? void 0 : s.logo_url),
				});
			};
		return A
			? e.jsx(X, {})
			: e.jsxs("form", {
					onSubmit: G(U),
					className: "space-y-6",
					children: [
						e.jsxs("div", {
							className: "flex items-center justify-between",
							children: [
								e.jsxs("div", {
									children: [
										e.jsx("h1", {
											className: "text-2xl font-bold text-gray-900",
											children: "Настройки",
										}),
										e.jsx("p", {
											className: "text-sm text-gray-500 mt-0.5",
											children:
												"Реквизиты компании, слоты доставки и параметры системы",
										}),
									],
								}),
								e.jsx(x, {
									type: "submit",
									variant: "primary",
									loading: d.isPending,
									icon: e.jsx(T, { className: "w-4 h-4" }),
									disabled: !D && !d.isPending,
									children: "Сохранить",
								}),
							],
						}),
						d.isSuccess &&
							e.jsxs("div", {
								className:
									"flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-2",
								children: [
									e.jsx(ne, { className: "w-4 h-4 flex-shrink-0" }),
									e.jsx("span", {
										className: "text-sm",
										children: "Настройки успешно сохранены",
									}),
								],
							}),
						e.jsx(p, {
							title: "Логотип",
							description: "Отображается в заголовке сайта и в документах",
							icon: e.jsx(q, { className: "w-4 h-4" }),
							children: e.jsxs("div", {
								className: "flex items-center gap-4",
								children: [
									e.jsx("div", {
										className: Y(
											"w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-50",
											t ? "border-green-400" : "border-gray-300",
										),
										children: t
											? e.jsx("img", {
													src: t,
													alt: "Логотип",
													className: "w-full h-full object-contain p-2",
												})
											: e.jsx(q, { className: "w-8 h-8 text-gray-300" }),
									}),
									e.jsxs("div", {
										className: "space-y-2",
										children: [
											e.jsx(x, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onClick: () => {
													var n;
													return (n = i.current) == null ? void 0 : n.click();
												},
												icon: e.jsx(oe, { className: "w-4 h-4" }),
												children: t ? "Заменить логотип" : "Загрузить логотип",
											}),
											t &&
												e.jsx(x, {
													type: "button",
													variant: "ghost",
													size: "sm",
													className: "text-red-500 hover:bg-red-50",
													onClick: () => {
														(m(null), i.current && (i.current.value = ""));
													},
													children: "Удалить",
												}),
											e.jsx("p", {
												className: "text-xs text-gray-400",
												children:
													"PNG, JPG, SVG до 2 МБ. Рекомендуется 200×200 px",
											}),
										],
									}),
									e.jsx("input", {
										ref: i,
										type: "file",
										accept: ".png,.jpg,.jpeg,.svg",
										className: "hidden",
										onChange: K,
									}),
								],
							}),
						}),
						e.jsx(p, {
							title: "Реквизиты компании",
							description:
								"Используются в счетах, накладных и других документах",
							icon: e.jsx(ce, { className: "w-4 h-4" }),
							children: e.jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									e.jsx("div", {
										className: "sm:col-span-2",
										children: e.jsx(l, {
											label: "Название организации",
											placeholder: 'ООО "Агрорезерв"',
											error: (_ = r.company_name) == null ? void 0 : _.message,
											...a("company_name"),
										}),
									}),
									e.jsx(l, {
										label: "ИНН",
										placeholder: "7701234567",
										error: (j = r.company_inn) == null ? void 0 : j.message,
										...a("company_inn"),
									}),
									e.jsx(l, {
										label: "ОГРН",
										placeholder: "1027700000000",
										error: (b = r.company_ogrn) == null ? void 0 : b.message,
										...a("company_ogrn"),
									}),
									e.jsx("div", {
										className: "sm:col-span-2",
										children: e.jsx(l, {
											label: "Юридический адрес",
											placeholder: "117218, г. Москва, ул. Профсоюзная, д. 1",
											error:
												(f = r.company_address) == null ? void 0 : f.message,
											...a("company_address"),
										}),
									}),
									e.jsx(l, {
										label: "Телефон",
										placeholder: "+7 (495) 000-00-00",
										leftIcon: e.jsx(le, { className: "w-4 h-4 text-gray-400" }),
										error: (N = r.company_phone) == null ? void 0 : N.message,
										...a("company_phone"),
									}),
									e.jsx(l, {
										label: "Email",
										placeholder: "info@agroreserve.ru",
										leftIcon: e.jsx(te, { className: "w-4 h-4 text-gray-400" }),
										error: (v = r.company_email) == null ? void 0 : v.message,
										...a("company_email"),
									}),
									e.jsx("div", {
										className: "sm:col-span-2",
										children: e.jsx(l, {
											label: "Генеральный директор",
											placeholder: "Иванов Иван Иванович",
											error:
												(k = r.company_director) == null ? void 0 : k.message,
											...a("company_director"),
										}),
									}),
								],
							}),
						}),
						e.jsx(p, {
							title: "Банковские реквизиты",
							description: "Для формирования счетов на оплату",
							icon: e.jsx(ie, { className: "w-4 h-4" }),
							children: e.jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									e.jsx("div", {
										className: "sm:col-span-2",
										children: e.jsx(l, {
											label: "Наименование банка",
											placeholder: 'ПАО "Сбербанк России"',
											error: (w = r.bank_name) == null ? void 0 : w.message,
											...a("bank_name"),
										}),
									}),
									e.jsx(l, {
										label: "Расчётный счёт",
										placeholder: "40702810000000000000",
										error: (S = r.bank_account) == null ? void 0 : S.message,
										...a("bank_account"),
									}),
									e.jsx(l, {
										label: "БИК",
										placeholder: "044525225",
										error: (C = r.bik) == null ? void 0 : C.message,
										...a("bik"),
									}),
									e.jsx("div", {
										className: "sm:col-span-2",
										children: e.jsx(l, {
											label: "Корреспондентский счёт",
											placeholder: "30101810400000000225",
											error: (P = r.corr_account) == null ? void 0 : P.message,
											...a("corr_account"),
										}),
									}),
								],
							}),
						}),
						e.jsx(p, {
							title: "Временные слоты доставки",
							description:
								"Покупатели выбирают удобный промежуток при оформлении заказа",
							icon: e.jsx(pe, { className: "w-4 h-4" }),
							children: e.jsxs("div", {
								className: "space-y-2",
								children: [
									y.map((n, c) =>
										e.jsxs(
											"div",
											{
												className: "flex items-center gap-2",
												children: [
													e.jsx("input", {
														type: "text",
														placeholder: "08:00-11:00",
														className:
															"flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500",
														...a(`delivery_slots.${c}.slot`),
													}),
													e.jsx("button", {
														type: "button",
														onClick: () => Q(c),
														disabled: y.length <= 1,
														className:
															"p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
														children: e.jsx(me, { className: "w-4 h-4" }),
													}),
												],
											},
											n.id,
										),
									),
									e.jsxs("button", {
										type: "button",
										onClick: () => M({ slot: "" }),
										className:
											"flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 py-1",
										children: [
											e.jsx(de, { className: "w-4 h-4" }),
											"Добавить слот",
										],
									}),
								],
							}),
						}),
						e.jsx(p, {
							title: "Общие параметры",
							description: "Ставка налога и часы работы",
							icon: e.jsx(ge, { className: "w-4 h-4" }),
							children: e.jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									e.jsxs("div", {
										children: [
											e.jsx("label", {
												className:
													"block text-sm font-medium text-gray-700 mb-1",
												children: "Ставка налога (%)",
											}),
											e.jsx("input", {
												type: "number",
												min: 0,
												max: 100,
												step: 0.5,
												className:
													"w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500",
												...a("tax_rate", { valueAsNumber: !0 }),
											}),
											r.tax_rate &&
												e.jsx("p", {
													className: "text-xs text-red-500 mt-1",
													children: r.tax_rate.message,
												}),
											e.jsx("p", {
												className: "text-xs text-gray-400 mt-1",
												children: "Применяется для расчёта налога в P&L",
											}),
										],
									}),
									e.jsx(l, {
										label: "Часы работы",
										placeholder: "Пн–Сб: 07:00–19:00",
										leftIcon: e.jsx(xe, { className: "w-4 h-4 text-gray-400" }),
										error: (F = r.working_hours) == null ? void 0 : F.message,
										...a("working_hours"),
									}),
								],
							}),
						}),
						e.jsx("div", {
							className: "flex justify-end pb-4",
							children: e.jsx(x, {
								type: "submit",
								variant: "primary",
								size: "lg",
								loading: d.isPending,
								icon: e.jsx(T, { className: "w-4 h-4" }),
								children: "Сохранить настройки",
							}),
						}),
					],
				});
	};
export { fe as default };
//# sourceMappingURL=AdminSettingsPage-JYI-UUyv.js.map
