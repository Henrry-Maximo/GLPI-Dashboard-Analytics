import type { FastifyInstance } from "fastify";

import { login } from "./controllers/login";
import { register } from "./controllers/register";

import { ticketController } from "./controllers/tickets";
import { categoriesController } from "./controllers/categories";

export async function routes(app: FastifyInstance) {
  app.post("/sessions", login)
  app.post("/register", register)

  app.register(ticketController, { prefix: "tickets" });
  app.register(categoriesController, { prefix: "categories" });
}
