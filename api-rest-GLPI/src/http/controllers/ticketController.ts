import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../database/knex-config";
import { searchTickets } from "@/use-cases/search-tickets";

export async function ticketController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/search", async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.string().optional(),
    });

    const { id } = requestIdTicketQuerySchema.parse(req.query);

    const { tickets } = await searchTickets({ id })

    return reply.status(200).send({ tickets });
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

  // lista de quantidade de chamados por status/data
  app.get("/date", async (req, reply) => {
    const tickets = await knex("glpi_tickets")
      .select(knex.raw("DATE(date_creation) AS data"), "status")
      .count("id AS quantidade")
      .whereNotIn("status", [1, 2, 3, 4, 5])
      .groupByRaw("DATE(date_creation), status")
      .orderByRaw("DATE(date_creation) DESC");

    return reply.status(200).send(tickets);
  });

  // último chamado cadastrado
  app.get("/last", async (req, reply) => {
    const ticketLastSchema = await knex("glpi_tickets")
      .select([
        "glpi_tickets.id",
        "glpi_tickets.name AS title",
        "glpi_tickets.date_creation",

        "glpi_locations.name AS location",
        "glpi_users.firstname",
        "glpi_users.realname",

        "glpi_ticketvalidations.validation_date",
        "glpi_ticketvalidations.comment_validation",
        knex.raw(`
          CASE glpi_tickets.status
            WHEN 1 THEN 'Novo'
            WHEN 2 THEN 'Em Atendimento (Atribuído)'
            WHEN 3 THEN 'Em Atendimento (Planejado)'
            WHEN 4 THEN 'Pendente'
            WHEN 5 THEN 'Solucionado'
            WHEN 6 THEN 'Fechado'
          END AS status
        `),
        knex.raw(`
          CASE glpi_tickets.urgency
            WHEN 1 THEN 'Muito baixa'
            WHEN 2 THEN 'Baixa'
            WHEN 3 THEN 'Média'
            WHEN 4 THEN 'Alta'
            WHEN 5 THEN 'Muito Alta'
          END AS priority
        `),
        knex.raw(`
          CASE glpi_ticketvalidations.status
            WHEN 2 THEN 'Aguardando'
            WHEN 3 THEN 'Aprovado'
            WHEN 4 THEN 'Recusado'
          END AS validation_status
        `),
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
      .leftJoin(
        "glpi_ticketvalidations",
        "glpi_tickets.id",
        "glpi_ticketvalidations.tickets_id",
      )
      .where("glpi_tickets_users.type", 1)
      .whereNot("glpi_tickets.status", 6)
      .whereNot("glpi_tickets.status", 5)
      .orderBy("glpi_tickets.date_creation", "desc")
      .first();

    if (!ticketLastSchema) {
      return reply.status(404).send({ message: "Nenhum ticket encontrado" });
    }

    return reply.status(200).send(ticketLastSchema);
  });

  // lista de quantidade de chamados associados a uma categoria
  app.get("/amount", async (req, reply) => {
    const requestCategoriesQuerySchema = z.object({
      filter: z.coerce.string().optional(),
      by: z.coerce.string().optional(),
    });

    const { filter, by } = requestCategoriesQuerySchema.parse(req.query);

    const ticketsByAmountCategories = await knex("glpi_tickets")
      .select([
        "glpi_itilcategories.id",
        "glpi_itilcategories.name AS name",
        "glpi_itilcategories.completename AS category",
      ])
      .count("glpi_tickets.id AS tickets_amount")
      .leftJoin(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id",
      )
      .groupBy(
        "glpi_itilcategories.id",
        "glpi_itilcategories.completename",
        "glpi_itilcategories.name",
      )
      .orderBy("tickets_amount", "desc");

    const ticketsByLastCategories = await knex("glpi_tickets")
      .select([
        "glpi_tickets.id",
        "glpi_tickets.name",
        "glpi_tickets.status ",
        "glpi_tickets.date",
        "glpi_itilcategories.name AS category",
      ])
      .leftJoin(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id",
      )
      .whereIn("glpi_tickets.status", [1, 2, 3, 4, 5])
      .orderBy("glpi_tickets.id", "desc")
      .limit(10);

    if (filter === "true" && by === "getLastTickets") {
      if (!ticketsByLastCategories) {
        return reply
          .status(404)
          .send({ message: "Nenhuma categoria associada aos chamados." });
      }

      return reply.status(200).send(ticketsByLastCategories);
    }

    if (!ticketsByAmountCategories) {
      return reply
        .status(404)
        .send({ message: "Nenhuma categoria associada aos chamados." });
    }
    return reply.status(200).send(ticketsByAmountCategories);
  });

  // retornar os últimos 10 chamados por entidade/status/urgência/usuário/técnico
  app.get("/tickets-line-time", async (req, reply) => {
    const tickets = await knex("glpi_tickets as t")
      .select([
        knex.raw(
          'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"',
        ), // Formata a data de criação para o formato específico
        "e.name AS entities", // Nome da entidade
        "t.id AS id", // ID do chamado
        "t.name AS title", // Nome
        "lo.name AS location", // Setor
        knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
    `), // Concatena os nomes e sobrenomes dos usuários do tipo "Requerente" e remove duplicatas
        knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
    `), // Concatena os nomes dos usuários do tipo "Técnico" e remove duplicatas
        knex.raw(`
      CASE 
        WHEN t.status = 1 THEN 'Novo'
        WHEN t.status = 2 THEN 'Em Atendimento (atribuído)'
        WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
        WHEN t.status = 4 THEN 'Pendente'
        WHEN t.status = 5 THEN 'Solucionado'
        WHEN t.status = 6 THEN 'Fechado'
      END AS "status"
    `),
        knex.raw(`
      CASE 
        WHEN t.priority = 6 THEN 'Crítica'
        WHEN t.priority = 1 THEN 'Muito baixa'
        WHEN t.priority = 2 THEN 'Baixa'
        WHEN t.priority = 3 THEN 'Média'
        WHEN t.priority = 4 THEN 'Alta'
        WHEN t.priority = 5 THEN 'Muito alta'
      END AS "priority"
    `),
      ])
      .leftJoin("glpi_entities as e", "t.entities_id", "e.id") // Faz a junção com a tabela de entidades
      .leftJoin("glpi_tickets_users as tu1", function () {
        this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1)); // Junta a tabela de usuários vinculados ao ticket (tipo 1 = Requerente)
      })
      .leftJoin("glpi_users as u", "tu1.users_id", "u.id") // Junta com a tabela de usuários para pegar o nome do Requerente
      .leftJoin("glpi_tickets_users as tu2", function () {
        this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2)); // Junta a tabela de usuários vinculados ao ticket (tipo 2 = Técnico)
      })
      .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id") // Junta com a tabela de usuários para pegar o nome do Técnico
      .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id")
      .whereNotIn("t.status", [5, 6]) // Filtra para excluir os chamados com status 5 (Solucionado) e 6 (Fechado)
      .groupBy("t.id") // Agrupa os resultados por ID do chamado
      .orderBy("t.date_mod", "desc") // Ordena os resultados pela data de modificação mais recente
      .limit(10);

    if (!tickets) {
      return reply.status(404).send({ message: "Nenhuma chamado registrado." });
    }

    return reply.status(200).send(tickets);
  });

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
