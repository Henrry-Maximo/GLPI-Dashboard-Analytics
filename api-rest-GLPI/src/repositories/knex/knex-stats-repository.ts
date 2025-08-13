import { knex } from "@/database/knex-config";
import type {
  StatsRepository,
  StatsTicketsResponse,
  StatsUsersResponse,
} from "../stats-repository";
import { Tables } from "knex/types/tables";

export class KnexStatsRepository implements StatsRepository {
  async metricsUsers(): Promise<StatsUsersResponse> {
    const items: Tables["glpi_users"][] = [];

    const users = await knex("glpi_users").select("*");

    const totalUsers = users.length;
    const totalUsersActive = users.filter((u) => u.is_active === 1).length;
    const totalUsersInactive = users.filter((u) => u.is_active === 0).length;
    const totalUsersAdmins = users.filter((u) => u.profiles_id === 4).length;
    const totalUsersTickets = 2;

    // const usersByProfile: Record<string, number> = {};
    // const usersByLocation: Record<string, number> = {};

    // for (const user of users) {
    //   const profileKey = String(user.profiles_id);
    //   usersByProfile[profileKey] = (usersByProfile[profileKey] || 0) + 1;

    //   const locationKey = String(user.locations_id);
    //   usersByLocation[locationKey] = (usersByLocation[locationKey] || 0) + 1;
    // }

    // const usersWithTickets = await knex("glpi_tickets")
    //   .distinct("users_id_recipient")
    //   .whereNotNull("users_id_recipient")
    //   .countDistinct("users_id_recipient");

    return {
      meta: {
        totalUsers,
        totalUsersActive,
        totalUsersInactive,
        usersUsersAdmins: totalUsersAdmins,
        totalUsersTickets,
      },
      result: {
        usersByProfile: [],
        usersByLocation: [],
      },
    };
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }
}
