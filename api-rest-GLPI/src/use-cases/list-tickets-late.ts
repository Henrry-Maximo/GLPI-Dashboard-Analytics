import { knex } from "@/database/knex-config";

export async function listTicketsLate() {
  const [tickets] = await knex("glpi_tickets")
    .select("*", "Tickets Late")
    .whereNot([5, 6]).andWhere('solvedate', null).whereRaw(
      "glpi_tickets.time_to_resolve < TIMEDIFF(NOW(), glpi_tickets.date)"
    )
    .limit(10);

    if (!tickets) {
      return { message: 'Not found tickets.' }
    }

    return { tickets };
}
