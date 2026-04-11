// Страница каталога товаров с фильтрами, поиском, сортировкой
import SEOHead from '@/components/shared/SEOHead'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'
import { getCategories, getProducts } from '@/api/catalog'
import type { CatalogParams } from '@/types'
import ProductCard from '@/components/shared/ProductCard'
import Pagination from '@/components/ui/Pagination'
import SearchInput from '@/components/ui/SearchInput'
import Select from '@/components/ui/Select'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { cn } from '@/utils/cn'

const SORT_OPTIONS = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'name', label: 'По названию' },
]

const PER_PAGE_OPTIONS = [
  { value: '12', label: '12 на стр.' },
  { value: '24', label: '24 на стр.' },
  { value: '48', label: '48 на стр.' },
]

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { category: categorySlug } = useParams()
  const navigate = useNavigate()

  // Состояние фильтров
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [sort, setSort] = useState<CatalogParams['sort']>(
    (searchParams.get('sort') as CatalogParams['sort']) || 'popularity',
  )
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [perPage, setPerPage] = useState(parseInt(searchParams.get('per_page') || '24'))
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Данные категорий
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  // Текущая категория
  const currentCategory = categories?.find((c) => c.slug === categorySlug)

  // Товары
  const params: CatalogParams = {
    search: search || undefined,
    sort,
    page,
    per_page: perPage,
    category_id: currentCategory?.id,
  }

  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: (prev) => prev,
  })

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const newParams: Record<string, string> = {}
    if (search) newParams.search = search
    if (sort && sort !== 'popularity') newParams.sort = sort
    if (page > 1) newParams.page = String(page)
    if (perPage !== 24) newParams.per_page = String(perPage)
    setSearchParams(newParams, { replace: true })
  }, [search, sort, page, perPage, setSearchParams])

  // Хлебные крошки
  const breadcrumbs = [
    { label: 'Каталог', href: '/catalog' },
    ...(currentCategory ? [{ label: currentCategory.name }] : []),
  ]

  // Сброс страницы при изменении поиска или фильтров
  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleSort = (value: string) => {
    setSort(value as CatalogParams['sort'])
    setPage(1)
  }

  const handleCategory = (slug?: string) => {
    setPage(1)
    setMobileSidebarOpen(false)
    if (slug) {
      navigate(`/catalog/${slug}`)
    } else {
      navigate('/catalog')
    }
  }

  return (
    <>
      <SEOHead
        title="Каталог овощей и фруктов оптом"
        description="Каталог свежих овощей и фруктов оптом — прямые поставки из Узбекистана. Доставка по Тобольску."
        canonical="/catalog"
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Хлебные крошки */}
        <Breadcrumbs items={breadcrumbs} className="mb-4 text-sm" />

        {/* Заголовок */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentCategory ? currentCategory.name : 'Все товары'}
            </h1>
            {productsData && (
              <p className="mt-0.5 text-sm text-gray-500">{productsData.total} товаров</p>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Боковая панель фильтров (desktop) */}
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-20 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-900">Категории</h2>
              </div>
              <nav className="py-2">
                <button
                  onClick={() => handleCategory(undefined)}
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-2 text-sm transition-colors',
                    !categorySlug
                      ? 'bg-primary-50 font-semibold text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <span>Все товары</span>
                  {productsData && !categorySlug && (
                    <span className="text-xs text-gray-400">{productsData.total}</span>
                  )}
                </button>
                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategory(cat.slug)}
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-2 text-sm transition-colors',
                      categorySlug === cat.slug
                        ? 'bg-primary-50 font-semibold text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    <span className="truncate">{cat.name}</span>
                    {cat.product_count > 0 && (
                      <span className="ml-2 flex-shrink-0 text-xs text-gray-400">
                        {cat.product_count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Мобильный сайдбар */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <div className="absolute bottom-0 left-0 top-0 w-72 overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-4">
                  <h2 className="font-semibold text-gray-900">Категории</h2>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <nav className="py-2">
                  <button
                    onClick={() => handleCategory(undefined)}
                    className={cn(
                      'w-full px-4 py-3 text-left text-sm',
                      !categorySlug ? 'font-semibold text-primary-700' : 'text-gray-600',
                    )}
                  >
                    Все товары
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategory(cat.slug)}
                      className={cn(
                        'w-full px-4 py-3 text-left text-sm',
                        categorySlug === cat.slug
                          ? 'font-semibold text-primary-700'
                          : 'text-gray-600',
                      )}
                    >
                      {cat.name} {cat.product_count > 0 && `(${cat.product_count})`}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Основной контент */}
          <div className="min-w-0 flex-1">
            {/* Панель управления */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {/* Кнопка фильтров (mobile) */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Категории
              </button>

              {/* Поиск */}
              <div className="min-w-[200px] flex-1">
                <SearchInput
                  value={search}
                  onChange={handleSearch}
                  placeholder="Поиск товаров..."
                />
              </div>

              {/* Сортировка */}
              <div className="w-48">
                <Select
                  options={SORT_OPTIONS}
                  value={sort}
                  onChange={(e) => handleSort(e.target.value)}
                />
              </div>

              {/* Кол-во на странице */}
              <div className="hidden w-32 sm:block">
                <Select
                  options={PER_PAGE_OPTIONS}
                  value={String(perPage)}
                  onChange={(e) => {
                    setPerPage(parseInt(e.target.value))
                    setPage(1)
                  }}
                />
              </div>

              {/* Переключатель вида */}
              <div className="hidden overflow-hidden rounded-lg border border-gray-200 sm:flex">
                <button
                  onClick={() => setLayout('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    layout === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50',
                  )}
                  aria-label="Сетка"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={cn(
                    'p-2 transition-colors',
                    layout === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50',
                  )}
                  aria-label="Список"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Текущий поиск */}
            {search && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-500">Поиск: «{search}»</span>
                <button
                  onClick={() => handleSearch('')}
                  className="text-xs text-primary-600 hover:underline"
                >
                  Сбросить
                </button>
              </div>
            )}

            {/* Список товаров */}
            {isLoading ? (
              <PageSpinner />
            ) : productsData?.items.length === 0 ? (
              <EmptyState
                title="Товары не найдены"
                description={
                  search
                    ? `По запросу «${search}» ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : 'В этой категории пока нет товаров.'
                }
                action={{ label: 'Смотреть все товары', onClick: () => handleCategory(undefined) }}
              />
            ) : (
              <>
                <div
                  className={cn(
                    'transition-opacity',
                    isFetching && 'opacity-60',
                    layout === 'grid'
                      ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4'
                      : 'space-y-3',
                  )}
                >
                  {productsData?.items.map((product) => (
                    <ProductCard key={product.id} product={product} layout={layout} />
                  ))}
                </div>

                {/* Пагинация */}
                {productsData && productsData.pages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={productsData.pages}
                    onPageChange={(p) => {
                      setPage(p)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="mt-8"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CatalogPage
