import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../server'

interface TodoData {
  title: string
  description?: string
  completed?: boolean
}

export class TodoController {
  private readonly prisma = prisma

  async list(request: FastifyRequest, reply: FastifyReply) {
    // const todos = await this.prisma.todo.findMany()
    // return todos
    return 'ok'
  }

  async create(request: FastifyRequest<{ Body: TodoData }>, reply: FastifyReply) {
    const data = request.body
    const todo = await this.prisma.todo.create({ data })
    return todo
  }

  async update(
    request: FastifyRequest<{
      Params: { id: string }
      Body: Partial<TodoData>
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params
    const todo = await this.prisma.todo.update({
      where: { id: Number(id) },
      data: request.body
    })
    return todo
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params
    await this.prisma.todo.delete({
      where: { id: Number(id) }
    })
    return { success: true }
  }
}

export const todoController = new TodoController()