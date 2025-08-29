import { Tables } from "knex/types/tables";
import { TicketsRepository } from "@/repositories/tickets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FiltersTicketsSchema {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_type?: number;
  id_categories?: number;
  offset: number,
  limit: number
}

interface offesetTicketsPagination {
  limit: number;
  offset: number;
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
    offset,
    limit
  }: FiltersTicketsSchema): Promise<{
    tickets: Tables["glpi_tickets"][];
    pagination: offesetTicketsPagination;
  }> {
    const { tickets, pagination } = await this.ticketsRepository.list({
      id,
      name,
      status,
      id_recipient,
      id_type,
      id_categories,
      offset,
      limit
    });

    if (!tickets.length) {
      throw new ResourceNotFoundError();
    }

    return { tickets, pagination };
  }
}
