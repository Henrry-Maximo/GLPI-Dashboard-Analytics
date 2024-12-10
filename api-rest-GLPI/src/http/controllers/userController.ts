
//   app.get("/users-by-count", async (req, reply) => {
//     try {
//       const conn = await createConnection();
//       const [rows] = await conn.query(
//         "SELECT COUNT(id) AS Total FROM glpi_users;"
//       );
//       await conn.end();
//       return reply.status(200).send(rows);
//     } catch (err) {
//       return reply.status(500).send({ error: "Internal Server Error" });
//     }
//   });

//   // retornar número de chamados por usuário
//   app.get("/users-by-tickets", async (req, reply) => {
//     const db = await createConnection();

//     const [rows] = await db.query(`
//     SELECT
//       glpi_users.name AS usuario,
//       COUNT(glpi_tickets.id) AS quantidade_chamados
//     FROM
//       glpi_tickets
//     JOIN
//       glpi_users ON glpi_tickets.users_id_recipient = glpi_users.id
//     GROUP BY
//       glpi_users.name
//     ORDER BY
//       quantidade_chamados DESC;`);

//     return reply.status(200).send(rows);
//   });
