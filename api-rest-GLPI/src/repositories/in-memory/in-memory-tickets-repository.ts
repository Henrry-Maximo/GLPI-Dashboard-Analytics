import { Tables } from "knex/types/tables";
import {
  FiltersTicketsSchema,
  RegisterTicketsSchema,
  TicketsPendingsSchema,
  TicketsRepository,
} from "../tickets-repository";

export class InMemoryTicketsRepository implements TicketsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public items: any = [];

  async create({
    id,
    entities_id,
    name,
    content,
    users_id_recipient,
    requesttypes_id,
    urgency,
    itilcategories_id,
    locations_id,
  }: RegisterTicketsSchema) {
    const ticket = {
      id,
      entities_id,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async list({
    id,
    name,
    status,
    id_recipient,
    id_type,
    id_categories,
    limit,
    offset
  }: FiltersTicketsSchema): Promise<{ tickets: Tables["glpi_tickets"][] }> {
    let result = [...this.items];

    if (id !== undefined) {
      result = result.filter((ticket) => ticket.id === id);
    }

    if (name) {
      result = result.filter((ticket) => ticket.name === name);
    }

    if (status) {
      result = result.filter((ticket) => ticket.status === status);
    }

    if (id_recipient) {
      result = result.filter((ticket) => ticket.id_recipient === id_recipient);
    }

    if (id_type) {
      result = result.filter((ticket) => ticket.id_type === id_type);
    }

    if (id_categories) {
      result = result.filter(
        (ticket) => ticket.id_categories === id_categories
      );
    }

    result.sort((a, b) => a.id - b.id);

    return { tickets: result };
  }

  listPending(): Promise<TicketsPendingsSchema> {
    throw new Error("Method not implemented.");
  }
}
