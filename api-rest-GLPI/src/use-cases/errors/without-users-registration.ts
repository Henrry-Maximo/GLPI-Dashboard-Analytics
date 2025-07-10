export class WithoutUsersRegistration extends Error {
  constructor() {
    super("No users found");
  }
}