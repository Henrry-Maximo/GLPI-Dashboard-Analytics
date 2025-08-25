export interface CategoriesTicketsSchema {
  meta: {
    total: number;
    in_use: number;
    unused: number;
  },
  result: [
    {
      id: number;
      name: string;
      amount_tickets: number;
      date_creation: string;
    }
  ]
}

export interface CategoriesRepository {
  get(): Promise<CategoriesTicketsSchema | null>
}
