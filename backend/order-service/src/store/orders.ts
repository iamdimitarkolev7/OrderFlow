import type { Order } from '../types/order.js'

export const orders: Order[] = []

export function completeOrder(orderId: string) {
  const order = orders.find((item) => item.id === orderId)

  if (order) {
    order.status = 'COMPLETED'
  }
}
