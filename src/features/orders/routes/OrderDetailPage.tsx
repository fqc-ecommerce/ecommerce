import { useLocation, Link } from 'react-router-dom'
import type { Order } from '../types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const OrderDetailPage = () => {
  const location = useLocation()
  const order = location.state?.order as Order

  if (!order) {
    return (
      <div className="p-20 text-center">
        <p className="mb-4">
          No pudimos recuperar los detalles de la orden directamente.
        </p>
        <Link to="/ordenes">
          <Button>Volver al historial</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/ordenes">
        <Button variant="ghost" className="mb-6 gap-2 text-gray-500">
          <ArrowLeft size={16} /> Volver al historial
        </Button>
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black italic">
          PEDIDO {order.orderNumber}
        </h1>
        <div className="rounded-full border border-green-200 bg-green-100 px-4 py-1 font-bold text-green-700">
          {order.status}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50 p-4 text-sm font-bold text-slate-500 uppercase">
          Resumen de Productos
        </div>
        <table className="w-full text-left">
          <thead className="border-b text-sm text-gray-500">
            <tr>
              <th className="p-4 font-medium">Descripción</th>
              <th className="p-4 text-center font-medium">Cantidad</th>
              <th className="p-4 text-right font-medium">Unitario</th>
              <th className="p-4 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {order.items.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="p-4 font-semibold text-gray-800">
                  {item.product.name}
                </td>
                <td className="p-4 text-center">{item.quantity}</td>
                <td className="p-4 text-right">${item.unitPrice.toFixed(2)}</td>
                <td className="p-4 text-right font-bold">
                  ${item.subtotal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end border-t bg-slate-50 p-6">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Total Pagado
            </p>
            <p className="text-4xl font-black text-blue-600">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
