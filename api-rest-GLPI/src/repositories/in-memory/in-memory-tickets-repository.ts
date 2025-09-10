import { Tables } from "knex/types/tables";
import {
  FiltersTicketsSchema,
  offesetTicketsPagination,
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

  async list({
    id,
    name,
    status,
    id_recipient,
    id_type,
    id_categories,
    limit,
    offset,
  }: FiltersTicketsSchema): Promise<{
    tickets: Tables["glpi_tickets"][];
    pagination: offesetTicketsPagination;
  }> {
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

    const pagination: offesetTicketsPagination = {
      limit,
      offset: (offset - 1) * limit,
    };

    return { tickets: result, pagination };
  }

  async getPendings() {
    const data: TicketsPendingsSchema = {
      meta: {
        total: 10,
        last_ticket_id: 255,
        last_ticket_date: new Date().toDateString(),
      },
      result: {
        list: [
          {
            id: 255,
            title: "Ticket 1",
            type: 1,
            status: "new",
            solvedate: "",
            priority: 2,
            location: "RH",
            applicant: "Henrique",
            technical: "Henrique.maximo",
            date_creation: new Date().toISOString(),
          },
        ],
        priority: [
          {
            id: 1,
            name: "very low",
            count: 1,
          },
        ],
        type: [
          {
            id: 1,
            name: "incident",
            count: 1,
          },
          {
            id: 2,
            name: "request",
            count: 0,
          },
        ],
      },
    };

    // const { meta, result } = data;

    return data;
  }
}
