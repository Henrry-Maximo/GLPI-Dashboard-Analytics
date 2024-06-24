import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function userController(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    try {
      const conn = await createConnection();
      const [rows] = await conn.query("SELECT name FROM glpi_users;");
      await conn.end();
      return reply.status(200).send(rows);
    } catch (err) {
      return reply.status(500).send({
        error: "Internal Server Error",
      });
    }
  });
}
