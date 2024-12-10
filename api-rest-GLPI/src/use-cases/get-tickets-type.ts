import { knex } from "@/database/knex-config";

export async function getTicketsType() {
  const result = await knex('glpi_tickets').select([ 
    knex.raw("COUNT(CASE WHEN type = 1 THEN 1 END) AS 'incident'"), 
    knex.raw("COUNT(CASE WHEN type = 2 THEN 1 END) AS 'request'") 
  ]);

  if (!result.length) {
    return { message: "Not found tickets." }
  }

  return { result }
}
