import type { FastifyReply, FastifyRequest } from "fastify";

interface ClientRequestInfo {
  ip: string;
  userAgent?: string;
  language?: string;
  referer?: any;
  host?: string;
  method: string;
  url: string;
}

export async function clientIp(req: FastifyRequest, reply: FastifyReply) {
  try {
    const info: ClientRequestInfo = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      language: req.headers["accept-language"],
      referer: req.headers["referer"] || req.headers["referrer"],
      host: req.headers["host"],
      method: req.method,
      url: req.url,
    };

    return info;
  } catch (err) {
    throw new Error("Erro ao coletar informações do cliente");
  }
}
