import { FastifyInstance } from "fastify";
import { getCategories } from "@/use-cases/get-categories";

export async function categorieController(app: FastifyInstance) {
  // retornar nome de todas as categorias
  app.get("/categories", async (req, reply) => {
    const { categories } = await getCategories();

    return reply.status(200).send({ categories })
  });

  // retornar total de categorias
  app.get("/categories-by-count", async (req, reply) => {
    // const [rows] = await db.execute(
    //   "SELECT COUNT(id) as count FROM glpi_itilcategories;"
    // );

    // return reply.status(200).send(rows);
  });
}
