import { Tables } from "knex/types/tables";

export interface listTicketsFilters {
  name?: string;
  page: number
}

export interface TicketsRepository {
  list({ name, page }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }>
}
