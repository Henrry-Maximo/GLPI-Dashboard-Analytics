import { knex } from "@/database/knex-config";
import { env } from "@/env";
import { InvalidCreatialsError } from "@/http/controllers/errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

interface authenticateUseCaseRequest {
  name: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  token: string,
}

export async function authenticate({
  name,
  password,
}: authenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
  const [user] = await knex("glpi_users")
    .select("name", "password", "id")
    .where("name", name);

  if (!user) {
    throw new InvalidCreatialsError();
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new InvalidCreatialsError();
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  return { token };
}
