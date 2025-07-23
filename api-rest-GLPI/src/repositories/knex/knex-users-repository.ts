import { knex } from "../../database/knex-config";
import { Tables } from "knex/types/tables";
import type {
  createUsersRepository,
  listUsersRepository,
  UsersRepository,
} from "../users-repository";

export class KnexUsersRepository implements UsersRepository {
  async findById(userId: string) {
    const user = await knex("glpi_users").where("id", userId).first();

    if (!user) {
      return null;
    }

    return user;
  }

  async signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    const user = await knex("glpi_users")
      .select("*")
      .where("name", name)
      .andWhere("is_active", 1)
      .andWhereNot("password", null)
      .first();

    return { user: user || null };
  }

  async create({ name, passwordHash }: createUsersRepository) {
    const [id] = await knex("glpi_users").insert({
      name,
      password: passwordHash,
    });

    const user = await knex("glpi_users").where("id", id).first();

    if (!user) {
      return { user: null };
    }

    return { user };
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
