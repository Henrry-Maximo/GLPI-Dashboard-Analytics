// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    glpi_tickets: {
      id: string;
      entities_id: number;
      name: string;
      status: string;
      date_creation: number;
      date_mod: number;
      solvedate: number;
    };
  }
}
