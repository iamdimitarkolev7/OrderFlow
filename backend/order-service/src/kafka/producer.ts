import { kafka } from './client.js'

export const producer = kafka.producer()

export const connectProducer = async () => {
  await producer.connect()
}