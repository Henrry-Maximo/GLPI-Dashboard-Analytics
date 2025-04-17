import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";

import { env } from "./env";
import { ZodError } from "zod";

import { routes } from "./http/routes";

export const app = fastify({
  logger: true, // log nativo do Fastify
});


app.register(fastifyCors, {
  origin: "*", // qualquer endereço pode solicitar a api
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET, // gerar JWT baseando-se no segredo 
});

app.register(fastifyCookie);

app.register(routes, {
  prefix: "/api" // disponibilizando função de rotas com prefixo: ip/api/endpoint
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error.",
      issues: error.format(),
    });
  }
  /*
  Função `setErrorHandler` utilizada para evidênciar
  erros em toda a aplicação
    - Tratar erros de validação retornados pelo tipo `ZodError`
    - Retorna erro genérico (500) para outros tipos de erros
  */

  // * Registrar erros em ambiente de prod
  // if (env.NODE_ENV === "production") {
  // Tarefa: rastreamento de erro
  // }

  return reply.status(500).send({ message: "Internal Server Error." });
});
