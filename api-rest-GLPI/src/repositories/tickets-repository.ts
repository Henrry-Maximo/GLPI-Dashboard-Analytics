import { Tables } from "knex/types/tables";

export interface FiltersTicketsSchema {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_type?: number;
  id_categories?: number;
  page: number;
}

export interface RegisterTicketsSchema {
  id?: number;
  entities_id: number;
  name: string;
  content: string;
  users_id_recipient: number;
  requesttypes_id: number;
  urgency: number;
  itilcategories_id: number;
  locations_id: number;
}

export interface TicketsRepository {
  create(body: RegisterTicketsSchema): Promise<Tables["glpi_tickets"]>;
  list(query: FiltersTicketsSchema): Promise<{ tickets: Tables["glpi_tickets"][] }>;
}
