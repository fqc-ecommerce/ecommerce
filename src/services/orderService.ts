import api from '@/api/axiosConfig'

export interface OrderItem {
  productId: number
  quantity: number
  price: number
}

export interface OrderRequest {
  items: OrderItem[]
  total: number
}

export const createOrder = async (orderData: OrderRequest) => {
  const response = await api.post('/orders', orderData)
  return response.data
}

export const getUserOrders = async () => {
  const response = await api.get('/orders/1')
  return [response.data]
}
