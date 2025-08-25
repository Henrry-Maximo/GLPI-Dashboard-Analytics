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
      .orderBy("glpi_itilcategories.id")
      .limit(20);

    if (!data.length) {
      return null;
    }

    const total = data.length;
    // const inUse = await knex("glpi_tickets")
    //   .count("glpi_tickets.id as amount_tickets")
    //   .join(
    //     "glpi_itilcategories",
    //     "glpi_tickets.itilcategories_id",
    //     "glpi_itilcategories.id"
    //   )
    //   .havingRaw("COUNT(glpi_tickets.id) > 0");

    return {
      meta: {
        total,
        in_use: 10,
        unused: 20,
      },
      result: data,
    };
  }
}
