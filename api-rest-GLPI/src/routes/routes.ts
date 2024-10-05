import type { FastifyInstance } from "fastify";

// import { userController } from "../http/controllers/userController";
import { ticketController } from "../http/controllers/ticketController";
// import { categorieController } from "../http/controllers/categorieController";

export async function routes(app: FastifyInstance) {
  // app.register(userController, { prefix: "/user" });
  app.register(ticketController, { prefix: "/tickets" });
  // app.register(categorieController, { prefix: "/categorie" });
}
