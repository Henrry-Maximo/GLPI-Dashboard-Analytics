import { getUsers } from "@/use-cases/get-users";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getUsersIdCountList } from "@/use-cases/get-users-by-id-count";
import { getUsersByTickets } from "@/use-cases/get-users-by-tickets";

export async function usersController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { usersFromDatabase: users } = await getUsers();

    return reply.status(200).send(users);
  });

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
    }
  );
}
