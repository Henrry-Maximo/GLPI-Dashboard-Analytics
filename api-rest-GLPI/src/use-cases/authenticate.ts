import { knex } from "@/database/knex-config";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

interface AuthenticateUseCaseRequest {
  name: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: {
    id: string;
    name: string;
    password: string;
  };
}

export async function authenticate({
  name,
  password,
}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
  const [user] = await knex("glpi_users")
    .select("name", "password", "id")
    .where("name", name).andWhere('is_active', 1);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const doesPasswordMatche = await compare(password, user.password);
  
  if (!doesPasswordMatche) {
    throw new InvalidCredentialsError();
  }

  return { user };
}
