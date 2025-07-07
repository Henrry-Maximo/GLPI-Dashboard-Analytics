import { knex as setupKnex, type Knex } from "knex";
import { env } from "../env";

// Configuração básica
export const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    port: env.DB_PORT,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
  useNullAsDefault: true,
};

// Instância do Knex
export const knex = setupKnex(config);

// Testar a conexão
export async function testConnectionDatabase() {
  try {
    await knex.raw("SELECT 1");
    console.log("Connection with the database successful.");
  } catch (error) {
    console.error("Error connection with the database:", error);
    throw error;
  }
}

testConnectionDatabase().catch(() => process.exit(1));
