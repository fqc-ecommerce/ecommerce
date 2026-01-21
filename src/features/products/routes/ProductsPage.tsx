import { Loader2 } from 'lucide-react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { Paginator } from '@/components/shared/Paginator'
import { ProductCard } from '../components/ProdcutCard'

export const ProductsPage = () => {
  const {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useProducts()

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <Loader2 className="mb-2 animate-spin text-blue-600" size={40} />
        <p className="text-gray-500">Cargando catálogo...</p>
      </div>
    )
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Catálogo de productos
        </h1>
        <p className="text-gray-600">Los mejores productos del mercado.</p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay productos disponibles actualmente.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </>
      )}
    </div>
  )
}
