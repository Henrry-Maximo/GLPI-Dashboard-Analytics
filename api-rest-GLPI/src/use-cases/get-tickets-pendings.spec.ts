import { InMemoryTicketsRepository } from "../repositories/in-memory/in-memory-tickets-repository";
import { describe, expect, it } from "vitest";
import { GeTicketsPendingUseCase } from "./get-tickets-pendings";

describe("Get Tickets Pendings Use Case", () => {
  it("Should be able get list tickets pendings", async () => {
    const ticketsRepository = new InMemoryTicketsRepository();
    const sut = new GeTicketsPendingUseCase(ticketsRepository);
    
    const data = await sut.execute();

    expect(typeof data).toBe("object");
    expect(data.result.list).toHaveLength(1);
  });

  it.skip("Should be able to return tickets pendings list empty", async () => {});
});
