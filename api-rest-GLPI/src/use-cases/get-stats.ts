import { StatsRepository } from "@/repositories/stats-repository";

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
  tickets: GetStatsTicketsUseCaseResponse;
};

export class GetStatsUseCase {
  constructor(private statsRepository: StatsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute(): Promise<GetStatsUsersUseCaseResponse> {
    const  {
      totalUsers,
      totalUsersActive,
      usersAdmins,
      usersByLocation,
      usersByProfile,
      usersWithTickets,
    }: GetStatsUseCaseSchema["users"] = await this.statsRepository.metricsUsers();

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
