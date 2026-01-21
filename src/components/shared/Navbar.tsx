import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import {
  PlusCircle,
  LogOut,
  User as UserIcon,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'

export const Navbar = () => {
  const { user, isAdmin, logout } = useAuth()
  const { getTotalItems: totalItems, setIsCartOpen } = useCartStore()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav className="relative border-b bg-white px-6 py-4 shadow-sm md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            to="/productos"
            className="text-2xl font-black tracking-tighter text-blue-600"
          >
            SHOP.IO
          </Link>

          {/* Nav Desktop - Oculto en móvil */}
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
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

        <div className="flex items-center gap-2 md:gap-4">
          {/* Carrito - Siempre visible */}
          <div className="relative mr-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="rounded-full text-gray-600 hover:bg-slate-100 hover:text-blue-600"
            >
              <ShoppingCart size={22} />
            </Button>

            {totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[10px] font-bold text-white">
                {totalItems()}
              </span>
            )}
          </div>

          {/* UI Desktop - Oculta en móvil */}
          <div className="hidden items-center gap-4 md:flex">
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
                    {user.email}
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

          {/* Botón Hamburguesa - Solo móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </Button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 z-50 w-full border-b bg-white px-6 py-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 text-base font-semibold text-gray-600">
              <Link to="/productos" onClick={() => setIsMobileMenuOpen(false)}>
                Productos
              </Link>
              {user && (
                <Link to="/ordenes" onClick={() => setIsMobileMenuOpen(false)}>
                  Mis Pedidos
                </Link>
              )}
            </div>

            <div className="h-[1px] w-full bg-gray-100" />

            {user ? (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <UserIcon size={20} className="text-blue-600" />
                  <span className="truncate text-sm font-bold text-gray-700">
                    {user.email}
                  </span>
                </div>

                {/* Acciones móviles sutiles (Sin botones toscos) */}
                <div className="flex flex-col gap-4 pl-1">
                  {isAdmin && (
                    <Link
                      to="/admin/productos/nuevo"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-green-600"
                    >
                      <PlusCircle size={20} />
                      Agregar nuevo producto
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-sm font-medium text-gray-500"
                  >
                    <LogOut size={20} />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600">Iniciar Sesión</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
