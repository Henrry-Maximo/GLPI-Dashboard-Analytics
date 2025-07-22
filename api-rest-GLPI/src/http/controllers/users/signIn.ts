import type { FastifyReply, FastifyRequest } from "fastify";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { signInUseCase } from "@/use-cases/signIn";

import z from "zod";

export const signIn = async (req: FastifyRequest, reply: FastifyReply) => {
  const userBodySchema = z.object({
    name: z.string(),
    password: z.string().min(1).max(34),
  });

  const { name, password } = userBodySchema.parse(req.body);

  try {
    const { user } = await signInUseCase({ name, password });

    const token = await reply.jwtSign(
      {
        sub: user.id,
        name: user.name
      },
      {
        expiresIn: "1d",
      }
    );
    
    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
};
