import { app } from "./app";
import { env } from "./env";

/**
 * Inicialização do servidor usando promises encadeadas
 * Configuração: host 0.0.0.0 para aceitar conexões externas
 */
app
  .listen({
    host: "0.0.0.0",
    port: env.NODE_PORT,
  }) // objeto de configuração do servidor
  .then(() => {
    console.log(
      `🚀 Server Running, port: ${env.NODE_PORT}, status: ${env.NODE_ENV}`
    ); // resposta de solicitação bem-sucedida
  }) // promises que será executada se correr tudo bem
  .catch((err) => {
    console.error(`❌ Server with Error: ${err.message}`);
    process.exit(1); // encerra o servidor
  });

/**
 * Inicialização do servidor usando bloco try {} catch () {}
 *
 * try {
 *  await app.listen({ port: env.NODE_PORT });
 *  console.log("Server Running");
 * } catch (err) {
 * // console.error();
 *  app.log.error(`Server with Error: ${err}`);
 *  process.exit(1); // Encerrar o servidor
 * }
 */

