import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it, test } from "vitest";
import { GetUsersUseCase } from "./get-users";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("Get Users Use Case", () => {
  it("Should be able get list users", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new GetUsersUseCase(usersRepository);

    // cria usuário em memória
    await usersRepository.create({
      name: "Henrique",
      passwordHash: await hash("123456", 6),
      is_active: 1,
    });

    // busca por todos os usuários
    const { users, pagination } = await sut.execute({
      item: 10,
      page: 1
    });

    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(1);
    expect(pagination.page).toBe(0);
    expect(pagination.item).toBe(10);
  });

  it("Should be able to return users list empty", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new GetUsersUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        page: 1,
        item: 10,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
