import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { GetUsersUseCase } from "../get-users";

export function makeGetUsersUseCase() {
  const knexUsersRepository = new KnexUsersRepository();
  const usersUseCase = new GetUsersUseCase(knexUsersRepository);

  return usersUseCase;
}
