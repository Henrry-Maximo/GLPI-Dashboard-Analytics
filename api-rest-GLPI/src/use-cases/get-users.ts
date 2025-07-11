import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { WithoutUsersRegistration } from "./errors/without-users-registration";

interface UserFilters {
  status?: "active" | "inactive" | string;
  search?: string;
}

export async function usersUseCase(filters: UserFilters = {}) {
  const { status, search } = filters;

  const knexUsersRepository = new KnexUsersRepository();
  let { users } = await knexUsersRepository.list(status, search);

  if (!users) {
    throw new WithoutUsersRegistration();
  }

  return users;
}