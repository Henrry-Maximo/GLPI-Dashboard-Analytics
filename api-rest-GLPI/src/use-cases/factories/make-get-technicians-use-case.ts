import { KnexTechniciansRepository } from "@/repositories/knex/knex-technicians-repository";
import { GetTechniciansUseCase } from "../get-technicians";

export function makeGetTechniciansUseCase() { 
  const knexTechniciansRepository = new KnexTechniciansRepository();
  const techniciansUseCase = new GetTechniciansUseCase(knexTechniciansRepository);

  return techniciansUseCase;
}
