import { app } from "./app";
import { env } from "./env";

// utilizando try {} catch(err) {} para inicializar o servidor
// try {
//   // await app.listen({ port: env.NODE_PORT })
//   // console.log("Server Running")
// } catch (err) {
//   // console.error();
//   app.log.error(`Server with Error: ${err}`);
//   process.exit(1); // encerra o servidor
// }

// utilizando promises encadeadas para inicializar o servidor
app
  .listen({
    host: '0.0.0.0',
    port: env.NODE_PORT,
  }) // objeto de configuração do servidor
  .then(() => {
    console.log(
      `🚀 Server Running, port: ${env.NODE_PORT}, status: ${env.NODE_ENV}`
    ); // resposta de solicitação bem-sucedida
  }).catch((err) => {
    console.error(`❌ Server with Error: ${err}`);
    process.exit(1); // encerra o servidor
  });
