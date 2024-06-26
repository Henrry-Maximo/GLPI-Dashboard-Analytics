import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function categorieController(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.execute("SELECT name FROM glpi_itilcategories;");

    return reply.status(200).send(rows);
  });
}
