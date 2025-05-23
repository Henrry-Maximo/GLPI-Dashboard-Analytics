import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyJwt } from "../middlewares/verify-jwt";

import { getTicketsSearch } from "@/use-cases/get-tickets-search";
import { getTicketsLast } from "@/use-cases/get-tickets-last";
import { getTicketsOverview } from "@/use-cases/get-tickets-overview";
import { getTicketsDateTime } from "@/use-cases/get-tickets-date-time";
import { getTicketsTechnician } from "@/use-cases/get-tickets-technician";
import { getTicketsCategories } from "@/use-cases/get-tickets-categories";
import {
  getTicketsDetails,
  getTicketsPending,
} from "@/use-cases/get-tickets-pending";

export async function ticketsController(app: FastifyInstance) {
  app.get("/search", { onRequest: [verifyJwt] }, async (req, reply) => {
    const requestIdTicketQuerySchema = z.object({
      id: z.coerce.number().optional(),
    });

    const { id } = requestIdTicketQuerySchema.parse(req.query);

    const { tickets } = await getTicketsSearch({ id });

    return reply.status(200).send(tickets);

    /*
      Rota para retornar todos os chamados existentes
      no banco de dados
    */
  });

  app.get("/pending", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { meta, list } = await getTicketsPending();

    return reply.status(200).send({ meta, list });

    /*
      Rota para retornar total, prioridade, tipo e lista
      de chamados
    */
  });

  app.get("/summary", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { meta, list } = await getTicketsDetails();

    return reply.status(200).send({ meta, list });

    /*
      Rota para retornar lista de resumo sobre 
      chamados: atrasados, categorias e lista de concluídos.
    */
  });

  app.get("/last", { onRequest: [verifyJwt] }, async (_, reply) => {
    const { ticketLastSchema } = await getTicketsLast();

    if (!ticketLastSchema) {
      return reply.status(404).send({ message: "Not found ticket." });
    }

    return reply.status(200).send(ticketLastSchema);

    /*
      Rota para retornar o último chamado cadastrado
      no banco de dados, última data de criação.
    */
  });

  app.get("/categories", { onRequest: [verifyJwt] }, async (_, reply) => {
    const result = await getTicketsCategories();

    return reply.status(200).send(result);
  });

  app.get("/overview", { onRequest: [verifyJwt] }, async (_, reply) => {
    const tickets = await getTicketsOverview();

    return reply.status(200).send(tickets);
  });

  app.get(
    "/tickets-date-time",
    { onRequest: [verifyJwt] },
    async (_, reply) => {
      const { tickets } = await getTicketsDateTime();

      return reply.status(200).send(tickets);
    }
  );

  app.get(
    "/tickets-technician",
    { onRequest: [verifyJwt] },
    async (_, reply) => {
      const { ticketsAmountTechnician, ticketsAmountTechnicianSolution } =
        await getTicketsTechnician();

      return reply
        .status(200)
        .send({ ticketsAmountTechnician, ticketsAmountTechnicianSolution });
    }
  );
}
