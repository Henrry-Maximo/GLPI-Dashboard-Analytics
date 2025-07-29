import { KnexStatsRepository } from "@/repositories/knex/knex-stats-repository";
import { GetStatsUseCase } from "../get-users-stats";
// import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

export function makeGetStatsUseCase() {
  const knexStatsRepository = new KnexStatsRepository();
  const statsUseCase = new GetStatsUseCase(knexStatsRepository);

  return statsUseCase;
}
