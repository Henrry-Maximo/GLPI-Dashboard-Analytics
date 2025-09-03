import type { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { profile } from "./profile";
import { register } from "./register";
import { signIn } from "./signIn";
import { users } from "./users";
import { clientIp } from "@/http/middlewares/client-ip";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/sessions", signIn);
  app.post("/users", register);
  
  app.get("/me", { onRequest: [verifyJwt, clientIp] }, profile);
  app.get("/users/:id?", { onRequest: [verifyJwt] }, users);
  
  // TODO: update for user
}
