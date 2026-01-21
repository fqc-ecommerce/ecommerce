import { api } from '@/lib/axiosConfig'
import type { Product } from '../types'

export const saveProduct = async (productData: Partial<Product>) => {
  const payload = {
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
  }

  const response = await api.post('/products', payload)
  return response.data
}
