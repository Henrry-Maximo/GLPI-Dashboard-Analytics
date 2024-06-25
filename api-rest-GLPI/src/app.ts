import fastify from "fastify";

import { routes } from './routes/routes'

export const app = fastify();

app.register(routes, {
  prefix: "api-glpi"
})


// import fastify from 'fastify'
// import cookie from '@fastify/cookie'

// import { routes } from './routes/routes'

// export const app = fastify()

// app.register(cookie)

// app.register(routes, {
//   prefix: 'daily-diet',
// })