import pg from 'pg'

const { Pool } = pg

export const database = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    'postgresql://orderflow:orderflow@localhost:5432/orders',
})

export const initializeDatabase = async () => {
  await database.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY,
      product VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}