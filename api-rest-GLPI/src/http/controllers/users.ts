import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getUsersByTickets } from "@/use-cases/get-users-by-tickets";

export async function usersController(app: FastifyInstance) {
  app.get("/users-by-count", { onRequest: [verifyJwt] }, async (req, reply) => {
    const { sumTotalUsersFromDatabase: totalUsers } =
      await getUsersIdCountList();

    return reply.status(200).send(totalUsers);
  });

  app.get(
    "/users-by-tickets",
    { onRequest: [verifyJwt] },
    async (req, reply) => {
      const { getTotalTickets: totalTicketsUsers } = await getUsersByTickets();

      return reply.status(200).send(totalTicketsUsers);
    },
  );
}
