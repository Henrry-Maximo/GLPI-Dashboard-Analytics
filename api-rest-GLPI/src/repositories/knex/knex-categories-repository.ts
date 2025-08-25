import { CategoriesRepository, CategoriesTicketsSchema } from "../categories-repository";

export class KnexCategoriesRepository implements CategoriesRepository {
  get(): Promise<CategoriesTicketsSchema> {
    throw new Error("Method not implemented.");
  }
}