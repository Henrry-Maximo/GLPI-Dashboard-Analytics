import { FastifyInstance } from "fastify";
import { createConnection } from "../database/db";

export async function ticketController(app: FastifyInstance) {
  // retornar todos os chamados por nome
  app.get("/tickets", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query("SELECT name FROM glpi_tickets;");
    await db.end();
    return reply.status(200).send(rows);
  });

  // retornar número de chamados por status
  app.get("/tickets-by-count-status", async (req, reply) => {
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
  app.get("/tickets-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(
      `SELECT c.completename AS category, COUNT(t.id) AS quantity_tickets FROM glpi_tickets t JOIN glpi_itilcategories c ON t.itilcategories_id = c.id GROUP BY c.completename ORDER BY quantity_tickets DESC;`
    );
    return reply.status(200).send(rows);
  });

  // retornar últimos 10 chamados por categoria (id, name, status, date, category)
  app.get("/tickets-last-by-categorie", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(
      "SELECT t.id, t.name, t.status as status, t.date as date, c.name AS category_name FROM glpi_tickets AS t INNER JOIN glpi_itilcategories AS c ON t.itilcategories_id = c.id WHERE t.status IN (1,2,3,4,5) ORDER BY t.id DESC LIMIT 10;"
    );
    return reply.status(200).send(rows);
  });

  // retornar os últimos 10 chamados por entidade/status/urgência/usuário/técnico
  app.get("/tickets-line-time", async (req, reply) => {
    const db = await createConnection();
    const [rows] = await db.query(`
      SELECT 
          DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "Data de criação",
          e.name AS "Entidade",
          t.id as "ID do chamado",
          t.name AS "Título do chamado",
          GROUP_CONCAT(DISTINCT CONCAT(u.firstname,' ', u.realname)) AS "Requerente",
          GROUP_CONCAT(DISTINCT CONCAT(u2.firstname,' ', u2.realname)) AS "Técnico",
          CASE 
              WHEN t.status = 1 THEN 'Novo'
              WHEN t.status = 2 THEN 'Em Atendimento (atribuído)'
              WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
              WHEN t.status = 4 THEN 'Pendente'
              WHEN t.status = 5 THEN 'Solucionado'
              WHEN t.status = 6 THEN 'Fechado'
          END AS "Status Chamado",
          CASE 
              WHEN t.priority = 6 THEN 'Crítica'
              WHEN t.priority = 1 THEN 'Muito baixa'
              WHEN t.priority = 2 THEN 'Baixa'
              WHEN t.priority = 3 THEN 'Média'
              WHEN t.priority = 4 THEN 'Alta'
              WHEN t.priority = 5 THEN 'Muito alta'
          END AS "Prioridade"
      FROM glpi_tickets t
      LEFT OUTER JOIN glpi_entities e ON t.entities_id = e.id
      LEFT OUTER JOIN glpi_tickets_users tu1 ON (tu1.tickets_id = t.id AND tu1.type = 1)
      LEFT OUTER JOIN glpi_users u ON u.id = tu1.users_id
      LEFT OUTER JOIN glpi_tickets_users tu2 ON (tu2.tickets_id = t.id AND tu2.type = 2)
      LEFT OUTER JOIN glpi_users u2 ON u2.id = tu2.users_id
      WHERE t.status <> 6 AND t.status <> 5
      GROUP BY t.id
      ORDER BY t.date_mod DESC LIMIT 10;
  `);
    return reply.status(200).send(rows);
  });

  // retornar chamados que atingiram o prazo do SLA
  app.get("/tickets-late", async (req, reply) => {
    const db = await createConnection();
    const [rows] =
      await db.query(`SELECT COUNT(*) AS "Chamado Atrasados" FROM glpi_tickets
      WHERE glpi_tickets.status NOT IN (5, 6) 
      AND glpi_tickets.solvedate IS NULL 
      AND glpi_tickets.time_to_resolve < TIMEDIFF(NOW(), glpi_tickets.date) LIMIT 10`);
    reply.status(200).send(rows);
  });
}
