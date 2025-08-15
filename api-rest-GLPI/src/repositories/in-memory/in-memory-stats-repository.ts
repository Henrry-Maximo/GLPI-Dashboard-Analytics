
import { StatsRepository, StatsTicketsResponse, StatsUsersResponse } from "../stats-repository";

export class InMemoryStatsRepository implements StatsRepository {
  public items = {
    meta: {
      totalUsers: 337,
      totalUsersActive: 335,
      totalUsersInactive: 2,
      totalUsersAdmins: 1,
      totalUsersTickets: 0
    },
    result: {
      usersByProfile: [
        { id: 1, name: "Administrador", amount: 1 },
        { id: 2, name: "Técnico", amount: 336 }
      ],
      usersByLocation: [
        { id: 1, name: "Casa", amount: 1 },
        { id: 2, name: "Escritório", amount: 336 }
      ],
      usersByTickets: [
        { id: 1, name: "Administrador", amount: 0 },
        { id: 2, name: "Técnico", amount: 0 }
      ]
    }
  };

  metricsUsers(): Promise<StatsUsersResponse> {
    let result: any = this.items;

    return result;
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }

}
