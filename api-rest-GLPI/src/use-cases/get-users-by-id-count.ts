import { knex } from "@/database/knex-config";

export async function getUsersIdCountList() {
  const [sumTotalUsersFromDatabase] = await knex("glpi_users").select(
    knex.raw(["COUNT (id) as total"]),
  );

  if (!sumTotalUsersFromDatabase) {
    return { message: "Not found sum of users" };
  }

  return { sumTotalUsersFromDatabase };
}
