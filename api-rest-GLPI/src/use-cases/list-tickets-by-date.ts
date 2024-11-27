import { knex } from "@/database/knex-config";

export async function listTicketsByDate() {
  const tickets = await knex("glpi_tickets")
    .select(knex.raw("DATE(date_creation) AS data"), "status")
    .count("id AS quantidade")
    .whereNotIn("status", [1, 2, 3, 4, 5])
    .groupByRaw("DATE(date_creation), status")
    .orderByRaw("DATE(date_creation) DESC");

  return { tickets };
}
