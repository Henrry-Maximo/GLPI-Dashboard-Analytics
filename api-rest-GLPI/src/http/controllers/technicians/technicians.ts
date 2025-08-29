import { makeGetTechniciansUseCase } from "@/use-cases/factories/make-get-technicians-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function technicians(req: FastifyRequest, reply: FastifyReply) {
  const techniciansParamsSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
  });

  const { id, name } = techniciansParamsSchema.parse(req.query);

  try {
    const techniciansUseCase = makeGetTechniciansUseCase();

    const data = await techniciansUseCase.execute({ id, name });

    return reply.status(200).send(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
