import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  FiltersTicketsSchema,
  offesetTicketsPagination,
  RegisterTicketsSchema,
  TicketsPendingsSchema,
  TicketsRepository,
} from "../tickets-repository";

interface TicketsPendingProps {
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

interface PropertiesTickets {
  id: number;
  name: string;
  count: number;
}

export class KnexTicketsRepository implements TicketsRepository {
  async create(body: RegisterTicketsSchema): Promise<Tables["glpi_tickets"]> {
    const {
      entities_id,
      name,
      content,
      users_id_recipient,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
      date_creation,
    } = body;

    const [ticketId] = await knex("glpi_tickets").insert({
      entities_id,
      name,
      content,
      users_id_recipient,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
      date_creation: date_creation ?? knex.fn.now(),
    });

    const [ticket] = await knex("glpi_tickets")
      .select("*")
      .where("id", "like", ticketId);

    return ticket;
  }

  async findById(ticketId: string) {
    const ticket = await knex("glpi_tickets").where("id", ticketId).first();

    if (!ticket) {
      return null;
    }

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
    const query = knex("glpi_tickets").select("*");

    if (id !== undefined) {
      query.where("id", id);
    }

    if (name) {
      query.where("name", "like", `%${name}%`);
    }

    if (status) {
      query.where("status", status);
    }

    if (id_recipient) {
      query.where("users_id_recipient", id_recipient);
    }

    if (id_type) {
      query.where("type", id_type);
    }

    if (id_categories) {
      query.where("itilcategories_id", id_categories);
    }

    const tickets = await query
      .orderBy("id")
      .limit(limit)
      .offset((offset - 1) * limit);

    const pagination: offesetTicketsPagination = {
      limit,
      offset,
    };

    return { tickets, pagination };
  }

  async getPendings(): Promise<TicketsPendingsSchema> {
    const data: TicketsPendingProps[] = await knex("glpi_tickets as t")
      .select([
        "t.id",
        "t.name",
        knex.raw(/* sql */ `
          CASE
            WHEN t.type = 1 THEN "incident"
            WHEN t.type = 2 THEN "request"
          END AS "type"
        `),
        knex.raw(/* sql */ `
          CASE 
            WHEN t.status = 1 THEN 'new'
            WHEN t.status = 2 THEN 'processing (assigned)'
            WHEN t.status = 3 THEN 'processing (planned)'
            WHEN t.status = 4 THEN 'pending'
          END AS "status"
        `),
        knex.raw(/* sql */ `
          CASE 
            WHEN t.priority = 1 THEN 'very low'
            WHEN t.priority = 2 THEN 'low'
            WHEN t.priority = 3 THEN 'average'
            WHEN t.priority = 4 THEN 'high'
            WHEN t.priority = 5 THEN 'very high'
          END AS "priority"
        `),
        "lo.name AS location",
        knex.raw(/* sql */ `
          GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
        `),
        knex.raw(/* sql */ `
          GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
        `),
        knex.raw(/* sql */ `
          CASE
            WHEN tv.status = 2 THEN 'Waiting'
            WHEN tv.status = 3 THEN 'Approved'
            WHEN tv.status = 4 THEN 'Refused'
          END AS validation_status
        `),
        "tv.comment_validation",
        "t.date_creation",
      ])
      .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id")
      .leftJoin("glpi_tickets_users as tu1", function () {
        this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1));
      })
      .leftJoin("glpi_users as u", "tu1.users_id", "u.id")
      .leftJoin("glpi_tickets_users as tu2", function () {
        this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2));
      })
      .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id")
      .leftJoin("glpi_ticketvalidations as tv", "tu2.id", "tv.tickets_id")
      .whereNot("t.status", 5)
      .andWhereNot("t.status", 6)
      .groupBy("t.id")
      .orderBy("t.id", "desc");

    const priority: PropertiesTickets[] = await knex("glpi_tickets as t")
      .select([
        "t.priority as id",
        knex.raw(/* sql */ `
          CASE 
            WHEN t.priority = 1 THEN 'very low'
            WHEN t.priority = 2 THEN 'low'
            WHEN t.priority = 3 THEN 'average'
            WHEN t.priority = 4 THEN 'high'
            WHEN t.priority = 5 THEN 'very high'
          END AS "name"`),
      ])
      .count("t.id as count")
      .whereNot("t.status", 5)
      .andWhereNot("t.status", 6)
      .groupBy("t.priority");

    const type: PropertiesTickets[] = await knex("glpi_tickets as t")
      .select([
        "t.type as id",
        knex.raw(/* sql */ `
          CASE 
            WHEN t.type = 1 THEN 'incident'
            WHEN t.type = 2 THEN 'request'
          END AS "name"`),
      ])
      .count("t.id as count")
      .whereNot("t.status", 5)
      .andWhereNot("t.status", 6)
      .groupBy("t.type");

    return {
      meta: {
        total: data.length,
        last_ticket_id: data[0]?.id ?? null,
        last_ticket_date: data[0]?.date_creation ?? null,
      },
      result: {
        list: data,
        priority,
        type,
      },
    };
  }
}
