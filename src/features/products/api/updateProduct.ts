import { api } from '@/lib/axiosConfig'
import type { Product } from '../types'

export const updateProduct = async (
  id: number,
  productData: Partial<Product>,
) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}
