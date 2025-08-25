import { knex } from "@/database/knex-config";
import { CategoriesRepository } from "../categories-repository";

export class KnexCategoriesRepository implements CategoriesRepository {
  async get(): Promise<any> {
    const data = await knex("glpi_tickets")
      .select(
        "glpi_itilcategories.id",
        "glpi_itilcategories.name",
        "glpi_itilcategories.date_creation"
      )
      .count("glpi_tickets.id as amount_tickets")
      .join(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id"
      )
      // .whereBetween("glpi_tickets.date_creation", [
      //   "2025-08-01",
      //   "2025-08-31",
      // ])
      .groupBy("glpi_itilcategories.completename")
      .orderBy("glpi_itilcategories.id");

    const inUse = await knex("glpi_tickets")
      .count("glpi_itilcategories.id")
      .join(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id"
      )
      .groupBy("glpi_itilcategories.id")
      .havingRaw("COUNT(glpi_tickets.id) > 0");

    const unUsed = await knex("glpi_itilcategories")
      .leftJoin("glpi_tickets", "glpi_itilcategories.id", "glpi_tickets.itilcategories_id")
      .count("glpi_tickets.id as total_tickets")
      .groupBy("glpi_itilcategories.id")
      .havingRaw("COUNT(glpi_tickets.id) = 0");

    const total = data.length;
    const totalInUSE = inUse.length;
    const unused = unUsed.length;

    return {
      meta: {
        total,
        in_use: totalInUSE,
        unused: unused,
      },
      result: data,
    };
  }
}
