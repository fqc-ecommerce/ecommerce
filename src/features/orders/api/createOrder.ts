import { api } from '@/lib/axiosConfig'
import type { OrderRequest } from '../types'

export const createOrder = async (orderData: OrderRequest) => {
  const response = await api.post('/orders', orderData)
  return response.data
}
