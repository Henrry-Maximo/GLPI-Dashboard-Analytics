import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUsersUseCase } from "@/use-cases/factories/make-get-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function users(req: FastifyRequest, reply: FastifyReply) {
  const usersParamsSchema = z.object({
    id: z.coerce.number().optional(),
  });

  const usersQuerySchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
    isActive: z
      .string()
      .transform((val) => {
        if (val === "true") return 1;
        if (val === "false") return 0;
        return undefined;
      })
      .optional(),
    page: z.coerce.number().min(1).default(1),
    item: z.coerce.number().min(10).max(50).default(10),
  });

  const { id } = usersParamsSchema.parse(req.params);
  const { name, isActive, page, item } = usersQuerySchema.parse(req.query);

  try {
    const usersUseCase = makeGetUsersUseCase();
    const users = await usersUseCase.execute({ id, name, isActive, page, item });

    return reply.status(200).send({ users });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
