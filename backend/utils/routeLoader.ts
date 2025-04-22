import { FastifyInstance } from 'fastify'
import { glob } from 'glob'
import path from 'path'

export class RouteLoader {
  private readonly server: FastifyInstance
  private readonly basePath: string

  constructor(server: FastifyInstance) {
    this.server = server
    this.basePath = path.dirname(__dirname)
  }

  private getRoutePaths(): string[] {
    return [
      path.join(this.basePath, 'modules/**/routes.ts'),
      path.join(this.basePath, 'core/**/routes.ts')
    ]
  }

  private async importAndRegisterRoute(file: string): Promise<void> {
    const route = await import(file)
    await this.server.register(route.default || route)
  }

  public async loadRoutes(): Promise<void> {
    const routePaths = this.getRoutePaths()
    const routeFiles = await glob(routePaths)
    
    for (const file of routeFiles) {
      await this.importAndRegisterRoute(file)
    }
  }
}

export const createRouteLoader = (server: FastifyInstance): RouteLoader => {
  return new RouteLoader(server)
}