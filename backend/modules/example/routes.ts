import { FastifyInstance } from 'fastify'

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/example', async () => {
    return { hello: 'world' }
  })
}