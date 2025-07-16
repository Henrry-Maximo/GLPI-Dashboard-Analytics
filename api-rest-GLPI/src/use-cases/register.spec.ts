import { KnexUsersRepository } from "../repositories/knex/knex-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new KnexUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "teste.registro20012",
      password: await hash("123456", 6)
    });

    if (user !== null) {
      expect(user.id).toEqual(expect.any(Number));
    } 
  })
})