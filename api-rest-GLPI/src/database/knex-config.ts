import type { Knex } from "knex";

import { knex as setupKnex } from "knex";
import { env } from "../env";

// Configuração básica
export const config: Knex.Config = {
  client: "mysql",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
  useNullAsDefault: true,
};

// Instância do Knex
export const knex = setupKnex(config);

// Testar a conexão
export async function testConnection() {
  try {
    await knex.raw("SELECT 1");
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

testConnection().catch(() => process.exit(1));
