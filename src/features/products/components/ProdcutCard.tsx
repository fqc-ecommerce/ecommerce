import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart, Edit, Trash2 } from 'lucide-react'
import type { Product } from '../types'
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
import { deleteProduct } from '../api/deleteProduct'
import { useCartStore } from '@/stores/useCartStore'

export const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1)
  const { user, isAdmin } = useAuth()
  const { addToCart } = useCartStore()

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
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Link to={`/admin/productos/editar/${product.id}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-blue-100 bg-white/90 text-blue-600 backdrop-blur-sm hover:bg-blue-50"
            >
              <Edit size={14} />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-red-100 bg-white/90 text-red-600 backdrop-blur-sm hover:bg-red-50"
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

      <div className="relative h-[200px] w-full overflow-hidden border-b border-slate-100 bg-slate-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-400">
            Sin imagen
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold text-white uppercase shadow-sm">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
              {product.category}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
            {product.name}
          </h3>
          <p className="line-clamp-2 h-8 text-xs leading-relaxed text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-slate-900">
              ${product.price}
            </span>
            <span
              className={`text-[10px] font-bold ${product.stock < 5 ? 'text-orange-500' : 'text-slate-400'}`}
            >
              Stock: {product.stock}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white hover:shadow-sm disabled:opacity-30"
              disabled={product.stock === 0}
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-bold text-slate-700">
              {product.stock === 0 ? 0 : quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white hover:shadow-sm disabled:opacity-30"
              disabled={product.stock === 0}
            >
              <Plus size={14} />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!user || product.stock === 0}
            className="w-full gap-2 shadow-sm transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-400"
          >
            <ShoppingCart size={18} />
            {!user
              ? 'Inicia Sesión'
              : product.stock > 0
                ? 'Añadir al carrito'
                : 'Agotado'}
          </Button>
        </div>
      </div>
    </div>
  )
}
