import { InMemoryCategoriesRepository } from "../repositories/in-memory/in-memory-categories-repository";
import { describe, expect, it } from "vitest";
import { GetCategoriesUseCase } from "./get-categories";

describe("Get Categories Use Case", () => {
  it("Should be able get categories", async () => {
    const statsRepository = new InMemoryCategoriesRepository();
    const sut = new GetCategoriesUseCase(statsRepository);

    const { meta, result } = await sut.execute({
      start_date: new Date(),
      end_date: new Date(),
    });

    expect(meta).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        in_use: expect.any(Number),
        unused: expect.any(Number),
      })
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          date_creation: expect.any(String),
          total: expect.any(Number),
        }),
      ])
    );
  });
});
