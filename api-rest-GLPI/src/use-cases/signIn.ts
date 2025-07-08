import { knex } from "@/database/knex-config";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { KnexUsersRepository } from "@/repositories/knex-users-repository";

interface signInUseCaseRequest {
  name: string;
  password: string;
}

interface signInUseCaseResponse {
  user: {
    id: string;
    name: string;
  };
}

export const signInUseCase = async ({
  name,
  password,
}: signInUseCaseRequest): Promise<signInUseCaseResponse> => {
  const knexUsersRepository = new KnexUsersRepository();

  const { user } = await knexUsersRepository.signIn(name);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const doesPasswordMatche = await compare(password, user.password);

  if (!doesPasswordMatche) {
    throw new InvalidCredentialsError();
  }

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword };
};
