// import { knex } from "@/database/knex-config";

// // Promise<PropsDataTickets>
// async function statementTickets() {
//   try {
//     const data = await knex("glpi_tickets as t")
//       .select([
//         "t.id",
//         "t.name",
//         "t.type",
//         knex.raw(
//           'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"'
//         ), // Formata a data de criação
//         knex.raw('DATE_FORMAT(t.solvedate, "%d/%m/%Y %H:%i") AS "solvedate"'), // Formata a data de solução
//         "lo.name AS location",
//         knex.raw(`
//       GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
//     `), // Requerente(s)
//         knex.raw(`
//       GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
//     `), // Técnico(s)
//         knex.raw(`
//       CASE
//         WHEN t.status = 1 THEN 'new'
//         WHEN t.status = 2 THEN 'processing (assigned)'
//         WHEN t.status = 3 THEN 'processing (planned)'
//         WHEN t.status = 4 THEN 'pending'
//         WHEN t.status = 5 THEN 'solved'
//         WHEN t.status = 6 THEN 'closed'
//       END AS "status"
//     `),
//         knex.raw(`
//       CASE
//         WHEN t.priority = 1 THEN 'veryLow'
//         WHEN t.priority = 2 THEN 'low'
//         WHEN t.priority = 3 THEN 'average'
//         WHEN t.priority = 4 THEN 'high'
//         WHEN t.priority = 5 THEN 'veryHigh'
//       END AS "priority"
//     `),
//       ])
//       .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id")
//       .leftJoin("glpi_tickets_users as tu1", function () {
//         this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1));
//       })
//       .leftJoin("glpi_users as u", "tu1.users_id", "u.id")
//       .leftJoin("glpi_tickets_users as tu2", function () {
//         this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2));
//       })
//       .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id")
//       .groupBy("t.id")
//       .orderBy("t.id", "desc");

//     return { data };
//   } catch (e) {
//     throw new Error("Failed to fetch tickets.");
//   }
// }
// /*
//   Objetivo: realizar uma consulta na tabela de chamados e
//   retorna todas as informações
// */

// interface ResponsePending {
//   list: PendingTicket[];
//   meta: {
//     total: number;
//     priority: Array<{ name: string; count: number }>;
//     type: Array<{ name: string; count: number }>;
//   };
// }
// interface PendingTicket {
//   id: number;
//   title: string;
//   date_creation: string;
//   solvedate: string;
//   location: string;
//   applicant: string;
//   technical: string;
//   status: string;
//   priority: number;
//   type: number;
// }

// function filteredTicketsOnlyPending(data: PropsTickets[]) {
//   if (!data) {
//     return [];
//   }

//   const filtered = data
//     .filter(
//       (ticket) =>
//         ticket.status === TicketStatus.PENDING ||
//         ticket.status === TicketStatus.PROCESSING_ASSIGNED
//     )
//     .slice(0, 20);

//   return filtered;
// }

// function countsTicketsPriority(pendings: PropsTickets[]) {
//   const priorityCounts = pendings.reduce(
//     (acc, ticket) => {
//       acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
//       return acc;
//     },
//     {} as Record<string, number>
//   );

//   const newArrayPriority = Object.entries(priorityCounts).map(
//     ([name, count]) => ({
//       name,
//       count,
//     })
//   );

//   const priorityOrder = ["veryHigh", "high", "average", "low", "veryLow"];
//   const sortedMeta = newArrayPriority.sort(
//     (a, b) => priorityOrder.indexOf(a.name) - priorityOrder.indexOf(b.name)
//   );

//   return { sortedMeta };
// }

// function countsTicketsType(pendings: PropsTickets[]) {
//   // soma total `incidente` e `requisição`
//   const typeCounts = pendings.reduce(
//     (acc, ticket) => {
//       const typeKey = ticket.type === 1 ? "incident" : "request";

//       if (typeKey === "incident" || typeKey === "request") {
//         acc[typeKey] = (acc[typeKey] || 0) + 1;
//       }

//       return acc;
//     },
//     {} as Record<string, number>
//   );

//   const typeMeta = Object.entries(typeCounts).map(([name, count]) => ({
//     name,
//     count,
//   }));

//   return { typeMeta };
// }

// export async function getTicketsPending(): Promise<ResponsePending> {
//   const { data } = await statementTickets();

//   const pendings = filteredTicketsOnlyPending(data);
//   const numbersItens = pendings.length;
//   const { sortedMeta } = countsTicketsPriority(pendings); // soma total de prioridades / array of arrays being converted for a unique array using map
//   const { typeMeta } = countsTicketsType(pendings);

//   return {
//     meta: {
//       total: numbersItens,
//       priority: sortedMeta,
//       type: typeMeta,
//     },
//     list: pendings,
//   };
// }

// interface PropsCategories {
//   name: string;
//   completename: string;
//   amount: number;
// }

// interface PropsConcludes {
//   date_creation: Date;
//   status: string;
//   count: number;
// }

// interface PropsDelayed {
//   id: number;
//   date_creation: number;
//   time_to_resolve: number | null;
//   name: string;
// }

// interface PropsTicketsDetails {
//   list: PropsConcludes[];
//   meta: {
//     categories: PropsCategories[];
//     delayed: PropsDelayed[];
//   };
// }

// async function statementTicketsDetails(): Promise<PropsTicketsDetails> {
//   function getDateFromSevenDaysAgo(date: number) {
//     const sevenDaysAgo = new Date();

//     sevenDaysAgo.setDate(date - 7);
//     return sevenDaysAgo.toISOString().slice(0, 10).replace("T", " ");
//   }

//   const delayed = await knex("glpi_tickets")
//     .select(
//       "id",
//       "date_creation",
//       "time_to_resolve",
//       "name",
//       knex.raw(`
//       CASE
//         WHEN status = 1 THEN 'new'
//         WHEN status = 2 THEN 'processing (assigned)'
//         WHEN status = 3 THEN 'processing (planned)'
//         WHEN status = 4 THEN 'pending'
//         WHEN status = 5 THEN 'solved'
//         WHEN status = 6 THEN 'closed'
//       END AS "status"
//     `)
//     )
//     .whereNotIn("status", [1, 4, 5, 6])
//     .where("time_to_resolve", "<", knex.fn.now()) // se estiver abaixo do tempo atual, está atrasado
//     .whereNull("solvedate")
//     .limit(10);

//   const concludesRaw = await knex("glpi_tickets")
//     .select([
//       knex.raw("DATE(date_creation) as date_creation"),
//       knex.raw("'concluded' AS status"),
//     ])
//     .count({ count: "id" })
//     .where("date_creation", ">=", getDateFromSevenDaysAgo(new Date().getDate()))
//     .whereIn("status", [5, 6])
//     .groupByRaw("DATE(date_creation)")
//     .orderByRaw("DATE(date_creation) ASC")
//     .limit(10);

//   const concludes: PropsConcludes[] = concludesRaw.map((item: any) => ({
//     date_creation: item.date_creation,
//     status: item.status,
//     count: Number(item.count),
//   }));

//   const categories = await knex("glpi_tickets")
//     .select([
//       "glpi_itilcategories.name",
//       "glpi_itilcategories.completename",
//       knex.raw("COUNT(glpi_tickets.id) AS count"),
//     ])
//     .innerJoin(
//       "glpi_itilcategories",
//       "glpi_tickets.itilcategories_id",
//       "glpi_itilcategories.id"
//     )
//     .whereRaw("glpi_tickets.date_creation >= ?", [
//       `${new Date().getFullYear()}-01-01`,
//     ])
//     .whereRaw("glpi_tickets.date_creation <= ?", [
//       `${new Date().getFullYear()}-12-31`,
//     ])
//     .whereNot("glpi_itilcategories.name", "Anfe")
//     .groupBy("glpi_itilcategories.name", "glpi_itilcategories.completename")
//     .orderBy("count", "desc")
//     .limit(15);

//   return {
//     meta: {
//       delayed,
//       categories,
//     },
//     list: concludes,
//   };
// }

// export async function getTicketsDetails() {
//   const { meta, list } = await statementTicketsDetails();

//   return { meta, list };
// }

// // 01: statementTickets e statementTicketsDetails -> responsavilidade demais
// // 02: renomear funções e variáveis -> fetchTicketsQuery = query bruta / formatPendingTickets -> filtragem e contagem
// // 03: knew.raw -> explicação (data, status) + aliases
// // 04: centralizar erros (logger)
// // 05: função contar prioridades e tipos está inline <- getTicketsPending -> função auxiliares (calculatePriorityCounts), (calculateTypeCounts). Código principal mais limpo, chamando funções e recebendo resultados
// // 06: status/prioridade -> hardcoded -> case do SQL. Solution (enums): mapea. -> constantes/objetos-map -> query
// // 07: obter dados, filtrar e armazenar em uma variável. Funções a parte para gerar os metadados a partir da lista filtrada. Retorne um objeto com list e meta já preparados
