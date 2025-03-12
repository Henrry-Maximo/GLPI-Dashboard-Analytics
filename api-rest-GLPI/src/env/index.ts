import 'dotenv/config'
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  NODE_PORT: z.coerce.number().default(5000),

  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number().optional(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
