import type { FastifyInstance } from "fastify";

import { login } from "./controllers/login-controller";
import { register } from "./controllers/register-controller";

import { ticketController } from "./controllers/ticketController";

export async function routes(app: FastifyInstance) {
  app.post("/sessions", login)
  app.post("/register", register)

  app.register(ticketController, { prefix: "tickets" });
}
