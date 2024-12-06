import { knex } from "@/database/knex-config";

export async function getTicketsTechnicianSolution() {
  const result = await knex("glpi_tickets_users")
    .innerJoin("glpi_users", "glpi_tickets_users.users_id", "glpi_users.id")
    .innerJoin(
      "glpi_groups_users",
      "glpi_tickets_users.users_id",
      "glpi_groups_users.users_id"
    )
    .innerJoin("glpi_groups", "glpi_groups_users.groups_id", "glpi_groups.id")
    .select(
      "glpi_users.name as Technician Name",
      "glpi_groups.name as Group Name"
    )
    .count("glpi_tickets_users.tickets_id as Number of Tickets")
    .whereNotIn("glpi_users.name", [
      "luana.yasmim",
      "cassia.martins",
      "kevin.araujo",
    ])
    .groupBy("glpi_tickets_users.users_id")
    .orderBy("Number of Tickets", "desc");

  if (!result.length) {
    return { message: "Not found tickets." };
  }

  return { result };
}
