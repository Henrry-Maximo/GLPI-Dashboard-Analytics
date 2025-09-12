import { Tables } from "knex/types/tables";

export interface CreateUsersBody {
  name: string;
  passwordHash: string;
  is_active?: number;
}

export interface ListUsersQuery {
  id?: number;
  name?: string;
  isActive?: number;
  offset: number;
  limit: number;
}

export interface UsersRepository {
  create(
    params: CreateUsersBody
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name" | "password"> }>;
  signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }>;
  findById(userId: string): Promise<Tables["glpi_users"] | null>;
  findByName(
    name: string
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }>;
  list(filters: ListUsersQuery): Promise<{
    users: Tables["glpi_users"][];
    pagination: Record<string, number>;
  }>;
}
