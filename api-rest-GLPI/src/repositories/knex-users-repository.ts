import { knex } from "@/database/knex-config";

export class KnexUsersRepository {
  async signIn(name: string) {
    const user = await knex("glpi_users")
      .select("name", "password", "id")
      .where("name", name)
      .andWhere("is_active", 1)
      .first();
    
    return { user };
  }

  async findByName(name: string) {
    const user = await knex("glpi_users")
      .where("name", name)
      .first();

    return { userWithSameName: user }
  }
}
