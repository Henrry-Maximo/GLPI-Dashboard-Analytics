import { Tables } from "knex/types/tables";

export interface createUsersRepository {
  name: string;
  passwordHash: string;
}

export interface listUsersRepository {
  search: string;
}

export interface UsersRepository {
  signIn(name: string): Promise<{ user: Tables["glpi_users"] | null}>
  create({ name, passwordHash }: createUsersRepository): Promise<Tables["glpi_users"] | null>
  findByName(name: string): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }>
  list({ search }: listUsersRepository): Promise<{ users: Tables["glpi_users"][] }>
}
