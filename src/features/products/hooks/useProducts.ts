import { getProducts } from '@/features/products/api/getProducts'
import type { Product } from '@/features/products/types'
import { useEffect, useState } from 'react'

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

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

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage

  const currentProducts = allProducts.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(allProducts.length / itemsPerPage)

  return {
    products: currentProducts,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}
