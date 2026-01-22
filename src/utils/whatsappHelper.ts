import type { OrderVoucher } from '@/types'

export const generateWhatsAppMessage = (orden: OrderVoucher) => {
  let message = '*NUEVO PEDIDO - SHOP-IO*%0A'
  message += `Pedido: ${orden.orderNumber}%0A%0A`
  message += `   Name: ${orden.user.name}%0A%0A`
  message += `   Email: ${orden.user.email}%0A%0A`

  orden.items.forEach(
    (item: {
      unitPrice: number
      quantity: number
      product: { name: string }
    }) => {
      const subtotal = item.unitPrice * item.quantity
      message += `   *${item.product.name}*%0A`
      message += `   Cant: ${item.quantity} x $${item.unitPrice}%0A`
      message += `   Subtotal: $${subtotal.toFixed(2)}%0A%0A`
    },
  )

  message += '-----------------------------%0A%0A'
  message += `*TOTAL A PAGAR: $${orden.totalAmount.toFixed(2)}*%0A%0A`
  message += 'Por favor, confírmenme el tiempo de entrega.%0A%0A'

  return message
}
