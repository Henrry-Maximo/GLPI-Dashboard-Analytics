import { getUsers } from "@/use-cases/get-users";
import type { FastifyInstance } from "fastify";

export async function usersController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/users", async (_, reply) => {
    const { usersFromDatabase: users } = await getUsers();

    return reply.status(200).send( users )
  });
}
