import { knex } from "@/database/knex-config";
import {
  TechniciansRepository,
  TechniciansRequestSchema,
  TechniciansResponseSchema,
} from "../technicians-repository";

export class KnexTechniciansRepository implements TechniciansRepository {
  async get({
    id,
    name,
  }: TechniciansRequestSchema): Promise<TechniciansResponseSchema> {
    let query = knex("glpi_users as u")
      .select(
        "u.id",
        "u.name",
        knex.raw("u.date_creation"),
        knex.raw("COUNT(DISTINCT t.id) as amount_tickets"),
        knex.raw("SUM(CASE WHEN t.status = 5 THEN 1 ELSE 0 END) as service"),
        knex.raw("SUM(CASE WHEN t.urgency = 1 THEN 1 ELSE 0 END) as very_high"),
        knex.raw("SUM(CASE WHEN t.urgency = 2 THEN 1 ELSE 0 END) as high"),
        knex.raw("SUM(CASE WHEN t.urgency = 3 THEN 1 ELSE 0 END) as medium"),
        knex.raw("SUM(CASE WHEN t.urgency = 4 THEN 1 ELSE 0 END) as low"),
        knex.raw("SUM(CASE WHEN t.urgency = 5 THEN 1 ELSE 0 END) as very_low")
      )
      .innerJoin("glpi_tickets_users as tu", "tu.users_id", "u.id")
      .innerJoin("glpi_tickets as t", "t.id", "tu.tickets_id")
      .where("tu.type", 2) // só técnicos
      .groupBy("u.id", "u.name", "u.date_creation")
      .orderBy("amount_tickets", "desc");

    if (id) {
      query = query.where("t.id", id);
    }

    if (name) {
      query = query.where("t.name", "like", `%${name}%`);
    }

    const result: TechniciansResponseSchema["result"] = (await query).map(
      (row) => ({
        id: row.id,
        name: row.name,
        amount_tickets: row.amount_tickets,
        service: row.service,
        urgency: {
          very_high: row.very_high,
          high: row.high,
          average: row.medium,
          low: row.low,
          very_low: row.very_low,
        },
        date_creation: row.date_creation,
      })
    );

    return {
      meta: {
        total: result.length,
      },
      result,
    };
  }
}
