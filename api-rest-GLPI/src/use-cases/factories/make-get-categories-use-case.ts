import { KnexCategoriesRepository } from "@/repositories/knex/knex-categories-repository";
import { GetCategoriesUseCase } from "../get-categories";

export function makeGetCategoriesUseCase() {
  const knexCategoriesRepository = new KnexCategoriesRepository();
  const categoriesUseCase = new GetCategoriesUseCase(knexCategoriesRepository);

  return categoriesUseCase;
}
