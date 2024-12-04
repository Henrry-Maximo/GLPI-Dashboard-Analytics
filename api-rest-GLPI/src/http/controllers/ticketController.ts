import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../database/knex-config";
import { searchTickets } from "@/use-cases/search-tickets";
import { verifyJwt } from "../middlewares/verify-jwt";
import { listTicketsByCriteria } from "@/use-cases/list-tickets-by-criteria";
import { listTicketsByDate } from "@/use-cases/list-tickets-by-date";
import { getTicketsLast } from "@/use-cases/get-tickets-last";

export async function ticketController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/search", { onRequest: [verifyJwt]} , async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.string().optional(),
    });

    const { id } = requestIdTicketQuerySchema.parse(req.query);

    const { tickets } = await searchTickets({ id })

    return reply.status(200).send({ tickets });
  });

  // lista de chamados por status/urgência/categorias
  app.get("/state", { onRequest: [verifyJwt] }, async (req, reply) => {
    const requestStatusQuerySchema = z.object({
      filter: z.coerce.string().optional(),
      by: z.coerce.string().optional(),
    });

    const { filter, by } = requestStatusQuerySchema.parse(req.query);

    const result = await listTicketsByCriteria({ filter, by });

    return reply.status(200).send({ result })
  });

  // lista de quantidade de chamados por status/data
  app.get("/date",{ onRequest: [verifyJwt] }, async (_, reply) => {
    const { tickets } = await listTicketsByDate();

    return reply.status(200).send({ tickets });
  });

  // último chamado cadastrado
  app.get("/last", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { ticketLastSchema } = await getTicketsLast();

    if (!ticketLastSchema) {
      return reply.status(404).send({ message: "Not found ticket." });
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
