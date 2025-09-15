import { FastifyError } from "fastify";
import fs from "node:fs";
import path from "node:path";

export class ErrorServerHandler {
  constructor(public error: FastifyError) {
    this.error = error;

    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private logFile = path.join(__dirname, "../../../logs/errors.log");

  public execute() {
    // formatter message error
    const message = `[${new Date().toISOString()}] ${this.error.stack || this.error}\n\n`;
    fs.appendFileSync(this.logFile, message, "utf8");

    return 0;
  }
}
