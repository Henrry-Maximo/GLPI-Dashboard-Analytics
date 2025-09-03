import { Tables } from "knex/types/tables";
import type {
  CreateUsersBody,
  ListUsersQuery,
  UsersRepository,
} from "../users-repository";
import { randomInt } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public items: any = [];

  async signIn(name: string): Promise<{ user: Tables["glpi_users"] | null }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = this.items.find((item: any) => item.name === name);

    return { user: user || null };
  }

  async create(data: CreateUsersBody) {
    const { passwordHash, ...rest } = data;

    const user = {
      id: randomInt(6, 10),
      ...rest,
      password: passwordHash,
    } as Tables["glpi_users"];

    this.items.push(user);

    const serachUser = this.items.find((item: any) => item.name === user.name);

    return { user: serachUser };
  }

  async findById(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = this.items.find((item: any) => item.id === Number(userId));

    if (!user) {
      return null;
    }

    return user;
  }

  async findByName(
    name: string
  ): Promise<{ user: Pick<Tables["glpi_users"], "id" | "name"> | null }> {
    const user = this.items.find(
      (item: Pick<Tables["glpi_users"], "id" | "name">) => item.name === name
    );

    if (!user) return { user: null };

    return { user };
  }

  async list(
    filters: ListUsersQuery
  ): Promise<{ users: Tables["glpi_users"][], pagination: Record<string, number> }> {
    const { name, isActive, limit, offset} = filters;

    let result = [...this.items];

    if (name) {
      result = result.filter((user) => user.name === name);
    }

    if (isActive !== undefined) {
      result = result.filter((user) => user.isActive === isActive);
    }

    // ordenar por id
    result.sort((a, b) => a.id - b.id);

    // paginação manual
    // const offset = (page - 1) * item;
    // const paginated: Tables["glpi_users"][] = result.slice(offset, offset + item);
    // console.log(paginated);
    
    let pagination: Record<string, number> = { 
      "item": limit,
      "page": (offset - 1) * limit,
     }

    return { users: result, pagination };
  }
  }
