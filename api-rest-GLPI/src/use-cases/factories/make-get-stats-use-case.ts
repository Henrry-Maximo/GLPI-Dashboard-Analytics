import { KnexStatsRepository } from "@/repositories/knex/knex-stats-repository";
import { GetStatsUseCase } from "../get-stats";

export function makeGetStatsUseCase() {
  const knexStatsRepository = new KnexStatsRepository();
  const statsUseCase = new GetStatsUseCase(knexStatsRepository);

  return statsUseCase;
}
