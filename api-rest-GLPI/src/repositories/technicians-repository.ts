export interface TechniciansRequestSchema {
  id?: number;
  name?: string;
}

export interface TechniciansResponseSchema {
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

export interface TechniciansRepository {
  get(props: TechniciansRequestSchema): Promise<TechniciansResponseSchema>;
}
