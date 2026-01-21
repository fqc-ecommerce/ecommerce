import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useCart } from '@/providers/CartProvider' // 1. Importar el hook del carrito
import { Button } from '@/components/ui/button'
import {
  PlusCircle,
  LogOut,
  User as UserIcon,
  ShoppingCart,
} from 'lucide-react' // 2. Importar ShoppingCart

export const Navbar = () => {
  const { user, isAdmin, logout } = useAuth()
  const { totalItems, setIsCartOpen } = useCart() // 3. Extraer estado del carrito
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link
          to="/productos"
          className="text-2xl font-black tracking-tighter text-blue-600"
        >
          SHOP.IO
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            to="/productos"
            className="transition-colors hover:text-blue-600"
          >
            Productos
          </Link>
          {user && (
            <Link
              to="/ordenes"
              className="transition-colors hover:text-blue-600"
            >
              Pedidos
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="rounded-full text-gray-600 hover:bg-slate-100 hover:text-blue-600"
          >
            <ShoppingCart size={22} />
          </Button>

          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </div>

        {isAdmin && (
          <Link to="/admin/productos/nuevo">
            <Button
              variant="default"
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <PlusCircle size={18} />
              Agregar Producto
            </Button>
          </Link>
        )}

        <div className="mx-2 h-8 w-[1px] bg-gray-200" />

        {user ? (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <UserIcon size={16} />
              </div>
              <span className="font-semibold text-gray-700">
                {user.name}
                {isAdmin && (
                  <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-[10px] text-red-600 uppercase">
                    Admin
                  </span>
                )}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut size={18} />
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline">Iniciar Sesión</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
