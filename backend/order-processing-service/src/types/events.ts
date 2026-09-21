import { Order } from './order.js'

export interface OrderCreatedEvent {
  type: 'order.created'
  data: Order
}

export interface OrderCompletedEvent {
  type: 'order.completed'
  data: {
    orderId: string
  }
}

export type OrderEvent =
  | OrderCreatedEvent
  | OrderCompletedEvent
  