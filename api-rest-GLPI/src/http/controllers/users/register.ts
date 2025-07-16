import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { RegisterUseCase } from "@/use-cases/register";
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { name, password } = userBodySchema.parse(req.body);

  try {
    const knexUsersRepository = new KnexUsersRepository();
    const registerUseCase = new RegisterUseCase(knexUsersRepository);

    const { user } = await registerUseCase.execute({ name, password });

    return reply
      .status(201)
      .send({ message: "User creating with successful.", name: user?.name });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
