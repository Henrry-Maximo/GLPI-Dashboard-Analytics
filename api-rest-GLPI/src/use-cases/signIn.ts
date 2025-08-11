import { compare } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { Tables } from "knex/types/tables";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UserNotAuthorization } from "./errors/user-not-authorization-error";
import { signInExternalService } from "../http/services/signIn-external";

interface SignInUseCaseRequest {
  name: string;
  password: string;
}

interface SignInUseCaseResponse {
  user: Pick<Tables["glpi_users"], "id" | "name">;
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const { user } = await this.usersRepository.signIn(name);

    // usuário deve existir
    if (user === null) {
      throw new InvalidCredentialsError();
    }

    // usuário deve estar ativo
    if (user.is_active === 0) {
      throw new UserNotAuthorization();
    }

    // utilizar API para autenticar (se não existir no banco)
    if (!user.password) {
      const { session_token } = await signInExternalService({ name, password });

      if (!session_token) {
        throw new InvalidCredentialsError();
      }

      return { user: { id: user.id, name: user.name } };
    }

    const doesPasswordMatche = await compare(password, user.password);

    if (!doesPasswordMatche) {
      throw new InvalidCredentialsError();
    }

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }
}
