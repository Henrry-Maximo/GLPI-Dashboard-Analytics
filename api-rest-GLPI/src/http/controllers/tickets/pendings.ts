import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetTicketsPendingsUseCase } from "@/use-cases/factories/make-get-tickets-pendings-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function pendings(_: FastifyRequest, reply: FastifyReply) {
  try {
    const getTickets = makeGetTicketsPendingsUseCase();

    const tickets = await getTickets.execute();

    return reply.status(200).send({ ...tickets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
