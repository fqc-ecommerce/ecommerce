import api from '@/api/axiosConfig'
import type { Product } from '../types/Product'

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products')
  return response.data
}