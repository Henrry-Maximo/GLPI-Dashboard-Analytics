import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  CreateUsersBody,
  ListUsersQuery,
  UsersRepository,
} from "../users-repository";

export class KnexUsersRepository implements UsersRepository {
  async signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    const user = await knex("glpi_users")
      .select("*")
      .where("name", name)
      .andWhereNot("password", null)
      .first();

    return { user: user || null };
  }

  async create(data: CreateUsersBody): Promise<{
    user: Pick<Tables["glpi_users"], "id" | "name" | "password">;
  }> {
    const { passwordHash, ...rest } = data;
    const [id] = await knex("glpi_users").insert({ ...rest, password: passwordHash});

    const user = (await knex("glpi_users")
      .where("id", id)
      .first()) as Tables["glpi_users"];

    return { user };
  }

  async findById(userId: string) {
    const user = await knex("glpi_users").where("id", userId).first();

    if (!user) {
      return null;
    }

    return user;
  }

  async findByName(
    name: string,
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }> {
    const user = await knex("glpi_users")
      .select("id", "name")
      .where("name", name)
      .first();

    if (user) return { user };

    return { user: null };
  }

  async list({
    id,
    name,
    isActive,
    page,
    item,
  }: ListUsersQuery): Promise<{ users: Tables["glpi_users"][] }> {
    const query = knex("glpi_users").select("*");

    if (id) {
      query.where("id", id)
    }

    if (name) {
      query.where("name", "like", `${name}%`);
    }

    if (isActive !== undefined) {
      query.where("is_active", isActive);
    }

    const users = await query
      .orderBy("id")
      .limit(item)
      .offset((page - 1) * item);

    return { users };
  }
}
