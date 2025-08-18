import { KnexTicketsRepository } from "@/repositories/knex/knex-tickets-repository";
import { GeTicketsPendingUseCase } from "../get-tickets-pending";

export function makeGetTicketsPendingsUseCase() {
  const knexTicketsRepository = new KnexTicketsRepository();
  const ticketsUseCase = new GeTicketsPendingUseCase(knexTicketsRepository);

  return ticketsUseCase;
}
