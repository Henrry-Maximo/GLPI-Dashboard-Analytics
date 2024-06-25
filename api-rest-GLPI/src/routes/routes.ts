import { FastifyInstance } from 'fastify'
import { userController } from "../controllers/userController"
import { ticketController } from '../controllers/ticketController'

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: '/user' })
  app.register(ticketController, { prefix: '/ticket' })
}