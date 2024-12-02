import { authenticate } from "@/use-cases/authenticate";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const login: FastifyPluginAsyncZod = async (app) => {
  app.post("/", async (req, reply) => {
    const userBodyRequest = z.object({
      name: z.string(),
      password: z.string(),
    });

    const { name, password } = userBodyRequest.parse(req.body);

    const { token } = await authenticate({ name, password });

    return reply
      .setCookie("refreshToken", token, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  });
};
