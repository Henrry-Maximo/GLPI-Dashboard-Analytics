export class UserAlreadyExistsError extends Error {
  constructor () {
    super("Username Already Exists.");
  }
}
