import { api } from '@/lib/axiosConfig'
import type { Product } from '../types'

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}
