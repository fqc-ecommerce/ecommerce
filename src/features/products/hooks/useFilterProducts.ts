import { useState, useMemo } from 'react'

export const useFilterProducts = (allProducts: any[]) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todas' || product.category === selectedCategory

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [allProducts, searchTerm, selectedCategory])

  const isFiltering = searchTerm.length > 0 || selectedCategory !== 'Todas'
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const displayedProducts = useMemo(() => {
    if (isFiltering) return filteredProducts

    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, isFiltering])

  return {
    displayedProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    isFiltering,
    totalPages,
  }
}
