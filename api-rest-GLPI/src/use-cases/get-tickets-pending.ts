import { knex } from "@/database/knex-config";

/**
 * Fetches paginated tickets with formatted data.
 * @param {number} page - Page number.
 * @param {number} pageSize - Number of items per page.
 * @returns {Promise<PropsDataTickets>} Formatted tickets data.
 */

interface PropsDataTickets {
  data: PropsTickets[];
}

interface PropsTickets {
  id: number;
  title: string;
  status: TicketStatus;
  date_creation: string;
  solvedate: string;
  location: string;
  applicant: string;
  technical: string;
  type: TicketType;
  priority: PriorityLevel;
}

enum TicketType {
  INCIDENT = 1,
  REQUEST = 2,
}

enum PriorityLevel {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  CRITICAL = 5,
}

async function statementTickets(): Promise<PropsDataTickets> {
  try {
    const data = await knex("glpi_tickets as t")
      .select([
        "t.id",
        "t.name",
        "t.type",
        knex.raw(
          'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"'
        ), // Formata a data de criação
        knex.raw('DATE_FORMAT(t.solvedate, "%d/%m/%Y %H:%i") AS "solvedate"'), // Formata a data de solução
        "lo.name AS location",
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
      .leftJoin("glpi_locations as lo", "t.locations_id", "lo.id")
      .leftJoin("glpi_tickets_users as tu1", function () {
        this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1));
      })
      .leftJoin("glpi_users as u", "tu1.users_id", "u.id")
      .leftJoin("glpi_tickets_users as tu2", function () {
        this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2));
      })
      .leftJoin("glpi_users as u2", "tu2.users_id", "u2.id")
      .groupBy("t.id")
      .orderBy("t.id", "desc");

    return { data };
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch tickets.");
  }
}

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
  type: number;
}
interface ResponsePending {
  list: PendingTicket[];
  meta: {
    total: number;
    priority: Array<{ name: string; count: number }>;
    type: Array<{ name: string; count: number }>;
  };
}

enum TicketStatus {
  NEW = "new",
  PROCESSING_ASSIGNED = "processing (assigned)",
  PROCESSING_PLANNED = "processing (planned)",
  PENDING = "pending",
  SOLVED = "solved",
  CLOSED = "closed",
}

// alternativa: chamar função de filtragem passando os
// parâmetros

export async function getTicketsPending(): Promise<ResponsePending> {
  const { data } = await statementTickets();

  // filtrar por status
  const filteredTicketsPending = data
    .filter(
      (ticket) =>
        ticket.status === TicketStatus.PENDING ||
        ticket.status === TicketStatus.PROCESSING_ASSIGNED
    )
    .slice(0, 20);

  // soma total de chamados
  const totalTicketsInPending = filteredTicketsPending.length;

  // soma total de prioridades
  const priorityCounts = filteredTicketsPending.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // array of arrays being converted for a unique array using map
  const newArrayPriority = Object.entries(priorityCounts).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  // console.log(priorityCounts);// { high: 1, low: 1, average: 18 }
  // console.log(Object.entries(priorityCounts)); // [ [ 'high', 1 ], [ 'low', 1 ], [ 'average', 18 ] ]

  const priorityOrder = ["veryHigh", "high", "average", "low", "veryLow"];
  const sortedMeta = newArrayPriority.sort(
    (a, b) => priorityOrder.indexOf(a.name) - priorityOrder.indexOf(b.name)
  );

  // soma total `incidente` e `requisição`
  const typeCounts = filteredTicketsPending.reduce((acc, ticket) => {
    const typeKey = ticket.type === 1 ? "incident" : "request";

    if (typeKey === "incident" || typeKey === "request") {
      acc[typeKey] = (acc[typeKey] || 0) + 1;
    }

    return acc;
  }, {} as Record<string, number>);

  const typeMeta = Object.entries(typeCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return {
    meta: {
      total: totalTicketsInPending,
      priority: sortedMeta,
      type: typeMeta,
    },
    list: filteredTicketsPending,
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

interface PropsCategories {
  name: string;
  completename: string;
  amount: number;
}

interface PropsConcludes {
  date_creation: Date;
  status: string;
  count: number;
}

interface PropsDelayed {
  id: number;
  date_creation: number;
  time_to_resolve: number | null;
  name: string;
}

interface PropsTicketsDetails {
  list: PropsConcludes[];
  meta: {
    categories: PropsCategories[];
    delayed: PropsDelayed[];
  };
}

async function statementTicketsDetails(): Promise<PropsTicketsDetails> {
  const delayed = await knex("glpi_tickets")
    .select(
      "id",
      "date_creation",
      "time_to_resolve",
      "name",
      knex.raw(`
      CASE 
        WHEN status = 1 THEN 'new'
        WHEN status = 2 THEN 'processing (assigned)'
        WHEN status = 3 THEN 'processing (planned)'
        WHEN status = 4 THEN 'pending'
        WHEN status = 5 THEN 'solved'
        WHEN status = 6 THEN 'closed'
      END AS "status"
    `)
    )
    .whereNotIn("status", [5, 6])
    .whereNull("solvedate")
    .whereRaw(
      "glpi_tickets.time_to_resolve = TIMEDIFF(NOW(), glpi_tickets.date_creation)"
    )
    .limit(10);

  const concludesRaw = await knex("glpi_tickets")
    .select([
      knex.raw("DATE(date_creation) as date_creation"),
      knex.raw(`
        CASE
          WHEN status = 1 THEN 'new'
          WHEN status = 2 THEN 'processing (assigned)'
          WHEN status = 3 THEN 'processing (planned)'
          WHEN status = 4 THEN 'pending'
          WHEN status = 5 THEN 'solved'
          WHEN status = 6 THEN 'closed'
        END AS status
      `),
    ])
    .count("id as count")
    .whereRaw("YEAR(date_creation) = YEAR(CURDATE())")
    .whereNotIn("status", [1, 2, 3, 4])
    .groupByRaw("DATE(date_creation), status")
    .orderByRaw("DATE(date_creation) DESC")
    .limit(10);

  const concludes: PropsConcludes[] = concludesRaw.map((item: any) => ({
    date_creation: item.date_creation,
    status: item.status,
    count: Number(item.count),
  }));

  const categories = await knex("glpi_tickets")
    .select([
      "glpi_itilcategories.name",
      "glpi_itilcategories.completename",
      knex.raw("COUNT(glpi_tickets.id) AS amount"),
    ])
    .innerJoin(
      "glpi_itilcategories",
      "glpi_tickets.itilcategories_id",
      "glpi_itilcategories.id"
    )
    .whereNot("glpi_itilcategories.name", "Anfe")
    .groupBy("glpi_itilcategories.name", "glpi_itilcategories.completename")
    .orderBy("amount", "desc")
    .limit(10);

  return {
    meta: {
      delayed,
      categories,
    },
    list: concludes,
  };
}

export async function getTicketsDetails() {
  const { meta, list } = await statementTicketsDetails();
  console.log(meta, list)

  return { meta, list};
}
