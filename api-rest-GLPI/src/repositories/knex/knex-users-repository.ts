import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type { createUsersRepository, listUsersRepository, UsersRepository } from "../users-repository";



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

  async create({
    name,
    passwordHash,
  }: createUsersRepository): Promise<Tables["glpi_users"] | null> {
    const [result] = await knex("glpi_users")
      .insert({ name, password: passwordHash });

    const user = await knex("glpi_users")
      .select("*")
      .where("id", result)
      .first();

    if (user) return user;

    return null;
  }

  async findByName(
    name: string
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }> {
    const user = await knex("glpi_users")
      .select("id", "name")
      .where("name", name)
      .first();

    if (user) return { user };

    return { user: null };
  }

  async list({
    search,
  }: listUsersRepository): Promise<{ users: Tables["glpi_users"][] }> {
    const users = await knex("glpi_users")
      .select("*")
      .andWhere("name", "like", `${search}%`)
      .orderBy("name");

    return { users };
  }
}
