import { knex } from "@/database/knex-config";

export async function getTicketsSummary() {
	const delayed = await knex("glpi_tickets")
		.select(
			"id",
			"date_creation",
			"time_to_resolve",
			"name",
			knex.raw(`
        CASE 
          WHEN status = 1 THEN 'Novo'
          WHEN status = 2 THEN 'Em Atendimento (atribuído)'
          WHEN status = 3 THEN 'Em Atendimento (planejado)'
          WHEN status = 4 THEN 'Pendente'
          WHEN status = 5 THEN 'Solucionado'
          WHEN status = 6 THEN 'Fechado'
        END AS "status"
      `),
		)
		.whereNotIn("status", [5, 6])
		.whereNull("solvedate")
		.whereRaw(
			"glpi_tickets.time_to_resolve = TIMEDIFF(NOW(), glpi_tickets.date_creation)",
		)
		.limit(10);

	const concludes = await knex("glpi_tickets")
		.select(
			knex.raw("DATE(date_creation) as date_creation"),
			knex.raw(`
        CASE 
          WHEN status = 1 THEN 'Novo'
          WHEN status = 2 THEN 'Em Atendimento (atribuído)'
          WHEN status = 3 THEN 'Em Atendimento (planejado)'
          WHEN status = 4 THEN 'Pendente'
          WHEN status = 5 THEN 'Solucionado'
          WHEN status = 6 THEN 'Fechado'
        END AS "status"
      `),
		)
		.count("id AS count")
		.whereRaw(
		  "YEAR(date_creation) = YEAR(CURDATE())"
		)
		.whereNotIn("status", [1, 2, 3, 4])
		.groupByRaw("DATE(date_creation), status")
		.orderByRaw("DATE(date_creation) DESC")
		.limit(10);

	const categories = await knex("glpi_tickets")
		.select([
			"glpi_itilcategories.name",
			"glpi_itilcategories.completename",
			knex.raw("COUNT(glpi_tickets.id) AS amount"),
		])
		.innerJoin(
			"glpi_itilcategories",
			"glpi_tickets.itilcategories_id",
			"glpi_itilcategories.id",
		)
		.whereNot("glpi_itilcategories.name", "Anfe")
		.groupBy("glpi_itilcategories.name", "glpi_itilcategories.completename")
		.orderBy("amount", "desc")
		.limit(10);
	// for each request sql, verify exists if not return none

	return { categories, concludes, delayed };
}
