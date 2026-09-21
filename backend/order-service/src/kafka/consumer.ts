import { kafka } from './client.js'
import { orderRepository } from '../repository/orderRepository.js'
import { OrderEvent } from '../types/events.js'

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
      if (!message.value) {
        return
      }

      const event = JSON.parse(message.value.toString()) satisfies OrderEvent

      if (event.type !== 'order.completed') {
        return
      }

      if (event.type === 'order.processing') {
        await orderRepository.updateStatus(
          event.data.orderId,
          'PROCESSING',
        )
      }
      
      if (event.type === 'order.completed') {
        await orderRepository.updateStatus(
          event.data.orderId,
          'COMPLETED',
        )
      }
      
      if (event.type === 'order.failed') {
        await orderRepository.updateStatus(
          event.data.orderId,
          'FAILED',
        )
      }

      console.log('Order status updated:', event.data.orderId)
    },
  })
}

export const disconnectConsumer = async () => {
  await consumer.disconnect()
}