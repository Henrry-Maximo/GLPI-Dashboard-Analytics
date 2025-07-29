
export interface StatsUsersResponse {
  totalUsers: number;
  totalUsersActive: number;
  usersWithTickets: number;
  usersAdmins: number;
  usersByProfile: Record<string, number>;
  usersByLocation: Record<string, number>;
};

export interface StatsTicketsResponse {
  totalTickets: number;
  totalTicketsPending: number;
  ticketsWithSolution: number;
  ticketsByLocation: Record<string, number>;
};

interface StatsAllResponse {
  usersStats: StatsUsersResponse;
  ticketsStats: StatsTicketsResponse;
}

export interface StatsRepository {
  metricsUsers(): Promise<StatsAllResponse["usersStats"]>
  metricsTickets(): Promise<StatsAllResponse["ticketsStats"]>
};
