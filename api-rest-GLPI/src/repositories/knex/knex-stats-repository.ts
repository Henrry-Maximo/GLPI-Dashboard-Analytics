import { knex } from "@/database/knex-config";
import type {
  StatsRepository,
  StatsTicketsResponse,
  StatsUsersResponse,
} from "../stats-repository";

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

interface UsersSchema {
  usersByProfile: AmountProfilesUsers[];
  usersByLocation: AmountLocationsUsers[];
  usersByTickets: AmountTicketsUsers[];
}

export class KnexStatsRepository implements StatsRepository {
  async metricsUsers(): Promise<StatsUsersResponse> {
    // retornar array de todos os usuários
    const users = await knex("glpi_users").select("*");

    // retornar array de quantidade de chamados por usuários
    const usersByProfile: UsersSchema["usersByProfile"] = await knex(
      "glpi_profiles"
    )
      .select("glpi_profiles.id", "glpi_profiles.name")
      .count("glpi_users.profiles_id as amount")
      .join("glpi_users", "glpi_profiles.id", "glpi_users.profiles_id")
      .groupBy("glpi_profiles.name")
      .orderBy("amount", "desc");

    // retornar array de quantidade de chamados por usuários
    const usersByTickets: UsersSchema["usersByTickets"] = await knex(
      "glpi_tickets"
    )
      .select("glpi_users.id", "glpi_users.name")
      .count("glpi_tickets.id as amount")
      .join("glpi_users", "glpi_tickets.users_id_recipient", "glpi_users.id")
      .groupBy("glpi_users.name")
      .orderBy("amount", "desc");

    const usersByLocation: UsersSchema["usersByLocation"] = await knex(
      "glpi_users"
    )
      .select("glpi_locations.id", "glpi_locations.name")
      .count("glpi_users.id as amount")
      .join("glpi_locations", "glpi_locations.id", "glpi_users.locations_id")
      .groupBy("glpi_locations.name", "glpi_locations.name")
      .orderBy("id", "asc");

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
    const totalUsersTickets = usersByTickets.reduce(
      (sum, user) => sum + user.amount,
      0
    );

    return {
      meta: {
        totalUsers,
        totalUsersActive,
        totalUsersInactive,
        totalUsersAdmins,
        totalUsersTickets,
      },
      result: {
        usersByProfile,
        usersByLocation,
        usersByTickets,
      },
    };
  }

  metricsTickets(): Promise<StatsTicketsResponse> {
    throw new Error("Method not implemented.");
  }
}
