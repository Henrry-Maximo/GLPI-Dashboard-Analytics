import { knex } from "@/database/knex-config";

interface ListTicketsAmountRequest {
  filter?: string;
  by?: string;
}

export async function listTicketsAmount({ filter, by }: ListTicketsAmountRequest) {
  const ticketsByAmountCategories = await knex("glpi_tickets")
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

    const ticketsByLastCategories = await knex("glpi_tickets")
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

    if (filter === "true" && by === "getLastTickets") {
      
      if (!ticketsByLastCategories) {
        return { message: "Nenhuma categoria associada aos chamados." };
      }

      return { ticketsByLastCategories };
    }

    if (!ticketsByAmountCategories) {
      return { message: "Nenhuma categoria associada aos chamados." };
    }

    return { ticketsByAmountCategories };
}