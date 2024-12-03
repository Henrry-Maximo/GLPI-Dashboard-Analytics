import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { createdUser } from "@/use-cases/created-user";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const userBodyRequest = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { name, password } = userBodyRequest.parse(req.body);

  try {
    await createdUser({ name, password });
    return reply.status(204).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
