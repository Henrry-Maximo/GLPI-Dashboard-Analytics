import type { FastifyInstance } from "fastify";

import { signIn } from "./controllers/users/signIn";
import { register } from "./controllers/users/register";

import { ticketsController } from "./controllers/tickets";
import { categoriesController } from "./controllers/categories";

import { users } from "./controllers/users/users";

export async function appRoutes(app: FastifyInstance) {
  // definindo rotas
  app.post("/sessions", signIn);
  app.post("/register", register);
  app.get("/users", users);

  // registrando módulos
  // app.register(usersController, { prefix: "/users" });
  app.register(ticketsController, { prefix: "/tickets" });
  app.register(categoriesController, { prefix: "/categories" });
}
