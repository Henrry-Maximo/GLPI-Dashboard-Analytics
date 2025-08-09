import { Tables } from "knex/types/tables";
import { listTicketsFilters, registerTickets, TicketsRepository } from "../tickets-repository";

export class InMemoryTicketsRepository implements TicketsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public items: any = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  list({ id, name, status, id_recipient, id_request_type, id_categories, page }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][]; }> {
    throw new Error("Method not implemented.");
  }

  async create({ name, content, users_id_recipient, requesttypes_id, urgency, itilcategories_id, locations_id }: registerTickets) {
    const ticket = {
      name,
      content,
      users_id_recipient,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
    } as Tables["glpi_tickets"];


    this.items.push(ticket);

    return ticket;
  }

}
