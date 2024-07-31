import { app } from "./app";

app
  .listen({
    host: "10.10.2.93",
    port: 3339,
  })
  .then(() => {
    console.log(`HTTP Server Running`);
  });
