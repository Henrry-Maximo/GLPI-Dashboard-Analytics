import { beforeEach, describe, expect, it } from "vitest";

import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const { user } = await usersRepository.create({
      name: "John.doe",
      passwordHash: await hash("123456", 6),
    });

    const data = await sut.execute({
      userId: String(user.id),
    });

    expect(data.user.id).toEqual(expect.any(Number));
    expect(data.user.name).toEqual("John.doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "1",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
