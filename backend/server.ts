import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { createRouteLoader } from './utils/routeLoader'

export class Server {
  private readonly app: FastifyInstance
  private readonly prisma: PrismaClient

  constructor() {
    this.app = fastify({ logger: true })
    this.prisma = new PrismaClient()
  }

  private async registerPlugins(): Promise<void> {
    await this.app.register(cors, {
      origin: process.env.CORS_ORIGIN
    })
  }

  private async registerRoutes(): Promise<void> {
    const routeLoader = createRouteLoader(this.app)
    await routeLoader.loadRoutes()
    
    this.app.get('/health', async () => {
      return { status: 'ok' }
    })
  }

  public getPrisma(): PrismaClient {
    return this.prisma
  }

  private async initialize(): Promise<void> {
    await this.registerPlugins()
    await this.registerRoutes()
  }

  public async start(): Promise<void> {
    try {
      await this.initialize()
      await this.app.listen({ 
        port: Number(process.env.PORT), 
        host: process.env.HOST 
      })
    } catch (err) {
      this.app.log.error(err)
      process.exit(1)
    }
  }
}

export const server = new Server()
export const prisma = server.getPrisma()

server.start()