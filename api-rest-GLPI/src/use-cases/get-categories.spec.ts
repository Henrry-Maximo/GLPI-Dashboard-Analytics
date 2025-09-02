import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { describe, expect, it } from "vitest";
import { GetCategoriesUseCase } from "./get-categories";

describe("Get Categories Use Case", () => {
  it.skip("Should be able get categories", async () => {
    const statsRepository = new InMemoryCategoriesRepository();
    const sut = new GetCategoriesUseCase(statsRepository);

    const { meta, result } = await sut.execute({
      start_date: new Date(),
      end_date: new Date(),
    });

    expect(meta).toEqual(
      expect.objectContaining({

      })
    );

    expect(result).toEqual(
      expect.objectContaining({

      })
    );
  });

  it.skip("Should be able to return categories list empty", async () => {});
});
