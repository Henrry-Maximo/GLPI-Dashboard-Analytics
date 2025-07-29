import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetStatsUseCase } from "@/use-cases/factories/make-get-stats-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function stats(req: FastifyRequest, reply: FastifyReply) {
  try {
    const getStats = makeGetStatsUseCase();

    const stats = await getStats.execute();

    return reply.status(200).send({ ...stats });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
