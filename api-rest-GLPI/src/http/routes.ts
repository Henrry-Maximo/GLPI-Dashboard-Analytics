import type { FastifyInstance } from "fastify";

import { statsRoutes } from "./controllers/stats/_route";
import { ticketsRoutes } from "./controllers/tickets/_route";
import { usersRoutes } from "./controllers/users/_route";
import { categoriesRoutes } from "./controllers/categories/_route";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(ticketsRoutes);
  app.register(statsRoutes);
  app.register(categoriesRoutes);
}

