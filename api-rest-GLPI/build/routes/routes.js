"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/ticketController.ts
var import_zod2 = require("zod");

// src/database/knex-config.ts
var import_knex = require("knex");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  NODE_PORT: import_zod.z.coerce.number().default(5e3),
  DB_HOST: import_zod.z.string(),
  DB_DATABASE: import_zod.z.string(),
  DB_USER: import_zod.z.string(),
  DB_PASSWORD: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/database/knex-config.ts
var config = {
  client: "mysql",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
  },
  useNullAsDefault: true
};
var knex = (0, import_knex.knex)(config);

// src/http/controllers/ticketController.ts
async function ticketController(app) {
  app.get("/search", async (req, reply) => {
    const requestIdTicketQuerySchema = import_zod2.z.object({
      id: import_zod2.z.coerce.string().optional(),
      filter: import_zod2.z.coerce.string().optional()
    });
    const { id, filter } = requestIdTicketQuerySchema.parse(req.query);
    let result = knex("glpi_tickets").select([
      "id",
      "entities_id",
      "name",
      "date_creation",
      "date_mod",
      "solvedate"
    ]);
    if (filter === "true" && id) {
      result = result.where("id", id);
    }
    const rows = await result;
    return reply.status(200).send(rows);
  });
  app.get("/state", async (req, reply) => {
    const requestStatusQuerySchema = import_zod2.z.object({
      filter: import_zod2.z.coerce.string().optional(),
      by: import_zod2.z.coerce.string().optional()
    });
    const { filter, by } = requestStatusQuerySchema.parse(req.query);
    const ticketsByStatusCount = await knex("glpi_tickets").select([
      knex.raw("COUNT(id) AS tickets_total"),
      knex.raw("COUNT(CASE WHEN status = 1 THEN 1 END) AS tickets_open"),
      knex.raw("COUNT(CASE WHEN status = 2 THEN 1 END) AS tickets_assigned"),
      knex.raw("COUNT(CASE WHEN status = 4 THEN 1 END) AS tickets_pending"),
      knex.raw("COUNT(CASE WHEN status = 5 THEN 1 END) AS tickets_solved"),
      knex.raw("COUNT(CASE WHEN status = 6 THEN 1 END) AS tickets_closed")
    ]);
    const ticketsByCategory = await knex("glpi_tickets").select([
      "glpi_itilcategories.name AS category_name",
      knex.raw("COUNT(glpi_tickets.id) AS tickets_count")
    ]).innerJoin(
      "glpi_itilcategories",
      "glpi_tickets.itilcategories_id",
      "glpi_itilcategories.id"
    ).groupBy("glpi_tickets.itilcategories_id", "glpi_itilcategories.name");
    const ticketsByUrgencyCount = await knex("glpi_tickets").select([
      knex.raw(
        "COUNT(CASE WHEN status = 1 AND urgency = 1 THEN 1 END) AS tickets_very_low"
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 2 AND urgency = 2 THEN 1 END) AS tickets_low"
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 3 AND urgency = 3 THEN 1 END) AS tickets_medium"
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 4 AND urgency = 4 THEN 1 END) AS tickets_high"
      ),
      knex.raw(
        "COUNT(CASE WHEN status = 5 AND urgency = 5 THEN 1 END) AS tickets_very_high"
      )
    ]);
    if (filter === "true" && by === "urgency") {
      return reply.status(200).send(ticketsByUrgencyCount);
    }
    if (filter === "true" && by === "categories") {
      return reply.status(200).send(ticketsByCategory);
    }
    return reply.status(200).send(ticketsByStatusCount);
  });
  app.get("/date", async (req, reply) => {
    const tickets = await knex("glpi_tickets").select(knex.raw("DATE(date_creation) AS data"), "status").count("id AS quantidade").whereNotIn("status", [1, 2, 3, 4, 5]).groupByRaw("DATE(date_creation), status").orderByRaw("DATE(date_creation) DESC");
    return reply.status(200).send(tickets);
  });
  app.get("/last", async (req, reply) => {
    const ticketLastSchema = await knex("glpi_tickets").select([
      "glpi_tickets.id",
      "glpi_tickets.name AS title",
      "glpi_tickets.date_creation",
      "glpi_locations.name AS location",
      "glpi_users.firstname",
      "glpi_users.realname",
      "glpi_ticketvalidations.validation_date",
      "glpi_ticketvalidations.comment_validation",
      knex.raw(`
          CASE glpi_tickets.status
            WHEN 1 THEN 'Novo'
            WHEN 2 THEN 'Em Atendimento (Atribu\xEDdo)'
            WHEN 3 THEN 'Em Atendimento (Planejado)'
            WHEN 4 THEN 'Pendente'
            WHEN 5 THEN 'Solucionado'
            WHEN 6 THEN 'Fechado'
          END AS status
        `),
      knex.raw(`
          CASE glpi_tickets.urgency
            WHEN 1 THEN 'Muito baixa'
            WHEN 2 THEN 'Baixa'
            WHEN 3 THEN 'M\xE9dia'
            WHEN 4 THEN 'Alta'
            WHEN 5 THEN 'Muito Alta'
          END AS priority
        `),
      knex.raw(`
          CASE glpi_ticketvalidations.status
            WHEN 2 THEN 'Aguardando'
            WHEN 3 THEN 'Aprovado'
            WHEN 4 THEN 'Recusado'
          END AS validation_status
        `)
    ]).leftJoin(
      "glpi_locations",
      "glpi_tickets.locations_id",
      "glpi_locations.id"
    ).leftJoin(
      "glpi_tickets_users",
      "glpi_tickets.id",
      "glpi_tickets_users.tickets_id"
    ).leftJoin("glpi_users", "glpi_tickets_users.users_id", "glpi_users.id").leftJoin(
      "glpi_ticketvalidations",
      "glpi_tickets.id",
      "glpi_ticketvalidations.tickets_id"
    ).where("glpi_tickets_users.type", 1).whereNot("glpi_tickets.status", 6).whereNot("glpi_tickets.status", 5).orderBy("glpi_tickets.date_creation", "desc").first();
    if (!ticketLastSchema) {
      return reply.status(404).send({ message: "Nenhum ticket encontrado" });
    }
    return reply.status(200).send(ticketLastSchema);
  });
  app.get("/amount", async (req, reply) => {
    const requestCategoriesQuerySchema = import_zod2.z.object({
      filter: import_zod2.z.coerce.string().optional(),
      by: import_zod2.z.coerce.string().optional()
    });
    const { filter, by } = requestCategoriesQuerySchema.parse(req.query);
    const ticketsByAmountCategories = await knex("glpi_tickets").select([
      "glpi_itilcategories.id",
      "glpi_itilcategories.name AS name",
      "glpi_itilcategories.completename AS category"
    ]).count("glpi_tickets.id AS tickets_amount").leftJoin(
      "glpi_itilcategories",
      "glpi_tickets.itilcategories_id",
      "glpi_itilcategories.id"
    ).groupBy(
      "glpi_itilcategories.id",
      "glpi_itilcategories.completename",
      "glpi_itilcategories.name"
    ).orderBy("tickets_amount", "desc");
    const ticketsByLastCategories = await knex("glpi_tickets").select([
      "glpi_tickets.id",
      "glpi_tickets.name",
      "glpi_tickets.status ",
      "glpi_tickets.date",
      "glpi_itilcategories.name AS category"
    ]).leftJoin(
      "glpi_itilcategories",
      "glpi_tickets.itilcategories_id",
      "glpi_itilcategories.id"
    ).whereIn("glpi_tickets.status", [1, 2, 3, 4, 5]).orderBy("glpi_tickets.id", "desc").limit(10);
    if (filter === "true" && by === "getLastTickets") {
      if (!ticketsByLastCategories) {
        return reply.status(404).send({ message: "Nenhuma categoria associada aos chamados." });
      }
      return reply.status(200).send(ticketsByLastCategories);
    }
    if (!ticketsByAmountCategories) {
      return reply.status(404).send({ message: "Nenhuma categoria associada aos chamados." });
    }
    return reply.status(200).send(ticketsByAmountCategories);
  });
  app.get("/tickets-line-time", async (req, reply) => {
    const tickets = await knex("glpi_tickets as t").select([
      knex.raw(
        'DATE_FORMAT(t.date_creation, "%d/%m/%Y %H:%i") AS "date_creation"'
      ),
      // Formata a data de criação para o formato específico
      "e.name AS entities",
      // Nome da entidade
      "t.id AS id",
      // ID do chamado
      "t.name AS title",
      // Nome
      "lo.name AS location",
      // Setor
      knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u.firstname, ' ', u.realname)) AS "applicant"
    `),
      // Concatena os nomes e sobrenomes dos usuários do tipo "Requerente" e remove duplicatas
      knex.raw(`
      GROUP_CONCAT(DISTINCT CONCAT(u2.firstname, ' ', u2.realname)) AS "technical"
    `),
      // Concatena os nomes dos usuários do tipo "Técnico" e remove duplicatas
      knex.raw(`
      CASE 
        WHEN t.status = 1 THEN 'Novo'
        WHEN t.status = 2 THEN 'Em Atendimento (atribu\xEDdo)'
        WHEN t.status = 3 THEN 'Em Atendimento (planejado)'
        WHEN t.status = 4 THEN 'Pendente'
        WHEN t.status = 5 THEN 'Solucionado'
        WHEN t.status = 6 THEN 'Fechado'
      END AS "status"
    `),
      knex.raw(`
      CASE 
        WHEN t.priority = 6 THEN 'Cr\xEDtica'
        WHEN t.priority = 1 THEN 'Muito baixa'
        WHEN t.priority = 2 THEN 'Baixa'
        WHEN t.priority = 3 THEN 'M\xE9dia'
        WHEN t.priority = 4 THEN 'Alta'
        WHEN t.priority = 5 THEN 'Muito alta'
      END AS "priority"
    `)
    ]).leftJoin("glpi_entities as e", "t.entities_id", "e.id").leftJoin("glpi_tickets_users as tu1", function() {
      this.on("tu1.tickets_id", "t.id").andOn("tu1.type", knex.raw(1));
    }).leftJoin("glpi_users as u", "tu1.users_id", "u.id").leftJoin("glpi_tickets_users as tu2", function() {
      this.on("tu2.tickets_id", "t.id").andOn("tu2.type", knex.raw(2));
    }).leftJoin("glpi_users as u2", "tu2.users_id", "u2.id").leftJoin("glpi_locations as lo", "t.locations_id", "lo.id").whereNotIn("t.status", [5, 6]).groupBy("t.id").orderBy("t.date_mod", "desc").limit(10);
    if (!tickets) {
      return reply.status(404).send({ message: "Nenhuma chamado registrado." });
    }
    return reply.status(200).send(tickets);
  });
}

// src/routes/routes.ts
async function routes(app) {
  app.register(ticketController, { prefix: "/tickets" });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
