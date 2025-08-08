import { signInExternalRequest } from "@/http/services/signIn-external";

export async function credentialsConvertBase64({
  name,
  password,
}: signInExternalRequest): Promise<string> {
  const encoded = Buffer.from(`${name}:${password}`).toString("base64");

  return `Basic ${encoded}`;
}
