import { StatsRepository } from "@/repositories/stats-repository";

interface AmountProfilesUsers {
  id: number;
  name: string;
  amount: number;
}

interface AmountLocationsUsers {
  id: number;
  name: string;
  amount: number;
  // percentage: number;
  // description: string;
}

interface AmountTicketsUsers {
  id: number;
  name: string;
  amount: number;
}

interface GetStatsUsersUseCaseResponse {
  meta: {
    totalUsers: number;
    totalUsersActive: number;
    totalUsersInactive: number;
    totalUsersAdmins: number;
    totalUsersTickets: number;
  };
  result: {
    usersByProfile: AmountProfilesUsers[];
    usersByLocation: AmountLocationsUsers[];
    usersByTickets: AmountTicketsUsers[];
  };
}

export interface GetStatsTicketsUseCaseResponse {
  totalTickets: number;
  totalTicketsPending: number;
  ticketsWithSolution: number;
  ticketsByLocation: Record<string, number>;
}

interface GetStatsUseCaseSchema {
  users: GetStatsUsersUseCaseResponse;
  tickets: GetStatsTicketsUseCaseResponse;
}

export class GetStatsUseCase {
  constructor(private statsRepository: StatsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute(): Promise<GetStatsUsersUseCaseResponse> {
    const { meta, result }: GetStatsUseCaseSchema["users"] =
      await this.statsRepository.metricsUsers();

    return {
      meta,
      result,
    };
  }
}
