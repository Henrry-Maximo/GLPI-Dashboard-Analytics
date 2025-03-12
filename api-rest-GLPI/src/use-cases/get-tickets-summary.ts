import { knex } from "@/database/knex-config";

export async function getTicketsSummary() {
	const [status] = await knex("glpi_tickets").select([
		knex.raw("COUNT(id) AS tickets_total"),
		knex.raw("COUNT(CASE WHEN status = 1 THEN 1 END) AS tickets_open"),
		knex.raw("COUNT(CASE WHEN status = 2 THEN 1 END) AS tickets_assigned"),
		knex.raw("COUNT(CASE WHEN status = 4 THEN 1 END) AS tickets_pending"),
		knex.raw("COUNT(CASE WHEN status = 5 THEN 1 END) AS tickets_solved"),
		knex.raw("COUNT(CASE WHEN status = 6 THEN 1 END) AS tickets_closed"),
	]);

	const [priority] = await knex("glpi_tickets").select([
		knex.raw("COUNT(CASE WHEN urgency = 1 THEN 1 END) AS tickets_very_low"),
		knex.raw("COUNT(CASE WHEN urgency = 2 THEN 1 END) AS tickets_low"),
		knex.raw("COUNT(CASE WHEN urgency = 3 THEN 1 END) AS tickets_medium"),
		knex.raw("COUNT(CASE WHEN urgency = 4 THEN 1 END) AS tickets_high"),
		knex.raw("COUNT(CASE WHEN urgency = 5 THEN 1 END) AS tickets_very_high"),
	]);

	const [type] = await knex("glpi_tickets").select([
		knex.raw("COUNT(CASE WHEN type = 1 THEN 1 END) AS 'incident'"),
		knex.raw("COUNT(CASE WHEN type = 2 THEN 1 END) AS 'request'"),
	]);

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
			"glpi_tickets.time_to_resolve < TIMEDIFF(NOW(), glpi_tickets.date_creation)",
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
		// .whereRaw(
		//   "YEAR(date_creation) = YEAR(CURDATE()) - 1"
		// )
		.whereNotIn("status", [1, 2, 3, 4])
		.groupByRaw("DATE(date_creation), status")
		.orderByRaw("DATE(date_creation) DESC");

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

	return { status, priority, type, categories, concludes, delayed };
}
