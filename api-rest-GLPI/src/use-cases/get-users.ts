import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { Tables } from "knex/types/tables";
import { WithoutUsersRegistration } from "./errors/without-users-registration";

interface listUsersFiltersUseCase {
  name?: string;
  isActive?: number;
  page: number;
  item: number
}

export async function getUsers(filters: listUsersFiltersUseCase): Promise<Tables["glpi_users"][]> {
  const knexUsersRepository = new KnexUsersRepository();
  const { users } = await knexUsersRepository.list(filters);

  if (!users) {
    throw new WithoutUsersRegistration();
  }

  return users;
}
