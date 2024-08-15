import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";
import { ticketController } from "../controllers/ticketController";
import { categorieController } from "../controllers/categorieController";

export async function routes(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    try {
      const routes = app.printPlugins();
      reply.status(200).send(routes);
    } catch (err) {
      return reply.status(500).send({
        error: "Internal Server Error",
      });
    }
  });

  app.register(userController, { prefix: "/user" });
  app.register(ticketController, { prefix: "/ticket" });
  app.register(categorieController, { prefix: "/categorie" });
}
