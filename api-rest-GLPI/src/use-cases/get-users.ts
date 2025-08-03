import { Tables } from "knex/types/tables";
import { WithoutUsersRegistration } from "./errors/without-users-registration";
import { UsersRepository } from "@/repositories/users-repository";

interface listUsersFiltersUseCase {
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
    filters: listUsersFiltersUseCase
  ): Promise<Tables["glpi_users"][]> {
    const { users } = await this.usersRepository.list(filters);

    if (!users) {
      throw new WithoutUsersRegistration();
    }

    return users;
  }
}
