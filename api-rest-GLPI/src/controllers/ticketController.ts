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
    const [rows] = await db.query(`
      SELECT 
        COUNT(id) AS total_chamados,
        COUNT(CASE WHEN status = 1 THEN 1 END) AS total_abertos,
        COUNT(CASE WHEN status = 2 THEN 1 END) AS total_atribuidos,
        COUNT(CASE WHEN status = 4 THEN 1 END) AS total_pendentes,
        COUNT(CASE WHEN status = 5 THEN 1 END) AS total_finalizados
      FROM glpi_tickets;
    `); 
    return reply.status(200).send(rows);
  })

  app.get("/ticket-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT c.completename AS categoria, COUNT(t.id) AS quantidade_tickets FROM glpi_tickets t JOIN glpi_itilcategories c ON t.itilcategories_id = c.id GROUP BY c.completename ORDER BY quantidade_tickets DESC;")
    return reply.status(200).send(rows)
  })

  app.get("/ticket-last-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT t.id, t.name, t.status as status, t.date as date, c.name AS category_name FROM glpi_tickets AS t INNER JOIN glpi_itilcategories AS c ON t.itilcategories_id = c.id WHERE t.status IN (1,2,3,4) ORDER BY t.id DESC LIMIT 10;")
    return reply.status(200).send(rows)
  })
}