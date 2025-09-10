import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { SignInUseCase } from "../signIn";
import { HttpExternalAuthService } from "@/http/services/glpi-api/signIn-external";

export function makeSignInUseCase() {
  const knexUsersRepository = new KnexUsersRepository();
  const authUsersService = new HttpExternalAuthService();
  const signInUseCase = new SignInUseCase(
    knexUsersRepository,
    authUsersService
  );

  return signInUseCase;
}
