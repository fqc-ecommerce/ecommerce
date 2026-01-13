import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart, Edit, Trash2 } from 'lucide-react'
import type { Product } from '../types/Product'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteProduct } from '../services/productService'

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

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id)
      toast.success('Producto eliminado permanentemente')
      window.location.reload()
    } catch (error) {
      toast.error('No se pudo eliminar el producto')
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Link to={`/admin/productos/editar/${product.id}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-blue-100 text-blue-600 hover:bg-blue-50"
            >
              <Edit size={14} />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-red-100 bg-white/80 text-red-600 backdrop-blur-sm hover:bg-red-50"
              >
                <Trash2 size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Confirmas la eliminación?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de borrar <strong>{product.name}</strong>. Esta
                  acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sí, eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
