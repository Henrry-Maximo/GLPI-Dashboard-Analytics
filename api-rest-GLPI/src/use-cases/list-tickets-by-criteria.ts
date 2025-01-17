import { knex } from "@/database/knex-config";

export async function statusPriorityCategoriesObject() {
  const [status] = await knex("glpi_tickets").select([
    knex.raw("COUNT(id) AS tickets_total"),
    knex.raw("COUNT(CASE WHEN status = 1 THEN 1 END) AS tickets_open"),
    knex.raw("COUNT(CASE WHEN status = 2 THEN 1 END) AS tickets_assigned"),
    knex.raw("COUNT(CASE WHEN status = 4 THEN 1 END) AS tickets_pending"),
    knex.raw("COUNT(CASE WHEN status = 5 THEN 1 END) AS tickets_solved"),
    knex.raw("COUNT(CASE WHEN status = 6 THEN 1 END) AS tickets_closed"),
  ]);

  const [priority] = await knex("glpi_tickets").select([
    knex.raw(
      "COUNT(CASE WHEN status = 1 AND urgency = 1 THEN 1 END) AS tickets_very_low"
    ),
    knex.raw(
      "COUNT(CASE WHEN status = 2 AND urgency = 2 THEN 1 END) AS tickets_low"
    ),
    knex.raw(
      "COUNT(CASE WHEN status = 3 AND urgency = 3 THEN 1 END) AS tickets_medium"
    ),
    knex.raw(
      "COUNT(CASE WHEN status = 4 AND urgency = 4 THEN 1 END) AS tickets_high"
    ),
    knex.raw(
      "COUNT(CASE WHEN status = 5 AND urgency = 5 THEN 1 END) AS tickets_very_high"
    ),
  ]);

  const categories = await knex("glpi_tickets")
    .select([
      "glpi_itilcategories.completename",
      knex.raw("COUNT(glpi_tickets.id) AS tickets_count"),
    ])
    .innerJoin(
      "glpi_itilcategories",
      "glpi_tickets.itilcategories_id",
      "glpi_itilcategories.id"
    )
    .groupBy(
      "glpi_itilcategories.itilcategories_id",
      "glpi_itilcategories.name"
    )
    .orderBy("tickets_count", "asc");

  return { status, priority, categories };
}
