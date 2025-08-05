import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";
import { Tables } from "knex/types/tables";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    password,
  }: RegisterUseCaseRequest): Promise<{
    user: Pick<Tables["glpi_users"], "id" | "name" | "password">;
  }> {
    const { user: isUserAlreadyExists } = await this.usersRepository.findByName(
      name,
    );

    if (isUserAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const randomSalt = randomInt(6, 10);
    const passwordHash = await hash(password, randomSalt);

    const { user } = await this.usersRepository.create({ name, passwordHash });

    return { user };
  }
}
