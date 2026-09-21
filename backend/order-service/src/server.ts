import Fastify from 'fastify'
import cors from '@fastify/cors'
import { orderRoutes } from './routes/orders.js'

const app = Fastify({
  logger: true,
})

await app.register(cors, {
  origin: 'http://localhost:5173',
})

app.register(orderRoutes)

app.get('/health', async () => {
  return { status: 'ok' }
})

try {
  await app.listen({
    port: 3000,
    host: '0.0.0.0',
  })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}