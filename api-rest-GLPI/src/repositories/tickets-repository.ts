import { Tables } from "knex/types/tables";

export interface FiltersTicketsSchema {
  id?: number;
  name?: string;
  status?: number;
  id_recipient?: number;
  id_type?: number;
  id_categories?: number;
  limit: number;
  offset: number;
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
  date_creation: string;
}

interface PropertiesTicketsSchema {
  id: number;
  title: string;
  date_creation: string;
  solvedate: string;
  location: string;
  applicant: string;
  technical: string;
  status: string;
  priority: number;
  type: number;
}

interface PropertiesTicketsStatus {
  id: number;
  name: string;
  count: number;
}

interface PropertiesTicketsType {
  id: number;
  name: string;
  count: number;
}

export interface TicketsPendingsSchema {
  meta: {
    total: number;
    last_ticket_id: number;
    last_ticket_date: string;
  };
  result: {
    list: PropertiesTicketsSchema[];
    priority: PropertiesTicketsStatus[];
    type: PropertiesTicketsType[];
  };
}

export interface TicketsRepository {
  create(body: RegisterTicketsSchema): Promise<Tables["glpi_tickets"]>;
  // ❗Todo: add pagination for list of tickets
  list(
    query: FiltersTicketsSchema
  ): Promise<{ tickets: Tables["glpi_tickets"][] }>;
  listPending(): Promise<TicketsPendingsSchema>;
}
