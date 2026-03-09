// Форма добавления/редактирования товара с загрузкой фото
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminCategories, createProduct, updateProduct, getAdminProducts } from '@/api/admin'
import { apiClient } from '@/api/client'
import { UnitType } from '@/types'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { showToast } from '@/components/ui/Toast'
import { ImagePlus, X, Loader2 } from 'lucide-react'

const productSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Выберите категорию'),
  price_retail: z.coerce.number().min(0.01, 'Укажите розничную цену'),
  price_wholesale: z.coerce.number().min(0.01, 'Укажите оптовую цену'),
  price_purchase: z.coerce.number().min(0, 'Укажите закупочную цену'),
  unit: z.nativeEnum(UnitType),
  unit_weight: z.coerce.number().optional(),
  min_order_qty: z.coerce.number().min(0.1, 'Минимум 0.1'),
  order_step: z.coerce.number().min(0.1, 'Минимум 0.1'),
  min_stock_quantity: z.coerce.number().min(0),
  country_of_origin: z.string().min(2, 'Укажите страну'),
  storage_conditions: z.string().optional(),
  is_active: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

const UNIT_OPTIONS = [
  { value: UnitType.KG, label: 'Килограммы (кг)' },
  { value: UnitType.PIECE, label: 'Штуки (шт)' },
  { value: UnitType.LITER, label: 'Литры (л)' },
  { value: UnitType.BOX, label: 'Ящик' },
  { value: UnitType.BAG, label: 'Мешок' },
]

export const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id && id !== 'new'
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Список URL загруженных фото
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const { data: categories } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: getAdminCategories,
  })

  const { data: existingProducts } = useQuery({
    queryKey: ['adminProducts', { page: 1 }],
    queryFn: () => getAdminProducts({ page: 1, per_page: 100 }),
    enabled: isEditing,
  })

  const existingProduct = existingProducts?.items.find((p) => p.id === id)

  const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			unit: UnitType.KG,
			min_order_qty: 1,
			order_step: 1,
			min_stock_quantity: 5,
			is_active: true,
			country_of_origin: "Россия",
		},
	});

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        description: existingProduct.description || '',
        category_id: existingProduct.category_id,
        price_retail: existingProduct.price_retail,
        price_wholesale: existingProduct.price_wholesale,
        price_purchase: existingProduct.price_purchase,
        unit: existingProduct.unit as UnitType,
        unit_weight: existingProduct.unit_weight,
        min_order_qty: existingProduct.min_order_qty,
        order_step: existingProduct.order_step,
        min_stock_quantity: existingProduct.min_stock_quantity,
        country_of_origin: existingProduct.country_of_origin,
        storage_conditions: existingProduct.storage_conditions,
        is_active: existingProduct.is_active,
      })
      if (existingProduct.images?.length) {
        setImages(existingProduct.images)
      }
    }
  }, [existingProduct, reset])

  // Загрузка файла
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          showToast.error(`${file.name}: файл больше 5 МБ`)
          continue
        }
        const formData = new FormData()
        formData.append('file', file)
        const res = await apiClient.post<{ url: string }>(
          '/admin/catalog/products/upload-image',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        setImages((prev) => [...prev, res.data.url])
      }
      showToast.success('Фото загружено')
    } catch {
      showToast.error('Ошибка загрузки фото')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Удаление фото из списка
  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const saveMutation = useMutation({
    mutationFn: (data: ProductFormData) => {
      const payload = { ...data, images }
      return isEditing ? updateProduct(id!, payload) : createProduct(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] })
      showToast.success(isEditing ? 'Товар обновлён' : 'Товар создан')
      navigate('/admin/catalog')
    },
    onError: () => showToast.error('Ошибка при сохранении'),
  })

  const onSubmit = handleSubmit((data) => saveMutation.mutate(data))

  const categoryOptions = [
    { value: '', label: 'Выберите категорию' },
    ...(categories || []).map((c) => ({ value: c.id, label: c.name })),
  ]

  const watchUnit = watch('unit')

  return (
		<div className="p-6 space-y-5 max-w-3xl">
			<Breadcrumbs
				items={[
					{ label: "Каталог", href: "/admin/catalog" },
					{ label: isEditing ? "Редактировать товар" : "Новый товар" },
				]}
				showHome={false}
			/>
			<h1 className="text-2xl font-bold text-gray-900">
				{isEditing ? "Редактировать товар" : "Новый товар"}
			</h1>

			<form onSubmit={onSubmit} className="space-y-6">
				{/* Фото товара */}
				<div className="bg-white rounded-xl border border-gray-200 p-5">
					<h2 className="text-base font-semibold text-gray-900 mb-4">
						Фото товара
					</h2>
					<div className="flex flex-wrap gap-3">
						{images.map((url, idx) => (
							<div
								key={idx}
								className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200"
							>
								<img src={url} alt="" className="w-full h-full object-cover" />
								<button
									type="button"
									onClick={() => removeImage(idx)}
									className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<X className="w-3.5 h-3.5" />
								</button>
								{idx === 0 && (
									<span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">
										Главное
									</span>
								)}
							</div>
						))}

						{/* Кнопка добавления */}
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							disabled={uploading}
							className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-400 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-green-500 transition-colors disabled:opacity-50"
						>
							{uploading ? (
								<Loader2 className="w-6 h-6 animate-spin" />
							) : (
								<>
									<ImagePlus className="w-6 h-6" />
									<span className="text-[10px]">Добавить</span>
								</>
							)}
						</button>
					</div>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/jpeg,image/png,image/webp"
						multiple
						onChange={handleFileUpload}
						className="hidden"
					/>
					<p className="text-xs text-gray-400 mt-2">
						JPG, PNG или WebP. До 5 МБ. Первое фото — главное.
					</p>
				</div>

				{/* Основное */}
				<div className="bg-white rounded-xl border border-gray-200 p-5">
					<h2 className="text-base font-semibold text-gray-900 mb-4">
						Основная информация
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="sm:col-span-2">
							<Input
								label="Название товара"
								placeholder="Например: Томаты черри"
								error={errors.name?.message}
								required
								{...register("name")}
							/>
						</div>
						<Select
							label="Категория"
							options={categoryOptions}
							placeholder="Выберите категорию"
							error={errors.category_id?.message}
							required
							{...register("category_id")}
						/>
						<Input
							label="Страна происхождения"
							placeholder="Россия"
							error={errors.country_of_origin?.message}
							required
							{...register("country_of_origin")}
						/>
						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Описание
							</label>
							<textarea
								{...register("description")}
								rows={3}
								placeholder="Описание товара..."
								className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
						</div>
						<Input
							label="Условия хранения"
							placeholder="+2–6°C, без прямых солнечных лучей"
							{...register("storage_conditions")}
						/>
						<div className="flex items-center gap-3 pt-6">
							<input
								type="checkbox"
								id="is_active"
								className="w-4 h-4 rounded text-primary-600"
								{...register("is_active")}
							/>
							<label
								htmlFor="is_active"
								className="text-sm font-medium text-gray-700"
							>
								Товар активен (отображается в каталоге)
							</label>
						</div>
					</div>
				</div>

				{/* Цены */}
				<div className="bg-white rounded-xl border border-gray-200 p-5">
					<h2 className="text-base font-semibold text-gray-900 mb-4">Цены</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<Input
							label="Закупочная цена (₽/ед.)"
							type="number"
							step="0.01"
							placeholder="0.00"
							error={errors.price_purchase?.message}
							required
							{...register("price_purchase")}
						/>
						<Input
							label="Оптовая цена (₽/ед.)"
							type="number"
							step="0.01"
							placeholder="0.00"
							error={errors.price_wholesale?.message}
							required
							{...register("price_wholesale")}
						/>
						<Input
							label="Розничная цена (₽/ед.)"
							type="number"
							step="0.01"
							placeholder="0.00"
							error={errors.price_retail?.message}
							required
							{...register("price_retail")}
						/>
					</div>
				</div>

				{/* Единицы */}
				<div className="bg-white rounded-xl border border-gray-200 p-5">
					<h2 className="text-base font-semibold text-gray-900 mb-4">
						Единицы и количество
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<Select
							label="Единица измерения"
							options={UNIT_OPTIONS}
							error={errors.unit?.message}
							required
							{...register("unit")}
						/>
						{watchUnit === UnitType.PIECE && (
							<Input
								label="Средний вес штуки (кг)"
								type="number"
								step="0.001"
								placeholder="0.15"
								hint="Для поштучного калькулятора"
								error={errors.unit_weight?.message}
								{...register("unit_weight")}
							/>
						)}
						<Input
							label="Минимальный заказ"
							type="number"
							step="0.5"
							placeholder="1"
							error={errors.min_order_qty?.message}
							required
							{...register("min_order_qty")}
						/>
						<Input
							label="Шаг изменения количества"
							type="number"
							step="0.1"
							placeholder="1"
							error={errors.order_step?.message}
							required
							{...register("order_step")}
						/>
						<Input
							label="Минимальный остаток"
							type="number"
							step="1"
							placeholder="5"
							hint="При достижении — оповещение"
							error={errors.min_stock_quantity?.message}
							{...register("min_stock_quantity")}
						/>
					</div>
				</div>

				{/* Кнопки */}
				<div className="flex items-center gap-3">
					<Button
						type="submit"
						variant="primary"
						loading={isSubmitting || saveMutation.isPending}
						size="lg"
					>
						{isEditing ? "Сохранить изменения" : "Создать товар"}
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="lg"
						onClick={() => navigate("/admin/catalog")}
					>
						Отмена
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AdminProductForm
