let count = 0;
export default defineEventHandler((event) => {
   const action = getQuery(event).action;

   console.log({ count });

   switch (action) {
      case "increment":
         count++;
         break;
      case "decrement":
         count--;
         break;
      case "reset":
         count = 0;
         break;
      default:
         break;
   }
   console.log({ action, count });
   return {
      message: `Action: ${action}, Status: Success`,
      count,
   };
});
