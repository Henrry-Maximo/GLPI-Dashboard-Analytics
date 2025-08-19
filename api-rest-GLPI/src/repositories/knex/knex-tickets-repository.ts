import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  FiltersTicketsSchema,
  RegisterTicketsSchema,
  TicketsPendingsSchema,
  TicketsRepository,
} from "../tickets-repository";

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
      date_creation: knex.fn.now(),
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
    page,
  }: FiltersTicketsSchema): Promise<{ tickets: Tables["glpi_tickets"][] }> {
    const query = knex("glpi_tickets").select("*");

    if (id !== undefined) {
      query.where("id", id);
    }

    if (name) {
      query.where("name", "like", `${name}`);
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
      .limit(10)
      .offset((page - 1) * 10);

    return { tickets };
  }

  async listPending(): Promise<TicketsPendingsSchema> {
    const data = await knex("glpi_tickets as t")
      .select([
        "t.id",
        "t.name",
        "t.type",
        "t.date_creation",
        "t.solvedate",
        "lo.name AS location",
        knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
    `),
        knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
    `),
        knex.raw(`
      CASE 
        WHEN t.status = 1 THEN 'new'
        WHEN t.status = 2 THEN 'processing (assigned)'
        WHEN t.status = 3 THEN 'processing (planned)'
        WHEN t.status = 4 THEN 'pending'
        WHEN t.status = 5 THEN 'solved'
        WHEN t.status = 6 THEN 'closed'
      END AS "status"
    `),
        knex.raw(`
      CASE 
        WHEN t.priority = 1 THEN 'veryLow'
        WHEN t.priority = 2 THEN 'low'
        WHEN t.priority = 3 THEN 'average'
        WHEN t.priority = 4 THEN 'high'
        WHEN t.priority = 5 THEN 'veryHigh'
      END AS "priority"
    `),
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
      .whereNot("t.status", 5)
      .andWhereNot("t.status", 6)
      .groupBy("t.id")
      .orderBy("t.id", "desc");

    const countTicketsTotal = data.length;

    // const concludesRaw = await knex("glpi_tickets")
    //   .select([
    //     knex.raw("DATE(date_creation) as date_creation"),
    //     knex.raw("'concluded' AS status"),
    //   ])
    //   .count({ count: "id" })
    //   .where("date_creation", ">=", new Date().getDate())
    //   .whereIn("status", [5, 6])
    //   .groupByRaw("DATE(date_creation)")
    //   .orderByRaw("DATE(date_creation) ASC")
    //   .limit(10);

    // const concludes: any[] = concludesRaw.map((item: any) => ({
    //   date_creation: item.date_creation,
    //   status: item.status,
    //   count: Number(item.count),
    // }));

    // const delayed = await knex("glpi_tickets")
    //   .select(
    //     "id",
    //     "date_creation",
    //     "time_to_resolve",
    //     "name",
    //     knex.raw(`
    //     WHEN status = 2 THEN 'processing (assigned)'
    //     WHEN status = 3 THEN 'processing (planned)'
    //     WHEN status = 4 THEN 'pending'
    //     WHEN status = 5 THEN 'solved'
    //     WHEN status = 6 THEN 'closed'
    //   END AS "status"
    // `)
    //   )
    //   .whereNotIn("status", [1, 4, 5, 6])
    //   .where("time_to_resolve", "<", knex.fn.now())
    //   .whereNull("solvedate")
    //   .limit(10);

    // const categories = await knex("glpi_tickets")
    //   .select([
    //     "glpi_itilcategories.name",
    //     "glpi_itilcategories.completename",
    //     knex.raw("COUNT(glpi_tickets.id) AS count"),
    //   ])
    //   .innerJoin(
    //     "glpi_itilcategories",
    //     "glpi_tickets.itilcategories_id",
    //     "glpi_itilcategories.id"
    //   )
    //   .whereRaw("glpi_tickets.date_creation >= ?", [
    //     `${new Date().getFullYear()}-01-01`,
    //   ])
    //   .whereRaw("glpi_tickets.date_creation <= ?", [
    //     `${new Date().getFullYear()}-12-31`,
    //   ])
    //   .whereNot("glpi_itilcategories.name", "Anfe")
    //   .groupBy("glpi_itilcategories.name", "glpi_itilcategories.completename")
    //   .orderBy("count", "desc")
    //   .limit(15);

    return {
      meta: {
        total: countTicketsTotal,
        last_ticket_id: 2324,
        last_ticket_date: "2025-05-30T13:3600Z",
      },
      result: {
        list: data,
        priority: [
          {
            id: 1,
            name: "veryHigh",
            count: 1,
          },
        ],
        type: [
          {
            id: 1,
            name: "incident",
            count: 2,
          },
        ],
      },
    };
  }
}
