import type { H3Event } from "h3";
import { z } from "zod";

// const filterSchema = z.union([z.string().transform((val) => [val]), z.array(z.string())]);
// const filterSchema = z.union([z.string(), z.array(z.string()).transform((arr) => arr.join(","))]);

// function createFilterSchema(values?: [string, ...string[]]) {
//    const schema = values ? z.enum(["", ...values]) : z.string();
//    return z
//       .union([schema, z.array(schema).transform((arr) => arr.join(",") || "")])
//       .default("");
// }

const booleanSchema = z
   .enum(["true", "false"])
   .default("false")
   .transform((val) => val === "true");

// Define a base schema with all possible parameters
const baseSchema = z.object({
   page: z.coerce.number().default(1),
   limit: z.coerce.number().default(6),
   search: z.coerce.string().default(""),
   serialized: booleanSchema,
});

type BaseSchemaType = z.infer<typeof baseSchema>;

type EasyQueryKeys = keyof BaseSchemaType;

/**
 * Retrieves and validates query parameters from an H3 event based on a subset of keys from the base schema.
 *
 * @param {H3Event} event - The H3 event containing query parameters to validate.
 * @param {EasyQueryKeys[]} keys - The subset of keys from the base schema to validate (defaults to ["page", "limit", "search"]).
 * @return {Promise<Pick<BaseSchemaType, K>>} The validated query parameters.
 */
export async function easyQuery<K extends EasyQueryKeys>(
   event: H3Event,
   keys: K[] = ["page", "limit", "search", "serialized"] as K[]
): Promise<Pick<BaseSchemaType, K>> {
   const selectedSchema = z.object(
      Object.fromEntries(keys.map((key) => [key, baseSchema.shape[key]]))
   ) as unknown as z.ZodType<Pick<BaseSchemaType, K>>;

   const query = await getValidatedQuery(event, selectedSchema.safeParse);

   if (query.error) {
      throw createError({
         statusCode: 400,
         message: "Invalid query",
         data: {
            fieldErrors: query.error.format(),
         },
         cause: import.meta.dev ?? query.error,
      });
   }

   return query.data;
}
