import type { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { tickets } from "./tickets";
import { register } from "./register";
import { pendings } from "./pendings";

export async function ticketsRoutes(app: FastifyInstance) {
  app.get("/tickets", { onRequest: [verifyJwt] }, tickets);
  app.post("/tickets", { onRequest: [verifyJwt] }, register);
  app.get("/pendings", { onRequest: [verifyJwt] }, pendings);
}
