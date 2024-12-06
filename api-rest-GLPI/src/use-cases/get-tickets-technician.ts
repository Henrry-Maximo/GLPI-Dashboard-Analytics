import { knex } from "@/database/knex-config";

export async function getTicketsTechnician() {
  const rows = await knex("glpi_tickets AS a")
    .leftJoin("glpi_tickets_users AS c", "a.id", "c.tickets_id")
    .leftJoin("glpi_users AS b", "c.users_id", "b.id")
    .select("b.name as technician")
    .count("a.id as quantity_tickets")
    .where("c.type", 2)
    .groupBy("b.name")
    .orderBy("quantity_tickets", "desc");

  if (!rows.length) {
    return { message: "Not found tickets." }
  }
  
  return { rows };
}
