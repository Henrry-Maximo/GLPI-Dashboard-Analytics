import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
  const knexUsersRepository = new KnexUsersRepository();
  const profileUseCase = new GetUserProfileUseCase(knexUsersRepository);

  return profileUseCase;
}
