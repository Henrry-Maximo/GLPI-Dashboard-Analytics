export class UserNotAuthorization extends Error {
  constructor() {
    super("User Unauthorized.");
  }
}
