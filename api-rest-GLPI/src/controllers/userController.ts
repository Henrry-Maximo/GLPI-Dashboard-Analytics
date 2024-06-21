import { FastifyInstance } from 'fastify'

export async function userController(app: FastifyInstance) {
  app.get('/', () => {
    return (
      "hello wolrd!"
    )
  })
}
