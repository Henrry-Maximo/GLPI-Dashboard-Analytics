import type { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { profile } from "./profile";
import { register } from "./register";
import { signIn } from "./signIn";
import { users } from "./users";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/sessions", signIn);
  app.post("/register", register);
  
  app.get("/me", { onRequest: [verifyJwt] }, profile);
  app.get("/users", { onRequest: [verifyJwt] }, users);
}
