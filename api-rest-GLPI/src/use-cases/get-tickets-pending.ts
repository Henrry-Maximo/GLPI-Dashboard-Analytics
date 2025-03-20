import { knex } from "@/database/knex-config";

interface PendingTicket {
	id: number;
	title: string;
	date_creation: string;
	solvedate: string;
	location: string;
	applicant: string;
	technical: string;
	status: string;
	priority: number;
}

interface ResponsePending {
	list: PendingTicket[];
	meta: {
		priority: Array<{ name: string; count: number }>;
		type: Array<{ name: string; count: number }>;
	};
}

export async function getTicketsAll() {
	const tickets = await knex("glpi_tickets as t")
		.select([
			"t.id", // ID do chamado
			"t.name", // Nome do chamado
			"t.type",
			knex.raw(
				'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"',
			), // Formata a data de criação
			knex.raw('DATE_FORMAT(t.solvedate, "%d/%m/%Y %H:%i") AS "solvedate"'), // Formata a data de solução
			"lo.name AS location", // Nome da localização
			knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
    `), // Requerente(s)
			knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
    `), // Técnico(s)
			knex.raw(`
      CASE 
        WHEN t.status = 1 THEN 'new'
        WHEN t.status = 2 THEN 'processing (assigned)'
        WHEN t.status = 3 THEN 'processing (planned)'
        WHEN t.status = 4 THEN 'pending'
        WHEN t.status = 5 THEN 'solved'
        WHEN t.status = 6 THEN 'closed'
      END AS "status"
    `),
			knex.raw(`
      CASE 
        WHEN t.priority = 1 THEN 'veryLow'
        WHEN t.priority = 2 THEN 'low'
        WHEN t.priority = 3 THEN 'average'
        WHEN t.priority = 4 THEN 'high'
        WHEN t.priority = 5 THEN 'veryHigh'
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
		.filter((ticket) =>
			["processing (assigned)", "pending"].includes(ticket.status),
		)
		.map((ticket) => ({
			id: ticket.id,
			title: ticket.name,
			date_creation: ticket.date_creation,
			solvedate: ticket.solvedate,
			location: ticket.location,
			applicant: ticket.applicant,
			technical: ticket.technical,
			status: ticket.status,
			priority: ticket.priority,
			type: ticket.type,
		}))
		.slice(0, 20);

	const priorityCounts = pendingTickets.reduce(
		(acc, ticket) => {
			acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	const typeCounts = pendingTickets.reduce(
		(acc, ticket) => {
			const typeKey = ticket.type === 1 ? "incident" : "request";

			if (typeKey === "incident" || typeKey === "request") {
				acc[typeKey] = (acc[typeKey] || 0) + 1;
			}

			return acc;
		},
		{} as Record<string, number>,
	);

	const priorityMeta = Object.entries(priorityCounts).map(([name, count]) => ({
		name,
		count,
	}));

	const typeMeta = Object.entries(typeCounts).map(([name, count]) => ({
		name,
		count,
	}));

	const priorityOrder = ["high", "average", "low", "veryLow"];
	const sortedMeta = priorityMeta.sort(
		(a, b) => priorityOrder.indexOf(a.name) - priorityOrder.indexOf(b.name),
	);

	const metaFinal = {
		priority: sortedMeta,
		type: typeMeta,
	};

	return {
		meta: metaFinal,
		list: pendingTickets,
	};
}

// {
//   meta: {
//     priority: [
//       {
//         "name": "high",
//         "count": 2
//       },
//       {
//         "name": "average",
//         "count": 2
//       },
//       {
//         "name": "low",
//         "count": 5
//       },
//       {
//         "name": "veryLow",
//         "count": 1
//       }
//     ],
//     type: [
//       {
//         "name": "incident",
//         "count": 6
//       },
//       {
//         "name": "incident",
//         "count": 2
//       }
//     ]
//   }
//   list : [...]
// }
