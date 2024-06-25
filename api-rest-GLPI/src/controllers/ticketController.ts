import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function ticketController(app: FastifyInstance) {
  app.get("/tickets", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT name FROM glpi_tickets;"); 
    return reply.status(200).send(rows);
  })

  app.get("/tickets-by-count", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT COUNT(id) AS Total FROM glpi_tickets;"); 
    return reply.status(200).send(rows);
  })

  app.get("/ticket-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT c.completename AS categoria, COUNT(t.id) AS quantidade_tickets FROM glpi_tickets t JOIN glpi_itilcategories c ON t.itilcategories_id = c.id GROUP BY c.completename ORDER BY quantidade_tickets DESC;")
    return reply.status(200).send(rows)
  })
}