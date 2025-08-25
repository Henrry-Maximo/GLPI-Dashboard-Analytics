import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { categories } from "./categories";

export async function categoriesRoutes(app: FastifyInstance) {
  app.get("/categories", { onRequest: [verifyJwt] }, categories);
}
