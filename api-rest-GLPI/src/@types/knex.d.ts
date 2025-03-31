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
      id: string;
      name: string;
      password: string;
      is_active: number;
    };

    glpi_itilcategories: {
      id: number;
      entities_id: number;
      is_recursive: number;
      itilcategories_id: number;
      name: string;
      completename: string;
      comment: string | null;
      level: number;
      knowbaseitemcategories_id: number;
      users_id: number;
      groups_id: number;
      code: number;
      ancestors_cache: object;
      is_helpdeskvisible: number;
      tickettemplates_id_incident: number;
      tickettemplates_id_demand: number;
      changetempleates_id: number;
      problemtemplates_id: number;
      is_incident: number;
      is_request: number;
      is_problem: number;
      is_change: number;
      date_mod: Date;
      date_creation: Date;
    };
  }
}
