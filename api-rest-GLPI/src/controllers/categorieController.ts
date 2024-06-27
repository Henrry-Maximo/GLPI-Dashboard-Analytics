import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function categorieController(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    try {
      const db = await createConnection();
    const [rows] = await db.execute(
      "SELECT name FROM glpi_itilcategories"
    );

    return reply.status(200).send(rows);
    } catch (err) {
      return reply.status(400).send(err);
    }
  });

  app.get("/categories-by-count", async (req, reply) => {
    try {
      const db = await createConnection();
    const [rows] = await db.execute(
      "SELECT COUNT(id) as count FROM glpi_itilcategories;"
    );

    return reply.status(200).send(rows);
    } catch (err) {
      return reply.status(400).send(err);
    }
  });
}
