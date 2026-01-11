import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart, Edit } from 'lucide-react'
import type { Product } from '../types/Product'
import { toast } from 'sonner'

export const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1)
  const { user, isAdmin } = useAuth()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (product.stock === 0) return

    addToCart(product, quantity)

    toast.success(`${product.name} añadido al carrito`)
    setQuantity(1)
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {isAdmin && (
        <button
          title="Editar producto"
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 text-blue-600 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
        >
          <Edit size={16} />
        </button>
      )}

      <div className="flex h-48 items-center justify-center bg-gray-100">
        <span className="text-gray-400">Sin Imagen</span>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            {product.category}
          </span>
          <h3 className="line-clamp-1 text-lg font-bold text-gray-800">
            {product.name}
          </h3>
          <p className="line-clamp-2 h-8 text-xs text-gray-500">
            {product.description}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-blue-600">
              ${product.price}
            </span>
            <span className="text-[10px] text-gray-400">
              Stock: {product.stock}
            </span>
          </div>

          {/* Selector de Cantidad */}
          <div className="flex items-center justify-between rounded-lg border bg-slate-50 p-1.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="rounded p-1 hover:bg-gray-200 disabled:opacity-30"
              disabled={product.stock === 0}
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-bold">
              {product.stock === 0 ? 0 : quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="rounded p-1 hover:bg-gray-200 disabled:opacity-30"
              disabled={product.stock === 0}
            >
              <Plus size={14} />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            // Solo habilitado si hay usuario y hay stock
            disabled={!user || product.stock === 0}
            className="w-full gap-2 transition-transform active:scale-95"
          >
            <ShoppingCart size={18} />
            {!user
              ? 'Inicia Sesión'
              : product.stock > 0
                ? 'Añadir'
                : 'Sin Stock'}
          </Button>
        </div>
      </div>
    </div>
  )
}
