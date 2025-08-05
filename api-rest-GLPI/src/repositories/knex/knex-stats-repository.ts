import { knex } from "@/database/knex-config";
import type {
  StatsRepository,
  StatsTicketsResponse,
  StatsUsersResponse,
} from "../stats-repository";

export class KnexStatsRepository implements StatsRepository {
  async metricsUsers(): Promise<StatsUsersResponse> {
    const users = await knex("glpi_users").select("*");

    const totalUsers = users.length;

    const totalUsersActive = users.filter((u) => u.is_active === 1).length;

    const usersAdmins = users.filter((u) => u.profiles_id === 4).length;

    const usersByProfile: Record<string, number> = {};
    const usersByLocation: Record<string, number> = {};

    for (const user of users) {
      const profileKey = String(user.profiles_id);
      usersByProfile[profileKey] = (usersByProfile[profileKey] || 0) + 1;

      const locationKey = String(user.locations_id);
      usersByLocation[locationKey] = (usersByLocation[locationKey] || 0) + 1;
    }

    const usersWithTickets = await knex("glpi_tickets")
      .distinct("users_id_recipient")
      .whereNotNull("users_id_recipient")
      .countDistinct("users_id_recipient");

    return {
      totalUsers,
      totalUsersActive,
      usersWithTickets: Number(usersWithTickets[0]?.users_id_recipient || 0),
      usersAdmins,
      usersByProfile,
      usersByLocation,
    };
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }
}
