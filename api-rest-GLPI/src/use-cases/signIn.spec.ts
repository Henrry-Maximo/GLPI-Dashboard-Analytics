import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it, vi } from "vitest";
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

  it("should authenticate via API when user has no password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authService = {
      authenticate: vi.fn().mockResolvedValue({ session_token: "valid-token" })
    };
    const sut = new SignInUseCase(usersRepository, authService);

    await usersRepository.create({
      name: "john.doe",
      passwordHash: "", // Sem senha força autenticação via API
    });

    const result = await sut.execute({
      name: "john.doe",
      password: "senha-glpi",
    });

    expect(authService.authenticate).toHaveBeenCalledWith({
      name: "john.doe",
      password: "senha-glpi"
    });
    expect(result.user.name).toBe("john.doe");
  });

  it("should throw error when API returns no token", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authService = {
      authenticate: vi.fn().mockResolvedValue({ session_token: null })
    };
    const sut = new SignInUseCase(usersRepository, authService);

    await usersRepository.create({
      name: "john.doe",
      passwordHash: "",
    });

    await expect(() =>
      sut.execute({
        name: "john.doe",
        password: "senha-errada",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
