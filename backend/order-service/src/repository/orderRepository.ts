import { database } from '../database/database.js'
import type { Order } from '../types/order.js'

const findAll = async () => {
  const result = await database.query<Order>(`
    SELECT
      id,
      product,
      quantity,
      status,
      created_at AS "createdAt"
    FROM orders
    ORDER BY created_at DESC
  `)

  return result.rows
}

const create = async (product: string, quantity: number) => {
  const id = crypto.randomUUID()

  const result = await database.query<Order>(
    `
      INSERT INTO orders (id, product, quantity, status)
      VALUES ($1, $2, $3, 'PENDING')
      RETURNING
        id,
        product,
        quantity,
        status,
        created_at AS "createdAt"
    `,
    [id, product, quantity],
  )

  return result.rows[0]
}

const updateStatus = async (
  orderId: string,
  status: Order['status'],
) => {
  await database.query(
    `UPDATE orders SET status = $1 WHERE id = $2`,
    [status, orderId],
  )
}

export const orderRepository = {
  findAll,
  create,
  updateStatus,
}
