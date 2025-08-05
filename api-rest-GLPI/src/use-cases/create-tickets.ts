import { TicketsRepository } from "@/repositories/tickets-repository";
import { Tables } from "knex/types/tables";

interface RegisterTicketUseCase {
  entities_id: number;
  name: string;
  content: string;
  users_id_recipient: number;
  requesttypes_id: number;
  urgency: number;
  itilcategories_id: number;
  locations_id: number;
}

// entities_id, name, content, users_id_recipient, requesttypes_id, urgency, itilcategories_id, locations_id

export class RegisterTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute({
    entities_id,
    name,
    content,
    users_id_recipient,
    requesttypes_id,
    urgency,
    itilcategories_id,
    locations_id,
  }: RegisterTicketUseCase): Promise<Tables["glpi_tickets"]> {

    const ticket = await this.ticketsRepository.create({
      entities_id,
      name,
      content,
      users_id_recipient,
      requesttypes_id,
      urgency,
      itilcategories_id,
      locations_id,
    });

    return ticket;
  }
}
