// API функции заказов
import { apiClient } from './client'
import type { Order, PaginatedResponse, OrdersParams } from '@/types'

// Данные для оформления заказа
export interface CreateOrderData {
  items?: { product_id: string; qty: number }[]
  delivery_address: string
  delivery_date: string
  delivery_slot: string
  delivery_priority: string
  payment_method: string
  note?: string
}

// Создание заказа из корзины
export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await apiClient.post<Order>('/orders', data)
  return response.data
}

// Получение списка заказов
export const getOrders = async (params?: OrdersParams): Promise<PaginatedResponse<Order>> => {
  const response = await apiClient.get<PaginatedResponse<Order>>('/orders', { params })
  return response.data
}

// Получение деталей заказа
export const getOrder = async (orderId: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/orders/${orderId}`)
  return response.data
}

// Трекинг заказа (публичный)
export const trackOrder = async (orderNumber: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/orders/track/${orderNumber}`)
  return response.data
}

// Данные для розничного заказа (UC-10)
export interface RetailOrderData {
  name: string
  phone: string
  items: { product_id: string; qty: number }[]
  delivery_date: string
  delivery_slot: string
  delivery_address: string
  note?: string
}

// Создание розничного заказа без регистрации (UC-10)
export const createRetailOrder = async (data: RetailOrderData): Promise<Order> => {
  const response = await apiClient.post<Order>('/orders/retail', data)
  return response.data
}

// Отмена заказа
export const cancelOrder = async (orderId: string, reason?: string): Promise<Order> => {
  const response = await apiClient.post<Order>(`/orders/${orderId}/cancel`, { reason })
  return response.data
}
