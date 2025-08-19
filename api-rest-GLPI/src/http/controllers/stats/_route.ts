import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { stats } from "./stats";

export async function statsRoutes(app: FastifyInstance) {
  app.get("/stats", { onRequest: [verifyJwt] }, stats);
}
