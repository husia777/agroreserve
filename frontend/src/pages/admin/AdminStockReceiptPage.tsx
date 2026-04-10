// Приходование товаров (UC-248/249/251/255)
// Калькулятор прибыли с поставки, автонаценка, алерт маржи, учёт расходов
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Plus,
	Trash2,
	Calculator,
	AlertTriangle,
	TrendingUp,
	Truck,
	Receipt,
} from "lucide-react";
import {
	getAdminProducts,
	createStockReceipt,
	getStockReceipts,
} from "@/api/admin";
import { formatPrice, formatDate } from "@/utils/format";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { PageSpinner } from "@/components/ui/Spinner";
import { format } from "date-fns";

const receiptSchema = z.object({
	supplier_name: z.string().min(2, "Укажите поставщика"),
	date: z.string().min(1, "Выберите дату"),
	invoice_number: z.string().optional(),
	note: z.string().optional(),
	items: z
		.array(
			z.object({
				product_id: z.string().min(1, "Выберите товар"),
				quantity: z.coerce.number().min(0.1, "Мин. 0.1"),
				purchase_price: z.coerce.number().min(0.01, "Укажите цену"),
			}),
		)
		.min(1, "Добавьте хотя бы один товар"),
});

type ReceiptFormData = z.infer<typeof receiptSchema>;

// --- Настройки калькулятора прибыли (UC-249/251/255) ---
interface ProfitSettings {
	markupPercent: number; // Наценка по умолчанию, %
	includeUsn: boolean; // Учитывать УСН 6%
	usnRate: number; // Ставка УСН (0.06)
	includeNds: boolean; // Учитывать НДС 5%
	ndsRate: number; // Ставка НДС (0.05)
	transportCost: number; // Транспортные расходы, ₽
	otherCosts: number; // Другие расходы, ₽
	minMarginPercent: number; // Минимальная маржа для алерта, %
}

const DEFAULT_PROFIT_SETTINGS: ProfitSettings = {
	markupPercent: 30,
	includeUsn: true,
	usnRate: 0.06,
	includeNds: false,
	ndsRate: 0.05,
	transportCost: 0,
	otherCosts: 0,
	minMarginPercent: 15,
};

// --- Расчёт прибыли по одной позиции ---
interface ProfitCalcResult {
	revenue: number; // Выручка (цена продажи × кол-во)
	purchaseTotal: number; // Сумма закупки
	usnAmount: number; // УСН
	ndsAmount: number; // НДС
	costShare: number; // Доля расходов (транспорт + другие)
	netProfit: number; // Чистая прибыль
	marginPercent: number; // Маржа, %
	sellPrice: number; // Цена продажи (текущая оптовая из каталога)
	suggestedPrice: number; // Рекомендуемая цена (закупка × (1 + наценка%))
}

export const AdminStockReceiptPage: React.FC = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [showCalculator, setShowCalculator] = useState(false);

	// Настройки калькулятора — сохраняются в localStorage
	const [profitSettings, setProfitSettings] = useState<ProfitSettings>(() => {
		try {
			const saved = localStorage.getItem("agroreserve_profit_settings");
			return saved
				? { ...DEFAULT_PROFIT_SETTINGS, ...JSON.parse(saved) }
				: DEFAULT_PROFIT_SETTINGS;
		} catch {
			return DEFAULT_PROFIT_SETTINGS;
		}
	});

	// Сохранение настроек при изменении
	const updateSettings = (patch: Partial<ProfitSettings>) => {
		const updated = { ...profitSettings, ...patch };
		setProfitSettings(updated);
		localStorage.setItem(
			"agroreserve_profit_settings",
			JSON.stringify(updated),
		);
	};

	const { data: productsData } = useQuery({
		queryKey: ["adminProducts", { page: 1, per_page: 200 }],
		queryFn: () => getAdminProducts({ page: 1, per_page: 200 }),
	});

	const { data: receiptsData, isLoading } = useQuery({
		queryKey: ["adminReceipts"],
		queryFn: () => getStockReceipts({ page: 1, per_page: 30 }),
	});

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ReceiptFormData>({
		resolver: zodResolver(receiptSchema),
		defaultValues: {
			date: format(new Date(), "yyyy-MM-dd"),
			items: [{ product_id: "", quantity: 1, purchase_price: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({ control, name: "items" });

	const watchItems = watch("items");

	// Словарь товаров для быстрого доступа к ценам
	const productsMap = useMemo(() => {
		const map = new Map<string, { name: string; price_wholesale: number }>();
		productsData?.items.forEach((p) => {
			map.set(p.id, {
				name: p.name,
				price_wholesale: p.price_wholesale || 0,
			});
		});
		return map;
	}, [productsData]);

	const totalAmount =
		watchItems?.reduce(
			(sum, item) => sum + (item.quantity || 0) * (item.purchase_price || 0),
			0,
		) || 0;

	// --- UC-248: Расчёт прибыли по каждой позиции ---
	const profitResults = useMemo((): ProfitCalcResult[] => {
		if (!watchItems?.length) return [];

		const totalPurchase = watchItems.reduce(
			(sum, item) => sum + (item.quantity || 0) * (item.purchase_price || 0),
			0,
		);

		return watchItems.map((item) => {
			const qty = item.quantity || 0;
			const purchasePrice = item.purchase_price || 0;
			const purchaseTotal = qty * purchasePrice;
			const product = productsMap.get(item.product_id);
			const sellPrice = product?.price_wholesale || 0;
			const suggestedPrice =
				purchasePrice * (1 + profitSettings.markupPercent / 100);

			const revenue = sellPrice * qty;
			const usnAmount = profitSettings.includeUsn
				? revenue * profitSettings.usnRate
				: 0;
			const ndsAmount = profitSettings.includeNds
				? revenue * profitSettings.ndsRate
				: 0;

			// Распределяем расходы пропорционально доле позиции в общей закупке
			const costShare =
				totalPurchase > 0
					? ((profitSettings.transportCost + profitSettings.otherCosts) *
							purchaseTotal) /
						totalPurchase
					: 0;

			const netProfit =
				revenue - usnAmount - ndsAmount - purchaseTotal - costShare;
			const marginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;

			return {
				revenue,
				purchaseTotal,
				usnAmount,
				ndsAmount,
				costShare,
				netProfit,
				marginPercent,
				sellPrice,
				suggestedPrice,
			};
		});
	}, [watchItems, profitSettings, productsMap]);

	// Итого по калькулятору
	const profitTotals = useMemo(() => {
		const totals = profitResults.reduce(
			(acc, r) => ({
				revenue: acc.revenue + r.revenue,
				purchaseTotal: acc.purchaseTotal + r.purchaseTotal,
				usnAmount: acc.usnAmount + r.usnAmount,
				ndsAmount: acc.ndsAmount + r.ndsAmount,
				costShare: acc.costShare + r.costShare,
				netProfit: acc.netProfit + r.netProfit,
			}),
			{
				revenue: 0,
				purchaseTotal: 0,
				usnAmount: 0,
				ndsAmount: 0,
				costShare: 0,
				netProfit: 0,
			},
		);
		return {
			...totals,
			marginPercent:
				totals.revenue > 0 ? (totals.netProfit / totals.revenue) * 100 : 0,
		};
	}, [profitResults]);

	// UC-251: Есть ли позиции с маржой ниже порога
	const lowMarginItems = profitResults.filter(
		(r, i) =>
			r.sellPrice > 0 &&
			r.marginPercent < profitSettings.minMarginPercent &&
			watchItems?.[i]?.product_id,
	);

	const { mutate: saveReceipt } = useMutation({
		mutationFn: (data: ReceiptFormData) => createStockReceipt(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminReceipts"] });
			queryClient.invalidateQueries({ queryKey: ["adminStock"] });
			showToast.success("Приходная накладная создана");
			setShowForm(false);
			setShowCalculator(false);
		},
		onError: () => showToast.error("Ошибка при сохранении"),
	});

	const productOptions =
		productsData?.items.map((p) => ({ value: p.id, label: p.name })) || [];

	return (
		<div className="p-6 space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">
					Приходование товара
				</h1>
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
					<h2 className="text-base font-semibold text-gray-900 mb-4">
						Новый приход
					</h2>
					<form
						onSubmit={handleSubmit((data) => saveReceipt(data))}
						className="space-y-4"
					>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<Input
								label="Поставщик"
								placeholder="ИП Ваш поставщик"
								error={errors.supplier_name?.message}
								required
								{...register("supplier_name")}
							/>
							<Input
								label="Дата"
								type="date"
								error={errors.date?.message}
								required
								{...register("date")}
							/>
							<Input
								label="Номер накладной"
								placeholder="НК-001"
								{...register("invoice_number")}
							/>
						</div>

						{/* Позиции */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-sm font-semibold text-gray-900">Товары</h3>
								<button
									type="button"
									onClick={() =>
										append({ product_id: "", quantity: 1, purchase_price: 0 })
									}
									className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
								>
									<Plus className="w-4 h-4" /> Добавить строку
								</button>
							</div>

							<div className="space-y-3">
								{fields.map((field, index) => {
									const result = profitResults[index];
									const isLowMargin =
										result &&
										result.sellPrice > 0 &&
										result.marginPercent < profitSettings.minMarginPercent &&
										watchItems?.[index]?.product_id;

									return (
										<div key={field.id} className="space-y-1">
											<div className="flex gap-3 items-start">
												<div className="flex-1">
													<select
														{...register(`items.${index}.product_id`)}
														className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
													>
														<option value="">Выберите товар</option>
														{productOptions.map((opt) => (
															<option key={opt.value} value={opt.value}>
																{opt.label}
															</option>
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
													{formatPrice(
														(watchItems?.[index]?.quantity || 0) *
															(watchItems?.[index]?.purchase_price || 0),
													)}
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

											{/* UC-249: Рекомендуемая цена продажи */}
											{showCalculator &&
												result &&
												watchItems?.[index]?.purchase_price > 0 &&
												watchItems?.[index]?.product_id && (
													<div className="ml-0 sm:ml-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
														<span className="text-gray-500">
															Текущая опт:{" "}
															<span className="font-medium text-gray-700">
																{formatPrice(result.sellPrice)}
															</span>
														</span>
														<span className="text-gray-500">
															Рекомендуемая ({profitSettings.markupPercent}%):{" "}
															<span className="font-medium text-primary-600">
																{formatPrice(result.suggestedPrice)}
															</span>
														</span>
														{/* UC-251: Алерт низкой маржи */}
														{isLowMargin && (
															<span className="inline-flex items-center gap-1 text-amber-600 font-medium">
																<AlertTriangle className="w-3.5 h-3.5" />
																Маржа {result.marginPercent.toFixed(1)}% &lt;{" "}
																{profitSettings.minMarginPercent}%
															</span>
														)}
													</div>
												)}
										</div>
									);
								})}
							</div>

							<div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
								<button
									type="button"
									onClick={() => setShowCalculator(!showCalculator)}
									className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1.5"
								>
									<Calculator className="w-4 h-4" />
									{showCalculator ? "Скрыть калькулятор" : "Рассчитать прибыль"}
								</button>
								<span className="font-bold text-gray-900">
									Итого закупка: {formatPrice(totalAmount)}
								</span>
							</div>
						</div>

						{/* UC-248/255: Калькулятор прибыли с поставки */}
						{showCalculator && (
							<div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
								<div className="flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-primary-600" />
									<h3 className="text-sm font-bold text-gray-900">
										Калькулятор прибыли с поставки
									</h3>
								</div>

								{/* Настройки */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
									{/* UC-249: Наценка */}
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Наценка, %
										</label>
										<input
											type="number"
											step="1"
											value={profitSettings.markupPercent}
											onChange={(e) =>
												updateSettings({
													markupPercent: parseFloat(e.target.value) || 0,
												})
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
										/>
									</div>

									{/* UC-251: Минимальная маржа */}
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Мин. маржа, %
										</label>
										<input
											type="number"
											step="1"
											value={profitSettings.minMarginPercent}
											onChange={(e) =>
												updateSettings({
													minMarginPercent: parseFloat(e.target.value) || 0,
												})
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
										/>
									</div>

									{/* UC-255: Транспорт */}
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
											<Truck className="w-3.5 h-3.5" /> Транспорт, ₽
										</label>
										<input
											type="number"
											step="100"
											value={profitSettings.transportCost}
											onChange={(e) =>
												updateSettings({
													transportCost: parseFloat(e.target.value) || 0,
												})
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
										/>
									</div>

									{/* UC-255: Другие расходы */}
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
											<Receipt className="w-3.5 h-3.5" /> Другие расходы, ₽
										</label>
										<input
											type="number"
											step="100"
											value={profitSettings.otherCosts}
											onChange={(e) =>
												updateSettings({
													otherCosts: parseFloat(e.target.value) || 0,
												})
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
										/>
									</div>
								</div>

								{/* Переключатели налогов */}
								<div className="flex flex-wrap gap-4">
									<label className="flex items-center gap-2 cursor-pointer">
										<input
											type="checkbox"
											checked={profitSettings.includeUsn}
											onChange={(e) =>
												updateSettings({ includeUsn: e.target.checked })
											}
											className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
										/>
										<span className="text-sm text-gray-700">УСН 6%</span>
									</label>
									<label className="flex items-center gap-2 cursor-pointer">
										<input
											type="checkbox"
											checked={profitSettings.includeNds}
											onChange={(e) =>
												updateSettings({ includeNds: e.target.checked })
											}
											className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
										/>
										<span className="text-sm text-gray-700">НДС 5%</span>
									</label>
								</div>

								{/* UC-251: Глобальный алерт низкой маржи */}
								{lowMarginItems.length > 0 && (
									<div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
										<AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
										<div className="text-sm text-amber-800">
											<span className="font-semibold">Внимание:</span>{" "}
											{lowMarginItems.length}{" "}
											{lowMarginItems.length === 1
												? "позиция"
												: lowMarginItems.length < 5
													? "позиции"
													: "позиций"}{" "}
											с маржой ниже {profitSettings.minMarginPercent}%.
											Рассмотрите повышение цены продажи.
										</div>
									</div>
								)}

								{/* Результаты по позициям */}
								{profitResults.some((r) => r.sellPrice > 0) && (
									<div className="overflow-x-auto">
										<table className="w-full text-sm">
											<thead className="bg-white border-b border-gray-200">
												<tr>
													<th className="px-3 py-2 text-left text-xs font-semibold text-gray-500">
														Товар
													</th>
													<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
														Закупка
													</th>
													<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
														Выручка
													</th>
													{profitSettings.includeUsn && (
														<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
															УСН
														</th>
													)}
													{profitSettings.includeNds && (
														<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
															НДС
														</th>
													)}
													{(profitSettings.transportCost > 0 ||
														profitSettings.otherCosts > 0) && (
														<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
															Расходы
														</th>
													)}
													<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
														Прибыль
													</th>
													<th className="px-3 py-2 text-right text-xs font-semibold text-gray-500">
														Маржа
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-100">
												{profitResults.map((result, index) => {
													if (
														!watchItems?.[index]?.product_id ||
														result.sellPrice === 0
													)
														return null;
													const product = productsMap.get(
														watchItems[index].product_id,
													);
													const isLow =
														result.marginPercent <
														profitSettings.minMarginPercent;

													return (
														<tr
															key={index}
															className={isLow ? "bg-amber-50/50" : ""}
														>
															<td className="px-3 py-2 text-gray-900 font-medium max-w-[200px] truncate">
																{product?.name || "—"}
															</td>
															<td className="px-3 py-2 text-right text-gray-700">
																{formatPrice(result.purchaseTotal)}
															</td>
															<td className="px-3 py-2 text-right text-gray-700">
																{formatPrice(result.revenue)}
															</td>
															{profitSettings.includeUsn && (
																<td className="px-3 py-2 text-right text-gray-500">
																	−{formatPrice(result.usnAmount)}
																</td>
															)}
															{profitSettings.includeNds && (
																<td className="px-3 py-2 text-right text-gray-500">
																	−{formatPrice(result.ndsAmount)}
																</td>
															)}
															{(profitSettings.transportCost > 0 ||
																profitSettings.otherCosts > 0) && (
																<td className="px-3 py-2 text-right text-gray-500">
																	−{formatPrice(result.costShare)}
																</td>
															)}
															<td
																className={`px-3 py-2 text-right font-bold ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
															>
																{formatPrice(result.netProfit)}
															</td>
															<td
																className={`px-3 py-2 text-right font-semibold ${isLow ? "text-amber-600" : result.marginPercent >= 0 ? "text-green-600" : "text-red-600"}`}
															>
																{result.marginPercent.toFixed(1)}%
															</td>
														</tr>
													);
												})}
											</tbody>
											{/* Итого */}
											<tfoot className="border-t-2 border-gray-300 bg-white">
												<tr className="font-bold">
													<td className="px-3 py-2.5 text-gray-900">Итого</td>
													<td className="px-3 py-2.5 text-right text-gray-900">
														{formatPrice(profitTotals.purchaseTotal)}
													</td>
													<td className="px-3 py-2.5 text-right text-gray-900">
														{formatPrice(profitTotals.revenue)}
													</td>
													{profitSettings.includeUsn && (
														<td className="px-3 py-2.5 text-right text-gray-600">
															−{formatPrice(profitTotals.usnAmount)}
														</td>
													)}
													{profitSettings.includeNds && (
														<td className="px-3 py-2.5 text-right text-gray-600">
															−{formatPrice(profitTotals.ndsAmount)}
														</td>
													)}
													{(profitSettings.transportCost > 0 ||
														profitSettings.otherCosts > 0) && (
														<td className="px-3 py-2.5 text-right text-gray-600">
															−{formatPrice(profitTotals.costShare)}
														</td>
													)}
													<td
														className={`px-3 py-2.5 text-right ${profitTotals.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
													>
														{formatPrice(profitTotals.netProfit)}
													</td>
													<td
														className={`px-3 py-2.5 text-right ${profitTotals.marginPercent < profitSettings.minMarginPercent ? "text-amber-600" : profitTotals.marginPercent >= 0 ? "text-green-600" : "text-red-600"}`}
													>
														{profitTotals.marginPercent.toFixed(1)}%
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
								)}

								{/* Сводная карточка */}
								{profitTotals.revenue > 0 && (
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
										<div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
											<div className="text-xs text-gray-500 mb-1">Выручка</div>
											<div className="text-lg font-bold text-gray-900">
												{formatPrice(profitTotals.revenue)}
											</div>
										</div>
										<div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
											<div className="text-xs text-gray-500 mb-1">
												Расходы всего
											</div>
											<div className="text-lg font-bold text-gray-700">
												{formatPrice(
													profitTotals.purchaseTotal +
														profitTotals.usnAmount +
														profitTotals.ndsAmount +
														profitTotals.costShare,
												)}
											</div>
										</div>
										<div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
											<div className="text-xs text-gray-500 mb-1">
												Чистая прибыль
											</div>
											<div
												className={`text-lg font-bold ${profitTotals.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
											>
												{formatPrice(profitTotals.netProfit)}
											</div>
										</div>
										<div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
											<div className="text-xs text-gray-500 mb-1">Маржа</div>
											<div
												className={`text-lg font-bold ${profitTotals.marginPercent < profitSettings.minMarginPercent ? "text-amber-600" : profitTotals.marginPercent >= 0 ? "text-green-600" : "text-red-600"}`}
											>
												{profitTotals.marginPercent.toFixed(1)}%
											</div>
										</div>
									</div>
								)}
							</div>
						)}

						<div className="flex items-center gap-3">
							<Button type="submit" variant="primary" loading={isSubmitting}>
								Сохранить приход
							</Button>
							<Button
								type="button"
								variant="secondary"
								onClick={() => setShowForm(false)}
							>
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
					<div className="py-8 text-center text-gray-400 text-sm">
						Приходов нет
					</div>
				) : (
					<table className="w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100">
							<tr>
								<th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
									Номер
								</th>
								<th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
									Поставщик
								</th>
								<th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
									Дата
								</th>
								<th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
									Сумма
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{receiptsData.items.map((receipt) => (
								<tr key={receipt.id} className="hover:bg-gray-50/50">
									<td className="px-5 py-3 font-medium text-gray-900">
										{receipt.receipt_number}
									</td>
									<td className="px-5 py-3 text-gray-700">
										{receipt.supplier_name}
									</td>
									<td className="px-5 py-3 text-gray-500 hidden md:table-cell">
										{formatDate(receipt.date)}
									</td>
									<td className="px-5 py-3 text-right font-semibold text-gray-900">
										{formatPrice(receipt.total)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default AdminStockReceiptPage;
