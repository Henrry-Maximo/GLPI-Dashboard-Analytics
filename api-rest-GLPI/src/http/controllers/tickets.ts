import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyJwt } from "../middlewares/verify-jwt";

import { getTicketsSearch } from "@/use-cases/get-tickets-search";
import { getTicketsLast } from "@/use-cases/get-tickets-last";
import { getTicketsOverview } from "@/use-cases/get-tickets-overview";
import { listTicketsLateStatusAndDate } from "@/use-cases/list-tickets-late-status-and-date";
import { getTicketsTechnician } from "@/use-cases/get-tickets-technician";
import { getTicketsTechnicianSolution } from "@/use-cases/get-tickets-technician-solution";
import { getTicketsSummary } from "@/use-cases/get-tickets-summary";
import { getTicketsCategories } from "@/use-cases/get-tickets-categories";

export async function ticketsController(app: FastifyInstance) {
  // lista de chamados ou chamado específico
  app.get("/search", { onRequest: [verifyJwt]} , async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.number().optional(),
    });

    const { id } = requestIdTicketQuerySchema.parse(req.query);

    const { tickets } = await getTicketsSearch({ id })

    return reply.status(200).send(tickets);
  });

  // lista de chamados por status/urgência/categorias
  app.get("/summary", { onRequest: [verifyJwt] }, async (_, reply) => {
    const result = await getTicketsSummary();

    return reply.status(200).send(result);
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
  app.get("/categories", { onRequest: [verifyJwt] }, async (req, reply) => {
    const result = await getTicketsCategories();
    
    return reply.status(200).send(result);
  });

  // retornar os últimos 10 chamados por entidade/status/urgência/usuário/técnico
  app.get("/overview", { onRequest: [verifyJwt]}, async (_, reply) => {
    const tickets  = await getTicketsOverview();

    return reply.status(200).send(tickets);
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

  // retornar número de chamados solucionados por técnico
  app.get("/tickets-by-technician-solution", { onRequest: [ verifyJwt ] }, async (_, reply) => {
    const { result } = await getTicketsTechnicianSolution();

    return reply.status(200).send({ result });
  });
}
