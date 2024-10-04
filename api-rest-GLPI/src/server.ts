import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0",
    port: env.NODE_PORT,
  })
  .then(() => {
    console.log(
      `🚀 Server Running, port: ${env.NODE_PORT}, status: ${env.NODE_ENV}`,
    );
  });
