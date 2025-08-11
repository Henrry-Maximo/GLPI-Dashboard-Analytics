import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";
import { env } from "../../env";
import { credentialsConvertBase64 } from "../../use-cases/utils/credencials-convert-base64";
import axios from "axios";

export interface signInExternalRequest {
  name: string;
  password: string;
}

interface signInExternalResponse {
  session_token: string;
}

export async function signInExternalService({
  name,
  password,
}: signInExternalRequest): Promise<signInExternalResponse> {
  try {
    const userFromBase64 = await credentialsConvertBase64({ name, password });

    const response = await axios.post(
      `${env.API_EXTERNAL}/initSession`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": userFromBase64,
          "App-Token": env.APP_TOKEN,
        },
      },
    );

    return response.data;
  } catch (err) {
    // console.log(err.message);
    throw new InvalidCredentialsError();
  }
}
