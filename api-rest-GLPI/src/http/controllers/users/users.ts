import { WithoutUsersRegistration } from "@/use-cases/errors/without-users-registration";
import { getUsers } from "@/use-cases/get-users";
import { FastifyReply, FastifyRequest } from "fastify";

export async function users(_: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await getUsers();

    return reply.status(200).send({ users });
  } catch (err) {
    if (err instanceof WithoutUsersRegistration) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
