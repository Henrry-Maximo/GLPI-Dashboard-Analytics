import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { randomInt } from "crypto";
import { hash } from "bcryptjs";
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";

interface authenticateUseCaseRequest {
  name: string;
  password: string;
}

export async function registerUseCase({
  name,
  password,
}: authenticateUseCaseRequest) {
  const knexUsersRepository = new KnexUsersRepository();
  const { isUserAlreadyExists }  = await knexUsersRepository.findByName(name);

  if (isUserAlreadyExists) {
    throw new InvalidCredentialsError();
  }

  const randomSalt = randomInt(6, 10);
  const passwordHash = await hash(password, randomSalt);

  const user = await knexUsersRepository.create(name, passwordHash);

  return { user };
}
