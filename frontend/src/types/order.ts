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
}