import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";

import { env } from "./env";
import { ZodError } from "zod";

import { routes } from "./http/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCookie);

app.register(routes, {
  prefix: "api-glpi",
});

/*
  Função `setErrorHandler` utilizada para evidênciar
  erros em toda a aplicação
    - Tratar erros de validação retornados pelo tipo `ZodError`
    - Retorna erro genérico (500) para outros tipos de erros
*/

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error.",
      issues: error.format(),
    });
  }

  // * Registrar erros em ambiente de prod
  // if (env.NODE_ENV === "production") {
  // Tarefa: rastreamento de erro
  // }

  return reply.status(500).send({ message: "Internal Server Error." });
});
