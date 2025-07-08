import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { registerUseCase } from "@/use-cases/register";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { name, password } = userBodySchema.parse(req.body);

  try {
    await registerUseCase({ name, password });

    return reply.status(201).send({ message: "User creating with successful." });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
