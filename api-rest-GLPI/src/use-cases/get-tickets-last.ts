import { knex } from "@/database/knex-config";

export async function getTicketsLast() {
  const ticketLastSchema = await knex("glpi_tickets")
      .select([
        "glpi_tickets.id",
        "glpi_tickets.name AS title",
        "glpi_tickets.date_creation",

        "glpi_locations.name AS location",
        "glpi_users.firstname",
        "glpi_users.realname",

        "glpi_ticketvalidations.validation_date",
        "glpi_ticketvalidations.comment_validation",
        knex.raw(`
          CASE glpi_tickets.status
            WHEN 1 THEN 'Novo'
            WHEN 2 THEN 'Em Atendimento (Atribuído)'
            WHEN 3 THEN 'Em Atendimento (Planejado)'
            WHEN 4 THEN 'Pendente'
            WHEN 5 THEN 'Solucionado'
            WHEN 6 THEN 'Fechado'
          END AS status
        `),
        knex.raw(`
          CASE glpi_tickets.urgency
            WHEN 1 THEN 'Muito baixa'
            WHEN 2 THEN 'Baixa'
            WHEN 3 THEN 'Média'
            WHEN 4 THEN 'Alta'
            WHEN 5 THEN 'Muito Alta'
          END AS priority
        `),
        knex.raw(`
          CASE glpi_ticketvalidations.status
            WHEN 2 THEN 'Aguardando'
            WHEN 3 THEN 'Aprovado'
            WHEN 4 THEN 'Recusado'
          END AS validation_status
        `),
      ])
      .leftJoin(
        "glpi_locations",
        "glpi_tickets.locations_id",
        "glpi_locations.id",
      )
      .leftJoin(
        "glpi_tickets_users",
        "glpi_tickets.id",
        "glpi_tickets_users.tickets_id",
      )
      .leftJoin("glpi_users", "glpi_tickets_users.users_id", "glpi_users.id")
      .leftJoin(
        "glpi_ticketvalidations",
        "glpi_tickets.id",
        "glpi_ticketvalidations.tickets_id",
      )
      .where("glpi_tickets_users.type", 1)
      .whereNot("glpi_tickets.status", 6)
      .whereNot("glpi_tickets.status", 5)
      .orderBy("glpi_tickets.date_creation", "desc")
      .first();

    return { ticketLastSchema };
}
