import { knex } from "@/database/knex-config";

export async function getCategories() {
  const [categories] = await knex('glpi_itilcategories').select('name');

  if (!categories) {
    return { message: "Not found categories." }
  }

  return { categories };
}
