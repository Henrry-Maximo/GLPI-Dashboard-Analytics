import { RegisterTicketsUseCase } from "../create-tickets";
import { KnexTicketsRepository } from "@/repositories/knex/knex-tickets-repository";

export function makeRegisterTicketUseCase() {
  const knexTicketsRepository = new KnexTicketsRepository();
  const registerTicketsUseCase = new RegisterTicketsUseCase(knexTicketsRepository);

  return registerTicketsUseCase;
}
