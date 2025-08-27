import { knex } from "@/database/knex-config";
import {
  CategoriesRepository,
  CategoriesTicketsSchema,
  FiltersCategoriesSchema,
} from "../categories-repository";
import { format, startOfMonth } from "date-fns";

export class KnexCategoriesRepository implements CategoriesRepository {
  // ❗ Todo: Performance inefficiencies detected in code.
  async get({
    start_date,
    end_date,
  }: FiltersCategoriesSchema): Promise<CategoriesTicketsSchema> {
    const date = new Date();
    const firstDayMonth = startOfMonth(date);

    const [amountCategoriesInUse, amountCategoriesUnUsed] = await Promise.all([
      knex("glpi_itilcategories")
        .countDistinct({ total: "glpi_itilcategories.id" })
        .leftJoin(
          "glpi_tickets",
          "glpi_itilcategories.id",
          "glpi_tickets.itilcategories_id"
        )
        .whereBetween("glpi_tickets.date_creation", [
          start_date ?? format(date, "yyyy-MM-dd"),
          end_date ?? format(firstDayMonth, "yyyy-MM-dd"),
        ])
        .whereNotNull("glpi_tickets.id")
        .first(),
      knex("glpi_itilcategories")
        .count({ total: "glpi_itilcategories.id" })
        .leftJoin(
          "glpi_tickets",
          "glpi_itilcategories.id",
          "glpi_tickets.itilcategories_id"
        )
        .whereBetween("glpi_tickets.date_creation", [
          start_date ?? format(date, "yyyy-MM-dd"),
          end_date ?? format(firstDayMonth, "yyyy-MM-dd"),
        ])
        .whereNull("glpi_tickets.id")
        .first(),
    ]);

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

    const totalInUse: number = Number(amountCategoriesInUse?.total ?? 0);
    const totalUnUsed: number = Number(amountCategoriesUnUsed?.total ?? 0);

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
