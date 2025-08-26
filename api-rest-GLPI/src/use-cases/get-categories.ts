import { CategoriesRepository } from "@/repositories/categories-repository";

export interface FiltersCategoriesSchema {
  start_date?: Date;
  end_date?: Date;
}

export class GetCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(props: FiltersCategoriesSchema) {
    const data = await this.categoriesRepository.get(props);

    return data;
  }
}