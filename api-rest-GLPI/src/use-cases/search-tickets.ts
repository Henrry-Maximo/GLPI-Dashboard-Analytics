import { knex } from "@/database/knex-config";

interface SearchTicketsRequest {
  id?: string | undefined;
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
  }

  const tickets = await query;
  return { tickets };
}
