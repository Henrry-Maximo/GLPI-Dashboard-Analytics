import { UsersRepository } from "@/repositories/users-repository";
import { Tables } from "knex/types/tables";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface listUsersFiltersUseCase {
  id?: number;
  name?: string;
  isActive?: number;
  page: number;
  item: number;
}

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    filters: listUsersFiltersUseCase,
  ): Promise<Tables["glpi_users"][]> {
    const { users } = await this.usersRepository.list(filters);

    if (!users.length) {
      throw new ResourceNotFoundError();
    }

    return users;
  }
}
