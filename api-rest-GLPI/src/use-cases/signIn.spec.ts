import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it, test } from "vitest";
import { SignInUseCase } from "./signIn";
import { hash } from "bcryptjs";
import { randomInt } from "node:crypto";

describe("Sign In Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new SignInUseCase(usersRepository);

    // gera o hash da senha
    const randomSalt = randomInt(6, 10);
    const passwordHash = await hash("123456", randomSalt);

    // cria o usuário em memória
    await usersRepository.create({ name: "Joe", passwordHash });

    // busca usuário criado
    const { user } = await sut.execute({ name: "Joe", password: "123456" });

    expect(user.id).toEqual(expect.any(Number));
    expect(user.name).toBe("Joe");
  });

  test.skip("should not be able to authenticate with wrong email", async () => {
  });

  test.skip("should not be able to authenticate with wrong password", async () => {
  });
});
