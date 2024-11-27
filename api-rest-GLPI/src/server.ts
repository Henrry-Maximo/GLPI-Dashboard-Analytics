import { app } from "./app";
import { env } from "./env";

// port: 5000
// mode: dev

app
  .listen({
    port: env.NODE_PORT,
  })
  .then(() => {
    console.log(
      `🚀 Server Running, port: ${env.NODE_PORT}, status: ${env.NODE_ENV}`
    );
  });
