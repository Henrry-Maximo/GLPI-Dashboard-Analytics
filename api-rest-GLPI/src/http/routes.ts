import type { FastifyInstance } from "fastify";

import { signIn } from "./controllers/signIn";
import { register } from "./controllers/register";

import { ticketsController } from "./controllers/tickets";
import { categoriesController } from "./controllers/categories";
import { usersController } from "./controllers/users";

export async function appRoutes(app: FastifyInstance) {
  // definindo rotas
  app.post("/sessions", signIn);
  app.post("/register", register);

  // registrando módulos
  app.register(usersController, { prefix: "/users" });
  app.register(ticketsController, { prefix: "/tickets" });
  app.register(categoriesController, { prefix: "/categories" });
}
