import { knex } from "@/database/knex-config";
import type {
  StatsRepository,
  StatsTicketsResponse,
  StatsUsersResponse,
} from "../stats-repository";
import { Tables } from "knex/types/tables";

interface UsersTicketsSchema {
  name: string;
  amount: number;
}

export class KnexStatsRepository implements StatsRepository {
  async metricsUsers(): Promise<StatsUsersResponse> {
    const items: Tables["glpi_users"][] = [];

    // retornar array de todos os usuários
    const users = await knex("glpi_users").select("*");

    // retornar array de quantidade de chamados por usuários
    const usersCountByTickets: UsersTicketsSchema[] = await knex("glpi_tickets")
      .select("glpi_users.name")
      .count("glpi_tickets.id as amount")
      .join("glpi_users", "glpi_tickets.users_id_recipient", "glpi_users.id")
      .groupBy("glpi_users.name")
      .orderBy("amount", "desc");

    const totalUsers = users.length;
    const totalUsersActive = users.filter(
      (item) => item.is_active === 1
    ).length;
    const totalUsersInactive = users.filter(
      (item) => item.is_active === 0
    ).length;
    const totalUsersAdmins = users.filter(
      (item) => item.profiles_id === 4
    ).length;
    const totalUsersTickets = usersCountByTickets.reduce(
      (sum, user) => sum + user.amount,
      0
    );

    // retornar array de quantidade de chamados por usuários
    // const usersByProfile: any[] = await knex("glpi_tickets")
    //   .select("glpi_users.name")
    //   .count("glpi_tickets.id as amount")
    //   .join("glpi_users", "glpi_tickets.users_id_recipient", "glpi_users.id")
    //   .groupBy("glpi_users.name")
    //   .orderBy("amount", "desc");

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
        totalUsersAdmins,
        totalUsersTickets,
      },
      result: {
        usersByProfile: [],
        usersByLocation: [],
        usersCountByTickets,
      },
    };
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }
}
