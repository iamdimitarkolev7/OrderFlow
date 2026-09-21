import type { FastifyInstance } from 'fastify'
import type { Order } from '../types/order.js'

const orders: Order[] = []

interface CreateOrderBody {
  product: string
  quantity: number
}

export async function orderRoutes(app: FastifyInstance) {
  app.get('/orders', async () => {
    return orders
  })

  app.post<{ Body: CreateOrderBody }>('/orders', async (request, reply) => {
    const order: Order = {
      id: crypto.randomUUID(),
      product: request.body.product,
      quantity: request.body.quantity,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }

    orders.push(order)

    return reply.code(201).send(order)
  })
}
