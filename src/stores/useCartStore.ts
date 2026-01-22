import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/features/products/types'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  
  // Acciones
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  setIsCartOpen: (open: boolean) => void
  
  // Selectores (Calculados)
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      setIsCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, quantity) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity }] })
        }
      },

      removeFromCart: (productId) =>
        set({ items: get().items.filter((item) => item.id !== productId) }),

      clearCart: () => set({ items: [] }),

      // Funciones para obtener datos calculados
      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
)