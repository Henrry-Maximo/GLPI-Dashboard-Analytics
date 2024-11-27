import { knex } from "@/database/knex-config";

interface SearchTicketsRequest {
  id: string | undefined;
  filter: string | undefined;
}

export async function searchTickets({ id, filter }: SearchTicketsRequest) {
  let result = knex("glpi_tickets").select([
    "id",
    "entities_id",
    "name",
    "date_creation",
    "date_mod",
    "solvedate",
  ]);

  if (!filter && !id) {
    return { result };
  }

  const ticket = result.where("id", id);
  return { ticket }
}
