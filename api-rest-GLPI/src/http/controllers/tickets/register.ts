import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { makeRegisterTicketUseCase } from "@/use-cases/factories/make-register-use-case copy";

export async function registerTickets(req: FastifyRequest, reply: FastifyReply) {
  const ticketBodySchema = z.object({
    name: z.string(),
  });

  const { name } = ticketBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterTicketUseCase();

    const ticket = await registerUseCase.execute(name);

    return reply
      .status(201)
      .send({ message: "Ticket creating with successful.", ticket });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
