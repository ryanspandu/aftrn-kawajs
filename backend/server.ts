import fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const server = fastify({
  logger: true
})

export const prisma = new PrismaClient()

// Register CORS
server.register(cors, {
  origin: process.env.CORS_ORIGIN
})

// Health check route
server.get('/health', async () => {
  return { status: 'ok' }
})

const start = async () => {
  try {
    await server.listen({ 
      port: Number(process.env.PORT), 
      host: process.env.HOST 
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()