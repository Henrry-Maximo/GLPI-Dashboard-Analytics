import { FastifyInstance } from 'fastify'
import { userController } from "../controllers/userController"
import { ticketController } from '../controllers/ticketController'
import { categorieController } from '../controllers/categorieController'

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: '/user' })
  app.register(ticketController, { prefix: '/ticket' })
  app.register(categorieController, { prefix: 'categorie' })
}