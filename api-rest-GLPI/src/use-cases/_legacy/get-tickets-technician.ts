import { knex } from "@/database/knex-config";

export async function getTicketsTechnician() {
  const ticketsAmountTechnician = await knex("glpi_tickets AS a")
    .leftJoin("glpi_tickets_users AS c", "a.id", "c.tickets_id")
    .leftJoin("glpi_users AS b", "c.users_id", "b.id")
    .select("b.name as technician")
    .count("a.id as quantity")
    .where("c.type", 2)
    .groupBy("b.name")
    .orderBy("quantity", "desc");

  const ticketsAmountTechnicianSolution = await knex("glpi_tickets_users")
    .select(
      "glpi_users.name as technician",
      "glpi_groups.name as group",
    )
    .count("glpi_tickets_users.tickets_id as count")
    .innerJoin("glpi_users", "glpi_tickets_users.users_id", "glpi_users.id")
    .innerJoin(
      "glpi_groups_users",
      "glpi_tickets_users.users_id",
      "glpi_groups_users.users_id",
    )
    .innerJoin("glpi_groups", "glpi_groups_users.groups_id", "glpi_groups.id")
    .groupBy("glpi_tickets_users.users_id", "glpi_groups.name")
    .orderBy("count", "desc");

  //   if (!rows.length) {
  //   return { message: "Not found tickets." }
  // }

  return { ticketsAmountTechnician, ticketsAmountTechnicianSolution };
}
