import fastify from "fastify";

import { routes } from "./routes/routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(routes, {
  prefix: "api-glpi",
});
