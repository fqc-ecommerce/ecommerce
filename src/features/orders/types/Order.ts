export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type OrderItem = {
  id: number
  product: {
    id: number
    name: string
    price: number
  }
  quantity: number
  unitPrice: number
  subtotal: number
}

export type Order = {
  id: number
  orderNumber: string
  user: { id: number; name: string; email: string }
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
