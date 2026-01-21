import { api } from '@/lib/axiosConfig'

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`)
}
