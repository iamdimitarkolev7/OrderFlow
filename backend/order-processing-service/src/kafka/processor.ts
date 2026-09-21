import { kafka } from './client.js'
import type { OrderEvent } from '../types/events.js'

const consumer = kafka.consumer({
  groupId: 'processing-service-group',
})

const producer = kafka.producer()

const publishEvent = async (
  orderId: string,
  event: OrderEvent,
) => {
  await producer.send({
    topic: 'order-events',
    messages: [
      {
        key: orderId,
        value: JSON.stringify(event),
      },
    ],
  })
}

export const startProcessor = async () => {
  await consumer.connect()
  await producer.connect()

  await consumer.subscribe({
    topic: 'order-events',
    fromBeginning: false,
  })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return

      const event = JSON.parse(
        message.value.toString(),
      ) as OrderEvent

      if (event.type !== 'order.created') return

      const orderId = event.data.id

      await publishEvent(orderId, {
        type: 'order.processing',
        data: { orderId },
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      await publishEvent(orderId, {
        type: 'order.completed',
        data: { orderId },
      })
    },
  })
}

export const stopProcessor = async () => {
  await consumer.disconnect()
  await producer.disconnect()
}