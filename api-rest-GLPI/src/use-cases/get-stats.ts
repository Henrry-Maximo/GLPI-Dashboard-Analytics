import { StatsRepository } from "@/repositories/stats-repository";

interface AmountProfilesUsers {
  id: number
  name: string;
  amount: number
}

interface AmountLocationsUsers {
  id: number;
  name: string;
  amount: number;
  percentage: number;
  description: string;
}

interface GetStatsUsersUseCaseResponse {
  meta: {
    totalUsers: number;
    totalUsersActive: number;
    totalUsersInactive: number;
    usersUsersAdmins: number;
    totalUsersTickets: number
  },
  result: {
    usersByProfile: AmountProfilesUsers[];
    usersByLocation: AmountLocationsUsers[];
  }
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
    const  { meta, result }: GetStatsUseCaseSchema["users"] = await this.statsRepository.metricsUsers();

    return {
      meta,
      result
    };
  }
}
