import { TicketsRepository } from "@/repositories/tickets-repository";

export class GeTicketsPendingUseCase {
  constructor(private ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository;
  }

  async execute() {
    const data = await this.ticketsRepository.getPendings();

    return data;
  }
}