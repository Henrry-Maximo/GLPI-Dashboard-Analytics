import { knex } from "@/database/knex-config";

interface SearchTicketsRequest {
  id?: number | undefined;
}

export async function searchTickets({ id }: SearchTicketsRequest) {
  let query = knex("glpi_tickets as t")
  .select([
    "t.id", // ID do chamado
    "t.entities_id", // ID da entidade
    "t.name", // Nome do chamado
    knex.raw(
      'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"'
    ), // Formata a data de criação
    knex.raw(
      'DATE_FORMAT(t.solvedate, "%d/%m/%Y %H:%i") AS "solvedate"'
    ), // Formata a data de solução
    knex.raw(
      'DATE_FORMAT(t.date_mod, "%d/%m/%Y %H:%i") AS "date_mod"'
    ), // Formata a data de modificação
    "lo.name AS location", // Nome da localização
    knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
    `), // Requerente(s)
    knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
    `), // Técnico(s)
    knex.raw(`
      CASE 
        WHEN t.status = 1 THEN 'Novo'
        WHEN t.status = 2 THEN 'Em Atendimento (atribuído)'
        WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
        WHEN t.status = 4 THEN 'Pendente'
        WHEN t.status = 5 THEN 'Solucionado'
        WHEN t.status = 6 THEN 'Fechado'
      END AS "status"
    `),
    knex.raw(`
      CASE 
        WHEN t.priority = 6 THEN 'Crítica'
        WHEN t.priority = 1 THEN 'Muito baixa'
        WHEN t.priority = 2 THEN 'Baixa'
        WHEN t.priority = 3 THEN 'Média'
        WHEN t.priority = 4 THEN 'Alta'
        WHEN t.priority = 5 THEN 'Muito alta'
      END AS "priority"
    `),
  ])
  .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id") // Junta com a tabela de localizações
  .leftJoin("glpi_tickets_users as tu1", function () {
    this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1)); // Tipo 1 = Requerente
  })
  .leftJoin("glpi_users as u", "tu1.users_id", "u.id") // Junta com os usuários requerentes
  .leftJoin("glpi_tickets_users as tu2", function () {
    this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2)); // Tipo 2 = Técnico
  })
  .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id") // Junta com os usuários técnicos
  .groupBy("t.id") // Agrupa por ID do chamado
  .orderBy("t.id", "desc");

  if (id) {
    query = query.where("t.id", id);
    const tickets = await query.first();

    return { tickets }; 
  }

  const tickets = await query;

  return { tickets };
}
