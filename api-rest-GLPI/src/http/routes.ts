import type { FastifyInstance } from "fastify";

import { login } from "./controllers/login";
import { register } from "./controllers/register";

import { ticketsController } from "./controllers/tickets";
import { categoriesController } from "./controllers/categories";
import { usersController } from "./controllers/users";

export async function routes(app: FastifyInstance) {
  app.post("/sessions", login);
  app.post("/register", register);

  app.register(usersController, { prefix: "/users" });
  app.register(ticketsController, { prefix: "/tickets" });
  app.register(categoriesController, { prefix: "/categories" });
}
