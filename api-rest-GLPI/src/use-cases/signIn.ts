import { compare } from "bcryptjs";

import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";
import { Tables } from "knex/types/tables";
import { UsersRepository } from "@/repositories/users-repository";

interface SignInUseCaseRequest {
  name: string;
  password: string;
}

interface SignInUseCaseResponse {
  user: Pick<Tables["glpi_users"], "id" | "name">;
}

export class SignInUseCase {
  constructor (private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute ({ name, password }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const { user } = await this.usersRepository.signIn(name);

    if (!user) {
      throw new InvalidCredentialsError
    }

    const doesPasswordMatche = await compare(password, user.password);

    if (!doesPasswordMatche) {
      throw new InvalidCredentialsError();
    }

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }
}
