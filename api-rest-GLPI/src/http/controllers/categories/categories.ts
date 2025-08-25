import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-get-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function categories(_: FastifyRequest, reply: FastifyReply) {
  try {
    const getCategories = makeGetCategoriesUseCase();

    const categories = await getCategories.execute();

    return reply.status(200).send({ ...categories });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
