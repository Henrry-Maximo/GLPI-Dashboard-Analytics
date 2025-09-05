import type { FastifyReply, FastifyRequest } from "fastify";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

import { makeSignInUseCase } from "@/use-cases/factories/make-signIn-use-case";
import z from "zod";
import { UserNotAuthorization } from "@/use-cases/errors/user-not-authorization-error";
import { env } from "@/env";

export const signIn = async (req: FastifyRequest, reply: FastifyReply) => {
  const userBodySchema = z.object({
    name: z.string(),
    password: z.string().min(1).max(34),
  });

  const { name, password } = userBodySchema.parse(req.body);

  try {
    const signInUseCase = makeSignInUseCase();

    const { user } = await signInUseCase.execute({ name, password });

    const token = await reply.jwtSign(
      {
        sub: user.id,
        name: user.name,
      },
      {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    );

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof UserNotAuthorization) {
      return reply.status(403).send({ message: err.message })
    }

    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
};
