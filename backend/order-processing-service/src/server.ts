import {
  startProcessor,
  stopProcessor,
} from './kafka/processor.js'

async function start() {
  try {
    await startProcessor()
    console.log('Processing Service started')
  } catch (error) {
    console.error('Failed to start Processing Service', error)
    process.exit(1)
  }
}

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down`)

  try {
    await stopProcessor()
    process.exit(0)
  } catch (error) {
    console.error('Shutdown failed', error)
    process.exit(1)
  }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

await start()