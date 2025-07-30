import { Tables } from "knex/types/tables";

export interface createUsersRepository {
  name: string;
  passwordHash: string;
}

export interface listUsersFilters {
  name?: string;
  isActive?: number;
}

export interface UsersRepository {
  create({ name, passwordHash }: createUsersRepository): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name" | "password">}>
  signIn(name: string): Promise<{ user: Tables["glpi_users"] | null}>
  findById(userId: string): Promise<Tables["glpi_users"] | null>
  findByName(name: string): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }>
  list(filters: listUsersFilters): Promise<{ users: Tables["glpi_users"][] }>
}
