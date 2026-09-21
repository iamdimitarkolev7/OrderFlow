import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'processing-service',
  brokers: ['localhost:9092'],
})
