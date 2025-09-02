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
        date_creation: new Date().toISOString().split("T")[0],
        total: 100,
      },
      {
        id: 2,
        name: "Hardware",
        date_creation: new Date().toISOString().split("T")[0],
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

    const categoriesFiltered = this.items.result.filter(
      (item) => item.date_creation > startDate && item.date_creation < endDate
    );

    const total = categoriesFiltered.length;
    const totalInUse = categoriesFiltered.filter(
      (item) => item.total > 0
    ).length;
    const totalUnUsed = categoriesFiltered.filter(
      (item) => item.total === 0
    ).length;

    return {
      meta: {
        total,
        in_use: totalInUse,
        unused: totalUnUsed,
      },
      result: this.items.result,
    };
  }
}
