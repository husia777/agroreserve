// API функции каталога
import { apiClient } from './client'
import type { Category, Product, PaginatedResponse, CatalogParams } from '@/types'

// Получение всех категорий
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/catalog/categories')
  return response.data
}

// Получение списка товаров с фильтрами
export const getProducts = async (params?: CatalogParams): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<PaginatedResponse<Product>>('/catalog/products', {
    params,
  })
  return response.data
}

// Получение товара по slug
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/catalog/products/${slug}`)
  return response.data
}

// Получение товара по ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/catalog/products/id/${id}`)
  return response.data
}

// Поиск товаров
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/catalog/search', {
    params: { q: query },
  })
  return response.data
}


// Сертификаты товара (UC-23)
export interface ProductCertificate {
  _id: string
  number: string
  cert_type: string
  cert_type_label: string
  issuing_authority: string
  issued_date: string
  expiry_date: string
  days_until_expiry: number
  is_valid: boolean
  has_file: boolean
  file_url: string | null
  file_name: string | null
}

export const getProductCertificates = async (productId: string): Promise<{ certificates: ProductCertificate[]; count: number }> => {
  const response = await apiClient.get("/catalog/products/" + productId + "/certificates")
  return response.data
}


// UC-01: Подписка на уведомление о поступлении товара
export interface StockNotifyResponse {
  ok: boolean
  message: string
  subscribed: boolean
}

export const subscribeStockNotify = async (
  productId: string,
  email: string
): Promise<StockNotifyResponse> => {
  const response = await apiClient.post<StockNotifyResponse>(
    `/catalog/products/${productId}/notify`,
    { email }
  )
  return response.data
}
