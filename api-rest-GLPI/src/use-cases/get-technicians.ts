import { TechniciansRepository } from "@/repositories/technicians-repository";

export interface TechniciansRequestSchema {
  id?: number;
  name?: string;
}

interface TechniciansResponseSchema {
  meta: {
    total: number;
  };
  result: {
    id: number;
    name: string;
    amount_tickets: number;
    service: number;
    urgency: {
      very_high: number;
      high: number;
      average: number;
      low: number;
      very_low: number;
    };
    date_creation: string;
  }[];
}

export class GetTechniciansUseCase {
  constructor(private techniciansRepository: TechniciansRepository) {
    this.techniciansRepository = techniciansRepository;
  }

  async execute(
    props: TechniciansRequestSchema
  ): Promise<TechniciansResponseSchema> {
    const { meta, result } = await this.techniciansRepository.get(props);

    return { meta, result };
  }
}
