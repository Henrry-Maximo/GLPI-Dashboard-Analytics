/** 
  @param credentialsConvertBase64 Função para receber nome e senha, convertendo 
  para base 64.
*/

export interface propsAuthUser {
  name: string;
  password: string;
}

export class Convert {
  public inFormatBase64({ name, password }: propsAuthUser) {
    const encoded = Buffer.from(`${name}:${password}`).toString("base64");

    return `Basic ${encoded}`;
  }
}
