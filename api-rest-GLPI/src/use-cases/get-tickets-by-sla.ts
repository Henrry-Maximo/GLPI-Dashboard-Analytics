import { knex } from "@/database/knex-config";

export async function getTicketsBySla() {
  const result = await knex("glpi_tickets")
    .select("*" as "Chamados Atrasados")
    .whereNotIn("status", [5, 6])
    .andWhere("solvedate", null)
    .andWhereRaw("time_to_resolve < TIMEDIFF(NOW(), date)")
    .limit(10);

  return { result };
}
