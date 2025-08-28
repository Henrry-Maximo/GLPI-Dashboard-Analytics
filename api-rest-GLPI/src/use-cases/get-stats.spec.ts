import { InMemoryStatsRepository } from "../repositories/in-memory/in-memory-stats-repository";
import { describe, expect, it, test } from "vitest";
import { GetStatsUseCase } from "./get-stats";

describe("Get Stats Use Case", () => {
  it("Should be able get list stats", async () => {
    const statsRepository = new InMemoryStatsRepository();
    const sut = new GetStatsUseCase(statsRepository);

    const { meta, result } = await sut.execute();

    expect(meta).toEqual(
      expect.objectContaining({ 
        totalUsers: expect.any(Number),
        totalUsersActive: expect.any(Number),
        totalUsersInactive: expect.any(Number),
        totalUsersAdmins: expect.any(Number),
        totalUsersTickets: expect.any(Number),
      })
    );

   expect(result).toEqual(
      expect.objectContaining({
        usersByProfile: expect.any(Array),
        usersByLocation: expect.any(Array),
        usersByTickets: expect.any(Array),
      })
    );

  });
});
