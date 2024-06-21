import { FastifyInstance } from 'fastify'
import { userController } from "../controllers/userController"

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: '/user' })
}