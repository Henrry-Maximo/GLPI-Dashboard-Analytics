import type { FastifyInstance } from "fastify";

import { ticketController } from "./controllers/ticketController";

export async function routes(app: FastifyInstance) {
  app.register(ticketController, { prefix: "/tickets" });
}
