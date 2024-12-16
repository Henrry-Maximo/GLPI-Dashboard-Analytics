// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    glpi_tickets: {
      id: number;
      entities_id: number;
      name: string;
      status: number;
      date_creation: number;
      date_mod: number;
      solvedate: number;
      time_to_resolve: number | null;
      type: number;
    };

    glpi_users: {
      id: string,
      name: string;
      password: string;
      is_active: number;
    };
  }
}
