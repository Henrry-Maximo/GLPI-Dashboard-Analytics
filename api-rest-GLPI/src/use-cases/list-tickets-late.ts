import { knex } from "@/database/knex-config";

export async function listTicketsLate() {
  const tickets = await knex("glpi_tickets")
    .select(
      "id", 
      "date_creation", 
      "time_to_resolve", 
      "status",
      knex.raw('name AS "Tickets Late"')
    )
    .whereNotIn("status", [5, 6])
    .whereNull("solvedate")
    .whereRaw(
      "glpi_tickets.time_to_resolve < TIMEDIFF(NOW(), glpi_tickets.date_creation)"
    )
    .limit(10);

  if (!tickets.length) {
    return { message: "Not found tickets." };
  }

  return { tickets };
}
