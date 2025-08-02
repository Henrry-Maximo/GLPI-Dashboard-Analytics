import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { SignInUseCase } from "../signIn";


export function makeSignInUseCase() {
  const knexUsersRepository = new KnexUsersRepository();
  const signInUseCase = new SignInUseCase(knexUsersRepository);

  return signInUseCase;
}
