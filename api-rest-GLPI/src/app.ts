import fastify from "fastify";

import { routes } from './routes/routes'

export const app = fastify();

app.register(routes, {
  prefix: "api-glpi"
})