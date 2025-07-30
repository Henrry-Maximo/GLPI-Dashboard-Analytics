import { Tables } from "knex/types/tables";
import { WithoutTicketsRegistration } from "./errors/without-tickets-registration";
import { TicketsRepository } from "@/repositories/tickets-repository";

interface listTicketsFiltersUseCase {
  name?: string;
  page: number;
}

export class GetTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute({
    name,
    page,
  }: listTicketsFiltersUseCase): Promise<{
    tickets: Tables["glpi_tickets"][];
  }> {
    const { tickets } = await this.ticketsRepository.list({ name, page });

    if (!tickets) {
      throw new WithoutTicketsRegistration();
    }

    return { tickets };
  }
}
