
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
//       b.name AS usuario,
//       COUNT(a.id) AS quantidade_chamados
//     FROM
//       glpi_tickets a
//     JOIN
//       glpi_users b ON a.users_id_recipient = b.id
//     GROUP BY
//       b.name
//     ORDER BY
//       quantidade_chamados DESC;`);
//     return reply.status(200).send(rows);
//   });
