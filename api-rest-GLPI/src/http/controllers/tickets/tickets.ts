import { WithoutTicketsRegistration } from "@/use-cases/errors/without-tickets-registration";
import { makeGetTicketsUseCase } from "@/use-cases/factories/make-get-tickets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function tickets(req: FastifyRequest, reply: FastifyReply) {
  const ticketsQuerySchema = z.object({
    name: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  });

  const { name, page } = ticketsQuerySchema.parse(req.query);

  try {
    const getTicketsUseCase = makeGetTicketsUseCase();

    const { tickets } = await getTicketsUseCase.execute({ name, page });

    return reply.status(200).send({ tickets });
  } catch (err) {
    if (err instanceof WithoutTicketsRegistration) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
