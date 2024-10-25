export default defineEventHandler(async (event) => {
   try {
      const { page, limit, search } = await easyQuery(event);
      const { result, total } = await getPaginatedHouses({
         page,
         limit,
         search,
      });
      return {
         data: result,
         total,
      };
   } catch (error) {
      throw createError({
         statusCode: 500,
         statusMessage: "Failed to fetch houses",
         cause: error,
      });
   }
});
