import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { Tables } from "knex/types/tables";
import { WithoutUsersRegistration } from "./errors/without-users-registration";

interface listQuerySchema {
  search?: string
}

export async function getUsers({ search = "" }: listQuerySchema): Promise<Tables["glpi_users"][]> {
  const knexUsersRepository = new KnexUsersRepository();
  const { users } = await knexUsersRepository.list({ search });

  if (!users) {
    throw new WithoutUsersRegistration();
  }

  return users;
}
