import { Tables } from "knex/types/tables";

export interface listTicketsFilters {
  name?: string;
}

export interface TicketsRepository {
  list({ name }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }>
}
