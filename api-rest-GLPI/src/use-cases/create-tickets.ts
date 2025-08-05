import { TicketsRepository } from "@/repositories/tickets-repository";
import { Tables } from "knex/types/tables";

interface RegisterTicketUseCase {
  users_id_recipient: number;
  entities_id: number;
  name: string;
}

export class RegisterTicketsUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute({ users_id_recipient, entities_id, name }: RegisterTicketUseCase): Promise<Tables["glpi_tickets"]> {
    const ticket = await this.ticketsRepository.create({ users_id_recipient, entities_id, name });

    return ticket;
  }
}
