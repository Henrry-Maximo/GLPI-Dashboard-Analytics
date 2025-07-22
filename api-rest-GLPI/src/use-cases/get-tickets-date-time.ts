import { knex } from "@/database/knex-config";

export async function getTicketsDateTime() {
  const tickets = await knex("glpi_tickets")
    .select([
      knex.raw("DATE(date_creation) AS date_creation"),
      "status",
      knex.raw("COUNT(id) AS quantity"),
    ])
    .whereNotIn("status", [6])
    .groupByRaw("DATE(date_creation), status")
    .orderBy("date_creation", "desc");

  if (!tickets.length) {
    return { message: "Not found tickets." };
  }

  return { tickets };
}
