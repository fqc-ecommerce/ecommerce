import type { OrderItem } from "@/features/orders/types"

export interface OrderVoucher {
  orderNumber: string
  user: {
    name: string
    email: string
  }
  items: OrderItem[]
  totalAmount: number
}
