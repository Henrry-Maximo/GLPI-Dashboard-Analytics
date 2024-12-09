import { FastifyInstance } from "fastify";
import { getCategories } from "@/use-cases/get-categories";
import { categoriesByCount } from "@/use-cases/categories-by-count";

export async function categorieController(app: FastifyInstance) {
  // retornar nome de todas as categorias
  app.get("/categories", async (req, reply) => {
    const { categories } = await getCategories();

    return reply.status(200).send({ categories })
  });

  // retornar total de categorias
  app.get("/categories-by-count", async (req, reply) => {
    const { categoriesQuantity } = await categoriesByCount();

    return reply.status(200).send({ categoriesQuantity })
  });
}
