import { GetTicketsUseCase } from "../get-tickets";
import { KnexTicketsRepository } from "@/repositories/knex/knex-tickets-repository";

export function makeGetTicketsUseCase() {
  const knexUsersRepository = new KnexTicketsRepository();
  const ticketsUseCase = new GetTicketsUseCase(knexUsersRepository);

  return ticketsUseCase;
}
