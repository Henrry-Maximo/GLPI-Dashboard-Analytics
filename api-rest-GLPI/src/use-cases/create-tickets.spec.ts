import { InMemoryTicketsRepository } from "../repositories/in-memory/in-memory-tickets-repository";
import { describe, expect, it, test } from "vitest";
import { RegisterTicketsUseCase } from "./create-tickets";
import { ServerInternalError } from "./errors/server-internal-error";

describe("Create Ticket Use Case", () => {
  it("Should be able to register", async () => {
    const ticketsRepository = new InMemoryTicketsRepository();
    const sut = new RegisterTicketsUseCase(ticketsRepository);

    const ticket = await sut.execute({
      id: 1,
      entities_id: 1,
      name: "Ticket 1",
      content: "Content 1",
      users_id_recipient: 1,
      requesttypes_id: 1,
      urgency: 1,
      itilcategories_id: 1,
      locations_id: 1,
    });

    expect(ticket.id).toEqual(expect.any(Number));
    expect(ticket.name).toBe("Ticket 1");
  });

  it("Should not register ticket if repository create fails", async () => {
    const ticketsRepository = new InMemoryTicketsRepository();
    const sut = new RegisterTicketsUseCase(ticketsRepository);

    // sobrescreve o método para retornar erro
    ticketsRepository.create = async () => {
      throw new ServerInternalError();
    };

    // executa o cadastro, mas dá erro por causa do create
    await expect(
      sut.execute({
        id: 1,
        entities_id: 1,
        name: "Ticket 1",
        content: "Content 1",
        users_id_recipient: 1,
        requesttypes_id: 1,
        urgency: 1,
        itilcategories_id: 1,
        locations_id: 1,
      })
    ).rejects.toBeInstanceOf(ServerInternalError);
  });
});
