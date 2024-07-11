import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function userController(app: FastifyInstance) {
  // retornar o nome de todos os usuários
  app.get("/users", async (req, reply) => {
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

  // retornar contagem de usuário existentes
  app.get("/users-by-count", async (req, reply) => {
    try {
      const conn = await createConnection();
      const [rows] = await conn.query(
        "SELECT COUNT(id) AS Total FROM glpi_users;"
      );
      await conn.end();
      return reply.status(200).send(rows);
    } catch (err) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  // retornar número de chamados por usuário
  app.get("/users-by-tickets", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(`
    SELECT 
      u.name AS usuario,
      COUNT(t.id) AS quantidade_chamados
    FROM 
      glpi_tickets t
    JOIN 
      glpi_users u ON t.users_id_recipient = u.id
    GROUP BY 
      u.name
    ORDER BY 
      quantidade_chamados DESC;`);
    return reply.status(200).send(rows);
  });
}
