// Страница настроек системы (UC-66 — UC-70)
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Building2,
	CreditCard,
	Clock,
	Upload,
	PlusCircle,
	Trash2,
	Save,
	Settings,
	Globe,
	Phone,
	Mail,
	Image,
	CheckCircle,
} from "lucide-react";
import { getSettings, updateSettings } from "@/api/admin";
import { Settings as AppSettings } from "@/types";
import { cn } from "@/utils/cn";
import { PageSpinner } from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

// --- Схемы ---

const settingsSchema = z.object({
	company_name: z.string().min(2, "Укажите название компании"),
	company_inn: z
		.string()
		.min(10, "ИНН минимум 10 символов")
		.max(12, "ИНН максимум 12 символов"),
	company_ogrn: z.string().optional(),
	company_address: z.string().min(5, "Укажите адрес"),
	company_phone: z.string().min(7, "Укажите телефон"),
	company_email: z.string().email("Некорректный email"),
	company_director: z.string().min(2, "Укажите руководителя"),
	bank_name: z.string().optional(),
	bank_account: z.string().optional(),
	bik: z.string().optional(),
	corr_account: z.string().optional(),
	tax_rate: z
		.number({ invalid_type_error: "Введите ставку налога" })
		.min(0)
		.max(100),
	working_hours: z.string().min(3, "Укажите часы работы"),
	delivery_slots: z.array(
		z.object({ slot: z.string().min(1, "Введите временной слот") }),
	),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// --- Блок-раздел ---
const Section: React.FC<{
	title: string;
	description?: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}> = ({ title, description, icon, children }) => (
	<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
		<div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
			<div className="p-1.5 bg-green-50 rounded-lg text-green-600">{icon}</div>
			<div>
				<h2 className="text-sm font-semibold text-gray-900">{title}</h2>
				{description && <p className="text-xs text-gray-500">{description}</p>}
			</div>
		</div>
		<div className="p-5">{children}</div>
	</div>
);

// --- Главная страница ---
const AdminSettingsPage: React.FC = () => {
	const queryClient = useQueryClient();

	// Логотип для предпросмотра
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const logoInputRef = useRef<HTMLInputElement>(null);

	// Запрос настроек
	const { data: settings, isLoading } = useQuery({
		queryKey: ["admin-settings"],
		queryFn: getSettings,
	});

	// Мутация сохранения
	const saveMutation = useMutation({
		mutationFn: (data: Partial<AppSettings>) => updateSettings(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
			toast.success("Настройки сохранены");
		},
		onError: () => toast.error("Не удалось сохранить настройки"),
	});

	// Форма
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isDirty },
	} = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsSchema),
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
	});

	// Слоты доставки
	const {
		fields: slotFields,
		append: appendSlot,
		remove: removeSlot,
	} = useFieldArray({
		control,
		name: "delivery_slots",
	});

	// Заполнение формы при загрузке настроек
	useEffect(() => {
		if (settings) {
			reset({
				company_name: settings.company_name,
				company_inn: settings.company_inn,
				company_ogrn: settings.company_ogrn ?? "",
				company_address: settings.company_address,
				company_phone: settings.company_phone,
				company_email: settings.company_email,
				company_director: settings.company_director,
				bank_name: settings.bank_name ?? "",
				bank_account: settings.bank_account ?? "",
				bik: settings.bik ?? "",
				corr_account: settings.corr_account ?? "",
				tax_rate: settings.tax_rate,
				working_hours: settings.working_hours,
				delivery_slots: settings.delivery_slots.map((s) => ({ slot: s })),
			});
			if (settings.logo_url) setLogoPreview(settings.logo_url);
		}
	}, [settings, reset]);

	// Обработка логотипа
	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
			reader.readAsDataURL(file);
		}
	};

	// Сохранение формы
	const onSubmit = (values: SettingsFormValues) => {
		saveMutation.mutate({
			...values,
			delivery_slots: values.delivery_slots.map((s) => s.slot),
			tax_rate: values.tax_rate,
			logo_url: logoPreview ?? settings?.logo_url,
		});
	};

	if (isLoading) return <PageSpinner />;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Заголовок */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						Реквизиты компании, слоты доставки и параметры системы
					</p>
				</div>
				<Button
					type="submit"
					variant="primary"
					loading={saveMutation.isPending}
					icon={<Save className="w-4 h-4" />}
					disabled={!isDirty && !saveMutation.isPending}
				>
					Сохранить
				</Button>
			</div>

			{/* Уведомление об успехе */}
			{saveMutation.isSuccess && (
				<div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-2">
					<CheckCircle className="w-4 h-4 flex-shrink-0" />
					<span className="text-sm">Настройки успешно сохранены</span>
				</div>
			)}

			{/* Логотип */}
			<Section
				title="Логотип"
				description="Отображается в заголовке сайта и в документах"
				icon={<Image className="w-4 h-4" />}
			>
				<div className="flex items-center gap-4">
					{/* Предпросмотр */}
					<div
						className={cn(
							"w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-50",
							logoPreview ? "border-green-400" : "border-gray-300",
						)}
					>
						{logoPreview ? (
							<img
								src={logoPreview}
								alt="Логотип"
								className="w-full h-full object-contain p-2"
							/>
						) : (
							<Image className="w-8 h-8 text-gray-300" />
						)}
					</div>

					<div className="space-y-2">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => logoInputRef.current?.click()}
							icon={<Upload className="w-4 h-4" />}
						>
							{logoPreview ? "Заменить логотип" : "Загрузить логотип"}
						</Button>
						{logoPreview && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="text-red-500 hover:bg-red-50"
								onClick={() => {
									setLogoPreview(null);
									if (logoInputRef.current) logoInputRef.current.value = "";
								}}
							>
								Удалить
							</Button>
						)}
						<p className="text-xs text-gray-400">
							PNG, JPG, SVG до 2 МБ. Рекомендуется 200×200 px
						</p>
					</div>

					<input
						ref={logoInputRef}
						type="file"
						accept=".png,.jpg,.jpeg,.svg"
						className="hidden"
						onChange={handleLogoChange}
					/>
				</div>
			</Section>

			{/* Реквизиты компании */}
			<Section
				title="Реквизиты компании"
				description="Используются в счетах, накладных и других документах"
				icon={<Building2 className="w-4 h-4" />}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="sm:col-span-2">
						<Input
							label="Название организации"
							placeholder='ООО "Агрорезерв"'
							error={errors.company_name?.message}
							{...register("company_name")}
						/>
					</div>

					<Input
						label="ИНН"
						placeholder="7701234567"
						error={errors.company_inn?.message}
						{...register("company_inn")}
					/>
					<Input
						label="ОГРН"
						placeholder="1027700000000"
						error={errors.company_ogrn?.message}
						{...register("company_ogrn")}
					/>

					<div className="sm:col-span-2">
						<Input
							label="Юридический адрес"
							placeholder="117218, г. Москва, ул. Профсоюзная, д. 1"
							error={errors.company_address?.message}
							{...register("company_address")}
						/>
					</div>

					<Input
						label="Телефон"
						placeholder="+7 (495) 000-00-00"
						leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
						error={errors.company_phone?.message}
						{...register("company_phone")}
					/>
					<Input
						label="Email"
						placeholder="info@agroreserve.ru"
						leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
						error={errors.company_email?.message}
						{...register("company_email")}
					/>

					<div className="sm:col-span-2">
						<Input
							label="Генеральный директор"
							placeholder="Иванов Иван Иванович"
							error={errors.company_director?.message}
							{...register("company_director")}
						/>
					</div>
				</div>
			</Section>

			{/* Банковские реквизиты */}
			<Section
				title="Банковские реквизиты"
				description="Для формирования счетов на оплату"
				icon={<CreditCard className="w-4 h-4" />}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="sm:col-span-2">
						<Input
							label="Наименование банка"
							placeholder='ПАО "Сбербанк России"'
							error={errors.bank_name?.message}
							{...register("bank_name")}
						/>
					</div>
					<Input
						label="Расчётный счёт"
						placeholder="40702810000000000000"
						error={errors.bank_account?.message}
						{...register("bank_account")}
					/>
					<Input
						label="БИК"
						placeholder="044525225"
						error={errors.bik?.message}
						{...register("bik")}
					/>
					<div className="sm:col-span-2">
						<Input
							label="Корреспондентский счёт"
							placeholder="30101810400000000225"
							error={errors.corr_account?.message}
							{...register("corr_account")}
						/>
					</div>
				</div>
			</Section>

			{/* Слоты доставки */}
			<Section
				title="Временные слоты доставки"
				description="Покупатели выбирают удобный промежуток при оформлении заказа"
				icon={<Clock className="w-4 h-4" />}
			>
				<div className="space-y-2">
					{slotFields.map((field, index) => (
						<div key={field.id} className="flex items-center gap-2">
							<input
								type="text"
								placeholder="08:00-11:00"
								className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
								{...register(`delivery_slots.${index}.slot`)}
							/>
							<button
								type="button"
								onClick={() => removeSlot(index)}
								disabled={slotFields.length <= 1}
								className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					))}

					<button
						type="button"
						onClick={() => appendSlot({ slot: "" })}
						className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 py-1"
					>
						<PlusCircle className="w-4 h-4" />
						Добавить слот
					</button>
				</div>
			</Section>

			{/* Общие настройки */}
			<Section
				title="Общие параметры"
				description="Ставка налога и часы работы"
				icon={<Settings className="w-4 h-4" />}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Ставка налога (%)
						</label>
						<input
							type="number"
							min={0}
							max={100}
							step={0.5}
							className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
							{...register("tax_rate", { valueAsNumber: true })}
						/>
						{errors.tax_rate && (
							<p className="text-xs text-red-500 mt-1">
								{errors.tax_rate.message}
							</p>
						)}
						<p className="text-xs text-gray-400 mt-1">
							Применяется для расчёта налога в P&L
						</p>
					</div>

					<Input
						label="Часы работы"
						placeholder="Пн–Сб: 07:00–19:00"
						leftIcon={<Globe className="w-4 h-4 text-gray-400" />}
						error={errors.working_hours?.message}
						{...register("working_hours")}
					/>
				</div>
			</Section>

			{/* Кнопка сохранения снизу */}
			<div className="flex justify-end pb-4">
				<Button
					type="submit"
					variant="primary"
					size="lg"
					loading={saveMutation.isPending}
					icon={<Save className="w-4 h-4" />}
				>
					Сохранить настройки
				</Button>
			</div>
		</form>
	);
};

export default AdminSettingsPage;
