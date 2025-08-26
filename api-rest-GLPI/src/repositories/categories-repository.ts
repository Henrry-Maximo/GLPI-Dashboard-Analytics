export interface CategoriesTicketsSchema {
  meta: {
    total: number;
    in_use: number;
    unused: number;
  };
  result: Array<{
    id: number;
    name: string;
    amount_tickets: number;
    date_creation: string;
  }>;
}

export interface FiltersCategoriesSchema {
  start_date?: Date;
  end_date?: Date;
}

export interface CategoriesRepository {
  get(props: FiltersCategoriesSchema): Promise<CategoriesTicketsSchema>;
}
