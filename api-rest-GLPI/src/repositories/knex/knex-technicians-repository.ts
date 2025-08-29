import { TechniciansRepository, TechniciansRequestSchema, TechniciansResponseSchema } from "../technicians-repository";

export class KnexTechniciansRepository implements TechniciansRepository {
  get(props: TechniciansRequestSchema): TechniciansResponseSchema {
    throw new Error("Method not implemented.");
  }
}