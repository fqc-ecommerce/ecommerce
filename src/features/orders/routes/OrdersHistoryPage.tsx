import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Package, ChevronRight } from 'lucide-react'
import { getUserOrders } from '@/features/orders/api/getUserOrders'
import type { Order } from '../types'

export const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getUserOrders().then(setOrders)
  }, [])

  const getStatusColor = (status: string) => {
    if (status === 'CONFIRMED')
      return 'bg-green-100 text-green-700 border-green-200'
    if (status === 'PENDING')
      return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-black">Mis Pedidos</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link key={order.id} to={`/ordenes/${order.id}`} state={{ order }}>
            <Card className="cursor-pointer border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Package className="text-slate-400" size={24} />
                  <div>
                    <p className="font-bold">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-800">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <Badge
                      className={`${getStatusColor(order.status)} border shadow-none`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
