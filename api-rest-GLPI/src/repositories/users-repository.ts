import { Tables } from "knex/types/tables";

export interface createUsersRepository {
  name: string;
  passwordHash: string;
}

// enum valuesIntForStringStatus {
//   active = 1,
//   inactive = 0
// }

export interface listUsersRepository {
  id: number;
  name: string;
  // is_active: valuesIntForStringStatus;
  profiles_id: number;
}

export interface UsersRepository {
  signIn(name: string): Promise<{ user: Tables["glpi_users"] | null}>
  create({ name, passwordHash }: createUsersRepository): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name" | "password">}>
  findByName(name: string): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }>
  list({ search }: listUsersRepository): Promise<{ users: Tables["glpi_users"][] }>
  findById(userId: string): Promise<Tables["glpi_users"] | null>
}
