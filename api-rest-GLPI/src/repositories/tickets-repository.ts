import { Tables } from "knex/types/tables";

export interface listTicketsFilters {
  id?: number;
  name?: string;
  page: number
}

export interface TicketsRepository {
  list({ id, name, page }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }>
}
