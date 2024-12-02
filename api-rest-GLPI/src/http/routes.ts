import type { FastifyInstance } from "fastify";

import { login } from "./controllers/login-controller";
import { ticketController } from "./controllers/ticketController";


export async function routes(app: FastifyInstance) {
  app.register( login , { prefix: "authenticate" })

  app.register( ticketController , { prefix: "/tickets" });
}
