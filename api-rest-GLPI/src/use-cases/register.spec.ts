// import { KnexUsersRepository } from "../repositories/knex/knex-users-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-repository";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "teste.registro20012",
      password: "123456",
    });

    console.log(user);

    if (user !== null) {
      expect(user.id).toEqual(expect.any(Number));
    } 
  });
});