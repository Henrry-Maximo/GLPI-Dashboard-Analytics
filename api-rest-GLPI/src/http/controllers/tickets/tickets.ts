import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetTicketsUseCase } from "@/use-cases/factories/make-get-tickets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function tickets(req: FastifyRequest, reply: FastifyReply) {
  const ticketsParamsSchema = z.object({
    id: z.coerce.number().optional(),
  });

  const ticketsQuerySchema = z.object({
    name: z.string().optional(),
    status: z.coerce.number().min(1).max(6).optional(),
    id_recipient: z.coerce.number().optional(),
    id_type: z.coerce.number().optional(),
    id_categories: z.coerce.number().optional(),
    page: z.coerce.number().min(1).default(1),
  });

  const { id } = ticketsParamsSchema.parse(req?.params);

  const { name, status, id_recipient, id_type, id_categories, page } =
    ticketsQuerySchema.parse(req.query);

  try {
    const getTicketsUseCase = makeGetTicketsUseCase();

    const { tickets } = await getTicketsUseCase.execute({
      id,
      name,
      status,
      id_recipient,
      id_type,
      id_categories,
      page,
    });

    return reply.status(200).send({ tickets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
