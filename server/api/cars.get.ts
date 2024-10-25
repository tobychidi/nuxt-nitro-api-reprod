export default defineEventHandler(async (event) => {
   try {
      const { page, limit, search } = await easyQuery(event);
      const { result, total } = await getPaginatedCars({
         page,
         limit,
         search,
      });
      return {
         data: result,
         total,
      };
   } catch (error) {
      console.log(error);
      throw createError({
         statusCode: 500,
         statusMessage: "Failed to fetch cars",
         cause: error,
      });
   }
});
