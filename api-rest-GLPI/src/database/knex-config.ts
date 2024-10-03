import { knex as setupKnex } from "knex";
import { env } from "../env";

export const config = {
  client: "mysql",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
  useNullAsDefault: true,
};

export const knex = setupKnex(config);
