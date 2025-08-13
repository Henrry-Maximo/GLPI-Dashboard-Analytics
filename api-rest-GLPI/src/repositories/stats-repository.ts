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

export interface StatsUsersResponse {
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
