import { knex } from "@/database/knex-config";

interface PendingTicket {
  id: number;
  title: string;
  date_creation: string,
  solvedate: string,
  location: string,
  applicant: string,
  technical: string,
  status: string
  priority: number;
}

interface ResponsePending {
  pending: PendingTicket[];
}

// Mapeamento reverso para converter prioridade textual em numérica
// const priorityMap: Record<string, number> = {
//   "Muito baixa": 1,
//   "Baixa": 2,
//   "Média": 3,
//   "Alta": 4,
//   "Muito alta": 5
// };

export async function getTicketsAll() {
  const tickets = await knex("glpi_tickets as t")
  .select([
    "t.id", // ID do chamado
    "t.name", // Nome do chamado
    knex.raw(
      'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"'
    ), // Formata a data de criação
    knex.raw(
      'DATE_FORMAT(t.solvedate, "%d/%m/%Y %H:%i") AS "solvedate"'
    ), // Formata a data de solução
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

  return { tickets };
}

export async function getTicketsPending(): Promise<ResponsePending> {
  // Obtém todos os chamados
  const { tickets } = await getTicketsAll();

  // filtrando linha a linha buscando apenas os dois status
  // percorrendo linha a linha e recriando o array apenas com três elementos
  const pendingTickets = tickets
    .filter(ticket => 
      ticket.status === "Em Atendimento (atribuído)" || 
      ticket.status === "Pendente"
    )
    .map(ticket => ({
      id: ticket.id,
      title: ticket.name,
      date_creation: ticket.date_creation,
      solvedate: ticket.solvedate,
      location: ticket.location,
      applicant: ticket.applicant,
      technical: ticket.technical,
      status: ticket.status,
      priority: ticket.priority
    })).slice(0, 20);

  return {
    pending: pendingTickets
  };
}