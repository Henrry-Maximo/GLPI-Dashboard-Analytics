import { KnexUsersRepository } from "../repositories/knex/knex-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new KnexUsersRepository();

    const { id } = await usersRepository.create({
      name: "teste.registro05",
      passwordHash: await hash("123456", 6)
    })

    expect(id).toEqual(expect.any(String));
  })
})