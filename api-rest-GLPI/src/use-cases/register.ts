import { knex } from "@/database/knex-config";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { randomInt } from "crypto";
import { hash } from "bcryptjs";
import { KnexUsersRepository } from "@/repositories/knex-users-repository";

interface authenticateUseCaseRequest {
  name: string;
  password: string;
}

export async function registerUseCase({
  name,
  password,
}: authenticateUseCaseRequest) {
  const knexUsersRepository = new KnexUsersRepository();
  const { userWithSameName } = await knexUsersRepository.findByName(name);

  if (userWithSameName) {
    throw new InvalidCredentialsError();
  }

  const randomSalt = randomInt(6, 10);
  const passwordHash = await hash(password, randomSalt);

  const [row] = await knex("glpi_users")
    .insert({ name, password: passwordHash })
    .returning("*");

  return { row };
}
