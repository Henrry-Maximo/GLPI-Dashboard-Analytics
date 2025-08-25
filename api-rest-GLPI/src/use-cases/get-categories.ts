import { CategoriesRepository } from "@/repositories/categories-repository";

export class GetCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const data = await this.categoriesRepository.get();

    return data;
  }
}