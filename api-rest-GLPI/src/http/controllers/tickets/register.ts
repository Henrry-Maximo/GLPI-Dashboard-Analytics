import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeRegisterTicketUseCase } from "@/use-cases/factories/make-register-ticket-use-case";

export async function registerTickets(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const ticketBodySchema = z.object({
    entities_id: z.coerce.number().optional().default(1),
    name: z.string(),
    content: z.string().optional().default(""),
    requesttypes_id: z.coerce.number(),
    urgency: z.coerce.number(),
    itilcategories_id: z.coerce.number(),
    locations_id: z.coerce.number(),
  });

  const {
    entities_id,
    name,
    content,
    requesttypes_id,
    urgency,
    itilcategories_id,
    locations_id,
  } = ticketBodySchema.parse(req.body);

  try {
    const userId = Number(req.user.sub); // obter id do usuário via jwt
    const registerUseCase = makeRegisterTicketUseCase();

    const ticket = await registerUseCase.execute({
      entities_id,
      name,
      content,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
      users_id_recipient: userId,
    });

    return reply.status(201).send({ ...ticket });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
