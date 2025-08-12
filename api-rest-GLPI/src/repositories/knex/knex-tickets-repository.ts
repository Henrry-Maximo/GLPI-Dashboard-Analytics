import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  listTicketsFilters,
  registerTickets,
  TicketsRepository,
} from "../tickets-repository";

export class KnexTicketsRepository implements TicketsRepository {
  async create({
    entities_id,
    name,
    content,
    users_id_recipient,
    requesttypes_id,
    urgency,
    itilcategories_id,
    locations_id,
  }: registerTickets): Promise<Tables["glpi_tickets"]> {
    const [ticketId] = await knex("glpi_tickets").insert({
      entities_id,
      name,
      content,
      users_id_recipient,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
      date_creation: knex.fn.now(),
    });

    const [ticket] = await knex("glpi_tickets")
      .select("*")
      .where("id", "like", ticketId);

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
    status,
    id_recipient,
    id_type,
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

    if (status) {
      query.where("status", status);
    }

    if (id_recipient) {
      query.where("users_id_recipient", id_recipient);
    }

    if (id_type) {
      query.where("type", id_type);
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
