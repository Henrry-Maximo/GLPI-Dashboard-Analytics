import { InMemoryTicketsRepository } from "../repositories/in-memory/in-memory-tickets-repository";
import { describe, expect, it } from "vitest";
import { GetTicketsUseCase } from "./get-tickets";
import { WithoutTicketsRegistration } from "./errors/without-tickets-registration";

describe("Get Tickets Use Case", () => {
  it("Should be able get list tickets", async () => {
    const ticketsRepository = new InMemoryTicketsRepository();
    const sut = new GetTicketsUseCase(ticketsRepository);

    // cria chamado em memória
    await ticketsRepository.create({
      entities_id: 1,
      name: "Permissão de Acesso: Painel GLPI",
      content: "Preciso de acesso para efetuar...",
      users_id_recipient: 1,
      requesttypes_id: 1,
      urgency: 4,
      itilcategories_id: 66,
      locations_id: 16,
    });

    await ticketsRepository.create({
      entities_id: 1,
      name: "Alteração de senha: Microsoft Teams",
      content: "Preciso trocar minha senha para...",
      users_id_recipient: 1,
      requesttypes_id: 1,
      urgency: 2,
      itilcategories_id: 24,
      locations_id: 16,
    });

    // busca por todos os usuários
    const { tickets } = await sut.execute({
      page: 1,
    });

    expect(Array.isArray(tickets)).toBe(true);
    expect(tickets).toHaveLength(2);
  });

  it("Should be able to return tickets list empty", async () => {
    const ticketsRepository = new InMemoryTicketsRepository();
    const sut = new GetTicketsUseCase(ticketsRepository);

    await expect(() =>
      sut.execute({
        page: 1,
      })
    ).rejects.toBeInstanceOf(WithoutTicketsRegistration);
  });
});
