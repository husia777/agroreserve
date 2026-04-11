// Zustand store корзины с persist
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

// Элемент корзины
export interface CartItem {
  product: Product
  quantity: number
  price: number // Цена на момент добавления
  subtotal: number // Сумма по позиции
}

interface CartState {
  items: CartItem[]
  total: number
  itemsCount: number

  // Actions
  addItem: (product: Product, quantity: number, isWholesale: boolean) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItem: (productId: string) => CartItem | undefined
}

// Пересчёт итогов
const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.subtotal, 0)
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemsCount }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemsCount: 0,

      // Добавление товара в корзину
      addItem: (product, quantity, isWholesale) => {
        const { items } = get()
        const existingIndex = items.findIndex((item) => item.product.id === product.id)

        // Определяем цену
        const price = isWholesale ? product.price_wholesale : product.price_retail

        let newItems: CartItem[]

        if (existingIndex >= 0) {
          // Товар уже в корзине — обновляем количество
          newItems = items.map((item, index) => {
            if (index === existingIndex) {
              const newQuantity = item.quantity + quantity
              return {
                ...item,
                quantity: newQuantity,
                subtotal: price * newQuantity,
              }
            }
            return item
          })
        } else {
          // Новый товар
          newItems = [
            ...items,
            {
              product,
              quantity,
              price,
              subtotal: price * quantity,
            },
          ]
        }

        set({ items: newItems, ...calculateTotals(newItems) })
      },

      // Удаление товара из корзины
      removeItem: (productId) => {
        const { items } = get()
        const newItems = items.filter((item) => item.product.id !== productId)
        set({ items: newItems, ...calculateTotals(newItems) })
      },

      // Обновление количества
      updateQuantity: (productId, quantity) => {
        const { items } = get()
        if (quantity <= 0) {
          // Удаляем товар если количество = 0
          const newItems = items.filter((item) => item.product.id !== productId)
          set({ items: newItems, ...calculateTotals(newItems) })
          return
        }

        const newItems = items.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity,
              subtotal: item.price * quantity,
            }
          }
          return item
        })

        set({ items: newItems, ...calculateTotals(newItems) })
      },

      // Очистка корзины
      clearCart: () => {
        set({ items: [], total: 0, itemsCount: 0 })
      },

      // Получение элемента по ID
      getItem: (productId) => {
        return get().items.find((item) => item.product.id === productId)
      },
    }),
    {
      name: 'agroreserve-cart',
    },
  ),
)
