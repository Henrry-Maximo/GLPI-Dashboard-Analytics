import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { makeRegisterTicketUseCase } from "@/use-cases/factories/make-register-ticket-use-case";

// const getUserProfile = makeGetUserProfileUseCase();

//     const { user } = await getUserProfile.execute({
//       userId: req.user.sub,
//     });

export async function registerTickets(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const ticketBodySchema = z.object({
    // users_id_recipient: z.coerce.number(),
    entities_id: z.coerce.number().optional().default(1),
    name: z.string(),
  });

  const {
    entities_id,
    name,
  } = ticketBodySchema.parse(req.body);

  try {
    const userId = Number(req.user.sub);
    const registerUseCase = makeRegisterTicketUseCase();

    const ticket = await registerUseCase.execute({
      users_id_recipient: userId,
      entities_id,
      name,
    });

    return reply.status(201).send({ ticket });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
