import type { FastifyReply, FastifyRequest } from "fastify";

import { authenticate } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";

import z from "zod";

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const userBodyRequest = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { name, password } = userBodyRequest.parse(req.body);

  try {
    const { user } = await authenticate({ name, password });

    const token = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        expiresIn: "15m",
      }
    );
    
    // return reply
    //   .setCookie("refreshToken", refreshToken, {
    //     path: "/",
    //     secure: true,
    //     sameSite: "strict",
    //     httpOnly: true, 
    //   })
    //   .status(200)
    //   .send({ token });

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
