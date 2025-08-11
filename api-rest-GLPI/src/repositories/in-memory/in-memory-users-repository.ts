import { Tables } from "knex/types/tables";
import type {
  createUsersRepository,
  listUsersFilters,
  UsersRepository,
} from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public items: any = [];

  async signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = this.items.find((item: any) => item.name === name);

    return { user };
  }

  async create({ name, passwordHash }: createUsersRepository) {
    const user = {
      id: 1,
      name,
      password: passwordHash,
    } as Tables["glpi_users"];

    this.items.push(user);

    return { user };
  }

  async findById(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = this.items.find((item: any) => item.id === Number(userId));

    if (!user) {
      return null;
    };

    return user;
  }

  async findByName(
    name: string,
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }> {
    const user = this.items.find(
      (item: Pick<Tables["glpi_users"], "id" | "name">) => item.name === name,
    );

    if (!user) return { user: null };

    return { user };
  }

  async list(_filters: listUsersFilters): Promise<{ users: Tables["glpi_users"][] }> {
    throw new Error("Method not implemented.");
  }
}
