import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../database/knex-config";
import { verifyJwt } from "../middlewares/verify-jwt";

import { searchTickets } from "@/use-cases/search-tickets";
import { listTicketsByCriteria } from "@/use-cases/list-tickets-by-criteria";
import { listTicketsByDate } from "@/use-cases/list-tickets-by-date";
import { getTicketsLast } from "@/use-cases/get-tickets-last";
import { listTicketsAmount } from "@/use-cases/list-tickets-amount";
import { getRecentTicketsByCriteria } from "@/use-cases/get-recent-tickets-by-criteria";
import { listTicketsLate } from "@/use-cases/list-tickets-late";
import { listTicketsLateStatusAndDate } from "@/use-cases/list-tickets-late-status-and-date";

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
  app.get("/amount", { onRequest: [verifyJwt] }, async (req, reply) => {
    const requestCategoriesQuerySchema = z.object({
      filter: z.string().optional(),
      by: z.string().optional(),
    });

    const { filter, by } = requestCategoriesQuerySchema.parse(req.query);

    const result = await listTicketsAmount({ filter, by });
    
    return reply.status(200).send({ result })
  });

  // retornar os últimos 10 chamados por entidade/status/urgência/usuário/técnico
  app.get("/tickets-line-time", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { tickets } = await getRecentTicketsByCriteria();

    return reply.status(200).send({ tickets });
  });

  // retornar chamados que atingiram o prazo do SLA
  app.get("/tickets-late", async (_, reply) => {
    const { tickets } = await listTicketsLate();

    return reply.status(200).send({ tickets })
  });

  // retornar chamados (quantidade) por status e data
  app.get("/tickets-line-late-by-status-date", async (_, reply) => {
    const { tickets } = await listTicketsLateStatusAndDate();

    return reply.status(200).send({ tickets });
  });

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
