import fastify from "fastify";
// import cookie from '@fastify/cookie'

import { routes } from './routes/routes'

export const app = fastify();

app.register(routes, {
  prefix: "api-glpi"
})