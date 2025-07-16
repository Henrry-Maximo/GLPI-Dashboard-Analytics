import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { randomInt } from "crypto";
import { hash } from "bcryptjs";
import { Tables } from "knex/types/tables";
import { UsersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  password: string;
}

interface RegisteUseCaseResponse {
  user: Tables["glpi_users"];
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisteUseCaseResponse> {
    // const knexUsersRepository = new KnexUsersRepository();

    const { user: isUserAlreadyExists } = await this.usersRepository.findByName(
      name
    );

    if (isUserAlreadyExists) {
      throw new InvalidCredentialsError();
    }

    const randomSalt = randomInt(6, 10);
    const passwordHash = await hash(password, randomSalt);

    const user = await this.usersRepository.create({ name, passwordHash });

    return { user };
  }
}

// export async function registerUseCase({
//   name,
//   password,
// }: RegisterUseCaseRequest): Promise<RegisteUseCaseResponse> {

// }
