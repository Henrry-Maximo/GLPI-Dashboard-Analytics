import { InMemoryTechnicians } from "../repositories/in-memory/in-memory-technicians-repository";
import { describe, expect, it } from "vitest";
import { GetTechniciansUseCase } from "./get-technicians";

describe("Get Technicians Use Case", () => {
  it("Should be able to get technicians list", async () => {
    const techniciansRepository = new InMemoryTechnicians();
    const sut = new GetTechniciansUseCase(techniciansRepository);

    const { meta, result } = await sut.execute({});

    expect(meta).toEqual(
      expect.objectContaining({ 
        total: expect.any(Number),
      })
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          amount_tickets: expect.any(Number),
          service: expect.any(Number),
          urgency: expect.objectContaining({
            very_high: expect.any(Number),
            high: expect.any(Number),
            average: expect.any(Number),
            low: expect.any(Number),
            very_low: expect.any(Number),
          }),
          date_creation: expect.any(String)
        })
      ])
    );
  })
})