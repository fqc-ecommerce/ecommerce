import { api } from '@/lib/axiosConfig'

export const getUserOrders = async (userId: number) => {
  const response = await api.get('/orders/me', {
    headers: {
      'X-User-Id': userId.toString(),
    },
  })
  return response.data
}
