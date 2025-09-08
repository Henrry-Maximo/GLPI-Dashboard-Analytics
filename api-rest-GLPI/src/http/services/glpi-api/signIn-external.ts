import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error";
import { env } from "../../../env";
import axios from "axios";
import {
  AuthService,
  signInExternalRequest,
  signInExternalResponse,
} from "../auth-service";
import { Convert } from "../../../use-cases/utils/credencials-convert-base64";

export class HttpExternalAuthService implements AuthService {
  async authenticate({
    name,
    password,
  }: signInExternalRequest): Promise<signInExternalResponse> {
    try {
      const convert = new Convert()
      const response = await axios.post(
        `${env.API_EXTERNAL}/initSession`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: convert.inFormatBase64({ name, password }),
            "App-Token": env.APP_TOKEN,
          },
        }
      );

      return response.data;
    } catch (err) {
      // console.log(err.message);
      throw new InvalidCredentialsError();
    }
  }
}