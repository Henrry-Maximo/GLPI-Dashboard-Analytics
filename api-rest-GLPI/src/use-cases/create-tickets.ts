import { TicketsRepository } from "@/repositories/tickets-repository";
import { Tables } from "knex/types/tables";

export class RegisterTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute(name: string): Promise<Tables["glpi_tickets"]> {
    const ticket = await this.ticketsRepository.create({ name });

    return ticket;
  }
}
