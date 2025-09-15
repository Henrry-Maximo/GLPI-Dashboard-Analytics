// import { knex } from "@/database/knex-config";

// export async function getTicketsOverview() {
//   const tickets = await knex("glpi_tickets as t")
//     .select([
//       knex.raw(
//         "DATE_FORMAT(t.date_creation, \"%d/%m/%Y %H:%i\") AS \"date_creation\"",
//       ), // Formata a data de criação para o formato específico
//       "e.name AS entities", // Nome da entidade
//       "t.id AS id", // ID do chamado
//       "t.name AS title", // Nome
//       "lo.name AS location", // Setor
//       knex.raw(`
//       GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
//     `), // Concatena os nomes e sobrenomes dos usuários do tipo "Requerente" e remove duplicatas
//       knex.raw(`
//       GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
//     `), // Concatena os nomes dos usuários do tipo "Técnico" e remove duplicatas
//       knex.raw(`
//       CASE
//         WHEN t.status = 1 THEN 'Novo'
//         WHEN t.status = 2 THEN 'Em Atendimento (atribuído)'
//         WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
//         WHEN t.status = 4 THEN 'Pendente'
//         WHEN t.status = 5 THEN 'Solucionado'
//         WHEN t.status = 6 THEN 'Fechado'
//       END AS "status"
//     `),
//       knex.raw(`
//       CASE
//         WHEN t.priority = 6 THEN 'Crítica'
//         WHEN t.priority = 1 THEN 'Muito baixa'
//         WHEN t.priority = 2 THEN 'Baixa'
//         WHEN t.priority = 3 THEN 'Média'
//         WHEN t.priority = 4 THEN 'Alta'
//         WHEN t.priority = 5 THEN 'Muito alta'
//       END AS "priority"
//     `),
//     ])
//     .leftJoin("glpi_entities as e", "t.entities_id", "e.id") // Faz a junção com a tabela de entidades
//     .leftJoin("glpi_tickets_users as tu1", function () {
//       this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1)); // Junta a tabela de usuários vinculados ao ticket (tipo 1 = Requerente)
//     })
//     .leftJoin("glpi_users as u", "tu1.users_id", "u.id") // Junta com a tabela de usuários para pegar o nome do Requerente
//     .leftJoin("glpi_tickets_users as tu2", function () {
//       this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2)); // Junta a tabela de usuários vinculados ao ticket (tipo 2 = Técnico)
//     })
//     .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id") // Junta com a tabela de usuários para pegar o nome do Técnico
//     .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id")
//     .whereNotIn("t.status", [5, 6]) // Filtra para excluir os chamados com status 5 (Solucionado) e 6 (Fechado)
//     .groupBy("t.id") // Agrupa os resultados por ID do chamado
//     .orderBy("t.date_mod", "desc") // Ordena os resultados pela data de modificação mais recente
//     .limit(10);

//   if (!tickets) {
//     return { message: "Not found tickets." };
//   }

//   return tickets;
// }
