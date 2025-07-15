import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { Tables } from "knex/types/tables";
import { WithoutUsersRegistration } from "./errors/without-users-registration";

interface listQuerySchema {
  status?: "active" | "inactive" | null
  search?: string
}

export async function getUsers({ status, search }): Promise<Tables["glpi_users"][]> {
  const knexUsersRepository = new KnexUsersRepository();
  const { users } = await knexUsersRepository.list({ status, search });

  if (!users) {
    throw new WithoutUsersRegistration();
  }

  return users;
}
