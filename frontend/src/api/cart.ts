// API функции корзины
import { apiClient } from './client'
import type { Cart } from '@/types'

// Получение корзины текущего пользователя
export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get<Cart>('/cart')
  return response.data
}

// Добавление товара в корзину
export const addToCart = async (productId: string, quantity: number): Promise<Cart> => {
  const response = await apiClient.post<Cart>('/cart/items', {
    product_id: productId,
    quantity,
  })
  return response.data
}

// Обновление количества товара в корзине
export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const response = await apiClient.patch<Cart>(`/cart/items/${productId}`, {
    quantity,
  })
  return response.data
}

// Удаление товара из корзины
export const removeCartItem = async (productId: string): Promise<Cart> => {
  const response = await apiClient.delete<Cart>(`/cart/items/${productId}`)
  return response.data
}

// Очистка корзины
export const clearCart = async (): Promise<void> => {
  await apiClient.delete('/cart')
}
