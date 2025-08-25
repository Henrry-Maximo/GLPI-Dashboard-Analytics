export interface CategoriesTicketsSchema {
  meta: {
    total: number;
    in_use: number;
    unused: number;
  }
  result: [
    {
      id: number;
      name: string;
      type: number;
      amount_tickets: number;
      author: string;
      date_creation: string;
    }
  ]
}

export interface CategoriesRepository {
  get(): Promise<CategoriesTicketsSchema>
}
