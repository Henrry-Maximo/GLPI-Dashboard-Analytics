export class InvalidCredentialsError extends Error {
  constructor(message?: string) {
    super("Invalid Credentials Error.");
  }
}
