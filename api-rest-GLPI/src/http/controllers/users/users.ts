import { WithoutUsersRegistration } from "@/use-cases/errors/without-users-registration";
import { usersUseCase } from "@/use-cases/get-users";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function users(req: FastifyRequest, reply: FastifyReply) {
  const filteredSearchSchema = z.object({
    status: z.string().optional(),
    search: z.string().optional(),
  });
  
  const { status, search } = filteredSearchSchema.parse(req.query);

  try {
    const users = await usersUseCase({ status, search });

    return reply.status(200).send({ users });
  } catch (err) {
    if (err instanceof WithoutUsersRegistration) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
