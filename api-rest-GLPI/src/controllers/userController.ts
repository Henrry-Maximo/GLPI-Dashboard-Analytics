import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";
import { knex } from "../database";
import { z } from "zod";
import { compare } from "bcryptjs";
import { InvalidCreatialsError } from "./errors/invalid-credentials-error";

export async function userController(app: FastifyInstance) {

  // rota para autenticar-se ao sistema
  app.post('/login', async (req, reply) => {
    const bodySchemaRequest = z.object({
      name: z.coerce.string(),
      password: z.coerce.string()
    });

    const { name, password } = bodySchemaRequest.parse(req.body)

    const [user] = await knex('glpi_users').where({ name })

    if (!user) {
      throw new InvalidCreatialsError();
    }

    const doesPasswordMatches = await compare(password, user[0].password)

    if (!doesPasswordMatches) {
      throw new InvalidCreatialsError();
    }

    return {
      user,
    };
  })

  // retornar o nome de todos os usuários
  app.get("/users", async (req, reply) => {
    try {
      const rows = await knex('glpi_users').select('name')

      return reply.status(200).send(rows);
    } catch (err) {
      return reply.status(500).send({
        error: "Internal Server Error",
      });
    }
  });

  // retornar total de usuário existentes
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
      b.name AS usuario,
      COUNT(a.id) AS quantidade_chamados
    FROM 
      glpi_tickets a
    JOIN 
      glpi_users b ON a.users_id_recipient = b.id
    GROUP BY 
      b.name
    ORDER BY 
      quantidade_chamados DESC;`);
    return reply.status(200).send(rows);
  });
}
