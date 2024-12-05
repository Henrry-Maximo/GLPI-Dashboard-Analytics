import type { FastifyInstance } from "fastify";

import { login } from "./controllers/login";
import { register } from "./controllers/register";

import { ticketController } from "./controllers/tickets";

export async function routes(app: FastifyInstance) {
  app.post("/sessions", login)
  app.post("/register", register)

  app.register(ticketController, { prefix: "tickets" });
}
