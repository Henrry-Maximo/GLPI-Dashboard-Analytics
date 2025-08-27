import { knex } from "@/database/knex-config";
import {
  CategoriesRepository,
  CategoriesTicketsSchema,
  FiltersCategoriesSchema,
} from "../categories-repository";
import { format, startOfMonth, endOfMonth } from "date-fns";

export class KnexCategoriesRepository implements CategoriesRepository {
  async get({
    start_date,
    end_date,
  }: FiltersCategoriesSchema): Promise<CategoriesTicketsSchema> {
    const today = new Date();
    const firstDayMonth = format(startOfMonth(today), "yyyy-MM-dd");
    const lastDayMonth = format(endOfMonth(today), "yyyy-MM-dd");

    const startDate = start_date ?? firstDayMonth;
    const endDate = end_date ?? lastDayMonth;

    const [amountCategoriesInUse, amountCategoriesUnUsed, data] =
      await Promise.all([
        knex("glpi_itilcategories")
          .countDistinct({ total: "glpi_itilcategories.id" })
          .leftJoin(
            "glpi_tickets",
            "glpi_itilcategories.id",
            "glpi_tickets.itilcategories_id"
          )
          .whereBetween("glpi_tickets.date_creation", [startDate, endDate])
          .whereNotNull("glpi_tickets.id")
          .first(),

        knex("glpi_itilcategories")
          .count({ total: "glpi_itilcategories.id" })
          .leftJoin(
            "glpi_tickets",
            "glpi_itilcategories.id",
            "glpi_tickets.itilcategories_id"
          )
          .whereBetween("glpi_tickets.date_creation", [startDate, endDate])
          .whereNull("glpi_tickets.id")
          .first(),

        knex("glpi_tickets")
          .select(
            "glpi_itilcategories.id",
            "glpi_itilcategories.name",
            "glpi_itilcategories.date_creation"
          )
          .count({ total: "glpi_tickets.id" })
          .leftJoin(
            "glpi_itilcategories",
            "glpi_tickets.itilcategories_id",
            "glpi_itilcategories.id"
          )
          .whereBetween("glpi_tickets.date_creation", [startDate, endDate])
          .groupBy("glpi_itilcategories.completename")
          .orderBy("glpi_itilcategories.id"),
      ]);

    const totalInUse: number = Number(amountCategoriesInUse?.total ?? 0);
    const totalUnUsed: number = Number(amountCategoriesUnUsed?.total ?? 0);
    const total = totalInUse + totalUnUsed;

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
