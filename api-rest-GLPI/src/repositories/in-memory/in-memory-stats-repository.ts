import { StatsRepository, StatsTicketsResponse, StatsUsersResponse } from "../stats-repository";

export class InMemoryStatsRepository implements StatsRepository {
  metricsUsers(): Promise<StatsUsersResponse> {
    throw new Error("Method not implemented.");
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }

}
