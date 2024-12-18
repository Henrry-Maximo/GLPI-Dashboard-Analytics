import { FastifyReply, FastifyRequest } from "fastify";

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
        expiresIn: "15m", // Token de acesso curto (15 minutos)
      }
    );
    
    const refreshToken = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        expiresIn: "7d", // Token de refresh mais longo
      }
    );
    
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict", // seguro para cookies
        httpOnly: true, // protege contra XSS
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
