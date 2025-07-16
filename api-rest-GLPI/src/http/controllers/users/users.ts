import { WithoutUsersRegistration } from "@/use-cases/errors/without-users-registration";
import { getUsers } from "@/use-cases/get-users";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export interface listUsersController {
  search: string;
}

export async function users(req: FastifyRequest, reply: FastifyReply) {
  const usersQuerySchema = z.object({
    // status: z.enum(["active", "inactive"]).optional(),
    search: z.string().optional(),
  });

  const { search } = usersQuerySchema.parse(req.query);

  try {
    const users = await getUsers({ search });

    return reply.status(200).send({ users });
  } catch (err) {
    if (err instanceof WithoutUsersRegistration) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
