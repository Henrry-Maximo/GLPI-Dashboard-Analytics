import { Tables } from "knex/types/tables";

export interface listTicketsFilters {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_type?: number;
  id_categories?: number;
  page: number;
}

export interface registerTickets {
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
  list({
    id,
    name,
    status,
    id_recipient,
    id_type,
    id_categories,
    page,
  }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }>;

  create({
    entities_id,
    name,
    content,
    users_id_recipient,
    requesttypes_id,
    urgency,
    itilcategories_id,
    locations_id,
  }: registerTickets): Promise<Tables["glpi_tickets"]>;
}
