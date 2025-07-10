import { knex } from "@/database/knex-config";
import { Tables } from "knex/types/tables";

export class KnexUsersRepository {
  async signIn(name: string) {
    const user = await knex("glpi_users")
      .select("id", "name", "password")
      .where("name", name)
      .andWhere("is_active", 1)
      .andWhereNot("password", null)
      .first();

    return { user };
  }

  async create(
    name: string,
    passwordHash: string
  ): Promise<Tables["glpi_users"]> {
    const [user] = await knex("glpi_users")
      .insert({ name, password: passwordHash })
      .returning("*");

    return user;
  }

  async findByName(name: string) {
    const user = await knex("glpi_users")
      .select("id", "name")
      .where("name", name)
      .first();

    return { isUserAlreadyExists: user };
  }

  async list() {
    const users = await knex("glpi_users").select("*");

    return users;
  }
}
