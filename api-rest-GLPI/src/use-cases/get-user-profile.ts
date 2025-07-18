import { UsersRepository } from "@/repositories/users-repository";
import { Tables } from "knex/types/tables";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  userId: Pick<Tables["glpi_users"], "id">;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    // auth
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user && user;
  }
}
