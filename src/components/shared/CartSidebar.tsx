import { useCart } from '@/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export const CartSidebar = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    addToCart,
    totalPrice,
  } = useCart()

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      {/* Añadimos un padding interno global con p-6 */}
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <SheetTitle className="text-xl font-bold">Tu Pedido</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {items.length > 0 ? (
            <div className="flex flex-col gap-6 py-6">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-4">
                  {/* ÁREA DE IMAGEN */}
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    {/* Cuando tengas URLs de imagen, usas <img />, mientras tanto un placeholder */}
                    <Package className="h-8 w-8 text-gray-300" />
                  </div>

                  {/* INFO DEL PRODUCTO */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="line-clamp-1 text-sm leading-none font-bold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="ml-4 text-sm font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                        {item.category}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* CONTROLES DE CANTIDAD */}
                      <div className="flex items-center rounded-lg border bg-gray-50 px-1 py-0.5">
                        <button
                          onClick={() => removeFromCart(item.id)} // Lógica simple: si quieres restar de a 1, habría que ajustar el context
                          className="p-1 transition-colors hover:text-blue-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-2 w-4 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="p-1 transition-colors hover:text-blue-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 transition-colors hover:text-red-500"
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center px-10 text-center">
              <div className="mb-4 rounded-full bg-gray-50 p-6">
                <ShoppingCart size={40} className="text-gray-200" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Carrito vacío
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Parece que aún no has agregado productos a tu compra.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setIsCartOpen(false)}
              >
                Volver a la tienda
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* FOOTER CON MARGENES Y DISEÑO LIMPIO */}
        {items.length > 0 && (
          <SheetFooter className="mt-auto flex-col gap-4 border-t bg-gray-50/50 p-6">
            <div className="w-full space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Impuestos (estimado)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-black text-gray-900">
                <span>Total</span>
                <span className="text-xl text-blue-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button className="text-md h-12 w-full bg-blue-600 font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98]">
              Confirmar pedido
            </Button>

            <p className="text-center text-[11px] text-gray-400">
              Envío gratuito aplicado a esta orden
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
