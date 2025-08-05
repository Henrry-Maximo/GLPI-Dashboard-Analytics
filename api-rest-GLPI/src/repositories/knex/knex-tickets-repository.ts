import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  listTicketsFilters,
  registerTickets,
  TicketsRepository,
} from "../tickets-repository";

export class KnexTicketsRepository implements TicketsRepository {
  async create({ users_id_recipient, entities_id, name }: registerTickets): Promise<Tables["glpi_tickets"]> {
    const [ticket] = await knex("glpi_tickets").insert({ users_id_recipient, entities_id, name }).returning("*");

    return ticket;
  }

  async findById(ticketId: string) {
    const ticket = await knex("glpi_tickets").where("id", ticketId).first();

    if (!ticket) {
      return null;
    }

    return ticket;
  }

  async list({
    id,
    name,
    id_recipient,
    id_request_type,
    id_categories,
    page,
  }: listTicketsFilters): Promise<{ tickets: Tables["glpi_tickets"][] }> {
    const query = knex("glpi_tickets").select("*");

    if (id !== undefined) {
      query.where("id", id);
    }

    if (name) {
      query.where("name", "like", `${name}`);
    }

    if (id_recipient) {
      query.where("users_id_recipient", id_recipient);
    }

    if (id_request_type) {
      query.where("users_id_lastupdater", id_request_type);
    }

    if (id_categories) {
      query.where("itilcategories_id", id_categories);
    }

    const tickets = await query
      .orderBy("id")
      .limit(10)
      .offset((page - 1) * 10);

    return { tickets };
  }
}
