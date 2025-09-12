import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";
import { ZodError } from "zod";

import { env } from "./env";
import { appRoutes } from "./http/routes";
import { ErrorServerHandler } from "./use-cases/utils/error-server-handler";

/**
 * Configuração da aplicação Fastify
 */
export const app = fastify({
  logger: env.NODE_LOGS, // habilitar logs do servidor
});

/**
 * Registro de plugins
 */
app.register(fastifyCors, {
  origin: env.NODE_CORS, // sem restrição de solicitação de endereço
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET, // gerar JWT baseando-se no segredo
});

app.register(fastifyCookie);

app.register(appRoutes, {
  prefix: "/api", // rotas com prefixo: /api/endpoint
});

/*
 * Handler global de erros
 * - Trata erros de validação (ZodError)
 * - Retorna erro genérico para outros tipos
 */
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Todo: rastreamento de erros na produção
    new ErrorServerHandler(error).execute();
  }

  return reply.status(500).send({ message: "Internal Server Error." });
});
