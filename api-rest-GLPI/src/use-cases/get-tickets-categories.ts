import { knex } from "@/database/knex-config";

export async function getTicketsCategories() {
  const categories_amount = await knex("glpi_tickets")
      .select([
        "glpi_itilcategories.id",
        "glpi_itilcategories.name AS name",
        "glpi_itilcategories.completename AS category",
      ])
      .count("glpi_tickets.id AS tickets_amount")
      .leftJoin(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id",
      )
      .groupBy(
        "glpi_itilcategories.id",
        "glpi_itilcategories.completename",
        "glpi_itilcategories.name",
      )
      .orderBy("tickets_amount", "desc");

    const categories_last_tickets = await knex("glpi_tickets")
      .select([
        "glpi_tickets.id",
        "glpi_tickets.name",
        "glpi_tickets.status ",
        "glpi_tickets.date",
        "glpi_itilcategories.name AS category",
      ])
      .leftJoin(
        "glpi_itilcategories",
        "glpi_tickets.itilcategories_id",
        "glpi_itilcategories.id",
      )
      .whereIn("glpi_tickets.status", [1, 2, 3, 4, 5])
      .orderBy("glpi_tickets.id", "desc")
      .limit(10);

    // if (filter === "true" && by === "getLastTickets") {
      
    //   if (!categories_last_tickets) {
    //     return { message: "Nenhuma categoria associada aos chamados." };
    //   }

    //   return { categories_last_tickets };
    // }

    // if (!categories_amount) {
    //   return { message: "Nenhuma categoria associada aos chamados." };
    // }

    return { categories_amount, categories_last_tickets };
}