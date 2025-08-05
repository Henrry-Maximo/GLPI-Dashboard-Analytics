import { WithoutTicketsRegistration } from "@/use-cases/errors/without-tickets-registration";
import { makeGetTicketsUseCase } from "@/use-cases/factories/make-get-tickets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function tickets(req: FastifyRequest, reply: FastifyReply) {
  const ticketsQuerySchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
    status: z.coerce.number().min(1).max(6).optional(),
    id_recipient: z.coerce.number().optional(),
    id_request_type: z.coerce.number().optional(),
    id_categories: z.coerce.number().optional(),
    page: z.coerce.number().min(1).default(1),
  });

  const { id, name, status, id_recipient, id_request_type, id_categories, page } =
    ticketsQuerySchema.parse(req.query);

  try {
    const getTicketsUseCase = makeGetTicketsUseCase();

    const { tickets } = await getTicketsUseCase.execute({
      id,
      name,
      status,
      id_recipient,
      id_request_type,
      id_categories,
      page,
    });

    return reply.status(200).send({ tickets });
  } catch (err) {
    if (err instanceof WithoutTicketsRegistration) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
