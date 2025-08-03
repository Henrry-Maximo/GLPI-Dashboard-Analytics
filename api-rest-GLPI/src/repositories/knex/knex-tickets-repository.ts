import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  listTicketsFilters,
  TicketsRepository,
} from "../tickets-repository";

export class KnexTicketsRepository implements TicketsRepository {
  async list({
    id,
    name,
    page,
  }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }> {
    const query = knex("glpi_tickets").select(
      "*",
      knex.raw(
        'DATE_FORMAT(CONVERT_TZ(glpi_tickets.date_creation, "+00:00", "-03:00"), "%d/%m/%Y %H:%i") as "date_creation"'
      ),
      knex.raw(
        'DATE_FORMAT(CONVERT_TZ(glpi_tickets.solvedate, "+00:00", "-03:00"), "%d/%m/%Y %H:%i") as "solvedate"'
      )
    );

    if (id !== undefined) {
      query.where("id", id);
    }

    if (name) {
      query.where("id", "like", `${id}`);
    }

    const tickets = await query
      .orderBy("id")
      .limit(10)
      .offset((page - 1) * 10);

    return { tickets };
  }
}
