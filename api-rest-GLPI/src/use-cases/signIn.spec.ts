import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { SignInUseCase } from "./signIn";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UserNotAuthorization } from "./errors/user-not-authorization-error";
import { HttpExternalAuthService } from "../http/services/glpi-api/signIn-external";

describe("Sign In Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authUser = new HttpExternalAuthService();
    const sut = new SignInUseCase(usersRepository, authUser);

    // cria o usuário em memória
    await usersRepository.create({
      name: "Joe",
      passwordHash: await hash("123456", 6),
    });

    // busca usuário criado
    const { user } = await sut.execute({ name: "Joe", password: "123456" });

    expect(user.id).toEqual(expect.any(Number));
    expect(user.name).toBe("Joe");
  });

  it("should not be able to authenticate with wrong username", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authUser = new HttpExternalAuthService();
    const sut = new SignInUseCase(usersRepository, authUser);

    await expect(() =>
      sut.execute({
        name: "Joe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authUser = new HttpExternalAuthService();
    const sut = new SignInUseCase(usersRepository, authUser);

    // cria o usuário em memória
    await usersRepository.create({
      name: "Joe",
      passwordHash: await hash("123456", 6),
    });

    // espera que o usuário tenha inserido a senha erroneamente
    await expect(() =>
      sut.execute({
        name: "Joe",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate if user not is active", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authUser = new HttpExternalAuthService();
    const sut = new SignInUseCase(usersRepository, authUser);

    await usersRepository.create({
      name: "Joe",
      passwordHash: await hash("123456", 6),
      is_active: 0,
    });

    await expect(() =>
      sut.execute({
        name: "Joe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserNotAuthorization);
  });

  it.skip("should be able to authenticate if password is empty, searching in API", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authUser = new HttpExternalAuthService();
    const sut = new SignInUseCase(usersRepository, authUser);

    await usersRepository.create({
      name: "Henrique.Maximo",
      passwordHash: await hash("", 6),
    });

    await expect(
      sut.execute({
        name: "",
        password: "",
      })
    ).resolves.toEqual({
      user: { id: expect.any(Number), name: "Henrique.Maximo" },
    });
  });
});
