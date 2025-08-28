import { TechniciansRepository } from "@/repositories/technicians-repository";

export interface TechniciansRequestSchema {
  id?: number;
  name?: string;
}

interface TechniciansResponseSchema {
  meta: {
    total: number,
  },
  result: {
    id: number,
    name: string,
    amount_tickets: number,
    service: number,
    urgency: {
      very_high: number,
      high: number,
      average: number,
      low: number,
      very_low: number,
    },
    date_creation: string
  }[]
}

export class GetTechniciansUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {
    this.techniciansRepository = techniciansRepository;
  }

  execute(props: TechniciansRequestSchema): TechniciansResponseSchema {
    return {
      meta: {
        total: 3
      },
      result: [
        {
          id: 1,
          name: "Henrique.maximo",
          amount_tickets: 270,
          service: 370,
          urgency: {
            very_high: 33,
            high: 24,
            average: 16,
            low: 42,
            very_low: 120,
          },
          date_creation: "20/08/2003"
        },
        {
          id: 2,
          name: "Joe.doe",
          amount_tickets: 272,
          service: 373,
          urgency: {
            very_high: 32,
            high: 22,
            average: 10,
            low: 32,
            very_low: 230,
          },
          date_creation: "10/02/2020"
        }
      ]
    }
  }
}