import { Tables } from "knex/types/tables";
import type {
  createUsersRepository,
  listUsersRepository,
  UsersRepository,
} from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: any = [];

  signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    throw new Error("Method not implemented.");
  }

  async create({
    name,
    passwordHash,
  }: createUsersRepository): Promise<Tables["glpi_users"] | null> {
    const user = {
      id: Date.now(),
      name,
      password: passwordHash,
    } as Tables["glpi_users"];

    this.items.push(user);
    return user;
  }

  async findByName(
    name: string
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }> {
    const user = this.items.find((item: Pick<Tables["glpi_users"], "id" | "name">) => item.name === name);

    if (!user) return { user: null };

    return { user };
  }

  list({
    search,
  }: listUsersRepository): Promise<{ users: Tables["glpi_users"][] }> {
    throw new Error("Method not implemented.");
  }
}
