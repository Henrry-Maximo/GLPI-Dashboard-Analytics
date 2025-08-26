import { knex } from "@/database/knex-config";
import { CategoriesRepository, FiltersCategoriesSchema } from "../categories-repository";

export class KnexCategoriesRepository implements CategoriesRepository {
  async get({ start_date, end_date }: FiltersCategoriesSchema): Promise<any> {
    console.log(start_date, end_date);

    const data = await knex("glpi_tickets")
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
      .whereBetween("glpi_tickets.date_creation", [
        String(start_date),
        String(end_date),
      ])
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

    const totalInUse = inUse?.total;
    const totalUnUsed = unUsed?.total;

    const total = Number(totalInUse) + Number(totalUnUsed);

    return {
      meta: {
        total,
        in_use: totalInUse,
        unused: totalUnUsed,
      },
      result: data,
    };
  }
}
