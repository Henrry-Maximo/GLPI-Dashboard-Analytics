import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {
    await req.jwtVerify();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}
