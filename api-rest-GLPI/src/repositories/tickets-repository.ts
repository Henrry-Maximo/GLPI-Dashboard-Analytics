import { Tables } from "knex/types/tables";

export interface listTicketsFilters {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_request_type?: number;
  id_categories?: number;
  page: number;
}

export interface registerTickets {
  name: string;
}

export interface TicketsRepository {
  list({
    id,
    name,
    id_recipient,
    id_request_type,
    id_categories,
    page,
  }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }>;

  create({ name }: registerTickets): Promise<Tables["glpi_tickets"]>;
}
