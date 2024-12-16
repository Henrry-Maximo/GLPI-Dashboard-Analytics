import { knex } from "@/database/knex-config";

interface SearchTicketsRequest {
  id?: number | undefined;
}

export async function searchTickets({ id }: SearchTicketsRequest) {
  let query = knex("glpi_tickets").select([
    "id",
    "entities_id",
    "name",
    "date_creation",
    "solvedate",
    "date_mod",
  ]);

  if (id) {
    query = query.where("id", id);
    const ticket = await query.first();

    return { ticket }; 
  }

  const tickets = await query;

  return { tickets };
}
