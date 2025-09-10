export interface signInExternalRequest {
  name: string;
  password: string;
}

export interface signInExternalResponse {
  session_token: string;
}

export interface AuthService {
  authenticate({
    name,
    password,
  }: signInExternalRequest): Promise<signInExternalResponse>;
}
