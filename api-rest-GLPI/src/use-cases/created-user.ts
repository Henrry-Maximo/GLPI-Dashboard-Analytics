import { knex } from "@/database/knex-config";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { randomInt } from "crypto";
import { hash } from "bcryptjs";

interface authenticateUseCaseRequest {
  name: string;
  password: string;
}

export async function createdUser({
  name,
  password,
}: authenticateUseCaseRequest) {
  const [userExistsAtDatabase] = await knex("glpi_users").select("name").where("name", name);

  if (userExistsAtDatabase) {
    throw new InvalidCredentialsError();
  }

  const randomSalt = randomInt(10, 16);
  const passwordHash = await hash(password, randomSalt);

  const [row] = await knex("glpi_users").insert({ name, password: passwordHash }).returning('*');

  return { row };
}
