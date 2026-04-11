// Страница генерации ярлыков/этикеток для печати на упаковку (UC-22)
import React, { useState, useMemo, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Tag,
  Search,
  Plus,
  Trash2,
  Eye,
  Printer,
  X,
  ChevronDown,
  Package,
  AlertCircle,
  FileText,
  Loader2,
} from 'lucide-react'
import { getProductsForLabels, generateLabelsPdf, previewLabel } from '@/api/admin'

// ── Типы ────────────────────────────────────────────────────────

interface ProductForLabel {
  _id: string
  name: string
  origin_country: string
  storage_conditions: string | null
  shelf_life_days: number | null
  unit: string
  certificate_number: string | null
  certificate_type: string | null
}

interface LabelItem {
  id: string
  product_id: string
  product_name: string
  packing_date: string
  net_weight: string
  copies: number
}

type LabelsPerPage = 6 | 8 | 12 | 24

// ── Константы ───────────────────────────────────────────────────

const LABELS_PER_PAGE_OPTIONS: { value: LabelsPerPage; label: string }[] = [
  { value: 6, label: '6 (2×3, крупные)' },
  { value: 8, label: '8 (2×4, средние)' },
  { value: 12, label: '12 (3×4, мелкие)' },
  { value: 24, label: '24 (4×6, микро)' },
]

const TODAY = new Date().toISOString().slice(0, 10)

let _itemIdCounter = 0
const nextItemId = (): string => `label-${++_itemIdCounter}`

// ── Компонент: Выбор товара ─────────────────────────────────────

const ProductSelector: React.FC<{
  products: ProductForLabel[]
  onSelect: (product: ProductForLabel) => void
  isLoading: boolean
}> = ({ products, onSelect, isLoading }) => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(q))
  }, [products, search])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 transition-colors hover:border-green-400"
        onClick={() => setOpen(!open)}
      >
        <Plus className="h-4 w-4 flex-shrink-0 text-green-600" />
        <span className="text-sm text-gray-500">Добавить товар...</span>
        <ChevronDown
          className={`ml-auto h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 flex max-h-80 w-full flex-col rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товара..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-gray-200 py-2 pl-8 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="text-sm">Загрузка...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-400">
                {search ? 'Ничего не найдено' : 'Нет активных товаров'}
              </div>
            ) : (
              filtered.map((product) => (
                <button
                  key={product._id}
                  onClick={() => {
                    onSelect(product)
                    setSearch('')
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-3 border-b border-gray-50 px-3 py-2.5 text-left transition-colors last:border-0 hover:bg-green-50"
                >
                  <Package className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-800">{product.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{product.origin_country}</span>
                      {product.shelf_life_days && (
                        <>
                          <span>·</span>
                          <span>Годен {product.shelf_life_days} дн.</span>
                        </>
                      )}
                      {product.certificate_number && (
                        <>
                          <span>·</span>
                          <span className="text-green-600">{product.certificate_type}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Компонент: Строка выбранного товара ─────────────────────────

const LabelRow: React.FC<{
  item: LabelItem
  onUpdate: (id: string, field: keyof LabelItem, value: string | number) => void
  onRemove: (id: string) => void
  onPreview: (item: LabelItem) => void
}> = ({ item, onUpdate, onRemove, onPreview }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:p-4">
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-800">{item.product_name}</div>
      </div>

      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap text-xs text-gray-500">Дата:</label>
        <input
          type="date"
          value={item.packing_date}
          onChange={(e) => onUpdate(item.id, 'packing_date', e.target.value)}
          className="w-36 rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap text-xs text-gray-500">Масса:</label>
        <input
          type="text"
          value={item.net_weight}
          onChange={(e) => onUpdate(item.id, 'net_weight', e.target.value)}
          placeholder="_____ кг"
          className="w-24 rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap text-xs text-gray-500">Шт:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={item.copies}
          onChange={(e) =>
            onUpdate(item.id, 'copies', Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))
          }
          className="w-16 rounded-md border border-gray-200 px-2 py-1.5 text-center text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPreview(item)}
          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
          title="Предпросмотр"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          title="Удалить"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── Компонент: Модалка предпросмотра ────────────────────────────

const PreviewModal: React.FC<{
  html: string
  productName: string
  onClose: () => void
}> = ({ html, productName, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-800">Предпросмотр: {productName}</h3>
          <button onClick={onClose} className="rounded-md p-1 transition-colors hover:bg-gray-100">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex justify-center p-6">
          <div
            className="w-full max-w-[300px] border border-dashed border-gray-400 bg-white p-4 shadow-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div className="border-t border-gray-100 p-4 text-center">
          <span className="text-xs text-gray-400">Так будет выглядеть ярлык при печати</span>
        </div>
      </div>
    </div>
  )
}

// ── Главная страница ────────────────────────────────────────────

const AdminLabelsPage: React.FC = () => {
  const [items, setItems] = useState<LabelItem[]>([])
  const [labelsPerPage, setLabelsPerPage] = useState<LabelsPerPage>(6)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [previewName, setPreviewName] = useState('')
  const [isPreviewing, setIsPreviewing] = useState(false)

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['admin', 'labels', 'products'],
    queryFn: () => getProductsForLabels(),
  })

  const totalLabels = useMemo(() => items.reduce((sum, i) => sum + i.copies, 0), [items])

  const handleAddProduct = useCallback((product: ProductForLabel) => {
    setItems((prev) => [
      ...prev,
      {
        id: nextItemId(),
        product_id: product._id,
        product_name: product.name,
        packing_date: TODAY,
        net_weight: '',
        copies: 1,
      },
    ])
    setError(null)
  }, [])

  const handleUpdateItem = useCallback(
    (id: string, field: keyof LabelItem, value: string | number) => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    },
    [],
  )

  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handlePreview = useCallback(async (item: LabelItem) => {
    setIsPreviewing(true)
    try {
      const result = await previewLabel({
        product_id: item.product_id,
        packing_date: item.packing_date || undefined,
        net_weight: item.net_weight || undefined,
      })
      setPreviewHtml(result.html)
      setPreviewName(result.product_name)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка предпросмотра'
      setError(message)
    } finally {
      setIsPreviewing(false)
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    if (items.length === 0) {
      setError('Добавьте хотя бы один товар')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const apiItems: { product_id: string; packing_date?: string; net_weight?: string }[] = []
      for (const item of items) {
        for (let i = 0; i < item.copies; i++) {
          apiItems.push({
            product_id: item.product_id,
            packing_date: item.packing_date || undefined,
            net_weight: item.net_weight || undefined,
          })
        }
      }

      const blob = await generateLabelsPdf({
        items: apiItems,
        labels_per_page: labelsPerPage,
        label_format: 'a4_grid',
      })

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `labels_${TODAY}_${totalLabels}pcs.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка генерации PDF'
      setError(message)
    } finally {
      setIsGenerating(false)
    }
  }, [items, labelsPerPage, totalLabels])

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-3">
          <Tag className="h-6 w-6 text-green-600" />
          <h1 className="text-xl font-bold text-gray-800">Ярлыки и этикетки</h1>
        </div>
        <p className="ml-9 text-sm text-gray-500">
          Генерация PDF с ярлыками для наклейки на упаковку. Выберите товары, укажите дату фасовки и
          массу.
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto p-0.5">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="mb-4">
        <ProductSelector
          products={products}
          onSelect={handleAddProduct}
          isLoading={productsLoading}
        />
      </div>

      {items.length > 0 ? (
        <div className="mb-6 space-y-2">
          {items.map((item) => (
            <LabelRow
              key={item.id}
              item={item}
              onUpdate={handleUpdateItem}
              onRemove={handleRemoveItem}
              onPreview={handlePreview}
            />
          ))}
        </div>
      ) : (
        <div className="mb-6 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-400">Добавьте товары для генерации ярлыков</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap text-sm text-gray-600">На странице:</label>
                <select
                  value={labelsPerPage}
                  onChange={(e) => setLabelsPerPage(Number(e.target.value) as LabelsPerPage)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {LABELS_PER_PAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-gray-500">
                Итого: <span className="font-semibold text-gray-800">{totalLabels}</span> ярлык(ов),{' '}
                <span className="font-semibold text-gray-800">
                  {Math.ceil(totalLabels / labelsPerPage)}
                </span>{' '}
                стр.
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || items.length === 0}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Генерация...</span>
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4" />
                  <span>Скачать PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {previewHtml && (
        <PreviewModal
          html={previewHtml}
          productName={previewName}
          onClose={() => {
            setPreviewHtml(null)
            setPreviewName('')
          }}
        />
      )}

      {isPreviewing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-xl">
            <Loader2 className="h-5 w-5 animate-spin text-green-600" />
            <span className="text-sm text-gray-700">Загрузка предпросмотра...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLabelsPage
