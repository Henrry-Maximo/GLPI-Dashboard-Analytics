import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../database/knex-config";

export async function ticketController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/search", async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.string().optional(),
      filter: z.coerce.string().optional(),
    });

    const { id, filter } = requestIdTicketQuerySchema.parse(req.query);

    let result = knex("glpi_tickets").select([
      "id",
      "entities_id",
      "name",
      "date_creation",
      "date_mod",
      "solvedate",
    ]);

    if (filter === "true" && id) {
      result = result.where("id", id);
    }

    const rows = await result;
    return reply.status(200).send(rows);
  });

  // lista de chamados por status/urgência/categorias
  app.get("/state", async (req, reply) => {
    const requestStatusQuerySchema = z.object({
      filter: z.coerce.string().optional(),
      by: z.coerce.string().optional(),
    });

    const { filter, by } = requestStatusQuerySchema.parse(req.query);

    const ticketsByStatusCount = await knex("glpi_tickets").select([
      knex.raw("COUNT(id) AS tickets_total"),
      knex.raw("COUNT(CASE WHEN status = 1 THEN 1 END) AS tickets_open"),
      knex.raw("COUNT(CASE WHEN status = 2 THEN 1 END) AS tickets_assigned"),
      knex.raw("COUNT(CASE WHEN status = 4 THEN 1 END) AS tickets_pending"),
      knex.raw("COUNT(CASE WHEN status = 5 THEN 1 END) AS tickets_solved"),
      knex.raw("COUNT(CASE WHEN status = 6 THEN 1 END) AS tickets_closed"),
    ]);

    const ticketsByCategory = await knex("glpi_tickets")
      .select([
        "glpi_itilcategories.name AS category_name",
        knex.raw("COUNT(glpi_tickets.id) AS tickets_count"),
      ])
      .innerJoin(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id",
      )
      .groupBy("glpi_tickets.itilcategories_id", "glpi_itilcategories.name");

    const ticketsByUrgencyCount = await knex("glpi_tickets").select([
      knex.raw(
        "COUNT(CASE WHEN status = 1 AND urgency = 1 THEN 1 END) AS tickets_very_low",
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 2 AND urgency = 2 THEN 1 END) AS tickets_low",
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 3 AND urgency = 3 THEN 1 END) AS tickets_medium",
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 4 AND urgency = 4 THEN 1 END) AS tickets_high",
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 5 AND urgency = 5 THEN 1 END) AS tickets_very_high",
      ),
    ]);

    if (filter === "true" && by === "urgency") {
      return reply.status(200).send(ticketsByUrgencyCount);
    }

    if (filter === "true" && by === "categories") {
      return reply.status(200).send(ticketsByCategory);
    }

    return reply.status(200).send(ticketsByStatusCount);
  });

  // lista de chamados por status/data
  app.get("/date", async (req, reply) => {
    const tickets = await knex("glpi_tickets")
      .select(knex.raw("DATE(date_creation) AS data"), "status")
      .count("id AS quantidade")
      .whereNotIn("status", [6])
      .groupByRaw("DATE(date_creation), status")
      .orderByRaw("DATE(date_creation) DESC");
    return reply.status(200).send(tickets);
  });

  app.get("/last", async (req, reply) => {
    const ticketLastSchema = await knex("glpi_tickets")
      .select([
        "glpi_tickets.id",
        "glpi_tickets.name AS title",
        "glpi_tickets.date_creation",
        knex.raw(`
      CASE glpi_tickets.status
        WHEN 1 THEN 'Novo'
        WHEN 2 THEN 'Em Atendimento (Atribuído)'
        WHEN 3 THEN 'Em Atendimento (Planejado)'
        WHEN 4 THEN 'Pendente'
        WHEN 5 THEN 'Solucionado'
        WHEN 6 THEN 'Fechado'
        ELSE 'Unknown'
      END AS status
    `),
        knex.raw(`
      CASE glpi_tickets.urgency
        WHEN 1 THEN 'Muito baixo'
        WHEN 2 THEN 'Baixo'
        WHEN 3 THEN 'Médio'
        WHEN 4 THEN 'Alto'
        WHEN 5 THEN 'Muito Alto'
        ELSE 'Unknown'
      END AS priority
    `),
        "glpi_locations.name AS location",
        "glpi_users.firstname",
        "glpi_users.realname",
      ])
      .leftJoin(
        "glpi_locations",
        "glpi_tickets.locations_id",
        "glpi_locations.id",
      )
      .leftJoin(
        "glpi_tickets_users",
        "glpi_tickets.id",
        "glpi_tickets_users.tickets_id",
      )
      .leftJoin("glpi_users", "glpi_tickets_users.users_id", "glpi_users.id")
      .where("glpi_tickets_users.type", 2)
      .whereNot("glpi_tickets.status", 6)
      .orderBy("glpi_tickets.date_creation", "desc")
      .limit(1);

    return reply.status(200).send(ticketLastSchema);
  });

  // retornar quantiade de chamados associados a uma categoria
  // app.get("/tickets-by-categorie", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(`
  //     SELECT c.completename AS category, COUNT(t.id) AS quantity_tickets
  //       FROM glpi_tickets t
  //     JOIN glpi_itilcategories c ON t.itilcategories_id = c.id GROUP BY c.completename
  //       ORDER BY quantity_tickets DESC;
  //     `);
  //   return reply.status(200).send(rows);
  // });

  // retornar últimos 10 chamados por categoria (id, name, status, date, category)
  // app.get("/tickets-last-by-categorie", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(
  //     "SELECT t.id, t.name, t.status as status, t.date as date, c.name AS category_name FROM glpi_tickets AS t INNER JOIN glpi_itilcategories AS c ON t.itilcategories_id = c.id WHERE t.status IN (1,2,3,4,5) ORDER BY t.id DESC LIMIT 10;"
  //   );
  //   return reply.status(200).send(rows);
  // });

  // retornar os últimos 10 chamados por entidade/status/urgência/usuário/técnico
  // app.get("/tickets-line-time", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(`
  //     SELECT
  //         DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "Data de criação",
  //         e.name AS "Entidade",
  //         t.id as "ID do chamado",
  //         t.name AS "Título do chamado",
  //         GROUP_CONCAT(DISTINCT CONCAT(u.firstname,' ', u.realname)) AS "Requerente",
  //         GROUP_CONCAT(DISTINCT CONCAT(u2.firstname,' ', u2.realname)) AS "Técnico",
  //         CASE
  //             WHEN t.status = 1 THEN 'Novo'
  //             WHEN t.status = 2 THEN 'Em Atendimento (atribuído)'
  //             WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
  //             WHEN t.status = 4 THEN 'Pendente'
  //             WHEN t.status = 5 THEN 'Solucionado'
  //             WHEN t.status = 6 THEN 'Fechado'
  //         END AS "Status Chamado",
  //         CASE
  //             WHEN t.priority = 6 THEN 'Crítica'
  //             WHEN t.priority = 1 THEN 'Muito baixa'
  //             WHEN t.priority = 2 THEN 'Baixa'
  //             WHEN t.priority = 3 THEN 'Média'
  //             WHEN t.priority = 4 THEN 'Alta'
  //             WHEN t.priority = 5 THEN 'Muito alta'
  //         END AS "Prioridade"
  //     FROM glpi_tickets t
  //     LEFT OUTER JOIN glpi_entities e ON t.entities_id = e.id
  //     LEFT OUTER JOIN glpi_tickets_users tu1 ON (tu1.tickets_id = t.id AND tu1.type = 1)
  //     LEFT OUTER JOIN glpi_users u ON u.id = tu1.users_id
  //     LEFT OUTER JOIN glpi_tickets_users tu2 ON (tu2.tickets_id = t.id AND tu2.type = 2)
  //     LEFT OUTER JOIN glpi_users u2 ON u2.id = tu2.users_id
  //     WHERE t.status <> 6 AND t.status <> 5
  //     GROUP BY t.id
  //     ORDER BY t.date_mod DESC LIMIT 10;
  //   `);
  //   return reply.status(200).send(rows);
  // });

  // retornar chamados que atingiram o prazo do SLA
  // app.get("/tickets-late", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] =
  //     await db.query(`SELECT COUNT(*) AS "Chamado Atrasados" FROM glpi_tickets
  //     WHERE glpi_tickets.status NOT IN (5, 6)
  //     AND glpi_tickets.solvedate IS NULL
  //     AND glpi_tickets.time_to_resolve < TIMEDIFF(NOW(), glpi_tickets.date) LIMIT 10`);
  //   reply.status(200).send(rows);
  // });

  // retornar chamados (quantidade) por status e data
  // app.get("/tickets-line-late-by-status-date", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(
  //     `SELECT
  //       DATE(date_creation) AS data, status, COUNT(id) AS quantidade
  //     FROM
  //       glpi_tickets
  //     WHERE
  //       status NOT IN (6)
  //     GROUP BY DATE(date_creation), status
  //     ORDER BY DATE(date_creation) DESC;`
  //   );

  //   return reply.status(200).send(rows);
  // });

  // retornar chamados (quantidade) por técnico
  // app.get("/tickets-by-technician", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(`
  //     SELECT
  //       b.name AS technician, COUNT(a.id) AS quantity_tickets
  //     FROM
  //       glpi_tickets a
  //     JOIN
  //       glpi_tickets_users c ON a.id = c.tickets_id
  //     JOIN
  //       glpi_users b ON c.users_id = b.id
  //     WHERE
  //       c.type = 2
  //     GROUP BY
  //       b.name
  //     ORDER BY
  //       quantity_tickets DESC;
  //     `);
  //   return reply.status(200).send(rows);
  // });

  // retornar número de chamados por tipo (requisição/incidente)
  // app.get("/tickets-by-type", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(`
  //     SELECT
  //       COUNT(CASE WHEN t.type = 1 THEN 1 END) AS 'incident',
  //       COUNT(CASE WHEN t.type = 2 THEN 1 END) AS 'request'
  //     FROM
  //       glpi_tickets t
  //     `);
  //   return reply.status(200).send(rows);
  // });

  // retornar número de chamados solucionados por técnico
  // app.get("/tickets-by-technician-solution", async (req, reply) => {
  //   const db = await createConnection();
  //   const [rows] = await db.query(`
  //   SELECT
  //     glpi_users.name AS 'Technician Name',
  //     glpi_groups.name AS 'Group Name',
  //     COUNT(glpi_tickets_users.tickets_id) AS 'Number of Tickets'
  //   FROM
  //     glpi_tickets_users
  //       INNER JOIN
  //     glpi_users ON glpi_tickets_users.users_id = glpi_users.id
  //       INNER JOIN
  //     glpi_groups_users ON glpi_tickets_users.users_id = glpi_groups_users.users_id
  //       INNER JOIN glpi_groups ON glpi_groups_users.groups_id = glpi_groups.id
  //   WHERE
  //     glpi_users.name NOT IN ('luana.yasmim', 'cassia.martins', 'kevin.araujo')
  //   GROUP BY glpi_tickets_users.users_id
  //   ORDER BY COUNT(glpi_tickets_users.tickets_id) DESC
  //   `);
  //   return reply.status(200).send(rows);
  // });
}
