import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-get-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function categories(req: FastifyRequest, reply: FastifyReply) {
  const categoriesQuerySchema = z.object({
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
  });

  const { start_date, end_date } = categoriesQuerySchema.parse(req.query);

  try {
    const getCategories = makeGetCategoriesUseCase();

    const categories = await getCategories.execute({ start_date, end_date });

    return reply.status(200).send({ ...categories });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
