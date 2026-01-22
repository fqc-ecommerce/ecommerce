import { getProducts } from '@/features/products/api/getProducts'
import type { Product } from '@/features/products/types'
import { useEffect, useState } from 'react'

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await getProducts()
        setAllProducts(data)
      } catch (err) {
        setError('No se pudieron cargar los productos. Intenta más tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return {
    allProducts,
    isLoading,
    error,
  }
}
