import { knex } from "@/database/knex-config";

export async function categoriesByCount() {
  const categoriesQuantity = await knex("glpi_itilcategories").select([
    knex.raw("COUNT(id) AS count")
  ]);

  if (!categoriesQuantity) {
    return { message: "Not found categories for count." };
  }

  return { categoriesQuantity };
}
