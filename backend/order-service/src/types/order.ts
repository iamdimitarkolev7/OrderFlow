export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'

export interface Order {
  id: string
  product: string
  quantity: number
  status: OrderStatus
  createdAt: string
}

export interface CreateOrderBody {
  product: string
  quantity: number
}
