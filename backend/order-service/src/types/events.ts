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

export interface OrderProcessingEvent {
  type: 'order.processing'
  data: {
    orderId: string
  }
}

export interface OrderFailedEvent {
  type: 'order.failed'
  data: {
    orderId: string
    reason: string
  }
}

export type OrderEvent =
  | OrderCreatedEvent
  | OrderProcessingEvent
  | OrderCompletedEvent
  | OrderFailedEvent
