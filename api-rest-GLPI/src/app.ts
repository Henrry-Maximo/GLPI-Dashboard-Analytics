import fastifyCors from "@fastify/cors";
import fastify from "fastify";

import { ZodError } from "zod";
import { env } from "./env";
import { routes } from "./http/routes";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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
      issues: error.format(), // detalhes da validação
    });
  }

  // * Registrar erros em ambiente de prod
  if (env.NODE_ENV === "production") {
    // Tarefa: rastreamento de erro
  }

  console.log(error);
  return reply.status(500).send({ message: "Internal Server Error." });
});
