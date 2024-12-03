import { knex } from "@/database/knex-config";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

interface authenticateUseCaseRequest {
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
}: authenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
  const [user] = await knex("glpi_users")
    .select("name", "password", "id")
    .where("name", name);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordMatch = await compare(password, user.password);
  
  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  return { user };
}
