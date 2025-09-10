import { UsersRepository } from "@/repositories/users-repository";
import { Tables } from "knex/types/tables";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface listUsersFiltersUseCase {
  id?: number;
  name?: string;
  isActive?: number;
  offset: number;
  limit: number;
}

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(filters: listUsersFiltersUseCase): Promise<{
    users: Tables["glpi_users"][];
    pagination: Record<string, number>;
  }> {
    const { users, pagination } = await this.usersRepository.list(filters);

    if (!users.length) {
      throw new ResourceNotFoundError();
    }

    return { users, pagination };
  }
}
