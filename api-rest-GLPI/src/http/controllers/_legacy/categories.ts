// export async function categoriesController(app: FastifyInstance) {
//   // retornar nome de todas as categorias
//   app.get("/categories", async (_, reply) => {
//     const { categories } = await getCategories();

//     return reply.status(200).send({ categories });
//   });

//   // retornar total de categorias
//   app.get("/categories-by-count", async (_, reply) => {
//     const { categoriesQuantity } = await categoriesByCount();

//     return reply.status(200).send({ categoriesQuantity });
//   });
// }
