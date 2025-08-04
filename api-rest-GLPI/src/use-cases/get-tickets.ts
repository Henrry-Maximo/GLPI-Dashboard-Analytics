import { Tables } from "knex/types/tables";
import { WithoutTicketsRegistration } from "./errors/without-tickets-registration";
import { TicketsRepository } from "@/repositories/tickets-repository";

interface listTicketsFiltersUseCase {
  id?: number;
  name?: string;
  id_recipient?: number;
  id_request_type?: number;
  id_categories?: number;
  page: number;
}

export class GetTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute({
    id,
    name,
    id_recipient,
    id_request_type,
    id_categories,
    page,
  }: listTicketsFiltersUseCase): Promise<{
    tickets: Tables["glpi_tickets"][];
  }> {
    const { tickets } = await this.ticketsRepository.list({
      id,
      name,
      id_recipient,
      id_request_type,
      id_categories,
      page,
    });

    if (!tickets) {
      throw new WithoutTicketsRegistration();
    }

    return { tickets };
  }
}
