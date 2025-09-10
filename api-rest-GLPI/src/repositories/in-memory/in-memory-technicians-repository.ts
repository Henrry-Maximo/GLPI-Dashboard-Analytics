import {
  TechniciansRepository,
  TechniciansRequestSchema,
  TechniciansResponseSchema,
} from "../technicians-repository";

export class InMemoryTechnicians implements TechniciansRepository {
  public items: TechniciansResponseSchema = {
    meta: {
      total: 10,
    },
    result: [
      {
        id: 1,
        name: "Técnico 1",
        amount_tickets: 1,
        service: 1,
        urgency: {
          very_high: 0,
          high: 0,
          average: 0,
          low: 0,
          very_low: 1,
        },
        date_creation: "2023-01-01T00:00:00.000Z",
      },
    ],
  };

  async get(
    props: TechniciansRequestSchema
  ): Promise<TechniciansResponseSchema> {
    const { meta, result } = this.items;

    return { meta, result };
  }
}
