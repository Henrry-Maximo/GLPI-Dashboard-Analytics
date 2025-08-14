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

interface AmountTicketsUsers {
  name: string;
  amount: number
}

export interface StatsUsersResponse {
  meta: {
    totalUsers: number;
    totalUsersActive: number;
    totalUsersInactive: number;
    totalUsersAdmins: number;
    totalUsersTickets: number
  },
  result: {
    usersByProfile: AmountProfilesUsers[];
    usersByLocation: AmountLocationsUsers[];
    usersCountByTickets: AmountTicketsUsers[];
  }
}

export interface StatsTicketsResponse {
  totalTickets: number;
  totalTicketsPending: number;
  ticketsWithSolution: number;
  ticketsByLocation: Record<string, number>;
}

interface StatsAllResponse {
  usersStats: StatsUsersResponse;
  ticketsStats: StatsTicketsResponse;
}

export interface StatsRepository {
  metricsUsers(): Promise<StatsAllResponse["usersStats"]>;
  metricsTickets(): Promise<StatsAllResponse["ticketsStats"]>;
}
