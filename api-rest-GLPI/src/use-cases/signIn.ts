import { knex } from "@/database/knex-config";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

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
  const user = await knex("glpi_users")
    .select("name", "password", "id")
    .where("name", name)
    .andWhere("is_active", 1)
    .first();

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
