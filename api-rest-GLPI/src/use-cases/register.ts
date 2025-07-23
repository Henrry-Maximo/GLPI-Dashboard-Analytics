import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";
import { Tables } from "knex/types/tables";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

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
  }: RegisterUseCaseRequest): Promise<{ user: Tables["glpi_users"] | null }> {
    const { user: isUserAlreadyExists } = await this.usersRepository.findByName(
      name,
    );

    if (isUserAlreadyExists) {
      throw new InvalidCredentialsError();
    }

    const randomSalt = randomInt(6, 10);
    const passwordHash = await hash(password, randomSalt);

    const { user } = await this.usersRepository.create({ name, passwordHash });

    return { user };
  }
}
