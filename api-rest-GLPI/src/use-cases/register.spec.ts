import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "Joe.doe",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(Number));
    expect(user.name).toBe("Joe.doe");
  });

  it("should not be able to register with same name twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    await sut.execute({ name: "Joe.doe", password: "123456" });

    await expect(() =>
      sut.execute({ name: "Joe.doe", password: "123456" }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
