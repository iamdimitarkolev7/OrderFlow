import { kafka } from './client.js'
import { completeOrder } from '../store/orders.js'

const consumer = kafka.consumer({
  groupId: 'order-service-group',
})

export const startConsumer = async () => {
  await consumer.connect()

  await consumer.subscribe({
    topic: 'order-events',
    fromBeginning: false,
  })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return

      const event = JSON.parse(message.value.toString())

      if (event.type !== 'order.completed') return

      completeOrder(event.data.orderId)
      console.log('Order status updated:', event.data.orderId)
    },
  })
}