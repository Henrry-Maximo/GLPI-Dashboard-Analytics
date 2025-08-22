import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { name, password } = userBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

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
