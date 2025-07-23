import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const knexUsersRepository = new KnexUsersRepository();
  const registerUseCase = new RegisterUseCase(knexUsersRepository);

  return registerUseCase;
}
