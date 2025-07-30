export class WithoutTicketsRegistration extends Error {
  constructor() {
    super("No tickets found.");
  }
}
