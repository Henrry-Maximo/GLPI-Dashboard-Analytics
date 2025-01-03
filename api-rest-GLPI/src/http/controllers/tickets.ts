import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyJwt } from "../middlewares/verify-jwt";

import { searchTickets } from "@/use-cases/search-tickets";
import { listTicketsByCriteria } from "@/use-cases/list-tickets-by-criteria";
import { listTicketsByDate } from "@/use-cases/list-tickets-by-date";
import { getTicketsLast } from "@/use-cases/get-tickets-last";
import { listTicketsAmount } from "@/use-cases/list-tickets-amount";
import { getRecentTicketsByCriteria } from "@/use-cases/get-recent-tickets-by-criteria";
import { listTicketsLate } from "@/use-cases/list-tickets-late";
import { listTicketsLateStatusAndDate } from "@/use-cases/list-tickets-late-status-and-date";
import { getTicketsTechnician } from "@/use-cases/get-tickets-technician";
import { getTicketsType } from "@/use-cases/get-tickets-type";
import { getTicketsTechnicianSolution } from "@/use-cases/get-tickets-technician-solution";

export async function ticketsController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/search", { onRequest: [verifyJwt]} , async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.number().optional(),
    });

    const { id } = requestIdTicketQuerySchema.parse(req.query);

    const { tickets, ticket } = await searchTickets({ id })

    return reply.status(200).send({ tickets, ticket });
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
  app.get("/last",  { onRequest: [verifyJwt]}, async (_, reply) => {
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
  app.get("/tickets-line-time", { onRequest: [verifyJwt]}, async (_, reply) => {
    const tickets  = await getRecentTicketsByCriteria();

    return reply.status(200).send(tickets);
  });

  // retornar chamados que atingiram o prazo do SLA
  app.get("/tickets-late", { onRequest: [verifyJwt]}, async (_, reply) => {
    const { tickets } = await listTicketsLate();

    return reply.status(200).send({ tickets })
  });

  // retornar chamados (quantidade) por status e data
  app.get("/tickets-line-late-by-status-date", { onRequest: [verifyJwt]}, async (_, reply) => {
    const { tickets } = await listTicketsLateStatusAndDate();

    return reply.status(200).send({ tickets });
  });

  // retornar chamados (quantidade) por técnico
  app.get("/tickets-by-technician", { onRequest: [verifyJwt]}, async (_, reply) => {
    const { rows } = await getTicketsTechnician();

    return reply.status(200).send(rows);
  });

  // retornar número de chamados por tipo (requisição/incidente)
  app.get("/tickets-by-type", { onRequest: [ verifyJwt ] }, async (_, reply) => {
    const { result } = await getTicketsType();

    return reply.status(200).send({ result });
  });

  // retornar número de chamados solucionados por técnico
  app.get("/tickets-by-technician-solution", { onRequest: [ verifyJwt ] }, async (_, reply) => {
    const { result } = await getTicketsTechnicianSolution();

    return reply.status(200).send({ result });
  });
}
