import { api } from '@/lib/axiosConfig'

export const getUserOrders = async () => {
  const response = await api.get('/orders/1')
  return [response.data]
}
