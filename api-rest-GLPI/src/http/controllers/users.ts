import { manageUsers } from "@/use-cases/get-users";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

interface UsersQueryParams {
  count?: 'true';
  tickets?: 'true';
  status?: 'active' | 'inactive';
  search?: string;
}

export async function usersController(app: FastifyInstance) {
  app.get<{ Querystring: UsersQueryParams }>("/", { onRequest: [verifyJwt] }, async (req, reply) => {
    const { count, tickets, status, search } = req.query;
    
    const result = await manageUsers({
      count: count === 'true',
      tickets: tickets === 'true',
      status,
      search
    });

    return reply.status(200).send(result);
  });
}
