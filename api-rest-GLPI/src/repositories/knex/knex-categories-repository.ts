import { knex } from "@/database/knex-config";
import {
  CategoriesRepository,
  CategoriesTicketsSchema,
  FiltersCategoriesSchema,
} from "../categories-repository";

export class KnexCategoriesRepository implements CategoriesRepository {
  // ❗ Todo: Performance inefficiencies detected in code.
  async get({ start_date, end_date }: FiltersCategoriesSchema): Promise<CategoriesTicketsSchema> {
    let query = knex("glpi_tickets")
      .select(
        "glpi_itilcategories.id",
        "glpi_itilcategories.name",
        "glpi_itilcategories.date_creation"
      )
      .count({ total: "glpi_tickets.id" })
      .join(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id"
      )
      .groupBy("glpi_itilcategories.completename")
      .orderBy("glpi_itilcategories.id");

    const inUse = await knex("glpi_itilcategories")
      .countDistinct({ total: "glpi_itilcategories.id" })
      .leftJoin(
        "glpi_tickets",
        "glpi_itilcategories.id",
        "glpi_tickets.itilcategories_id"
      )
      .whereNotNull("glpi_tickets.id")
      .first();

    const unUsed = await knex("glpi_itilcategories")
      .count({ total: "glpi_itilcategories.id" })
      .leftJoin(
        "glpi_tickets",
        "glpi_itilcategories.id",
        "glpi_tickets.itilcategories_id"
      )
      .whereNull("glpi_tickets.id")
      .first();

    if (start_date && end_date) {
      query = query.whereBetween("glpi_tickets.date_creation", [
        start_date,
        end_date,
      ]);
    } else if (start_date) {
      query = query.where("glpi_tickets.date_creation", ">=", start_date);
    } else if (end_date) {
      query = query.where("glpi_tickets.date_creation", "<=", end_date);
    }

    const totalInUse: number = Number(inUse?.total ?? 0);
    const totalUnUsed: number = Number(unUsed?.total ?? 0);

    const total = totalInUse + totalUnUsed;

    return {
      meta: {
        total,
        in_use: totalInUse,
        unused: totalUnUsed,
      },
      result: await query,
    };
  }
}
