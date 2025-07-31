import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  createUsersRepository,
  listUsersFilters,
  UsersRepository,
} from "../users-repository";

export class KnexUsersRepository implements UsersRepository {
  async signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    const user = await knex("glpi_users")
      .select("*")
      .where("name", name)
      .andWhere("is_active", 1)
      .andWhereNot("password", null)
      .first();

    return { user: user || null };
  }

  async create({ name, passwordHash }: createUsersRepository): Promise<{
    user: Pick<Tables["glpi_users"], "id" | "name" | "password">;
  }> {
    const [id] = await knex("glpi_users").insert({
      name,
      password: passwordHash,
    });

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
    name,
    isActive,
    page,
    item,
  }: listUsersFilters): Promise<{ users: Tables["glpi_users"][] }> {
    const query = knex("glpi_users").select("*");

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
