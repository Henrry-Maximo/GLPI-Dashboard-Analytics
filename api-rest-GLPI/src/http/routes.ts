import type { FastifyInstance } from "fastify";

import { categoriesController } from "./controllers/_legacy/categories";
import { ticketsController } from "./controllers/_legacy/tickets";

import { usersRoutes } from "./controllers/users/_route";
import { ticketsRoutes } from "./controllers/tickets/_route";
import { statsRoutes } from "./controllers/stats/_route";

export async function appRoutes(app: FastifyInstance) {
  app.register(statsRoutes);
  app.register(ticketsRoutes);
  app.register(usersRoutes);
}
