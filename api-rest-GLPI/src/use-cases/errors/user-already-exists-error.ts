export class UserAlreadyExistsError extends Error {
  constructor () {
    super("Username already exists.");
  }
}
