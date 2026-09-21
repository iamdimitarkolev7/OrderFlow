import type { FastifyInstance } from 'fastify'
import { producer } from '../kafka/producer.js'
import { orderRepository } from '../repository/orderRepository.js'
import { createOrderSchema } from '../schema/createOrderSchema.js'
import { CreateOrderBody } from '../types/order.js'
import { OrderCreatedEvent } from '../types/events.js'

export const orderRoutes = async (app: FastifyInstance) => {
  app.get('/orders', async () => {
    return orderRepository.findAll()
  })

  app.post<{ Body: CreateOrderBody }>(
    '/orders',
    { schema: createOrderSchema },
    async (request, reply) => {
      const order = await orderRepository.create(
        request.body.product,
        request.body.quantity,
      )

      if (!order) {
        throw new Error('Error while creating an order')
      }

      const event = {
        type: 'order.created',
        data: order,
      } satisfies OrderCreatedEvent

      await producer.send({
        topic: 'order-events',
        messages: [
          {
            key: order.id,
            value: JSON.stringify(event),
          },
        ],
      })

      return reply.code(201).send(order)
    },
  )
}