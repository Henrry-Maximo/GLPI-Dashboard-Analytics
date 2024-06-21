import { app } from "./app";

app
  .listen({
    port: 3339,
  })
  .then(() => {
    console.log(`HTTP Server Running`);
  });
