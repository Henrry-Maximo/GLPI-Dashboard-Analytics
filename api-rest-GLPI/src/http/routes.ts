import type { FastifyInstance } from "fastify";

import { register } from "./controllers/users/register";
import { signIn } from "./controllers/users/signIn";
import { signInExternal } from "./controllers/users/signInExternal";

import { categoriesController } from "./controllers/categories";
import { ticketsController } from "./controllers/tickets";

import { stats } from "./controllers/stats/stats";
import { registerTickets } from "./controllers/tickets/register";
import { tickets } from "./controllers/tickets/tickets";
import { profile } from "./controllers/users/profile";
import { users } from "./controllers/users/users";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  // definindo rotas
  app.post("/sessions", signIn);
  app.post("/register", register);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
  app.get("/users", { onRequest: [verifyJwt] }, users);
  app.get("/stats", { onRequest: [verifyJwt] }, stats);
  app.get("/tickets", { onRequest: [verifyJwt] }, tickets);
  app.post("/tickets", { onRequest: [verifyJwt] }, registerTickets);

  // registrando módulos
  // app.register(usersController, { prefix: "/users" });
  app.register(ticketsController, { prefix: "/tickets" });
  app.register(categoriesController, { prefix: "/categories" });
}
