import { OrderEvent } from '../types/events.js'
import { kafka } from './client.js'

const consumer = kafka.consumer({
  groupId: 'processing-service-group',
})

const producer = kafka.producer()

export const startProcessor = async () => {
  await consumer.connect()
  await producer.connect()

  await consumer.subscribe({
    topic: 'order-events',
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        return
      }

      const event = JSON.parse(message.value.toString()) satisfies OrderEvent

      if (event.type !== 'order.created') {
        return
      }

      console.log('Processing order:', event.data.id)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      await producer.send({
        topic: 'order-events',
        messages: [
          {
            key: event.data.id,
            value: JSON.stringify({
              type: 'order.completed',
              data: {
                orderId: event.data.id,
              },
            }),
          },
        ],
      })

      console.log('Order completed:', event.data.id)
    },
  })
}

export const stopProcessor = async () => {
  await consumer.disconnect()
  await producer.disconnect()
}
