import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { Tables } from "knex/types/tables";
import { WithoutUsersRegistration } from "./errors/without-users-registration";

export async function getUsers(): Promise<Tables["glpi_users"][]> {
  const knexUsersRepository = new KnexUsersRepository();
  const users = await knexUsersRepository.list();

  if (!users) {
    throw new WithoutUsersRegistration();
  }

  return users;
}
