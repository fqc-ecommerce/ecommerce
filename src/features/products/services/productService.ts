import { api } from '@/api/axiosConfig'
import type { Product } from '../types/Product'

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products')
  return response.data
}

export const saveProduct = async (productData: Partial<Product>) => {
  const payload = {
    ...productData,
    price: Number(productData.price),
    stock: Number(productData.stock),
  }

  const response = await api.post('/products', payload)
  return response.data
}

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`)
}

export const updateProduct = async (
  id: number,
  productData: Partial<Product>,
) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

export const uploadToImgBB = async (file: File): Promise<string> => {
  const apiKey = '9f05138efeb0768759ac3c9776be5d75'
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  return data.data.url
}
