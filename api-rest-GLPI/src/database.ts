import { knex as setupKnex } from 'knex'

export const config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glpi_database'
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
