import { knex } from "@/database/knex-config";

export async function getUsers() {
  const usersFromDatabase = await knex('glpi_users').select('*');

  if (!usersFromDatabase) {
    return { message: "Not found users." }
  }

  return { usersFromDatabase };
}