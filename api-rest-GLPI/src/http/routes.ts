import type { FastifyInstance } from "fastify";

import { signIn } from "./controllers/users/signIn";
import { register } from "./controllers/users/register";

import { ticketsController } from "./controllers/tickets";
import { categoriesController } from "./controllers/categories";

import { users } from "./controllers/users/users";
import { profile } from "./controllers/users/profile";
import { verifyJwt } from "./middlewares/verify-jwt";
import { stats } from "./controllers/stats/stats";

export async function appRoutes(app: FastifyInstance) {
  // definindo rotas
  app.post("/sessions", signIn);
  app.post("/register", register);
  app.get("/me", { onRequest: [verifyJwt] }, profile);

  app.get("/users", { onRequest: [verifyJwt] }, users);
  app.get("/stats", { onRequest: [verifyJwt] }, stats);

  // registrando módulos
  // app.register(usersController, { prefix: "/users" });
  app.register(ticketsController, { prefix: "/tickets" });
  app.register(categoriesController, { prefix: "/categories" });
}
