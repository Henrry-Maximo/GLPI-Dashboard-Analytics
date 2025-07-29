import { StatsRepository } from "@/repositories/stats-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetStatsUsersUseCaseResponse {
  totalUsers: number;
  totalUsersActive: number;
  usersWithTickets: number;
  usersAdmins: number;
  usersByProfile: Record<string, number>;
  usersByLocation: Record<string, number>;
}

export interface GetStatsTicketsUseCaseResponse {
  totalTickets: number;
  totalTicketsPending: number;
  ticketsWithSolution: number;
  ticketsByLocation: Record<string, number>;
};

interface GetStatsUseCaseSchema {
  users: GetStatsUsersUseCaseResponse;
  ticksts: GetStatsTicketsUseCaseResponse;
};

export class GetStatsUseCase {
  constructor(private statsRepository: StatsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute(): Promise<GetStatsUsersUseCaseResponse> {
    const items = [];

    const users: GetStatsUseCaseSchema["users"] = await this.statsRepository.metricsUsers();
    items.push(users);

    const  {
      totalUsers,
      totalUsersActive,
      usersAdmins,
      usersByLocation,
      usersByProfile,
      usersWithTickets,
    } = await this.statsRepository.metricsUsers();

    if (!items || items.length < 0) {
      throw new ResourceNotFoundError();
    }

    return {
      totalUsers,
      totalUsersActive,
      usersAdmins,
      usersByLocation,
      usersByProfile,
      usersWithTickets,
    };
  }
}
