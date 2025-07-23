import { knex } from "@/database/knex-config";

export async function getUsersByTickets() {
  const getTotalTickets = await knex("glpi_tickets AS a")
    .leftJoin("glpi_users AS b", "a.users_id_recipient", "b.id")
    .select(
      "b.name AS user",
      knex.raw(["COUNT(a.id) AS total"]),
    )
    .groupBy("b.name")
    .orderBy("total", "desc");

  if (!getTotalTickets) {
    return { message: "Not found total tickets for users." };
  }

  return { getTotalTickets };
}
