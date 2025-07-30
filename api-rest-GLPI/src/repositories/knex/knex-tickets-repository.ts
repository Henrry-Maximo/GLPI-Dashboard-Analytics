import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type { listTicketsFilters, TicketsRepository } from "../tickets-repository";

export class KnexTicketsRepository implements TicketsRepository {
  async list({
    name,
  }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }> {
    const query = knex("glpi_tickets").select("*");

    if (name) {
      query.where("name", "like", `${name}%`);
    }

    const tickets = await query.orderBy("name");

    return { tickets };
  }
}
