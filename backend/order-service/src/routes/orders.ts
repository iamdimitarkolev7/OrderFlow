import type { FastifyInstance } from 'fastify'
import type { Order } from '../types/order.js'
import { producer } from '../kafka/producer.js'
import { orders } from '../store/orders.js'

interface CreateOrderBody {
  product: string
  quantity: number
}

export const orderRoutes = async (app: FastifyInstance) => {
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

    await producer.send({
      topic: 'order-events',
      messages: [
        {
          key: order.id,
          value: JSON.stringify({
            type: 'order.created',
            data: order,
          }),
        },
      ],
    })

    return reply.code(201).send(order)
  })
}
