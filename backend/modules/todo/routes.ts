import { FastifyInstance } from 'fastify'
import { todoController } from './controllers/todoController'

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/todos', todoController.list)
  fastify.post('/todos', todoController.create)
  fastify.put('/todos/:id', todoController.update)
  fastify.delete('/todos/:id', todoController.delete)
}