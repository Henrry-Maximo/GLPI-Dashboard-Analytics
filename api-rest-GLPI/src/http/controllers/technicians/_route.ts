import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { technicians } from "./technicians";

export async function techniciansRoutes(app: FastifyInstance) {
  app.get("/technicians", { onRequest: verifyJwt }, technicians);
}
