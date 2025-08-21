import { Tables } from "knex/types/tables";
import { WithoutTicketsRegistration } from "./errors/without-tickets-registration";
import { TicketsRepository } from "@/repositories/tickets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FiltersTicketsSchema {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_type?: number;
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
    status,
    id_recipient,
    id_type,
    id_categories,
    page,
  }: FiltersTicketsSchema): Promise<{
    tickets: Tables["glpi_tickets"][];
  }> {
    const { tickets } = await this.ticketsRepository.list({
      id,
      name,
      status,
      id_recipient,
      id_type,
      id_categories,
      page,
    });

    console.log(tickets);

    if (!tickets.length) {
      throw new ResourceNotFoundError();
    }

    return { tickets };
  }
}
