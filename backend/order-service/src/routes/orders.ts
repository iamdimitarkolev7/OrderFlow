import type { FastifyInstance } from 'fastify'
import { producer } from '../kafka/producer.js'
import { orderRepository } from '../repository/orderRepository.js'
import { CreateOrderBody } from '../types/order.js'

export const orderRoutes = async (app: FastifyInstance) => {
  app.get('/orders', async () => {
    return orderRepository.findAll()
  })

  app.post<{ Body: CreateOrderBody }>(
    '/orders',
    async (request, reply) => {
      const order = await orderRepository.create(
        request.body.product,
        request.body.quantity,
      )

      if (!order) {
        throw new Error('Error while creating an order')
      }

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
    },
  )
}