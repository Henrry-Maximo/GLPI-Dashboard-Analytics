import { knex } from "@/database/knex-config";
import type { FastifyReply, FastifyRequest } from "fastify";

interface JWTPayload {
  sub: number;
  name: string;
  iat: number;
  exp: number;
}

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
  try {
    const user: JWTPayload = await req.jwtVerify();

    const isUserActive = await knex("glpi_users")
      .select("is_active")
      .where("id", user.sub)
      .first();

    if (isUserActive?.is_active === 0) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}
