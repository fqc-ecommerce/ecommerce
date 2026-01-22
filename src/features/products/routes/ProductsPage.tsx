import { Search, PackageX } from 'lucide-react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { Paginator } from '@/components/shared/Paginator'
import { ProductCard } from '../components/ProdcutCard'
import { useFilterProducts } from '../hooks/useFilterProducts'
import { Button } from '@/components/ui/button'
import { ErrorComponent } from '@/components/shared/ErrorComponent'
import { CustomLoader } from '../components/CustomLoader'

export const ProductsPage = () => {
  const { allProducts, isLoading, error } = useProducts()
  const {
    displayedProducts: products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    isFiltering,
    totalPages,
  } = useFilterProducts(allProducts)

  if (isLoading) {
    return <CustomLoader />
  }

  if (error) {
    return <ErrorComponent error={error}></ErrorComponent>
  }

  const categories = ['Todas', ...new Set(allProducts.map((p) => p.category))]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900">Catálogo</h1>
          <p className="text-gray-500">
            Encuentra exactamente lo que necesitas.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Buscar por nombre..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setCurrentPage(1)
                }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-gray-50 p-6">
            <PackageX className="text-gray-300" size={60} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            No encontramos resultados
          </h3>
          <p className="mt-2 text-gray-500">
            Intenta con otros términos o limpia tu búsqueda.
          </p>
          {isFiltering && (
            <Button
              variant="link"
              onClick={() => setSearchTerm('')}
              className="mt-2 font-semibold text-blue-600"
            >
              Ver todos los productos
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          {!isFiltering && (
            <div className="mt-16 flex justify-center border-t border-gray-100 pt-10">
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
