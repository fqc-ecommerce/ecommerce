import { api } from '@/lib/axiosConfig'
import type { Product } from '../types'

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products')
  return response.data
}
