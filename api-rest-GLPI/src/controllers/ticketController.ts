import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function ticketController(app: FastifyInstance) {
  // retornar todos os chamados por nome
  app.get("/tickets", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT name FROM glpi_tickets;");
    return reply.status(200).send(rows);
  });

  // retornar número de chamados por status
  app.get("/tickets-by-count", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(`
      SELECT 
        COUNT(id) AS total_chamados,
        COUNT(CASE WHEN status = 1 THEN 1 END) AS total_abertos,
        COUNT(CASE WHEN status = 2 THEN 1 END) AS total_atribuidos,
        COUNT(CASE WHEN status = 4 THEN 1 END) AS total_pendentes,
        COUNT(CASE WHEN status = 5 THEN 1 END) AS total_solucionados,
        COUNT(CASE WHEN status = 6 THEN 1 END) AS total_fechados
      FROM glpi_tickets;
    `);
    return reply.status(200).send(rows);
  });

  // retornar número de chamado por urgência
  app.get("/tickets-by-count-urgency", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 1 AND urgency = 1 THEN 1 END) AS muito_baixa_urgencia,
        COUNT(CASE WHEN status = 2 AND urgency = 2 THEN 1 END) AS baixa_urgencia,
        COUNT(CASE WHEN status = 3 AND urgency = 3 THEN 1 END) AS media_urgencia,
        COUNT(CASE WHEN status = 4 AND urgency = 4 THEN 1 END) AS alta_urgencia,
        COUNT(CASE WHEN status = 5 AND urgency = 5 THEN 1 END) AS muito_alta_urgencia
      FROM glpi_tickets;
    `);
    return reply.status(200).send(rows);
  });

  // retornar quantiade de chamados associados a uma categoria
  app.get("/ticket-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(
      `SELECT c.completename AS category, COUNT(t.id) AS quantity_tickets FROM glpi_tickets t JOIN glpi_itilcategories c ON t.itilcategories_id = c.id GROUP BY c.completename ORDER BY quantity_tickets DESC;`
    );
    return reply.status(200).send(rows);
  });

  // retornar últimos 10 chamados por categoria (id, name, status, date, category)
  app.get("/ticket-last-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(
      "SELECT t.id, t.name, t.status as status, t.date as date, c.name AS category_name FROM glpi_tickets AS t INNER JOIN glpi_itilcategories AS c ON t.itilcategories_id = c.id WHERE t.status IN (1,2,3,4,5) ORDER BY t.id DESC LIMIT 10;"
    );
    return reply.status(200).send(rows);
  });
}
