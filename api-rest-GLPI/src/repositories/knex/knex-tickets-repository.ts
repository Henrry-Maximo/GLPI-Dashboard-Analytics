import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  listTicketsFilters,
  registerTickets,
  TicketsRepository,
} from "../tickets-repository";

// async create({ name, passwordHash }: createUsersRepository): Promise<{
//     user: Pick<Tables["glpi_users"], "id" | "name" | "password">;
//   }> {
//     const [id] = await knex("glpi_users").insert({
//       name,
//       password: passwordHash,
//     });

//     const user = (await knex("glpi_users")
//       .where("id", id)
//       .first()) as Tables["glpi_users"];

//     return { user };
//   }

export class KnexTicketsRepository implements TicketsRepository {
  async create({ name }: registerTickets): Promise<Tables["glpi_tickets"]> {
    const tickets = await knex("glpi_tickets").insert({
      name,
    });

    const ticket = (await knex("glpi_tickets")
      .where("name", "like", tickets)
      .first()) as Tables["glpi_tickets"];

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
