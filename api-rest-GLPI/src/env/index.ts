import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  NODE_PORT: z.coerce.number().default(5000),
  NODE_CORS: z.coerce.string().default("*"),
  NODE_LOGS: z.coerce.boolean().default(false),

  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number().optional(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.coerce.string().default("7d"),

  API_EXTERNAL: z.string().optional(),
  APP_TOKEN: z.coerce.string().optional(),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
