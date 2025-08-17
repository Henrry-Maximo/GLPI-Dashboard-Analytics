import { signInExternalRequest } from "@/http/services/signIn-external";

/** 
  @param credentialsConvertBase64 Função para receber nome e senha, convertendo 
  para base 64.
*/

export async function credentialsConvertBase64({
  name,
  password,
}: signInExternalRequest): Promise<string> {
  const encoded = Buffer.from(`${name}:${password}`).toString("base64");

  return `Basic ${encoded}`;
}
