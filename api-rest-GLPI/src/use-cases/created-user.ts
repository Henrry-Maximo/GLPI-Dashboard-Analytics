import { knex } from "@/database/knex-config";

interface authenticateUseCaseRequest {
  name: string;
  password: string;
}

export async function createdUser({
  name,
  password,
}: authenticateUseCaseRequest) {
  const [user] = await knex("glpi_users")
    .insert({ name, password });

  return { user };
}
