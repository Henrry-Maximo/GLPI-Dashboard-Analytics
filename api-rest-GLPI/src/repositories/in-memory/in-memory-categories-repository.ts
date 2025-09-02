import {
  CategoriesRepository,
  CategoriesTicketsSchema,
} from "../categories-repository";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: CategoriesTicketsSchema = {
    meta: {
      total: 103,
      in_use: 103,
      unused: 0,
    },
    result: [
      {
        id: 1,
        name: "Hardware",
        date_creation: Date(),
        total: 100,
      },
      {
        id: 2,
        name: "Hardware",
        date_creation: Date(),
        total: 100,
      },
    ],
  };

  async get(): Promise<CategoriesTicketsSchema> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    return {
      meta: {
        total: 103,
        in_use: 103,
        unused: 0,
      },
      result: [
        {
          id: 1,
          name: "Hardware",
          date_creation: Date(),
          total: 100,
        },
      ],
    };
  }
}
